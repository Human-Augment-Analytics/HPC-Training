---
title: "302 - Validating Your Job Before Submission"
---
# 302 — Auditing Your Storage Usage

Monitoring storage usage is an important part of managing research workloads on PACE ICE. Because storage allocations may be shared across multiple projects, researchers need to understand how much space their files consume and identify potential storage issues before they affect running jobs.

HAAG uses a Python-based storage auditing tool developed by Justin Yiu to monitor shared storage utilization.

This module explains how the storage auditing tool works, how to interpret its reports, and how to run a storage audit using Slurm.

## Why Audit Storage Usage?

A storage audit examines how disk space is being used across a directory or shared storage allocation.

Auditing storage helps researchers:

- **Monitor storage capacity:** Understand how much of an allocation is currently being used.
- **Identify large projects:** Determine which directories consume the most space.
- **Detect inactive projects:** Identify directories that may no longer be actively maintained.
- **Prevent storage-related failures:** Recognize when available capacity is becoming limited.
- **Support storage cleanup:** Provide information for deciding which files or projects may need to be archived or reviewed.

Regular audits help research groups manage storage efficiently and reduce the risk of unexpected capacity problems.

# Understanding the HAAG Storage Audit Tool

HAAG's storage auditing tool is a Python script called `storage_audit_script.py`.

The script examines a specified storage path and generates a report summarizing storage utilization.

## What Does the Audit Report Include?

The audit reports three main categories of information.

| Report Component | Description |
| --- | --- |
| Overall storage summary | Total storage capacity and current usage |
| Project directory breakdown | Storage consumed by each top-level project folder |
| Last modified date | Most recent modification timestamp reported for each project directory |

### 1. Overall Storage Summary

The overall summary provides an overview of how much storage is being used.

For example, a previous HAAG storage report showed:

| Metric | Value |
| --- | ---: |
| Total allocation | 4.0 TB |
| Storage used | 3.9 TB |
| Storage utilization | Approximately 97% |
| Largest project directory | Over 1 TB |

These values demonstrate how quickly shared storage can approach its capacity limit.

>**Note:** This is an example from a previous audit, not a live measurement of current HAAG storage utilization.

### 2. Project Directory Breakdown

The audit reports the storage consumed by each top-level project directory.

This helps researchers identify which projects contribute most to overall storage usage.

Large directories may contain:

- Research datasets.
- Model training checkpoints.
- Experimental outputs.
- Software environments.
- Temporary or duplicate files.

A large directory does not necessarily indicate a problem. Some research workloads legitimately require substantial storage.

The goal is to identify directories that may benefit from further review.

### 3. Last Modified Date

The audit also reports modification timestamps associated with project directories.

These timestamps can help identify projects that may no longer be actively maintained.

However, a directory's last modified date does not always represent the most recent activity within all of its files.

>**Important:** Modification timestamps should be treated as indicators for further investigation, not definitive evidence that a project is inactive.

# How the Storage Audit Works

The HAAG storage auditing workflow uses Python and Slurm to generate reports on shared storage usage.

| Component | Purpose |
| --- | --- |
| `storage_audit_script.py` | Analyzes storage usage and generates the audit report |
| `run_storage_audit_once.sbatch` | Submits the audit process as a Slurm batch job |
| `ice-cpu` | CPU partition used for the audit job |
| `storage_audit_report_YYYYMMDD.txt` | Dated report containing storage audit results |
| Email notification | Distributes the report to configured recipients |

## Why Use Slurm for Storage Auditing?

Storage auditing can involve examining large numbers of directories and files.

Running a comprehensive scan directly on a login node may place unnecessary load on shared system resources.

Instead, HAAG runs the auditing script through Slurm using the `ice-cpu` partition.

This allows the audit to execute as a scheduled compute workload rather than performing the entire scan interactively on a login node.

# Running Your First Storage Audit

Researchers who have access to the HAAG administration repository can use the auditing scripts to examine storage utilization.

