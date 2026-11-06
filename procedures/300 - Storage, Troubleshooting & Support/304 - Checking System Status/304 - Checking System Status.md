---
title: "304 - Checking System Status"
---

# 304 - Checking System Status

Before troubleshooting a failed or delayed job on PACE ICE, it is important to determine whether the issue is related to your job or the cluster itself.

PACE provides system status information through Georgia Tech's Office of Information Technology (OIT), allowing researchers to check for service disruptions, outages, and scheduled maintenance.

This module explains how to check PACE system status, interpret service notifications, and determine when to troubleshoot your own job or seek additional support.

## Why Check System Status?

High-performance computing clusters support many researchers and computational workloads simultaneously. Occasionally, system maintenance, outages, or infrastructure issues may affect job execution.

Checking system status helps researchers:

- **Identify cluster outages:** Determine whether ICE is experiencing a known service disruption.
- **Avoid unnecessary debugging:** Recognize when a problem may be unrelated to a Slurm script.
- **Plan job submissions:** Check for scheduled maintenance before submitting time-sensitive workloads.
- **Understand unexpected failures:** Determine whether interrupted jobs may be associated with cluster incidents.
- **Save troubleshooting time:** Identify known system-wide problems before investigating individual configurations.

A failed job does not always indicate a problem with the script itself.

# Where to Check PACE System Status

PACE and Georgia Tech OIT provide online resources for checking the operational status of computing services.

