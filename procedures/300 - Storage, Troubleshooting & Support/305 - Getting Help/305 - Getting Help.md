---
title: "305 - Getting Help"
---

# 305 - Getting Additional Help

When working with PACE ICE, researchers may encounter issues involving Slurm jobs, storage, software environments, resource allocations, or system access.

Although many problems can be resolved through troubleshooting, some require assistance from other researchers, teaching assistants, or PACE support staff.

This module explains where to find help, who to contact, and what information to provide when reporting an issue.

## Why Knowing Where to Get Help Matters

High-performance computing involves several interconnected systems, including computing resources, storage, software, and job scheduling.

When something goes wrong, identifying the appropriate support resource can help resolve the issue more efficiently.

Knowing where to get help allows researchers to:

- **Resolve common problems:** Learn from researchers who have encountered similar issues.
- **Avoid repeated troubleshooting:** Identify solutions that may already be documented.
- **Find specialized assistance:** Contact the appropriate support team for account or infrastructure problems.
- **Communicate issues effectively:** Provide the information needed to identify the cause of a problem.
- **Minimize interruptions:** Reduce time spent troubleshooting so research can continue.

# Where to Get Help

HAAG researchers have access to several support resources, ranging from internal peer assistance to official PACE support.

| Support Resource | Best For |
| --- | --- |
| HAAG `validated-pace-users` Slack channel | Common HPC questions, troubleshooting, and peer assistance |
| HAAG instructors, TAs, or research supervisors | Project-specific problems and issues requiring escalation |
| PACE documentation | Official instructions, policies, and technical references |
| PACE Support | Account, allocation, access, and infrastructure-related issues |
| PACE Virtual Consultations | Complex problems that benefit from interactive troubleshooting |

# Step 1: Ask in the HAAG Slack Channel

HAAG maintains a dedicated Slack channel called `validated-pace-users` for researchers working with PACE and HPC resources.

The channel provides a student-led peer-support environment where researchers can ask questions, share solutions, and discuss common technical issues.

## Why Use the Slack Channel?

The channel is intended to:

- Provide a centralized place for PACE-related questions.
- Prevent repeated questions from becoming scattered across general discussion channels.
- Allow researchers to learn from others with similar experiences.
- Encourage collaboration and knowledge sharing.
- Help resolve common issues before they require official support.

Examples of appropriate questions include:

- Why is my Slurm job remaining in the pending state?
- How do I request GPU resources?
- Why does my script produce an out-of-memory error?
- How can I check my storage usage?
- How do I load a software module on ICE?

## How to Join

Access to the channel requires completing HAAG's PACE validation process.

Refer to the repository instructions:

