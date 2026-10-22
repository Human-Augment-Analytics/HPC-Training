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

If Ollama is unavailable, check the official Ollama Linux documentation and PACE software guidance.

> **Important** Do not use `sudo` or install system-wide services on ICE. If Ollama is not installed, follow an approved user-space installation procedure or contact your research supervisor or PACE support. Confirm GPU compatibility before installation.

**Step 2: Configure Model Storage**

Ollama stores downloaded model files, which can consume significant disk space. The `OLLAMA_MODELS` environment variable can be used to specify a custom storage location.

For example, after identifying an approved directory:
```bash
export OLLAMA_MODELS="/path/to/approved/model/storage"
```

Replace the example path with a real directory you have permission to use.

**Step 3: Start the Ollama Server**

When Ollama is installed and you are working within an allocated compute session, you can start its inference service.

For a manually launched Ollama process:

```bash
export OLLAMA_HOST=127.0.0.1:11434
ollama serve
```

The `OLLAMA_HOST` setting binds the server to the compute node's loopback interface rather than exposing it on the network.

Keep this terminal running while you use Ollama. In another termianl or shell on the same allocated compute node, you can execute model commands. 

> **Note:** Accessing the same compute node from multiple terminals may require an additional Slurm job step. Follow the access method supported by your ICE environment.

## Running Your First LLM

After starting Ollama, you can download and interact with a compatible language model. 

**Step 1: Choose a Model**

When selecting a model, consider:
- Number of parameters
- Download size
- Estimated GPU memory requirements
- Model license and permitted use
- Whether the model is suitable for your research task

**Step 2: Run a Model**

For example, a small model available through Ollama is:
```bash
ollama run llama3.2:1b
```

If the model is not already installed, Ollama will attempt to download it. This requires network access to the model registry, which may be restricted on compute node. If downloads are blocked, use a PACE-approved model transfer or caching workflow.

**Step 3: Submit a Prompt**

Once the model loads, try entering:

```bash
Explain high-performance computing to a beginner in three sentences.
```

The model should generate a response based on your prompt. You have now performed a basic LLM inference task.

**Step 4: Exit the Interactive Model**

Enter:

```bash
/bye
```

This exits the interactive model conversation without stopping the Ollama server.

# Managing Models

Ollama provides commands for inspecting downloaded models and managing local storage.

**List Downloaded Models**

```bash
ollama list
```

**View Running Models**

```bash
ollama ps
```

Displays models currently loaded by Ollama, including information about whether they are using CPU or GPU resources.

**Inspect Model Information**

```bash
ollama show llama3.2:1b
```

Displays information about the selected model.

```bash
ollama rm llama3.2:1b
```

Removes the downloaded model from Ollama's managed storage. 

Only remove models you own or have permission to manage.

# Using Ollama with Python

Researchers may want to interact with language models programmatically rather than through the terminal. Ollama provides a local HTTP API that can be called from Python. 

For example, while the Ollama server is running on the same compute node, you can use:

```python
import json
import urllib.request

url = "http://127.0.0.1:11434/api/generate"

payload = {
    "model": "llama3.2:1b",
    "prompt": "What is high-performance computing?",
    "stream": False
}

request = urllib.request.Request(
    url,
    data=json.dumps(payload).encode("utf-8"),
    headers={"Content-Type": "application/json"}
)

with urllib.request.urlopen(request) as response:
    result = json.load(response)

print(result["response"])
```

This example sends a prompt to Ollama and prints the model's generated response. 

The script assumes that the model has already been downloaded and the Ollama server is accessible at the specified local address. 

Programmatic access is particularly useful for:
- Processing multiple text inputs
- Comparing model responses
- Building experimental pipelines
- Automating research tasks
- Recording outputs for later analysis

For reproducible experiments, record the exact model version, prompt, generationg settings, and relevant software versions.


# Troubleshooting Common Issues

| Concept | Description | Recommended Action |
| ------ | -------------------- |
| `ollama: command not found` | Ollama is not installed or not in your PATH | Check available modules and approved installation instructions |
| GPU not detected | The process is not running on a GPU node, or the GPU/software combination is incompatible | Verify the allocation and GPU visibility |
| Out-of-memory error | Model memory requirements exceed available resources | Try a smaller or more heavily quantized model |
| Model download fails | Network access is restricted or storage is insufficient | Check network policy, quotas, and approved download methods |
| Connection refused | Ollama server is not running or the address is incorrect | Confirm the server is running and both processes use the same endpoint |
| Model runs slowly | Inference is running on the CPU or resources are insufficient | Check ollama ps and GPU utilization |
| Slurm job remains pending | Requested resources are unavailable or scheduling limits apply | Inspect the pending reason and consider a smaller allocation |

If a problem persists, consult PACE documentation or contact the appropriate support team.