---
title: "401 - Running LLMs with Ollama"
---


# What is Ollama?
Ollama is a tool that simplifies running and managing pretrained large language models. Rather than manually configuring complex model dependencies, Ollama provides a command-line interface for downloading, launching, and interacting with compatible models. 

## Why Use Ollama?
- **Simplifies model execution:** Run compatible LLMs using straightforward terminal commands.
- **Supports multiple models:** Download and switch between different pretrained language models. 
- **Supports GPU acceleration:** Use compatible GPUs to improve inference performance.
- **Provides a local API:** Integrate LLM inference into Python scripts and research applications.
- **Supports experimentation:** Compare model outputs without repeatedly configuring model-loading code.


## Ollama vs. Cloud-Based LLM APIs

| Ollama | Cloud-Based LLM APIs |
| ------ | -------------------- |
| Runs models on allocated computing resources | Runs models on a provider's infrastructure |
| Requires local CPU or GPU resources | Computing resources are managed by the provider |
| Models must be downloaded or stored locally | Models are hosted by the provider |
| Can run without an external inference API | Typically requires an internet connection and API key |
| Allows direct control over supported models | Model configuration depends on the provider |
 
> **Important:** Ollama does not train an LLM from scratch. Its primary purpose is running inference with existing models. If your research involves training or fine-tuning models across multiple GPUs, see **Module 403 - Distributed Training**.

# Understanding LLM Resource Requirements
Before running a language model, it is important to understand the computing resources it requires.

## CPU vs. GPUs
A CPU (Central Processing Unit) handles general-purpose computing tasks, while a GPU (Graphics Processing Unit) is designed for highly parallel computations.
LLMs perform large numbers of matrix operations, making GPUs particularly useful for accelerating inference. 
Although some models can run on GPUs, GPU acceleration can significantly improve response speed.

## What is VRAM?
VRAM (Video Random Access Memory) is the memory available on a GPU. When running an LLM, memory is needed to store model weights, intermediate computations, and the context being processed. Models with more parameters generally require more memory.

| Concept | Description |
| ------ | -------------------- |
| Parameters | learned values that determine a model's behavior |
| Model size | Amount of storage required for model files |
| VRAM | Memory available on the GPU |
| Quantization | Technique that reduces the numerical precision of model weights to lower memory requirements |
| Context window | Amount of input and generated text the model can process within a given context |

## Why Model Selection Matters
A model that is too large for the available GPU memory may:
- Fail to load.
- Run partially or entirely on the CPU.
- Produce responses more slowly than expected.
- Encounter out-of-memory errors.

For your first experiments, choose a small, quantized model and check its published memory requirements.

# Requsting GPU Resources on ICE
**Step 1: Connect to ICE**

Log in to ICE using SSH or Open OnDemand by using your GTID and password.

**Step 2: Check Available GPU Resources**

Run:

```bash
sinfo
```

This command displays information about the cluster's Slurm partitions and node states. Available GPU types, partitions, accounts, and limits may vary. Refer to your course or research group's approved ICE configuration before requesting resources.

**Step 3: Request an Interactive GPU Session**
Run this command to display a basic interactive allocation:

```bash
salloc --nodes=1 --ntasks=1 --gpus=1 --time=01:00:00
```

This requests:
- 1 compute node
- 1 task
- 1 GPU
- 1 hour of computing time

> Your environment may require additional options such as an account, partition or GPU type. Depending on Slurm's configuration, `salloc` may also require launching a separate step with `srun` before commands execute on the allocated compute node.

**Step 4: Verify GPU Access**
Once you are executing commands on an allocated NVIDIA GPU compute node, run:

```bash
hostname
nvidia-smi
```

- `hostname` identifies your current machine
- `nvidia-smi` displays about compatible NVIDIA GPUs, including memory usage and GPU processes

# Setting Up Ollama
**Step 1: Check for Ollama**

Run:

```bash
command -v ollama
```

If Ollama is available, check its version:
```bash
ollama --version
```

You can also inspect the environment's available software modules:
```bash
module avail
```