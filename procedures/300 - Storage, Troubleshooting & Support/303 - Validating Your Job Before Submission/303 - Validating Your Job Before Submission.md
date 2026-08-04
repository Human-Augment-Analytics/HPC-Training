# 303 — Validating Your Job Before Submission

**Type:** Markdown Reference
**Source:** [PACE Job Submission Validator — Zach Wallace](https://github.com/Human-Augment-Analytics/admin-high-performance-computing/tree/main/HPC_Job_Submission)

---

## What this is

Zach Wallace built a command-line tool that checks a Slurm job script for common mistakes **before** you submit it — catching problems that would otherwise only show up after the job fails and you're digging through logs to figure out why. It checks five things:

- **Resource requests** — memory, CPUs, GPUs, and wall time are defined and reasonable for the job
- **Parameter configuration** — partition names, QoS settings, account, and job naming are valid
- **Output/error file setup** — log files are configured so debugging is actually possible
- **Environment setup** — module loads and required environment variables are present
- **Script structure** — shebang line, no duplicate directives, an actual executable command exists

Every issue it flags comes with a plain-language explanation and a concrete fix — not just "this is wrong."

## Who this is for

- You just wrote your first Slurm script and want to sanity-check it before submitting for the first time.
- Your jobs keep failing and you want a fast way to find out why, without digging through documentation line by line.
- You're picking a project back up after time away and want a quick check before diving back in.
- You're a project lead reviewing a teammate's script before approving it.

## How to run it

```bash
git clone https://github.com/Human-Augment-Analytics/admin-high-performance-computing.git
cd admin-high-performance-computing/HPC_Job_Submission

# Validate a single script
python3 pace_validator.py your_job.sh

# Validate multiple scripts at once
python3 pace_validator.py *.sh

# Treat warnings as errors
python3 pace_validator.py your_job.sh --strict
```

Requires Python 3.10+. Check your version with `python3 --version`, or load it on ICE with `module load python/3.10` if needed.

## Reading the output

Issues come back labeled by severity:

- **ERROR** — will cause the job to fail. Must be fixed before submitting.
- **WARNING** — should be reviewed and resolved unless you have a specific reason to proceed anyway.
- **INFO** — best-practice suggestions that won't block submission.

Fix what's flagged, rerun the validator, and submit once it reports clean.

## Integration & enforcement

Two ways this is meant to get used beyond a one-off check:

- **New-member onboarding** — run alongside initial PACE account setup, so validating a script becomes a standard step from day one rather than something people discover after their first failure.
- **Project lead review** — leads reviewing teammates' scripts run the validator as part of approving a submission, not just the author.

The tool also supports `--exit-code` (non-zero exit on failure), which means it can be wired into a CI/CD or pre-commit hook for teams that want this enforced automatically rather than manually.

## Related

- [Validator source, examples, and full docs (GitHub)](https://github.com/Human-Augment-Analytics/admin-high-performance-computing/tree/main/HPC_Job_Submission)
- [201 — Submitting Your First Job](../200%20-%20Running%20Your%20First%20Job/201%20-%20Submitting%20Your%20First%20Job.md) *(run the validator before this step)*

---

*Note: the source doc's own clone instructions point at a subdirectory tree URL, which git can't clone directly. The command above clones the full repo and `cd`s into the right folder — the corrected version to use.*
