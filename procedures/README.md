# Procedures

This folder contains the HPC Training Initiative's learner-facing procedures and clearly labeled future-work plans. The curriculum is organized as a progressive journey: get access, run safely, recover and maintain, then go deeper.

## Modules

| Module | Purpose | Semester-end status |
|---|---|---|
| [100 - Access and Setup](100%20-%20Access%20and%20Setup/README.md) | Connect through VPN, log into ICE, understand the ecosystem, request access, and locate orientation resources. | Approximately 70% at presentation time; 101-102 complete, 103-105 require final review and learner validation. |
| [200 - Running Your First Job](200%20-%20Running%20Your%20First%20Job/README.md) | Estimate resources, choose a GPU, submit a Slurm job, and verify its output. | Authored and internally self-tested; not independently piloted. |
| [300 - Storage, Troubleshooting & Support](300%20-%20Storage%2C%20Troubleshooting%20%26%20Support/README.md) | Manage storage, validate scripts, check service status, and escalate effectively. | Authored; not independently piloted. |
| [400 - Specialized Workloads & Staying Current](400%20-%20Specialized%20Workloads%20%26%20Staying%20Current/README.md) | Extend the core path into validated domain-specific workloads. | Deferred; planning placeholders only. |

## Documentation approach

- **Scribe:** visual, screen-by-screen guidance where navigation is ambiguous.
- **Markdown/PDF:** concepts, decision guidance, and copyable commands.
- **Hybrid:** visual navigation plus a reusable written command reference.
- **External references:** concise context and links to authoritative sources instead of copying material that will become stale.

Each procedure states its purpose and scope, roles, prerequisites, workflow, success criteria, limitations/future improvements, and contributors. Supporting PDFs are retained only when they provide a learner-facing static export of a Scribe walkthrough; Markdown remains the maintainable source.

## Maintenance procedure

1. Confirm the procedure still addresses a real learner task and fits the module sequence.
2. Check PACE/ICE hardware, quotas, partitions, Slurm syntax, access rules, support contacts, and links against current official sources.
3. Run every command or navigation path in a safe test context.
4. Have a new learner follow the procedure without coaching and record time, questions, errors, and completion.
5. Revise the Markdown source, update any related Scribe/PDF asset, and record the review date.
6. Link related procedures and the [implementation record](../implementation/README.md) when evidence or handoff context changes.

## Completion standard

A procedure is ready for broad HAAG use only when its links and commands are current, a subject-matter reviewer has checked technical claims where needed, an independent learner can reach the stated success criteria, and contributors and review dates are recorded. Authored material that has not passed learner validation must remain labeled accordingly.

## Contributors

- Bilal Assaad - Module 100 owner and curriculum/documentation strategy.
- Pranav Angadi - repository structure, Module 200 owner, Procedures 102 and 205 Scribe production, and technical revisions.
- Ahsan Subzwari - Module 300 owner and compute-sizing source material.
- Charlie Chark - PACE/ICE onboarding, access coordination, and operational support context.
