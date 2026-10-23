---
title: "403 - Distributed Training"
---

# What Is Distributed Training? 

Distributed training is the process of training a machine learning model using multiple computing devices simultaneously.

In traditional single-GPU training, one GPU performs the computations needed to process training data, calculate model predictions, compute gradients, and update model parameters.

Distributed training allows multiple GPUs to participate in this process.

## Why Use Distributed Training

Researchers use distributed training to:

- **Reduce training time**: Process more training data simultaneously.
- **Scale machine learning workloads**: Train models using more computational resources.
- **Support larger models**: Use advanced parallelism techniques when models cannot fit on a single GPU.
- **Increase throughput**: Process more training samples per second.
- **Improve resource utilization**: Distribute computational work across available GPUs.

However, distributed training introduces additional communication and synchronization overhead.

> **Important**: Using more GPUs does not automatically result in faster training. Performance depends on model size, batch size, GPU capabilities, communication overhead, and data-loading efficiency.

## Single-GPU vs. Distributed Training

| Single-GPU Training | Distributed Training |
| --------- | -------- |
| Uses one GPU | Uses multiple GPUs |
| All computations occur on one device | Workloads are distributed across devices |
| Easier to configure and debug | Requires coordination between processes |
| Limited by one GPU's resources | Can provide greater aggregate computational capacity |
| No cross-GPU gradient synchronization | May require communication and synchronization |
| Suitable for smaller experiments | Useful for larger computational workloads |


# Understanding Data Parallelism and Model Parallelism

Distributed training generally involves two major approaches: data parallelism and model parallelism.

## Data Parallelism

Data parallelism distributes training data across multiple GPUs while maintaining a copy of the same model on each GPU.

Each GPU:

1. Receives a different subset of training data.
2. Performs a forward pass using its local model.
3. Calculates the loss and gradients.
4. Synchronizes gradients with the other GPUs.
5. Updates its model parameters.

Because gradients are synchronized, model replicas remain consistent after optimizer updates.

## Model Parallelism
Model parallelism distributes different parts of a neural network across multiple GPUs. Unlike data parallelism, each GPU stores only part of the model. Model parallelism is useful when a model is too large to fit entirely into the memory of a single GPU.

**Comparison**

| Data Parallelism | Model Parallism|
| --------- | ---------- |
| Splits training data across GPUs | Splits model components across GPUs |
| Each GPU generally stores a complete model replica | Each GPU stores part of the model |
| Commonly used to improve training throughput | Commonly used for models with large memory requirements |
| Requires gradient synchronization | Requires communication between model components |
| Supported by PyTorch DDP | Supported through techniques such as tensor and pipeline parallelism |

> **Note:** This module focuses primarily on data parallelism using PyTorch DDP because it provides a practical introduction to distributed training.

# Understanding PyTorch DistributedDataParallel (DDP)

PyTorch is an open-source machine learning framework used to develop and train neural networks.

PyTorch includes DistributedDataParallel (DDP), a tool for training models across multiple GPUs.

DDP creates a model replica for each training process and synchronizes gradients during training.

## How DDP Works
A typical DDP training workflow involves:
- Initializing a distributed process group.
- Assigning each process to a GPU.
- Creating and wrapping the model with DDP.
- Distributing training data across processes.
- Performing forward and backward passes.
- Synchronizing gradients.
- Updating model parameters.
- Shutting down the process group.

**Important Terminology**

| Term | Description |
| ------ | ------ |
| Process | An independent program instance participating in training |
| Rank | Unique identifier assigned to each process |
| Local rank | Process identifier within a specific compute node |
| World size | Total number of participating processes |
| Process group | Collection of processes that communicate during training |
| NCCL | NVIDIA communication library commonly used for GPU-based distributed training |
| Backend | Communication implementation used by distributed processes |
| Gradient Synchronization | Process of combining gradients across model replicas |
| Epoch | One complete pass through the training dataset |

**Example: Two-GPU Training**

Suppose you launch a training job using two GPUs on one compute node.

| Process | Rank | Local Rank | GPU |
| ----- | --- | --- | --- |
| Process 1 | 0 | 0 | GPU 0 |
| Process 2 | 1 | 1 | GPU 1 |