Before proceeding, confirm that you have permission to access the repository and audit the target storage directory.

## Step 1: Connect to ICE

Log in to PACE ICE through SSH or Open OnDemand using the instructions in Module 100.

## Step 2: Clone the HAAG Repository

Run:

```bash
git clone https://github.com/Human-Augment-Analytics/admin-high-performance-computing.git
```

This downloads the repository containing the storage auditing workflow.

If the repository is private, you must have the appropriate GitHub permissions.

Navigate to the storage auditing directory:

```bash
cd admin-high-performance-computing/HPC_Storage_Audit
```

## Step 3: Locate the Audit Files

List the files in the current directory:

```bash
ls -lh
```

Identify the two primary files:

- `storage_audit_script.py`
- `run_storage_audit_once.sbatch`

The Python script performs the storage analysis, while the Slurm script controls how the audit is submitted to ICE.

## Step 4: Review the Configuration

Before submitting the audit, inspect the Slurm script:

```bash
cat run_storage_audit_once.sbatch
```

Review the script to identify:

- The storage directory being audited.
- The Slurm partition and requested resources.
- The Python script being executed.
- The output report location.
- Any configured email recipients.

>**Important:** The supplied HAAG workflow includes automatic email reporting. Confirm that the target directory and recipient list are appropriate before running it.

If any paths or email addresses need to be changed, follow the repository's configuration instructions or consult the repository maintainer.

## Step 5: Submit the Audit Job

Once the configuration has been reviewed, submit the job:

```bash
sbatch run_storage_audit_once.sbatch
```

Slurm will return a job ID if the submission is successful.

For example:

```text
Submitted batch job 123456
```

The job ID can be used to monitor the auditing process.

## Step 6: Monitor the Job

Run:

```bash
squeue -u $USER
```

This displays your jobs that are pending or currently running.

Common Slurm job states include:

| State | Meaning |
| --- | --- |
| `PD` | Pending — waiting for resources |
| `R` | Running — job is executing |
| `CG` | Completing — job is finishing |

Once the job disappears from `squeue`, it may have completed or terminated.

To inspect its final status, use:

```bash
sacct -j JOB_ID --format=JobID,State,ExitCode
```

Replace `JOB_ID` with the ID returned by `sbatch`.

A `COMPLETED` status with an exit code of `0:0` generally indicates that the job finished successfully.

## Step 7: Review the Audit Report

After the audit finishes, locate the generated report.

The HAAG workflow uses the naming pattern:

```text
storage_audit_report_YYYYMMDD.txt
```

Here, `YYYYMMDD` represents the report date.

For example:

```text
storage_audit_report_20261102.txt
```

The report is written to the configured target directory. Its exact location depends on the audit script configuration.

Once you locate the report, display it using:

```bash
cat storage_audit_report_YYYYMMDD.txt
```

Replace the filename with the actual generated report.

For longer reports, use:

```bash
less storage_audit_report_YYYYMMDD.txt
```

This lets you scroll through the report.

The configured recipients should also receive an email containing the audit results when the workflow completes successfully.

# Understanding Your Audit Results

After generating a storage audit, review the report to determine whether any directories require attention.

## Step 1: Examine Overall Utilization

Start by comparing total storage usage against the available allocation.

A storage path approaching its capacity limit may require additional monitoring or cleanup.

Pay particular attention to whether the remaining capacity is sufficient for upcoming experiments.

## Step 2: Identify Large Project Directories

Review the project directory breakdown.

Ask:

- Which directories consume the most space?
- Are these storage requirements expected?
- Do any projects contain unnecessary copies of datasets?
- Are large checkpoint folders still needed?

Large directories should be investigated before cleanup decisions are made.

## Step 3: Review Modification Dates

Modification timestamps can help identify potentially inactive directories.

For example, a project folder that has not been modified recently may be a candidate for archival review.

However, always confirm project status with the owner before taking action.