| Resource | Description |
| --- | --- |
| [PACE System Status](https://pace.gatech.edu/system-status/) | PACE's system status information |
| [Georgia Tech OIT Status](https://status.gatech.edu/) | Campus-wide IT status dashboard with PACE service information, incidents, and maintenance updates |

The Georgia Tech OIT status dashboard provides status information for individual PACE services, including the ICE cluster.

## Understanding System Status Indicators

Status dashboards use indicators to communicate the current condition of a service.

| Status | Meaning | Recommended Action |
| --- | --- | --- |
| Operational | Service is reported to be functioning normally | Continue with normal troubleshooting if your job fails |
| Partial Service Disruption | Some functionality may be unavailable or degraded | Read the incident details to determine whether your workflow is affected |
| Service Disruption | The service is experiencing an outage or significant interruption | Follow official updates before retrying affected operations |
| Scheduled Maintenance | Planned work may temporarily affect availability | Review the maintenance window before submitting jobs |

>**Important:** An operational status does not guarantee that every individual job will succeed. Script errors, resource limits, permissions, and software configuration issues may still cause failures.

# How to Check PACE System Status

Follow these steps when you encounter unexpected job failures, connection problems, or unusual cluster behavior.

## Step 1: Open the PACE Status Page

Visit:

[PACE System Status](https://pace.gatech.edu/system-status/)

Review the available status information for PACE computing services.

Check whether the system is reported as operational or experiencing a disruption.

## Step 2: Check Georgia Tech OIT Status

For more detailed information, visit:

[Georgia Tech OIT Service Status](https://status.gatech.edu/)

Locate the **PACE** service category.

The dashboard may display the status of individual services such as:

- ICE Cluster.
- Phoenix Cluster.
- Firebird Cluster.
- Globus Endpoints.
- Related storage or infrastructure services.

Pay particular attention to the **ICE Cluster** status when troubleshooting ICE workloads.

## Step 3: Review Active Incidents

If an incident is reported, open the incident details.

Look for the following information:

- Which systems or services are affected?
- When did the issue begin?
- What problems are users experiencing?
- Has the issue been identified or resolved?
- Are there updates or instructions from the PACE team?

Compare the reported symptoms with the problems you are experiencing.

For example, if an incident indicates that ICE login services are unavailable, failed SSH connections may be related to the outage rather than an issue with your credentials.

## Step 4: Check Scheduled Maintenance

Before submitting large or time-sensitive jobs, review any announced maintenance windows.

Maintenance may temporarily affect:

- Login access.
- Job scheduling or execution.
- Storage availability.
- File transfers.
- Access to compute nodes.

If maintenance is scheduled during your job's expected runtime, review the announcement and adjust your submission plans when necessary.

## Step 5: Determine Your Next Action

After reviewing the status information, decide how to proceed.

| Situation | Recommended Action |
| --- | --- |
| ICE is operational and your job fails | Review your Slurm script, resource requests, and error logs |
| ICE is experiencing a known outage | Read the incident updates and follow PACE guidance |
| Maintenance is scheduled | Plan submissions around the announced maintenance window |
| Multiple researchers report similar problems | Check active incidents and notify the appropriate support team if needed |
| No incident is reported, but problems persist | Gather troubleshooting details and seek support |

# When Should You Check System Status?

Checking system status is especially useful in the following situations.

## 1. Before Troubleshooting an Unexpected Job Failure

If a job fails without an obvious script or configuration error, check whether ICE is experiencing an incident.

This can help determine whether additional script debugging is necessary.

## 2. Before Submitting a Large Job

Long-running experiments may require several hours or days of computation.

Before submitting a resource-intensive workload, review scheduled maintenance announcements to reduce the risk of preventable interruptions.

## 3. When Multiple Researchers Experience Similar Issues

If several HAAG researchers report similar errors around the same time, the problem may be related to shared infrastructure rather than an individual script.

Examples include:

- Multiple users cannot connect to ICE.
- Jobs fail unexpectedly across different projects.
- Shared storage becomes temporarily inaccessible.
- Multiple users experience unusual delays or interruptions.

Check the status dashboard to determine whether a related incident has been reported.

## 4. When Cluster Access Is Unavailable

If you cannot access ICE through SSH or Open OnDemand, check system status before repeatedly attempting to reconnect.

An active service disruption may explain why login attempts are unsuccessful.

# Distinguishing Cluster Issues from Job Issues

Not every failed or delayed job is caused by a cluster outage.

Researchers should distinguish between system-wide problems and issues related to their own workloads.

| Symptom | Possible Cause | What to Check |
| --- | --- | --- |
| Cannot log in to ICE | Cluster outage, network issue, or authentication problem | System status and connection settings |
| Job remains pending | Resource availability, account limits, or scheduling restrictions | Slurm pending reason and system status |
| Job fails immediately | Script errors, missing dependencies, or resource configuration | Slurm output and error logs |
| Multiple jobs fail unexpectedly | Shared infrastructure issue or common configuration problem | System status and job logs |
| Files cannot be accessed | Storage disruption or file permissions | Storage status, quota, and permissions |
| Job stops during maintenance | Planned or unplanned infrastructure interruption | Maintenance announcements and Slurm job status |

>**Important:** A job remaining in the `PENDING` state does not necessarily indicate a system problem. Slurm may be waiting for the requested resources to become available.

# Checking Your Job Status with Slurm

If the official status dashboard indicates that ICE is operational, investigate your job using Slurm commands.

## Step 1: Check Your Job Queue

Run:

```bash
squeue -u $USER
```

This displays your pending and running Slurm jobs.

Common states include:

| State | Meaning |
| --- | --- |
| `PD` | Pending — waiting for resources |
| `R` | Running — job is executing |
| `CG` | Completing — job is finishing |

## Step 2: Check Why a Job Is Pending

Run:

```bash
squeue -j JOB_ID -o "%i %T %R"
```

Replace `JOB_ID` with your Slurm job ID.

The output displays the job ID, current state, and reason information.

For example, a pending reason of `Resources` generally indicates that the job is waiting for requested resources.

## Step 3: Check a Completed or Failed Job

Run:

```bash
sacct -j JOB_ID --format=JobID,State,ExitCode
```

This displays the recorded job state and exit code.

Common final states include:

| State | Meaning |
| --- | --- |
| `COMPLETED` | Job finished successfully according to Slurm |
| `FAILED` | Job ended with an error |
| `CANCELLED` | Job was cancelled |
| `TIMEOUT` | Job exceeded its requested wall time |
| `OUT_OF_MEMORY` | Job exceeded an applicable memory limit |

Review the corresponding Slurm output and error logs to investigate failures.

> **Note:** These commands require access to ICE and the Slurm environment. If login services are unavailable, check official status updates first.

# What to Do During a System Outage

If PACE reports an active incident affecting ICE, follow these practices:

**1. Read the incident details.** Confirm which services are affected and whether the reported problems match your experience.

**2. Follow PACE instructions.** Official announcements may contain guidance about login access, running jobs, or storage availability.

**3. Avoid unnecessary resubmissions.** Repeatedly submitting jobs during an unresolved incident may not resolve the underlying issue.

**4. Check for updates.** Review the status dashboard for changes in service availability.

**5. Verify your jobs afterward.** Once service is restored, confirm whether affected jobs completed, failed, or need to be resubmitted.

**6. Inspect output files.** A restored cluster does not guarantee that previously interrupted jobs produced complete results.

# Getting Notifications About System Issues

Georgia Tech's OIT status dashboard provides a subscription option for receiving status updates.

To subscribe:

1. Visit [status.gatech.edu](https://status.gatech.edu/).
2. Select **Subscribe**.
3. Choose the available notification method and relevant services, if supported.
4. Follow the instructions to complete the subscription.

Receiving notifications can help researchers stay informed about incidents and maintenance that may affect their experiments.

# Best Practices for Monitoring System Status

When working with PACE ICE, follow these practices:

**1. Check status before extensive debugging.** Rule out known system-wide problems before spending significant time troubleshooting.

**2. Review maintenance announcements.** Plan resource-intensive jobs around scheduled service interruptions when possible.

**3. Verify the affected service.** A disruption affecting one PACE service may not affect every cluster or workflow.

**4. Distinguish pending jobs from outages.** Resource contention and scheduling limits can delay jobs even when ICE is operational.

**5. Review Slurm logs.** Use job states, exit codes, and error messages to investigate individual failures.

**6. Coordinate with other researchers.** Similar problems reported by multiple users may indicate a shared infrastructure issue.

**7. Confirm successful recovery.** After an outage, verify job results and output files before continuing experiments.

**8. Seek support when needed.** Report persistent or unexplained issues with relevant job details and error messages.

# Further Reading

- [PACE System Status](https://pace.gatech.edu/system-status/) — PACE system availability information.
- [Georgia Tech OIT Service Status](https://status.gatech.edu/) — official incident and maintenance updates.
- [303 - Validating Your Job Before Submission](../303%20-%20Validating%20Your%20Job%20Before%20Submission/303%20-%20Validating%20Your%20Job%20Before%20Submission.md) — identify script and resource configuration errors before submitting a job.
- [305 - Getting Help](../305%20-%20Getting%20Help/305%20-%20Getting%20Help.md) — learn how to report unresolved issues and request assistance.
