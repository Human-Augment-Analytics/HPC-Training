# Using the VRAM Calculator

The LLM-GPU Sizing Calculator estimates how much GPU VRAM is needed to **serve a large language model for inference** and compares that estimate with its built-in ICE GPU library.

[Open the live LLM-GPU Sizing Calculator](https://ahsansubzwari1.github.io/HAAG-Compute-Sizing-Guidelines/tools/vram-calculator/index.html)

This walkthrough shows how to enter a realistic inference workload, read the average and worst-case estimates, and use the recommendation matrix without mistaking it for a guarantee.

---

## When to use this calculator

Use it when you are planning to serve or deploy an LLM and need to estimate memory for:

- Model weights
- Concurrent inference sessions
- Long context windows
- The KV cache
- Serving-framework overhead

Do **not** use it to size:

- Full model training
- Full fine-tuning
- LoRA or QLoRA fine-tuning
- Computer-vision, audio, or classical-ML training
- CPU cores, system RAM, storage, or wall time

For training and fine-tuning, use the **LLM fine-tuning and inference** sizing recipe and profile the actual training stack.

---

## What the calculator adds together

The average estimate is:

```text
Average VRAM = model weights + average KV cache + serving overhead
```

The worst-case estimate is:

```text
Worst-case VRAM = model weights + full-context KV cache + serving overhead
```

### 1. Model weights

Weight memory depends on parameter count and storage precision:

```text
Weight memory = parameter count × bytes per parameter
```

The calculator uses these approximations:

| Weight precision | Bytes per parameter | Approximate weight memory for an 8B model |
|---|---:|---:|
| BF16 / FP16 | 2 | 16 GB |
| FP8 | 1 | 8 GB |
| INT4 | 0.5 | 4 GB |

Lower precision reduces memory, but it can require compatible hardware/software and may affect model quality. For Mixture-of-Experts models, enter the total parameter count because all expert weights must reside in memory even though only some are active for a token.

### 2. KV cache

During autoregressive inference, the model stores Key and Value vectors for the tokens already processed. The calculator uses:

```text
Bytes per token =
    2 × layers × KV heads × head dimension × KV-cache bytes per element
```

The leading `2` represents one Key vector and one Value vector. Total KV-cache memory then grows with:

- Context length
- Number of concurrent users
- Average context utilization

Longer conversations and more simultaneous users can therefore require substantially more VRAM even when the model itself does not change.

### 3. Serving overhead

Serving systems such as vLLM or TensorRT-LLM need memory for CUDA kernels, runtime state, activation buffers, and workspaces. The calculator exposes this as a separate input rather than pretending that weight and KV-cache memory are the entire requirement.

---

## Enter the inputs

### Model preset

Choose a preset when the model appears in the list. The preset fills in:

- Number of transformer layers
- Number of KV heads
- Attention-head dimension
- Total parameter count

For another model, select **custom / manual entry** and copy the architecture values from the model’s authoritative configuration. Do not substitute the number of query heads for KV heads in a model using Grouped Query Attention.

### Weight precision

Choose the format in which the model weights will actually be loaded. Selecting INT4 in the calculator does not quantize the model or guarantee that the runtime supports that quantization.

### KV-cache precision

The KV cache can sometimes use a different precision from the weights. Confirm that the serving framework and selected GPU support the chosen configuration.

### Concurrent users

Enter the number of inference sessions expected to be active at the same time, not the total number of registered users.

### Context window

Enter the maximum tokens allowed for a session. Avoid selecting the model’s advertised maximum unless the application will actually expose and use it.

### Average context utilization

Sessions usually do not remain at maximum length. This setting estimates the average fraction of the context window occupied across active sessions. The worst-case output still assumes every concurrent user reaches the maximum.

### Framework overhead

Use measurements from your serving stack when available. The tool’s default is an engineering starting point, not a universal constant.

---

## Read the results

### Memory breakdown

The calculator reports:

- **Average VRAM required:** expected use at the selected average context utilization
- **Worst-case VRAM:** all concurrent sessions at the full context length
- Weight memory
- Average and worst-case KV-cache memory
- Framework overhead

Do not ignore the worst-case number. If a deployment must remain available during a synchronized context spike, either size for that case or enforce limits in the serving system.

### GPU recommendation matrix

Rows represent ICE GPU models, and columns represent GPU counts. The current tool rates fit using the **average** VRAM estimate:

| Rating | Average VRAM as a percentage of available VRAM | Interpretation |
|---|---:|---|
| **Comfortable** | Up to 75% | At least 25% average headroom |
| **Tight** | More than 75% and up to 92% | May fit, but profile carefully and inspect worst-case use |
| **Insufficient** | More than 92% | Too little capacity under the calculator’s rule |

Click a GPU row to display the smallest listed GPU count that is not rated insufficient, its average headroom, and the worst-case percentage.

The live calculator's hardware library may lag behind the current cluster. As of July 31, 2026, the calculator still shows a V100 32 GB row, but current PACE documentation lists only the V100 16 GB tier. Ignore the V100 32 GB row. The matrix also calculates every listed GPU-count column even when that many GPUs are not installed together on one ICE node. Use the per-node limits in **Choosing Your GPU** before treating a result as schedulable.

> Multi-GPU columns assume that the serving stack can distribute the model with tensor or pipeline parallelism. VRAM from separate GPUs is not automatically pooled by Slurm, and ordinary data parallelism keeps a copy of the model on every GPU. ICE also limits ordinary jobs to 16 GPU-hours, so additional GPUs reduce the maximum wall time available to that job.

---

## Worked example: Llama 3.1 8B

Enter these values:

| Input | Value |
|---|---:|
| Model preset | Llama 3.1 8B Instruct |
| Weight precision | BF16 / FP16 |
| KV-cache precision | FP16 |
| Concurrent users | 3 |
| Context window | 8,192 tokens |
| Average context utilization | 50% |
| Framework overhead | 14 GB |

The preset supplies 32 layers, 8 KV heads, a head dimension of 128, and 8 billion parameters.

### Step 1: Calculate the weights

```text
8 billion parameters × 2 bytes = 16 GB
```

### Step 2: Calculate KV-cache bytes per token

```text
2 × 32 layers × 8 KV heads × 128 head dimension × 2 bytes
= 131,072 bytes per token
```

### Step 3: Calculate one full session

```text
131,072 bytes × 8,192 tokens ≈ 1.07 GB
```

At 50% average utilization, one session averages about 0.54 GB. Three concurrent sessions therefore average about 1.61 GB of KV cache. At the worst case, they require about 3.22 GB.

### Step 4: Add the components

```text
Average:    16 GB weights + 1.61 GB KV cache + 14 GB overhead ≈ 31.61 GB
Worst case: 16 GB weights + 3.22 GB KV cache + 14 GB overhead ≈ 33.22 GB
```

The display rounds these values to whole gigabytes. In the recommendation matrix:

- Any 32 GB total configuration is rated **Insufficient** because the average estimate is above 92% of that capacity. Current ICE does not list a V100 32 GB GPU, even though that row still appears in the live calculator.
- A single 40 GB GPU is rated **Tight**.
- A single 48 GB GPU is rated **Comfortable**.

That does not mean you should immediately reserve the newest 48 GB GPU. First confirm framework compatibility, queue availability, whether the 14 GB overhead matches your stack, and whether the worst case is acceptable. Then profile a short deployment.

---

## Things that commonly trip people up

- Using the calculator for training or fine-tuning
- Choosing weight precision based on preference rather than the actual loaded checkpoint
- Entering total users instead of concurrent active sessions
- Using the maximum advertised context when the application will enforce a smaller limit
- Confusing query heads with KV heads
- Reading “Tight” as a guarantee that the server will not run out of memory
- Ignoring the worst-case estimate
- Assuming two GPUs automatically behave like one GPU with twice the VRAM
- Choosing an AMD GPU without confirming ROCm support
- Treating the result as a substitute for a real profiling run

---

## Your calculator worksheet

Record these values before turning the result into a Slurm request:

| Item | Your value |
|---|---|
| Model and architecture source | |
| Weight precision actually loaded | |
| KV-cache precision actually supported | |
| Expected concurrent sessions | |
| Enforced context limit | |
| Average context assumption | |
| Framework-overhead assumption | |
| Average VRAM estimate | |
| Worst-case VRAM estimate | |
| Smallest comfortable, compatible, and schedulable ICE configuration | |
| Profiling result | |

---

## Continue

- [Open the live LLM-GPU Sizing Calculator](https://ahsansubzwari1.github.io/HAAG-Compute-Sizing-Guidelines/tools/vram-calculator/index.html).
- Review **Choosing Your GPU** before turning the estimate into a request.

> **PACE note:** The ICE-specific warnings in this guide were verified against [ICE Cluster Resources](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0042095) and [Using Slurm on ICE](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0042096) on July 31, 2026. The live calculator is an estimate and its hardware library is not the final authority. Hardware, reservations, drivers, and job limits can change.
