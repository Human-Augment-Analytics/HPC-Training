---
title: "301 - Storage on ICE"
---

# 301 - Storage on ICE

Storage is an essential part of running research workloads on PACE ICE. Researchers use storage to save datasets, scripts, model checkpoints, software environments, and job outputs. When storage is shared across a research group, one researcher's files can affect the amount of space available to others.

## Understanding Storage on ICE

Storage refers to the disk space available for saving files and research data. Unlike system RAM or GPU VRAM, which are used while programs execute, disk storage retains files between computing sessions.

Research workloads may require storage for:

- **Datasets:** Input data used for training, analysis, or simulations.
- **Model checkpoints:** Saved model states used to resume training.
- **Job outputs:** Results, logs, and generated files from Slurm jobs.
- **Software environments:** Installed packages, dependencies, and research tools.
- **Temporary files:** Intermediate results produced during computations.

### Shared Storage vs. Individual Storage

Some storage locations are assigned to individual users, while others may be shared among members of a research group.

| Storage Type | Description |
| --- | --- |
| Individual storage | Space associated with a researcher's account, typically used for personal scripts, configuration files, and smaller datasets |
| Shared project storage | Space available to multiple researchers working under the same project or account |
| Temporary or scratch storage | Space intended for intermediate files and temporary computations, where available |

>**Important:** Storage locations, quotas, retention policies, and backup arrangements depend on the ICE configuration. Refer to the official PACE Storage Guide for current details.

### How Shared Storage Works

When multiple researchers use the same project storage allocation, their files contribute to the same overall storage usage.

For example, consider a research group with 4 TB of shared storage:

| Project | Storage Used |
| --- | ---: |
| Project A | 1.1 TB |
| Project B | 0.9 TB |
| Project C | 0.8 TB |
| Other projects and files | 1.1 TB |
| **Total** | **3.9 TB** |

In this example, the research group is using approximately 97.5% of its allocated storage.

Even if an individual researcher uses only a small amount of storage, their job may still be affected when the shared storage allocation approaches its limit.


# Why Storage Management Matters

Storage availability directly affects the ability to execute research workloads and save results.

When a storage allocation reaches its limit, researchers may encounter:

- Failed jobs that cannot write output files.
- Interrupted model training when checkpoints cannot be saved.
- Errors when creating new files or directories.
- Failed dataset uploads or downloads.
- Inability to install packages or update software environments stored on the full filesystem.

These issues may occur even when sufficient CPU, GPU, and RAM resources are available.

## Example: HAAG Shared Storage

A HAAG storage audit identified a shared storage path using approximately **3.9 TB of a 4.0 TB allocation**, with one project directory alone occupying **1.1 TB**.

This example demonstrates how a small number of large project directories can consume a significant portion of a group's available storage.

At this level of utilization, the remaining capacity is limited, increasing the risk of storage-related job failures.

> **Note:** These figures represent a storage audit example, not a live measurement. Actual utilization should be checked using the most recent storage audit.

## Common Causes of High Storage Usage

| Cause | Description | Recommended Action |
| --- | --- | --- |
| Large datasets | Multiple datasets or copies consume significant space | Identify duplicate or unused copies |
| Model checkpoints | Training jobs save many checkpoint versions | Establish a checkpoint retention policy |
| Job logs | Repeated Slurm jobs generate output and error logs | Review and archive or remove unnecessary logs |
| Temporary files | Intermediate results remain after jobs finish | Remove files confirmed to be unnecessary |
| Software environments | Multiple environments contain overlapping dependencies | Review and remove unused environments |
| Inactive projects | Completed projects retain large directories | Coordinate archival or cleanup with project owners |

# Checking Your Storage Usage

Researchers should periodically check storage usage to understand how much space their projects consume.

The following commands provide basic information about files and directories.

## Step 1: Connect to ICE

Log in to ICE using SSH or Open OnDemand, following the instructions in Module 100.

## Step 2: Check Your Current Directory

Run:

```bash
pwd
```

This command displays the full path of your current working directory.

You can also list the files and directories in your current location:

```bash
ls -lh
```

The `-l` option displays detailed file information, while `-h` makes file sizes easier to read.

## Step 3: Check Directory Size

Run:

```bash
du -sh .
```

This displays the total disk space used by your current directory.

- `du` reports disk usage.
- `-s` summarizes the total.
- `-h` displays sizes in human-readable units.

To inspect an individual directory:

```bash
du -sh /path/to/project
```

Replace `/path/to/project` with the directory you want to examine.

> **Note:** Running `du` on large shared directories can take time and generate filesystem activity. Avoid repeatedly scanning entire shared storage paths. Use the storage auditing procedure in Module 302 for group-wide assessments.

## Step 4: Check Your Storage Quota