[HAAG Validated PACE Users Instructions](https://github.com/Human-Augment-Analytics/admin-high-performance-computing/blob/main/validated-pace-users-instruction.md)

Once you have completed the required preparation and received access, you can use the channel to ask questions and participate in troubleshooting discussions.

>**Important:** Avoid posting passwords, access tokens, private credentials, or sensitive research data in Slack.

# Step 2: Troubleshoot Before Escalating

Before requesting additional assistance, perform a few basic troubleshooting checks.

These steps can help determine whether the issue originates from your script, resource configuration, or the ICE environment.

## Check 1: Validate Your Slurm Script

Refer to:

[303 - Validating Your Job Before Submission](../303%20-%20Validating%20Your%20Job%20Before%20Submission/303%20-%20Validating%20Your%20Job%20Before%20Submission.md)

Check for:

- Incorrect Slurm directives.
- Missing account or partition information.
- Invalid resource requests.
- Incorrect file paths.
- Missing software dependencies.
- Script syntax errors.

Fixing these issues before requesting help can reduce unnecessary troubleshooting.

## Check 2: Review Your Job Status

If your job was submitted successfully but did not complete as expected, check its status.

Run:

```bash
squeue -u $USER
```

This displays your pending and running jobs.

For a completed or failed job, run:

```bash
sacct -j JOB_ID --format=JobID,State,ExitCode
```

Replace `JOB_ID` with the actual job ID.

Review the job state and exit code to identify possible problems.

## Check 3: Review Output and Error Logs

Slurm jobs often generate output files that contain program messages and error information.

For example, if your job produces an output file named `slurm-123456.out`, inspect it using:

```bash
less slurm-123456.out
```

Replace the example filename with your actual output file.

Look for error messages that indicate:

- Missing files or directories.
- Insufficient memory.
- Incorrect environment configuration.
- Failed software commands.
- Permission errors.

Save the relevant messages so they can be included in your support request.

## Check 4: Check PACE System Status

Visit:

[PACE System Status](https://pace.gatech.edu/system-status/)

Or:

[Georgia Tech OIT Status](https://status.gatech.edu/)

Determine whether ICE is experiencing a known outage or scheduled maintenance.

For additional guidance, see:

[304 - Checking System Status](../304%20-%20Checking%20System%20Status/304%20-%20Checking%20System%20Status.md)

If your issue matches an active incident, follow PACE's official guidance before retrying your workload.

# Step 3: Contact HAAG Staff or PACE Support

If the problem remains unresolved after basic troubleshooting, contact your instructor, TA, research supervisor, or the appropriate PACE support resource.

For ICE instructional users, PACE's published training materials describe a tiered support process in which students generally seek assistance from instructors or TAs, who can escalate issues to PACE when necessary.

## Contacting PACE Support

PACE lists the following support email address:

**pace-support@oit.gatech.edu**

PACE's User Experience team directs inquiries to the appropriate support staff.

Official support website:

[PACE User Support](https://pace.gatech.edu/user-support/)

PACE support may be appropriate for issues involving:

- Account access or authentication.
- Resource allocation restrictions.
- Cluster configuration problems.
- Storage access or quota issues.
- Infrastructure-related failures.
- Problems requiring administrative assistance.

**Important:** Follow your course or research group's support procedures before contacting PACE directly, particularly when working on the ICE instructional cluster.

# Step 4: Attend PACE Virtual Consultation Sessions

PACE also offers no-cost virtual consultation sessions for researchers who need additional technical assistance.

Consultations may be useful when a problem requires an interactive discussion rather than an email exchange.

## When Should You Attend?

Consider attending a consultation if you:

- Need help understanding a complicated Slurm error.
- Are unsure how to configure computing resources.
- Need guidance on software dependencies or environments.
- Encounter repeated job failures.
- Have questions about optimizing an HPC workflow.
- Need help interpreting unexpected computational behavior.

## How to Find Consultation Details

Visit:

[PACE Consultation Sessions — KB0042280](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0042280)

Review the current session schedule and connection instructions.

Consultation times may change, so check the official page before attending.

# How to Write an Effective Support Request

When contacting HAAG researchers, instructors, or PACE support, providing detailed information can make troubleshooting more efficient.

A support request should clearly explain what happened, what you expected to happen, and what you have already tried.

## What Information Should You Include?

| Information | Why It Matters |
| --- | --- |
| Description of the problem | Helps the support team understand the issue |
| Exact error message | Provides evidence of what went wrong |
| Commands executed | Helps reproduce the problem |
| Job ID | Allows the job to be identified |
| Script or program location | Identifies the relevant files |
| Resource configuration | Helps identify incorrect CPU, GPU, memory, or time requests |
| Troubleshooting attempts | Prevents repetition of steps already completed |
| Additional symptoms | Helps identify related issues |

## Example: Reporting a Failed Slurm Job

Suppose you submitted a Slurm job that failed unexpectedly.

Instead of writing:

"My Slurm job isn't working. Can someone help?"

Provide a more detailed message:

**Subject: Help Troubleshooting Failed Slurm Job on ICE**

Hello,

I submitted a Slurm job on ICE, but it failed before completing.

Job ID: 123456

Script location: /path/to/project/job.sbatch

The job returned the following error:

```text
slurmstepd: error: Detected 1 oom_kill event
```

I checked the job status using `sacct` and reviewed the output logs, but I am unsure whether the issue is related to the requested memory.

I also checked the PACE system status page and did not find a relevant reported incident.

Could you please advise me on how to troubleshoot this issue?

Thank you for your help.

This example gives the support team enough context to begin investigating the problem without first requesting basic information.

# Preparing Diagnostic Information

The following Slurm commands can help collect information before requesting support.

| Command | Purpose |
| --- | --- |
| `squeue -u $USER` | Displays pending and running jobs |
| `sacct -j JOB_ID` | Displays accounting information for a job |
| `scontrol show job JOB_ID` | Displays detailed information about a job, when available |
| `sinfo` | Displays cluster partition and node information |
| `pwd` | Displays the current directory |
| `ls -lh` | Lists files and their sizes |

You do not need to run every command for every issue.

Select the commands that are relevant to your problem and include the results when they would help explain the failure.

**Important:** Review diagnostic outputs before sharing them. Remove passwords, authentication tokens, and sensitive research information.

# Understanding PACE Policies

Researchers using PACE resources must follow the policies governing account access, computing allocations, and acceptable system usage.

These policies help ensure that computing resources remain available and secure for all users.

## Why Are Policies Important?

Understanding PACE policies can help researchers:

- Use allocated computing resources appropriately.
- Follow account access requirements.
- Avoid unauthorized resource usage.
- Understand responsibilities when using shared infrastructure.
- Determine when administrative approval may be required.

Researchers should review the official policies when beginning to use PACE resources.

For additional information, see:

[PACE Policies - KB0042198](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0042198)

# Troubleshooting Common Support Scenarios

| Situation | Recommended Resource |
| --- | --- |
| Unsure how to write a Slurm script | Module 205 or HAAG Slack |
| Job fails due to a script error | Module 303 or HAAG Slack |
| Job remains pending | Review Slurm pending reasons and ask HAAG peers |
| Shared storage is nearly full | Modules 301–302 and the storage administrator |
| Cannot access ICE | HAAG instructor/TA or PACE support |
| ICE is experiencing a known outage | PACE System Status |
| Resource allocation or account issue | HAAG instructor/TA or PACE support |
| Complex workflow configuration | PACE virtual consultation |
| Unresolved technical problem | HAAG staff or PACE support, following the applicable escalation procedure |

# Best Practices for Getting Help

When troubleshooting issues on PACE ICE, follow these practices:

**1. Start with available documentation.** Review the relevant training modules and official PACE resources before asking for assistance.

**2. Use the HAAG support channel.** Ask common questions in the `validated-pace-users` Slack channel so other researchers can benefit from the discussion.

**3. Check your job configuration.** Validate scripts, resource requests, and file paths before escalating an issue.

**4. Check system status.** Determine whether an outage or maintenance event may explain the problem.

**5. Include exact error messages.** Copy relevant errors instead of summarizing them vaguely.

**6. Explain what you have already tried.** Provide troubleshooting steps so support staff can avoid repeating previous attempts.

**7. Follow the appropriate support process.** Contact HAAG staff or PACE support according to your access and instructional requirements.

**8. Share the solution when appropriate.** If a common problem is resolved, consider documenting the solution for other HAAG researchers.

# Further Reading

- [PACE User Support](https://pace.gatech.edu/user-support/) — official contact information and support resources.
- [PACE Consultation Sessions - KB0042280](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0042280) — virtual consultation information.
- [PACE Policies - KB0042198](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0042198) — official computing and account policies.
- [HAAG Validated PACE Users Instructions](https://github.com/Human-Augment-Analytics/admin-high-performance-computing/blob/main/validated-pace-users-instruction.md) — instructions for accessing the internal peer-support channel.
- [302 - Auditing Your Storage Usage](../302%20-%20Auditing%20Your%20Storage%20Usage/302%20-%20Auditing%20Your%20Storage%20Usage.md) — investigate storage usage issues.
- [303 - Validating Your Job Before Submission](../303%20-%20Validating%20Your%20Job%20Before%20Submission/303%20-%20Validating%20Your%20Job%20Before%20Submission.md) — identify common Slurm script errors.
- [304 - Checking System Status](../304%20-%20Checking%20System%20Status/304%20-%20Checking%20System%20Status.md) — determine whether problems are related to PACE infrastructure.
