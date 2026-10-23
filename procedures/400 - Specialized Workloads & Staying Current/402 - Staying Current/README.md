---
title: "402 - Staying Current"
---

# Staying Informed About PACE Updates
PACE periodically performs maintenance and upgrades to improve system performance, security , and reliability. 

These updates may affect:
- Availability of computing nodes and GPUs
- Software versions and installed dependencies
- Job scheduling and resource allocation
- SSH and Open OnDemand access
- Storage availability and system configuration

## Step 1: Check Official PACE Announcements
Visit the following resources:
- [PACE Official Website](https://pace.gatech.edu/)
- [Georgia Tech Service Status](https://status.gatech.edu/)

These websites provide information about scheduled maintenance, service interruptions, and changes to computing resources.

## Step 2: Review Login Announcements
When connecting to ICE through SSH, pay attention to the **Message of the Day (MOTD)** displayed in the terminal.

These messages may include important information about cluster availability, maintenance, and resource changes. If you use Open OnDemand, check for announcements displayed on its homepage.

## Step 3: Plan Around Maintenance
To minimize potential disruptions:
1. Check upcoming maintenance announcements.
2. Estimate how long your job will take.
3. Avoid scheduling long jobs that overlap with maintenance periods.
4. Save intermediate results when possible.
5. Use checkpointing for experiments that support it.

**What is checkpointing?**

Checkpointing is the process of periodically saving the progress of a computation so it can be resumed after an interruption rather than restarting from the beginning.

# Checking ICE Resource Availability
ICE is a shared computing environment, meaning multiple uers may request resources simultaneously. Before submitting computationally intensive jobs, you should understand which resources are available and whether your requested resources are appropriate.

**Step 1: Check Cluster Status**

Run:

```bash
sinfo
```

The `sinfo` command displays information about Slrum partitions and compute node availability.

Common node status include:

| State | Description |
| ------ | -------------------- |
| `idle` | The node is available for scheduling |
| `alloc` | The node has been allocated to jobs |
| `mix` | Some resources are allocated while others may remain available |
| `down` | The node is unavailable |
| `drain` | The node is being removed from scheduling or is unavailable for new jobs |

> **Note:** Seeing an idle node does not guarantee that your job can use it. Your account permissions, resource requirements, and scheduling policies also affect availability.


**Step 2: View Your Jobs**

Run:

```bash
squeue --me
```

This displays job belonging to your user account. You can use this command to check whether your jobs are:
- Pending (PD)
- Running (R)
- Completing (CG)

**Step 3: Investigate Pending Jobs**

If your job remains pending, run:

```bash
squeue --me -o "%.18i %.9P %.20j %.8T %.10M %.30R"
```

The final column displays the job's current reason or assigned node information.

Common pending reasons include:

| Reason | Meaning |
| ------ | -------------------- |
| `Resources` | The requested resources are currently unavailable |
| `Priority` | Other jobs have higher scheduling priority |
| `Dependency` | The job is waiting for another job |
| `AssoGrp*` | An association or group scheduling limit may have been reached |

## Checking Available Software
**Step 1: List Available Modules**

Run:

```bash
module avail
```

The `module avail` command lists software environment modules available through the current moduel search path. Depending on your environment, this may include compilers, programming languages, numerical libraries, and scientific computing tools.

**Step 2: Search for Software**

If you are looking for a specific package, you can search the module system.

For example,

```bash
module spider pyhon
```

This searches for for Python-related modules, including those that may not appear in the current `module avail` output.

Availability depends on the cluster's software configuration.

**Step 3: Check Loaded Modules**

Run:

```bash
module list
```

This displays the environment modules currently loaded in your shell.

Loaded modules can affect which versions of software and libraries your programs use.

**Step 4: Check Software Versions**

You can inspect the active version of a programming language or tool.

For example,

```bash
python --version
```

You can also check the location of the executable:

```bash
which python
```

This is useful when troubleshotting unexpected behavior caused by different Python installations.

## Managing Python Environments

Python environments allow researchers to isolate dependencies for different projects. For example, one project might require an older version of PyTorch, while another might depend on a newer release. 

Installing every package into a single environment can lead to version conflicts.

**What is a Virtual Environment?**

A virtual environment is an isolated Python envirionments helps researchers:
- Prevent conflicts between projects
- Control dependency versions
- Reproduce experiements
- Test software updates without modifying a working environment

**Step 2: Activate the Environment**

Run:

```bash
source .venv/bin/activate
```

Your terminal may now display (`.venv`) before the prompt.

**Step 3: Install Dependencies**

For example,

```bash
python -m pip install numpy pandas
```

Install packages only in an approved location and follow ICE network access and software installation policies.

**Step 4: View Installed Packages**

Run:

```bash
python -m pip list
```

This displays packages installed in the current Python environment.

**Step 5: Save Dependencies**

Run:

```bash
python -m pip freeze > requirements.txt
```

This creates a file containing installed Python packages and their pinned versions.

An example might look like:

```bash
numpy==2.1.0
pandas==2.2.3
```

These are illustrative versions, not required ICE versions.

**Step 6: Recreate an Environment**

To recreate a compatible environment using the saved dependency file:

```bash
python -m pip install -r requirements.txt
```

> **Important** A `requirements.txt` file alone may not reproduce anything. Also, record the Python version, system modules, CUDA libraries when relevant, and other non-Python dependencies.

## Updating Software Safely
Updating software can provide performance improvements, security fixes, and new functionality. However, changes in software versions may also break existing considering compatibility and reproducibility.

**Recommended Update Process**

1. Confirm whether an update is necessary.
2. Review the package's release notes and compatibility requirements.
3. Save your current dependency versions.
4. Create a separate testing environment
5. Install updated packages in the test enviornment.
6. Run a small test using existing research code.
7. Compare the results against the previous environment.
8. Adopt the update only after confirming it works correctly.

**Example: Testing An Updated Dependency**

First, record the current environment:

```bash
python -m pip freeze > requirements-before.txt
```

Then create a new environment:

```bash
python -m venv test-env
source test-env/bin/activate
```

After installing your project's dependencies, you can test an update to a package:

```bash
python -m pip install --upgrade numpy
```

Run your project's tests or a representative computation to determine whether the new package version behaves as expected.

> **Important:** Avoid running these updates in an enviornment used by active experiments. Depending on package requirements, additional build or compatibility checks may be necessary.

## Maintaining Reproducible Research

Reproducibility means that another researcher can repeat an experiment using the same code, data, software environment, and configuration.

Maintaining repreoducible workflows is particularly important when working on shared computing clusters because hardware and software environments may change.

**What Should You Record?**

| Information | Why It Matters |
| ------ | -------------------- |
| Python version | Different versions may behave differently |
| Package version | Dependency changes can affect results |
| Software modules | Record cluster-provided tools and libraries |
| Slurm configuration | CPU, GPU, memory, and time allocations influence execution |
| Model configuration | Hyperparameters and model versions affect results |
| Dataset version | Ensures the same input data is used|
| Random seeds | Helps reproduce randomized operations |
| Git commit | Identifies the exact version of the research code |

**Step 1: Save Environment Information**

Run:

```bash
python --version
module list 2>&1
```

You can also save useful information in files:

```bash
python --version > python-version.txt
module list > loaded-modules.txt 2>&1
```

**Step 2: Record Dependency Versions**

Run:

```bash
python -m pip freeze > requirements.txt
```

Store this file with your project's documentation or version-controlled configuration.

**Step 3: Use Git for Version Control**

Git allows researchers to track changes to their source code.

For example:

```bash
git status
```

 Displays modified and untracked files.


```bash
git log --oneline -5
```

Displays the five most recent commits.

You can record the current commit identifier with:

```bash
git rev-parse HEAD
```

This helps identify exactly which version of the code was used for an experiment.

Do not commit credentials, restricted research datasets, or large temporary output files to a repository.

## Troubleshooting Changes in Your Environment

If code that previously worked suddenly stops running, the cause may be related to changes in the cluster, software environment, or dependencies.

Before rewriting your code, investigate what changed.

**Common Problems**

| Information | Why It Matters | Recommended Action |
| ------ | -------------------- | -------------------- |
| Command no longer works | Software module changed or is no longer loaded | Check module `list` and `module avail` |
| Python import error | Missing dependency or wrong environment | Verify the active environment and installed packages |
| GPU not detected | Incorrect allocation, driver issue, or incompatible software | Verify the compute node, GPU allocation, and CUDA compatibility |
| Job remains pending | Resource availability or scheduling limits | Check `squeue` and the pending reason |
| Previously working code fails | Dependency or system update | Compare software versions and recent changes |
| Files cannot be written| Storage quota, permissions, or unavailable filesystem | Check the destination and relevant storage policies |
| Unexpected experimental results | Changes in code, data, dependencies, or hardware behavior | Compare recorded configurations and saved outputs |

**Recommended Troubleshooting Workflow**

1. Read the complete error message.
2. Check PACE announcements for recent maintenance or changes.
3. Confirm that you are using the correct Python environment.
4. Inspect loaded software modules.
5. Compare dependency versions against a working configuration.
6. Run a smaller test to isolate the problem.
7. Review Slurm output and error logs.
8. Contact PACE support if the issue appears system-related.