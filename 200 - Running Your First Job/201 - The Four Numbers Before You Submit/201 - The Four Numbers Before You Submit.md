# The Four Numbers Before You Submit

Before PACE can run your program, Slurm needs to know what resources to reserve for it. For a first estimate, focus on four numbers:

1. CPU cores
2. GPU VRAM
3. System RAM
4. Storage

These numbers do not describe how important your job is. They describe what the program can actually use. A request that is much larger than the workload needs can wait unnecessarily in the queue. A request that is too small can run slowly or fail after hours of work.

By the end of this page, you should be able to write down four sensible resource estimates before creating a Slurm job script and explain where each estimate came from.

---

## The four numbers at a glance

| Resource | What uses it | What too little looks like | Where it appears in a job request |
|---|---|---|---|
| **CPU cores** | Data loading, decoding, preprocessing, augmentation, I/O, and CPU-only computation | The GPU waits for data, preprocessing is slow, or the job uses only one core | Use `--ntasks` for independent tasks. For one multithreaded task, combine `--ntasks=1` with `--cpus-per-task=<cores>` |
| **GPU VRAM** | Model weights, activations, gradients, and the inference KV cache | `CUDA out of memory`, a batch will not fit, or the model cannot load | Choose a GPU model/count with `#SBATCH --gres=gpu:<type>:<count>` |
| **System RAM** | Datasets, DataFrames, Python objects, buffers, and worker processes | The scheduler kills the job for exceeding memory, often reported as an OOM event | `#SBATCH --mem=<amount>` |
| **Storage** | Input data, environment and model caches, temporary files, logs, and checkpoints | A read, write, or checkpoint save fails; the filesystem or quota fills | Plan for home, scratch, a course shared directory, or temporary local storage through `$TMPDIR` |

### GPU VRAM and system RAM are different

This distinction causes many first-job mistakes:

- **GPU VRAM** is memory physically attached to the GPU. Requesting more system RAM does not fix a CUDA out-of-memory error.
- **System RAM** belongs to the compute node. Selecting a GPU with more VRAM does not give a pandas DataFrame more system memory.

The two can fail independently, so estimate both.

---

## Why guessing costs you

Suppose a researcher submits this request without measuring the workload:

```bash
#SBATCH --gres=gpu:H200:8
#SBATCH --cpus-per-task=4
#SBATCH --mem=16G
#SBATCH --time=72:00:00
```

The request is not automatically safe because it asks for powerful GPUs:

- Eight H200 GPUs are scarce and may make the job harder to schedule.
- The program may not contain multi-GPU code, so seven GPUs could sit unused.
- Four CPU cores may be unable to feed an image or audio pipeline fast enough.
- 16 GB of system RAM may still be too small.
- No storage requirement has been checked.
- The 72-hour GPU request exceeds ICE's ordinary 16-hour GPU wall-time limit. Eight GPUs would also exceed the 16 GPU-hour limit unless the wall time were no more than two hours.

Over-requesting one resource does not compensate for under-requesting another.

### What under-requesting costs

- Too few CPU cores can leave an expensive GPU idle.
- Too little GPU VRAM can stop the program before the first batch completes.
- Too little RAM can terminate a long-running job without a useful application error.
- Too little storage can make the final checkpoint fail even after training succeeds.

### What over-requesting costs

- Slurm has fewer nodes on which it can place the job.
- Queue time can increase.
- Reserved resources may sit unused.
- Other researchers cannot use those resources while your job holds them.

The goal is not the smallest possible request. The goal is a request with enough headroom that does not reserve resources the program cannot use.

---

## Estimate, measure, then add headroom

A good first pass looks like this:

1. **Start with the matching workload recipe.** It gives you a reasonable first estimate.
2. **Profile a small representative run.** Try one batch or about 1,000 samples in an interactive session.
3. **Record peak use.** Measure CPU, GPU VRAM, RAM, storage growth, and elapsed time.
4. **Add approximately 20% headroom.** Do not copy the largest node configuration.
5. **Round to a practical request.** Choose the smallest hardware tier that fits.

Aim to use roughly 70–90% of the resources you reserve. Treat 20% as a starting rule, not a guarantee: workloads with irregular spikes may require more testing.

### A quick example

A small image-training run produces these peak measurements:

| Resource | Measured peak | With about 20% headroom | Initial request or plan |
|---|---:|---:|---:|
| CPU | 11 cores | 13.2 cores | 16 cores |
| GPU VRAM | 12 GB | 14.4 GB | One 16 GB GPU |
| System RAM | 38 GB | 45.6 GB | 48 GB |
| Storage | 310 GB | 372 GB | At least 400 GB available |

That estimate becomes:

```bash
#SBATCH --gres=gpu:V100:1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=16
#SBATCH --mem=48G
#SBATCH --tmp=400G
```

ICE currently provides each student with a 30 GB home quota and a 300 GB scratch quota. This 400 GB example will not fit in either default allocation. It would need a course shared directory, an approved scratch-quota increase, or enough temporary local storage on the compute node. The `--tmp=400G` line reserves local disk for the job, and the files are accessed through `$TMPDIR`. Local files are erased when the job ends, so copy final results back to persistent storage before completion.

---

## One more number: wall time

Wall time is not one of the four capacity numbers, but your job request should still include a time limit:

```bash
#SBATCH --time=12:00:00
```

If the time is too short, Slurm stops the job when the limit is reached. A needlessly long limit can make the job harder to schedule. Ordinary ICE jobs are currently limited to 18 hours for CPU jobs and 16 hours for GPU jobs. Each job is also limited to 512 CPU-hours or 16 GPU-hours. For example, a request for four GPUs can run for at most four hours. Estimate wall time from a small run, add reasonable headroom, and save checkpoints so work can resume.

---

## Your pre-submission worksheet

Complete this before writing the final job script:

| Question | Your answer |
|---|---|
| How many CPU cores can the program use? | |
| How much GPU VRAM does the peak workload need? Use `0 GB` for a CPU-only job. | |
| How much system RAM does the peak workload need? | |
| How much storage is needed for inputs, temporary files, caches, logs, and checkpoints? | |
| What wall time did the small run suggest? | |
| What evidence supports these estimates: a recipe, a profile, or both? | |

> **Rule to remember:** Profile small → record peak usage → add headroom → request the smallest resource tier that fits.

> **PACE note:** ICE hardware, quotas, limits, and Slurm options can change. This guide was verified against the official PACE documentation on July 31, 2026. Check [Using Slurm on ICE](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0042096) and [Storage on ICE](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0042094) before submitting a large job.

---

## Next step

Continue to **Finding Your Sizing Recipe** to turn the four-number framework into a first estimate for your workload.
