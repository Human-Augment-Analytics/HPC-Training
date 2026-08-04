# 302 — Auditing Your Storage Usage

**Type:** Markdown Reference
**Source:** [HAAG PACE Storage Audit — Justin Yiu](https://github.com/Human-Augment-Analytics/admin-high-performance-computing/tree/main/HPC_Storage_Audit)

---

## What this is

Justin Yiu built a storage auditing tool for HAAG's shared PACE storage. It's a Python script (`storage_audit_script.py`) that reports three things for a given storage path:

1. **Overall summary** — total capacity and current usage
2. **Breakdown by project** — size of each top-level project folder
3. **Last modified date** — when each project folder was last touched

The script runs as a Slurm job (`run_storage_audit_once.sbatch`) on the `ice-cpu` partition, writes a dated report (`storage_audit_report_YYYYMMDD.txt`), and emails it to a configured recipient list.

## Who receives it, and how often

The report currently goes out **bi-weekly** to the Director of HAAG (Bree Shi) and the Head TA (Charlie Chark) as a standing check on HPC storage utilization. It is not currently something every researcher runs themselves — but the tool and script are open in the HAAG admin repo, and any researcher who wants a read on their own project's footprint can run it directly.

## Why this matters right now

One recent report showed a shared HAAG storage path at **97% utilized** (3.9 TB of 4.0 TB), with the largest project folder alone accounting for over a terabyte. Justin's writeup already sketches the beginning of a lifecycle policy to deal with exactly this: if a project folder hasn't been modified in **18+ months**, the owner gets notified and asked to archive, back up, or remove the data.

This is the direct predecessor to the storage sanitation initiative Charlie asked for — the audit tool is what makes a sanitation policy enforceable in the first place, since you can't clean up what you haven't measured.

## Running it yourself

```bash
# From a PACE ICE login node, inside the cloned repo:
git clone https://github.com/Human-Augment-Analytics/admin-high-performance-computing.git
cd admin-high-performance-computing/HPC_Storage_Audit

# Submit as a one-off Slurm job:
sbatch run_storage_audit_once.sbatch
```

The report is written to the target directory as `storage_audit_report_<date>.txt`, and emailed automatically once the job completes.

## Related

- [301 — Storage on ICE](301%20-%20Storage%20on%20ICE.md)
- [Storage Audit source (GitHub)](https://github.com/Human-Augment-Analytics/admin-high-performance-computing/tree/main/HPC_Storage_Audit)
- Storage sanitation initiative (Charlie) — proposal in progress, tracked separately