## Step 4: Determine Whether Action Is Needed

Based on the audit results, researchers may decide to:

- Continue monitoring current usage.
- Review unexpectedly large directories.
- Remove unnecessary files with appropriate permission.
- Archive completed research projects.
- Contact a project owner about inactive data.
- Request guidance from the research supervisor or storage administrator.

# HAAG's Storage Monitoring Workflow

HAAG uses the storage auditing tool as part of its ongoing HPC storage monitoring.

The report is distributed **biweekly** to:

- Bree Shi — Director of HAAG.
- Charlie Chark — Head TA.

This provides regular visibility into storage usage across shared research projects.

Individual researchers do not currently need to run the audit as part of the standard reporting process, but authorized researchers can use the available scripts to examine their own project's storage footprint.

# Storage Auditing and Project Lifecycle Management

Storage auditing also supports HAAG's proposed storage sanitation initiative.

The purpose of this initiative is to identify inactive or unnecessary research data and encourage responsible storage management.

## Identifying Inactive Projects

An initial lifecycle policy proposal identifies project directories that have not been modified in **18 months or longer** as candidates for review.

Under this proposal, project owners would be notified and asked to determine whether the data should be:

1. Retained for ongoing research.
2. Archived or backed up for future reference.
3. Removed if no longer needed.

This is a proposed policy, not an automatic deletion rule.

**Important:** Storage audits identify potential cleanup candidates. They should not automatically delete files based only on directory size or modification date.

Project ownership, research requirements, and data retention policies must be considered before any files are removed.

# Troubleshooting Common Audit Issues

| Issue | Possible Cause | Recommended Action |
| --- | --- | --- |
| `sbatch: command not found` | Slurm commands are unavailable in the current environment | Confirm that you are connected to ICE |
| Job remains pending | Requested computing resources are not yet available | Check the pending reason using Slurm |
| Permission denied | Insufficient access to the target storage directory | Verify permissions and contact the administrator |
| Report not generated | Job failed or output configuration is incorrect | Inspect the Slurm job status and error logs |
| Report shows unexpected values | Target path or reported storage information may need review | Verify the audit configuration and compare with quota information |
| Email not received | Recipient configuration or email delivery may have failed | Review the configured recipients and job logs |
| Audit runs slowly | Large directories or file counts require additional scanning time | Avoid unnecessary repeated scans and consult the repository maintainer |

If an issue persists, consult the repository documentation or seek assistance from the HAAG administration team.

# Best Practices for Storage Auditing

When auditing storage on a shared HPC cluster, follow these practices:

**1. Monitor storage regularly.** Review audit reports to identify unexpected changes in utilization.

**2. Verify the target directory.** Confirm that the auditing script examines the intended storage path before submitting a job.

**3. Respect file permissions.** Only audit directories and files you are authorized to access.

**4. Investigate large directories.** A large storage footprint may be justified by research requirements, so review before taking action.

**5. Coordinate cleanup with project owners.** Do not delete shared files without permission.

**6. Use modification dates carefully.** Timestamps provide useful context but do not always indicate whether research is active.

**7. Avoid unnecessary repeated audits.** Large filesystem scans consume shared resources and should be scheduled responsibly.

**8. Document storage decisions.** Maintain records of important archival or cleanup actions when appropriate.

# Further Reading

- [301 — Storage on ICE](../301%20-%20Storage%20on%20ICE/301%20-%20Storage%20on%20ICE.md) — understand how shared storage works and why storage management matters.
- [HAAG Storage Audit Source (GitHub)](https://github.com/Human-Augment-Analytics/admin-high-performance-computing/tree/main/HPC_Storage_Audit) — access the auditing scripts and repository.
- [PACE Storage Guide (ICE) — KB0042094](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0042094) — review official storage information and policies.
- [305 — Getting Help](../305%20-%20Getting%20Help/305%20-%20Getting%20Help.md) — learn how to report unresolved storage or system issues.
