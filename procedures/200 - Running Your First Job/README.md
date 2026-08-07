# 200 - Running Your First Job

This module walks through the full first-job process, from deciding what resources to request to checking that the job finished correctly. It is meant for researchers who can already log into ICE but are not yet comfortable writing and submitting a Slurm job.

**Status at the end of the semester:** Complete as a written module and tested by the authors. It has not yet been tested with a new HAAG researcher working independently.

## In this module

1. [201 - The Four Numbers Before You Submit](201%20-%20The%20Four%20Numbers%20Before%20You%20Submit/201%20-%20The%20Four%20Numbers%20Before%20You%20Submit.md) - estimate CPU cores, GPU VRAM, system RAM, storage, and wall time.
2. [202 - Finding Your Sizing Recipe](202%20-%20Finding%20Your%20Sizing%20Recipe/202%20-%20Finding%20Your%20Sizing%20Recipe.md) - choose a starting point based on the type of workload you plan to run.
3. [203 - Choosing Your GPU](203%20-%20Choosing%20Your%20GPU/203%20-%20Choosing%20Your%20GPU.md) - select the smallest compatible GPU that fits the job.
4. [204 - Using the VRAM Calculator](204%20-%20Using%20the%20VRAM%20Calculator/204%20-%20Using%20the%20VRAM%20Calculator.md) - estimate GPU memory for LLM inference and understand the calculator's limits.
5. [205 - Submitting Your First Job](205%20-%20Submitting%20Your%20First%20Job/205%20-%20Submitting%20Your%20First%20Job.md) - create a Slurm script, submit it, monitor it, and check the output. A shorter [command reference](205%20-%20Submitting%20Your%20First%20Job/205%20-%20Submitting%20Your%20First%20Job%20-%20Command%20Reference.md) is also available.
6. [206 - Further Reading](206%20-%20Further%20Reading/206%20-%20Further%20Reading.md) - continue into environments, file transfers, interactive jobs, job arrays, and troubleshooting.

## By the end of this module

A researcher should be able to explain the resources their job needs, choose an appropriate CPU or GPU setup, submit the job with `sbatch`, monitor it with `squeue`, and confirm that the expected output file was created. The next step is to test whether a first-time learner can complete all of this without help.

## Contributors

- Pranav Angadi - led and wrote Module 200, reviewed the technical details, and created and tested the Procedure 205 walkthrough.
- Ahsan Subzwari - shared the earlier HAAG compute-sizing work and VRAM calculator used as references in Procedures 201-204.
- Charlie Chark - gave the team its first PACE/ICE job-submission demonstration.
