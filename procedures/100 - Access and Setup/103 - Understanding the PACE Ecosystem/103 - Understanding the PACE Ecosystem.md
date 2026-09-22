---
title: "103 - Understanding the PACE Ecosystem"
---

# Understanding the PACE Ecosystem

You already connected over VPN and logged into OnDemand and SSH. Before you request access or submit a job, it helps to know what you actually logged into. PACE is not one machine. It is an umbrella covering several clusters, a support team, and a software stack, and understanding how the pieces fit together will save you a support ticket later.

This page covers what PACE is, how its clusters differ, who can request access to each one, and the basic vocabulary (head node, compute node, Slurm) you will need before submitting a job.

---

## What PACE is

PACE stands for Partnership for an Advanced Computing Environment. It is Georgia Tech's research computing organization, and it provides three things:

- **Compute and storage.** CPU and GPU capacity, plus individual and shared project storage on filesystems built for the kind of I/O research jobs need.
- **A support team.** The Research Computing Facilitation team runs consultations, workshops, and email support.
- **A software stack.** Python, R, Julia, Jupyter, Anaconda, and a long list of licensed and open-source packages, already built so you are not compiling everything from scratch.

---

## Three clusters, three purposes

PACE runs several distinct clusters. They share the same underlying technology (Slurm, CPUs and GPUs, Infiniband, NVMe storage), but each one exists for a different reason and has different rules about who can use it.

| Cluster | Purpose | Cost | Who can apply | Hardware highlights |
|---|---|---|---|---|
| **Phoenix** | General-purpose research cluster | Credit system with a free tier; no-cost backfill partition | GT-affiliated research projects | Intel and AMD CPU nodes, NVIDIA H200/H100/A100/V100/L40S GPUs, NVMe/SAS storage |
| **Firebird** | Research involving controlled unclassified information (CUI), export-controlled (ITAR) software, or other sensitive data | Credit system; no-cost backfill partition for paying users | GT-affiliated research projects | CPU nodes similar to Phoenix, NVIDIA H200/A100/RTX6000 GPUs, independent per-project storage |
| **ICE** | Instructional Cluster Environment, for coursework, workshops, and the AI Makerspace | No cost | Any GT-affiliated faculty member, or a makerspace project | CPUs and GPUs, Infiniband, NVMe |

A fourth cluster, Hive, was decommissioned in September 2025 and no longer appears in current PACE documentation.

This training track is built around ICE. It is the cluster course instructors request on behalf of their classes, it costs nothing to use, and it is where you will run the exercises in the rest of this guide. What you learn here (Slurm, modules, storage layout) carries over directly to Phoenix or Firebird if you later work with a research group that uses one of those instead, since all three clusters run the same Slurm-based scheduling underneath.

ICE has grown quickly. In Fall 2022 it supported about 991 users across 24 courses. By Fall 2025 that had grown to over 3,100 users across 100 courses. You are joining an environment that gets active, ongoing use, not a system nobody touches.

---

## Who requests access, and how

Access requests differ by cluster, and it matters who does the requesting:

- **Phoenix.** A PI or faculty sponsor fills out the PACE Account Creation Request Form on behalf of their students, researchers, or staff. Individual students do not self-request.
- **Firebird.** Access is arranged directly with PACE by emailing `pace-support@oit.gatech.edu`, since CUI and ITAR projects carry extra requirements.
- **ICE.** The course instructor applies to use ICE for their class. Students should not fill out the ICE application themselves. Instructors outside the College of Computing use the standard ICE application; instructors teaching within the College of Computing go through the TSO's instructional team instead.

If you are a student reading this, the practical takeaway is simple: your instructor or course staff requested the ICE allocation your class uses, and you were added to it. If you are setting up a new course or workshop on ICE yourself, see **104, Requesting ICE Access** for that process.

---

## How the cluster is organized

Once you are logged in, you are actually touching two different kinds of machines, and mixing them up is one of the more common early mistakes.

- **Head node.** This is the machine you land on when you SSH in or log into OnDemand (for example, `login-phoenix-rh9.pace.gatech.edu` on Phoenix; ICE has its own login node). It is a shared resource used by everyone logged in at that moment. Use it for light tasks like editing files, organizing data, or checking on jobs. Do not run computations, installs, compiles, or visualizations here. You would be competing with everyone else on that same shared machine, and that kind of work belongs on a compute node anyway.
- **Compute nodes.** These are the machines that actually run your work. When you submit a job, Slurm allocates you your own CPUs, GPUs, and RAM on a compute node. Your data is visible from both the head node and every compute node, so nothing needs to be copied manually for a job to find its files.

---

## Slurm: the reason there is a queue at all

Unlike your laptop, a cluster is shared by dozens, sometimes hundreds, of people at once. Slurm is the workload manager that arbitrates that sharing fairly. You tell it what you need (CPUs, memory, wall time, GPUs if any), and it holds your job until that exact set of resources is free, then runs it for exactly as long as you asked.

That is the whole idea in one sentence, and it is why submitting a job feels different from just running a script locally. The mechanics of actually writing and submitting a Slurm job start in **200, Running Your First Job**; this page exists so the vocabulary (head node, compute node, scheduler, queue) is already familiar by the time you get there.

---

## Next step

- Need to request an ICE seat for a course? See **104, Requesting ICE Access**.
- Want a broader tour of PACE, including workshops and official docs? See **105, Orientation Resources**.
- Ready to size and submit your first job? Continue to [200, Running Your First Job](https://github.com/Human-Augment-Analytics/HPC-Training/tree/main/procedures/200%20-%20Running%20Your%20First%20Job).
- Stuck on something this page did not cover? See [305, Getting Help](https://github.com/Human-Augment-Analytics/HPC-Training/tree/main/procedures/300%20-%20Storage%2C%20Troubleshooting%20%26%20Support/305%20-%20Getting%20Help).

> **PACE note:** This page is based on the PACE Orientation deck dated Spring 2026 (March 2026 update). Cluster availability, hardware, and access processes change over time, so confirm anything access- or hardware-specific against the [PACE website](https://pace.gatech.edu) or current KB documentation before relying on it for something time-sensitive.