The world size is 2 because two processes participate in training.

Each process works with its assigned GPU and coordinates gradient updates with the other process.

# Preparing a PyTorch Environment on ICE

Before running distributed training, you must verify that your computing environment supports PyTorch and the allocated GPUs.

## Step 1: Connect to ICE

Log in using SSH or Open OnDemand. Refer to Module 100 for instructions on accessing ICE.

## Step 2: Check Available GPU Resources

Run:

```bash
sinfo
```

You can also inspect Slurm's reported GPU resources with:

```bash
sinfo -o "%P %D %G %T"
```

## Step 3: Set Up Your Python Environment

If you have an approved Python environment, activate it.

For example:

```bash
source .venv/bin/activate
```

Otherwise, after selecting a compatible Python installation, you can create an environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

## Step 4: Verify PyTorch

Run:

```bash
python -c "import torch; print(torch.__version__)"
```

To check whether your PyTorch installation was built with CUDA support:

```bash
python -c "import torch; print(torch.version.cuda)"
```

The reported CUDA version refers to the CUDA version used to build PyTorch, not necessarily the version of the system's installed CUDA toolkit.

If PyTorch is unavailable, consult PyTorch's official installation instructions and PACE software guidance.

Install a build compatible with your Python version, allocated GPU hardware, and NVIDIA driver.

## Step 5: Verify GPU Access

After obtaining a GPU allocation and launching a compute-node shell, run:

```bash
nvidia-smi
```

Then verify GPU access from Python:

```bash
python -c "import torch; print(torch.cuda.is_available())"
```

Expected output on a compatible GPU compute node:

```bash
True
```

You can also check how many GPUs PyTorch can see:

```bash
python -c "import torch; print(torch.cuda.device_count())"
```

> **Important:** These checks must be performed on a GPU compute node. Running them directly on a login node may produce different results.

# Creating a Simple Distributed Training Script

In this section, we will create a small PyTorch script that demonstrates distributed training with DDP. The example trains a simple neural network using randomly generated data. It does not require downloading a dataset.

## Step 1: Create a Python File

Create a file named:

`train_ddp.py`

## Step 2: Add the Training Code

```python
import os

import torch
import torch.distributed as dist
from torch import nn
from torch.nn.parallel import DistributedDataParallel as DDP
from torch.utils.data import DataLoader, TensorDataset
from torch.utils.data.distributed import DistributedSampler


def main():
    # Initialize distributed communication.
    dist.init_process_group(backend="nccl")

    local_rank = int(os.environ["LOCAL_RANK"])
    rank = dist.get_rank()
    world_size = dist.get_world_size()

    torch.cuda.set_device(local_rank)
    device = torch.device("cuda", local_rank)

    # Build a small neural network.
    model = nn.Sequential(
        nn.Linear(10, 32),
        nn.ReLU(),
        nn.Linear(32, 2)
    ).to(device)

    model = DDP(model, device_ids=[local_rank])

    # Generate an example dataset.
    # A fixed seed makes the dataset identical across ranks.
    generator = torch.Generator().manual_seed(42)

    features = torch.randn(
        1024, 10, generator=generator
    )

    labels = torch.randint(
        0, 2, (1024,), generator=generator
    )

    dataset = TensorDataset(features, labels)

    # Give each process a different data subset.
    sampler = DistributedSampler(
        dataset,
        num_replicas=world_size,
        rank=rank,
        shuffle=True
    )

    loader = DataLoader(
        dataset,
        batch_size=32,
        sampler=sampler
    )

    optimizer = torch.optim.SGD(
        model.parameters(),
        lr=0.01
    )

    loss_fn = nn.CrossEntropyLoss()

    # Train for three epochs.
    for epoch in range(3):
        sampler.set_epoch(epoch)

        total_loss = 0.0

        for inputs, targets in loader:
            inputs = inputs.to(device)
            targets = targets.to(device)

            optimizer.zero_grad()

            outputs = model(inputs)
            loss = loss_fn(outputs, targets)

            loss.backward()
            optimizer.step()

            total_loss += loss.item()

        if rank == 0:
            print(
                f"Epoch {epoch + 1}: "
                f"Rank 0 local loss sum = {total_loss:.4f}",
                flush=True
            )

    dist.destroy_process_group()


if __name__ == "__main__":
    main()
```

