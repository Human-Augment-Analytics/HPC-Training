# Submitting Your First Job

This guide shows how to submit a small CPU job on PACE ICE, check its status, and read its output.

<!-- Add the published Scribe link or embed here. -->

## 1. Create a working folder

In your ICE terminal, run:

```bash
mkdir -p ~/first-job-demo
cd ~/first-job-demo
```

## 2. Create the job script

Open a new file:

```bash
nano first-job.slurm
```

Paste this script into Nano:

```bash
#!/bin/bash

#SBATCH --job-name=first-job
#SBATCH --output=first-job-%j.out
#SBATCH --time=00:05:00
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --mem=1G

echo "Hello from PACE ICE!"
echo "Job ID: $SLURM_JOB_ID"
echo "Running on: $(hostname)"
echo "Started at: $(date)"

sleep 60

echo "Finished at: $(date)"
echo "Your first Slurm job completed successfully."
```

Save the file:

1. Press `Control+O`.
2. Press `Enter`.
3. Press `Control+X`.

On a Mac, use the Control key, not the Command key.

## 3. Check the script

Display the file to make sure it was saved correctly:

```bash
cat first-job.slurm
```

## 4. Submit the job

Submit the script to Slurm:

```bash
sbatch first-job.slurm
```

You should see a message similar to:

```text
Submitted batch job 12345678
```

Your number will be different. This number is your job ID.

## 5. Check the job

Show your pending and running jobs:

```bash
squeue -u "$USER"
```

In the `ST` column:

- `PD` means the job is waiting to run.
- `R` means the job is running.

You can also check one job by replacing `YOUR_JOB_ID` with your job ID:

```bash
squeue -j YOUR_JOB_ID
```

Wait about one minute and check again. If the job no longer appears, it has left the queue.

## 6. Find the output file

List the files in the folder:

```bash
ls -lh
```

You should see a file similar to:

```text
first-job-12345678.out
```

The number in the filename is the job ID.

## 7. Read the output

Replace `YOUR_JOB_ID` with your job ID:

```bash
cat first-job-YOUR_JOB_ID.out
```

A successful job should end with:

```text
Your first Slurm job completed successfully.
```

The output also shows the job ID, compute-node name, and start and finish times.

## Commands used in this guide

```bash
mkdir -p ~/first-job-demo
cd ~/first-job-demo
nano first-job.slurm
cat first-job.slurm
sbatch first-job.slurm
squeue -u "$USER"
squeue -j YOUR_JOB_ID
ls -lh
cat first-job-YOUR_JOB_ID.out
```

> Run compute jobs through Slurm. Do not run them directly on an ICE login node. PACE instructions can change, so check [Using Slurm on ICE](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0042096) when needed.
