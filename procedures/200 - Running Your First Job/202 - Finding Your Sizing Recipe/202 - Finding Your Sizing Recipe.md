# Finding Your Sizing Recipe

You know the four numbers your job needs: CPU cores, GPU VRAM, system RAM, and storage. The next step is to find a workload recipe that gives you a defensible first estimate.

This module contains four workload recipes:

1. LLM fine-tuning and inference
2. Computer vision training
3. Classical ML and tabular work
4. Audio and signal processing

The aim here is simple: choose the closest recipe, use it to form a first estimate, and then replace that estimate with measurements from your own code.

---

## Choose the recipe by the work your program does

| If your main workload is… | Start here | Typical binding resource |
|---|---|---|
| Transformer inference, LoRA, QLoRA, or other LLM work | Recipe 1: LLM fine-tuning and inference | GPU VRAM |
| Image classification, object detection, segmentation, ViTs, or other vision training | Recipe 2: Computer vision training | GPU VRAM plus CPU preprocessing and storage I/O |
| XGBoost, LightGBM, random forests, regressions, scikit-learn, or large DataFrames | Recipe 3: Classical ML and tabular work | System RAM and CPU cores; usually no GPU |
| Audio decoding, feature extraction, spectrograms, Whisper, wav2vec2, or HuBERT | Recipe 4: Audio and signal processing | CPU preprocessing, storage I/O, and sometimes GPU VRAM |

Choose the recipe that matches the most resource-intensive stage of your work. A project may use more than one recipe.

### Projects that span recipes

Examples:

- A vision-language model may need both the computer-vision and LLM recipes.
- A pipeline that extracts audio features and then trains a classical classifier may use the audio recipe for preprocessing and the classical-ML recipe for training.
- An LLM application with a large pandas preprocessing stage should check both the LLM and classical-ML RAM guidance.

If the stages have very different needs, consider separate Slurm jobs. A CPU-only preprocessing job should not reserve a GPU that it cannot use.

---

## What each recipe contains

Each recipe follows the same pattern.

### 1. Resource guidance

The recipe provides starting estimates for:

- GPU VRAM
- CPU cores
- System RAM
- Disk/storage
- Wall time

These values are rules of thumb. They help you choose a small profiling configuration; they are not measured results for your code.

### 2. A worked example

The worked example shows how a real workload becomes a set of Slurm directives. Use it to understand the reasoning, not as a script to copy unchanged.

### 3. A “Does this fit on ICE?” verdict table

The verdict table maps your requirement to the smallest suitable ICE hardware tier.

Read it from top to bottom:

1. Find the row that meets or exceeds your measured need.
2. Prefer the smallest tier that leaves safe headroom.
3. Read the notes for compatibility, queue, storage, or multi-GPU constraints.
4. Escalate only if no ICE row can support the workload.

---

## Recipe 1: LLM fine-tuning and inference

Start here for transformer-based models such as Llama, Mistral, Qwen, Gemma, and DeepSeek.

The recipe distinguishes several workloads because they have very different memory costs:

- Inference stores weights and a KV cache.
- LoRA trains adapters but still carries the base model and activation costs.
- QLoRA reduces base-model memory through quantization.
- Full fine-tuning is substantially more demanding than adapter-based tuning.

For LLMs, model size, numeric precision, context length, batch size, and training method can all change VRAM requirements. The LLM recipe also covers model caches, tokenized datasets, and checkpoints. This storage is easy to forget.

> The VRAM calculator introduced later in this module is for **inference serving**, not training or fine-tuning.

---

## Recipe 2: Computer vision training

This is the right starting point for image classification, object detection, segmentation, and vision transformers.

For many vision models, VRAM is driven more by **input resolution × batch size** than by parameter count. Doubling image dimensions can greatly increase activation memory. CPU cores also matter because image decoding, resizing, and augmentation happen before data reaches the GPU.

The storage guidance is especially important for datasets containing hundreds of thousands of small files. Staging data to suitable scratch storage or packing it into larger shards can improve throughput.

---

## Recipe 3: Classical ML and tabular work

Choose this recipe for scikit-learn, tree-based models, regressions, SVMs, and large tabular datasets.

This recipe is a reminder that many jobs do not need a GPU. CPU-only jobs can be easier to schedule, and requesting a GPU does not accelerate code that has no GPU implementation.

System RAM is often the binding constraint. A DataFrame can occupy several times the size of its on-disk Parquet or CSV file after loading and transformation.

---

## Recipe 4: Audio and signal processing

This recipe covers audio decoding, resampling, spectrogram generation, audio classification, speech-model fine-tuning, and transcription.

Audio pipelines often invert the usual GPU-heavy pattern: preprocessing can be more expensive than the model. The recipe recommends a two-stage approach for large corpora:

1. Run CPU-intensive feature extraction once.
2. Train from the saved features without recomputing them every epoch.

---

## Worked selection example

Imagine you are training a ResNet-50 model on high-resolution animal images.

1. The inputs are images and the task is model training.
2. Start with the computer-vision recipe.
3. Use its model-family table to estimate GPU VRAM.
4. Use its CPU guidance for image decoding and augmentation.
5. Include the complete dataset and working files in the storage plan.
6. Find the first row in the verdict table that fits the expected VRAM.
7. Run a small representative profile and replace the recipe estimates with measurements.

The recipe’s worked example uses approximately 14 GB of GPU VRAM, 16 CPU cores, 48 GB of RAM, and a 389 GB dataset. Its verdict table shows that the VRAM requirement fits the 16 GB tier. The storage plan needs more care: the dataset is larger than the current 300 GB default scratch quota. It must come from a course shared directory or an approved larger allocation, then it can be staged to temporary local storage requested with `#SBATCH --tmp=400G` and accessed through `$TMPDIR`. Anything kept only in `$TMPDIR` is erased when the job ends.

The final decision is based on the combination of all four numbers, not GPU VRAM alone.

---

## A few easy mistakes

- A Python job that imports PyTorch is not automatically an LLM workload.
- A CPU-only scikit-learn pipeline will not become GPU-enabled just because the Slurm script requests a GPU.
- A dataset’s on-disk size is not the same as its in-memory size.
- GPU training still depends on CPU preprocessing and storage I/O.
- Worked examples are starting points, not scripts to copy unchanged.
- “Fits” means the estimate is plausible. Profile your code before committing to a long run.

> ICE currently provides a 30 GB home quota and a 300 GB scratch quota per student. Quotas and retention rules can change, so check [Storage on ICE](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0042094) before planning a large dataset.

---

## Next step

Once your recipe gives you a GPU VRAM estimate, continue to **Choosing Your GPU**.