**Understand the Code**

| Component | Purpose |
| ----- | --- | 
| `dist.init_process_group()` | Establishes communication between training processes | 
| `LOCAL_RANK` | Identifies the GPU assigned to each local process |
| `torch.cuda.set_device()` | Selects the GPU used by the current process |
| `DDP()` | Wraps the model for distributed gradient synchronization |
| `DistributedSampler()` | Assigns different portions of the dataset to different processes |
| `sampler.set_epoch()` | Updates shuffling consistently between epochs |
| `loss.backward()` | Computes gradients and triggers DDP synchronization |
| `optimizer.step()` | Updates model parameters |
| `dist.destroy_process_group()` | Cleans up distributed communication |

The example prints the sum of rank 0's local batch losses, not a globally averaged loss across all GPUs.

> **Important:** This example demonstrates how DDP operates. Because the network is small, training with two GPUs may be slower than training with one GPU due to communication overhead.

# Requesting Multiple GPUs Using Slurm

ICE uses Slurm to schedule computing jobs and allocate resources.

To train a model across multiple GPUs, you must request the required resources before launching the training processes.

## Step 1: Create a Slurm Submission Script

Create a file named:

`train_ddp.sbatch`

Add the following:
```bash
#!/bin/bash
#SBATCH --job-name=ddp-training
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=4
#SBATCH --gres=gpu:2
#SBATCH --time=00:30:00
#SBATCH --output=ddp-%j.out
#SBATCH --error=ddp-%j.err

set -euo pipefail

# Activate the prepared Python environment.
source .venv/bin/activate

# Display GPU information.
nvidia-smi

# Launch one training process per GPU.
torchrun \
    --standalone \
    --nnodes=1 \
    --nproc-per-node=2 \
    train_ddp.py
```

**Understanding the Slurm Script**

| Directive | Description |
| ---- | ---- |
| `--job-name` | Name assigned to the submitted job |
| `--nodes=1` | Requests one compute node |
| `--ntasks=1` | Starts one Slurm task, which launches the PyTorch worker processes |
| `--cpus-per-task=4` | Requests four CPU cores for the launching task |
| `--gres=gpu:2` | Requests two GPUs on the compute node |
| `--time=00:30:00` | Sets a 30-minute time limit |
| `--output` | Specifies the standard output log |
| `--error` | Specifies the error log |


**Why Use torchrun?**

`torchrun` is a PyTorch utility that launches distributed training processes.

In this example:

```bash
torchrun --standalone --nnodes=1 --nproc-per-node=2 train_ddp.py
```

-  `--standalone` configures a single-node distributed launch.

-  `--nnodes=1` specifies one compute node.

-  `--nproc-per-node=2` launches two training processes.

-  `train_ddp.py` is the Python training script.

Each training process is assigned a local rank and uses a different GPU.

> **Important:** The Slurm submission script is a general single-node example, not a verified ICE configuration. You may need to specify an authorized partition or account and adjust the requested resources. GPU requests also depend on Slurm's configuration. Confirm that the node exposes two GPUs to the launch task before running the experiment.


# Submitting and Monitoring a Distributed Job

## Step 1: Submit the Job

Run:

```bash
sbatch train_ddp.sbatch
```

Slurm will return a job ID if the submission is accepted.

Example:

```bash
Submitted batch job 123456
```

## Step 2: Monitor Job Status

Run:

```bash
squeue --me
```

Common job states include:

| State | Meaning |
| ---- | ---- |
| PD | Job is pending |
| R | Job is running |
| CG | Job is completing |
| CD | Job completed successfully |
| F | Job failed |
| TO | Job reached its time limit |

Completed jobs may no longer appear in `squeue`.

## Step 3: Inspect Output Logs

After the job starts, inspect its output file:

```bash
cat ddp-123456.out
```

Replace 123456 with your actual job ID.

If the script runs successfully, you should see messages similar to:

```bash
Epoch 1: Rank 0 local loss sum = ...
Epoch 2: Rank 0 local loss sum = ...
Epoch 3: Rank 0 local loss sum = ...
```

The exact loss values may vary.

## Step 4: Check Job History