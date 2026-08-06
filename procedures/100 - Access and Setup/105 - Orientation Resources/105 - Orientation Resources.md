# Orientation Resources

The rest of this 100-series covers what you need to get onto ICE and understand roughly how it works. It does not try to be the full PACE manual. PACE maintains one, and it is worth knowing where it lives and how it is organized, so you can go straight to the right page instead of searching from scratch when something in this guide does not cover your situation.

---

## The documentation hub: KB0042503

[PACE Cluster Documentation (KB0042503)](https://gatech.service-now.com/technology?id=kb_article_view&sysparm_article=KB0042503) is PACE's central index for essentially everything. It requires Georgia Tech SSO to view, and it is organized as a tree of links rather than one long article, roughly like this:

- **Learn More about PACE.** Participation in PACE, PACE workshops and training, consulting sessions, and orientation material for clusters, Slurm, and the Open Science Grid (OSG).
- **Per-cluster sections**, one each for Phoenix, ICE, and Firebird. Each follows the same pattern: the RHEL9 environment, getting started, logging on, cluster resources, storage, and using Slurm on that specific cluster.
- **Software & Storage/Transfer.** Shared guides that apply across clusters: Apptainer containers, the PACE software stack, SCP/WinSCP/FileZilla/Rclone transfers, local scratch storage, using Git on the cluster, and a few more specialized topics like archive storage and IDEaS storage.

Since this training track is built on ICE, the fastest path through the hub is the **ICE Cluster** section: RHEL9 Environment for ICE, Getting Started with ICE, Log on to ICE, ICE Cluster Resources, Storage on ICE, and Using Slurm on ICE. Some of that ground is already covered by earlier pages in this guide (102 for login, 200-series for Slurm, 301 for storage), but the KB is PACE's canonical source, so it is the one to check first if something has changed since these pages were written.

---

## Workshops and live training

PACE runs no-cost, live virtual workshops taught by PACE Research Scientists on a recurring basis, including Linux 101, Linux 102, Python 101 (Intro to Data Analysis with NumPy), Git 101, Optimization 101, Using Containers at PACE, and Applications of Machine Learning. The current schedule and sign-up details are at [KB0042298](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0042298). If you want a structured, taught introduction rather than reading through docs on your own, this is the better fit.

---

## Live help

If you get stuck on something specific rather than looking for a general orientation, **[305, Getting Help](../../300%20-%20Storage%2C%20Troubleshooting%20%26%20Support/305%20-%20Getting%20Help/305%20-%20Getting%20Help.md)** already lays out who to contact and in what order, including PACE's weekly consulting sessions ([KB0042280](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0042280)). That page is not repeated here.

---

## Video walkthroughs

The documentation hub also links out to a handful of recorded orientation sessions, including PACE Clusters Orientation, PACE Slurm Orientation, and PACE OSG Orientation. We have not individually reviewed these yet to confirm which one best matches an ICE-only workflow, so if you would rather watch a walkthrough than read one, open the hub directly and skim the description on each before committing to one.

---

## Next step

- Setting up access for the first time? Go back to **104, Requesting ICE Access**.
- Want the conceptual overview first? See **103, Understanding the PACE Ecosystem**.
- Ready to run something? Continue to **[200, Running Your First Job](https://github.com/Human-Augment-Analytics/HPC-Training/tree/main/procedures/200%20-%20Running%20Your%20First%20Job)**.

> **PACE note:** KB0042503 sits behind Georgia Tech SSO, so its contents are only viewable while logged in, and its structure can be reorganized by PACE at any time. This page reflects the hub's layout as of August 2026.
