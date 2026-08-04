# HPC Training Module Outine Plan

**Top-Level Structure:** one new GitHub repo, folders `101/` `201/` `301/` `401/`, each with a `README.md` sequencing that module's files in order, plus a top-level `/pdf-exports/` folder holding the Scribe PDF versions (unused for now, kept for reference)

**WHEN ARE ARE GOING TO USE A SCRIBE EXPORT, .MD FILE THAT WE CREATE, OR A HYBRID OF BOTH**
- **Scribe** 
  - Screen-recorded click-through, exported as markdown with screenshots 
  - Use when there's real navigation ambiguity (which button, which field, multi-screen)
- **Hybrid** 
  - Scribe recording of the terminal/CLI session AND a markdown code block with the exact copy-pasteable commands when it makes sense to add
- **Markdown Explainer**  
  - Written by us, explaining what something is and when/why to use it 
  - When little to no screenshots are needed for clarity
- **Markdown References??** 
  - A short paragraph & link out to someone else's existing resource (official KB, peer repo, HAAG tool)
  - Explain it enough to be useful, don't reproduce same repo here so we're not fully duplicating efforts

---

## Module 101 — Access & Setup

| # | File | Type | Source / Content | Notes |
|---|------|------|-------------------|-------|
| 1 | `101-01-How to Install and Configure GlobalProtect VPN.md` | Scribe | GlobalProtect VPN install | **Done** - Bilal's existing capture, rename to fit numbering |
| 2 | `101-02-Logging Into OnDemand and SSH.md` | Scribe | First OnDemand/SSH login after VPN connects | **There's a gap here** - not yet captured, recommend adding |
| 3 | `101-03-Understanding the PACE Ecosystem.md` | Markdown Explainer | PACE Homepage, Get Started with PACE | What PACE is, ICE vs. Phoenix vs. Firebird at a glance, PI vs. PACESHIP access paths (I'M ALSO FINE WITH LEAVING THIS OUT (ASK CHARLIE IF THIS WILL BE USEFUL))|
| 4 | `101-04-Requesting ICE Access.md` | Markdown References | Request ICE Access (Form) | This will be short, we just explain who needs to file it and link the form. No screenshots most likely |
| 5 | `101-05-Orientation Resources.md` | Markdown References | User Orientation (KB), PACE Setup Video, PACE Orientation Videos | Roundup of official/peer orientation material - explain what each covers so people pick the right one |
|  | `README.md` |  |  |  |

---

## Module 201 — Running Your First Job

| # | File | Type | Source / Content | Notes |
|---|------|------|-------------------|-------|
| 1 | `201-01-The Four Numbers Before You Submit.md` | Markdown Explainer | Concept intro | CPU / GPU-VRAM / RAM / storage, why guessing costs you |
| 2 | `201-02-Finding Your Sizing Recipe.md` | Markdown References | HAAG Compute & Storage Guide — recipe index | Explain the 4 workload recipes and the verdict-table format, link out |
| 3 | `201-03-Choosing Your GPU.md` | Markdown References | Part 3 — GPU decision tree | Explain the 3-question funnel, and add a link out |
| 4 | `201-04-Using the VRAM Calculator.md` | Markdown Explainer | VRAM Calculator | Explain what it calculates, when to use it, walk through the math conceptually a bit then link to the live tool |
| 5 | `201-05-Submitting Your First Job.md` | **Hybrid** | Sample Slurm Script & live terminal | Scribe recording of the terminal session (`sbatch`, `squeue`, checking `.out`)and a markdown code block with the exact commands, copy-pasteable |
| 6 | `201-06-Further Reading.md` | Markdown Explainer | Intro-To-PACE-ICE (Guru) | This is the deep dive |
|  | `README.md` |  |  |  |

---

## Module 301 — Storage, Troubleshooting & Support

| # | File | Type | Source / Content | Notes |
|---|------|------|-------------------|-------|
| 1 | `301-01-Storage on ICE.md` | Markdown Explainer | Storage Guide (ICE) KB | Official KB is good, explain tiers/quotas and why it matters, link to source |
| 2 | `301-02-Auditing Your Storage Usage.md` | Markdown References | Storage Audit (Justin Yiu) | Explain when to use it / use case, light touch, contact link |
| 3 | `301-03-Validating Your Job Before Submission.md` | Markdown References | PACE Job Submission Validator (Zach Wallace) | When/why to use it, contact link |
| 4 | `301-04-Checking System Status.md` | Markdown Explainer | PACE System Status | Will be short, teaches people to check this before assuming their own script is broken |
| 5 | `301-05-Getting Help.md` | Markdown Explainer | Consultation Sessions, PACE Policies, support contacts | Consolidates the scattered contact points into one "who do I ask" page |
|  | `README.md` |  |  |  |

---

## Module 401 — Specialized Workloads & Staying Current

| # | File | Type | Source / Content | Notes |
|---|------|------|-------------------|-------|
| 1 | `401-01-Running LLMs with Ollama.md` | Hybrid ( most likely??) | PACE + HAAG: Ollama KB | This KB likely has real install/run CLI steps, treat like Scribe + code blocks?? |
| 2 | `401-02-Staying Current.md` | Markdown References | PACE Trainings, Workshops & Events | Why to check the calendar periodically, link out |
| 3 | `401-03-Distributed Training.md` | *Placeholder* | Fall 2026 Build track | Not yet built, fill in once the recipe ships |
| 4 | `401-04-Bioinformatics.md` | *Placeholder* | Fall 2026 Build track | Not yet built, fill in once the recipe ships |
|  | `README.md` |  |  |  |

---