PACE documentation describes a quota utility for checking storage utilization.

Run:

```bash
pace-quota
```

If this utility is available in your ICE environment, it can report quota information associated with your account.

The exact output and supported storage locations may depend on the current PACE configuration.

For detailed storage auditing and identifying large project directories, continue to [302 - Auditing Your Storage Usage](../302%20-%20Auditing%20Your%20Storage%20Usage/302%20-%20Auditing%20Your%20Storage%20Usage.md).

# Managing Storage Efficiently

Storage management involves identifying unnecessary files, avoiding redundant copies, and planning for future storage needs.

## 1. Estimate Storage Before Starting a Project

Before running a large experiment, consider:

- How large is the input dataset?
- How many checkpoint files will be generated?
- How frequently will checkpoints be saved?
- How much output will each job produce?
- Will multiple experiments retain separate copies of the same data?

For example, a training experiment that saves a 10 GB checkpoint every epoch for 50 epochs could generate approximately 500 GB of checkpoint data.

Planning checkpoint frequency and retention before starting the experiment can prevent unnecessary storage growth.

## 2. Identify Unnecessary Files

Review project directories for files that are no longer required.

Potential candidates include:

- Duplicate datasets.
- Old checkpoints that are no longer needed.
- Temporary output files from completed experiments.
- Outdated software environments.
- Logs from completed or failed jobs that have already been reviewed.

Always confirm that files are no longer needed before removing them.

## 3. Coordinate Cleanup of Shared Directories

Shared project directories may contain files belonging to multiple researchers.

Before deleting or moving shared research data:

1. Identify the project or file owner.
2. Confirm whether the files are still needed.
3. Check whether archival or backup is required.
4. Obtain permission before removing files.
5. Document significant cleanup changes when appropriate.

**Important:** Never delete another researcher's files without authorization.

## 4. Avoid Unnecessary Data Duplication

Large datasets should not be duplicated across project directories unless required for the research workflow.

When appropriate, researchers can reference a shared dataset rather than maintaining multiple independent copies.

This reduces storage consumption and helps maintain consistency across experiments.

## 5. Monitor Storage Regularly

Storage requirements change as research progresses.

Projects that initially require little storage may grow significantly as more experiments, datasets, and checkpoints are generated.

Regular monitoring helps identify storage problems before they affect running jobs.

See [302 - Auditing Your Storage Usage](../302%20-%20Auditing%20Your%20Storage%20Usage/302%20-%20Auditing%20Your%20Storage%20Usage.md) for the storage auditing workflow.

# Troubleshooting Common Storage Issues

| Issue | Possible Cause | Recommended Action |
| --- | --- | --- |
| `No space left on device` | Filesystem or storage allocation is full | Check usage and quota information |
| `Disk quota exceeded` | User or project has reached a quota limit | Review quota reports and contact the storage administrator |
| Job cannot save output | Storage capacity or permissions may prevent writing | Check the output path, quota, and permissions |
| Dataset upload fails | Insufficient space or transfer interruption | Verify available capacity and retry using an approved transfer method |
| Directory is unexpectedly large | Checkpoints, temporary files, or duplicate datasets | Inspect project storage usage |
| Permission denied | Insufficient access to the target directory | Verify permissions and contact the directory owner |

If a storage-related problem persists after checking usage and permissions, consult Module 305 for support resources.

# Best Practices for Storage on ICE

When using shared storage on an HPC cluster, follow these practices:

**1. Treat storage as a limited resource.** Estimate how much space an experiment will require before generating large datasets or outputs.

**2. Monitor usage periodically.** Check quota information and project storage consumption rather than assuming sufficient space is available.

**3. Manage model checkpoints.** Retain checkpoints needed for reproducibility or recovery and review older versions according to project policies.

**4. Avoid duplicate datasets.** Reuse approved shared copies of data whenever practical.

**5. Organize project directories.** Use clear directory structures and file names to distinguish datasets, scripts, logs, and outputs.

**6. Clean up completed projects.** Review inactive project files and coordinate archival or deletion with the appropriate project owners.

**7. Respect shared storage.** Remember that excessive storage usage can affect other researchers using the same allocation.

**8. Ask for help when necessary.** Contact your research supervisor or PACE support if storage limits or permissions prevent your work from continuing.

# Further Reading

- [PACE Storage Guide (ICE) - KB0042094](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0042094) — official reference for storage allocations, quotas, and policies.
- [302 - Auditing Your Storage Usage](../302%20-%20Auditing%20Your%20Storage%20Usage/302%20-%20Auditing%20Your%20Storage%20Usage.md) — learn how to inspect storage usage and interpret audit results.
- [305 - Getting Help](../305%20-%20Getting%20Help/305%20-%20Getting%20Help.md) — find the appropriate support resources for unresolved issues.
