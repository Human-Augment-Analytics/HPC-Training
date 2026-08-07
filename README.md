# HPC Training Initiative

The HPC Training Initiative is a structured, beginner-friendly onboarding path for Human Augment Analytics Group (HAAG) researchers using Georgia Tech's PACE Instructional Cluster Environment (ICE).

## Group information

**Working group:** HPC Training Initiative<br>
**Course:** CS 8803 Management & Leadership, Summer 2026<br>
**Team members:** Bilal Assaad, Pranav Angadi, Ahsan Subzwari, and Charlie Clark

## Problem and scope

New HAAG researchers could obtain PACE/ICE access yet still struggle to run an HPC workload independently. Instructions for credentials, Duo, GlobalProtect VPN, SSH, Open OnDemand, storage, Slurm, and GPU selection were spread across Georgia Tech knowledge-base pages, Slack conversations, and separate GitHub repositories. The same questions therefore resurfaced, onboarding knowledge remained concentrated in a few people, and a researcher's first successful job could take far longer than necessary.

The Summer 2026 scope was to organize those materials into one guided learning sequence. The team prioritized the core journey from access through a verified first job and routine troubleshooting. It did not include a formal learner pilot, a HAAG-wide rollout, production feedback forms, or completed specialized-workload training.

## Intended outcome

The intended byproduct is a maintainable, task-centered curriculum that lets a new HAAG researcher:

1. obtain and verify access;
2. size and submit a safe first Slurm job;
3. verify output, manage storage, and find support; and
4. continue into validated, domain-specific workloads as those modules are added.

Success next semester means a new researcher can complete onboarding and submit a first HPC job independently, with fewer repeated support requests and documented feedback for improvement.

## Solutions and work completed

The repository uses a 100/200/300/400 sequence so learners can follow the complete path or enter at the stage they need. Scribe walkthroughs are used where screen navigation is ambiguous, Markdown and PDFs explain concepts and copyable commands, hybrid guides combine both, and official Georgia Tech sources are linked instead of duplicated.

| Module | Semester-end status | Work completed |
|---|---|---|
| 100 - Access and Setup | In progress (presented as approximately 70%) | Completed the VPN and login walkthroughs; drafted the PACE ecosystem, ICE access, and orientation guidance. |
| 200 - Running Your First Job | Complete as an authored module; learner validation remains | Completed procedures 201-206, including sizing, GPU selection, a VRAM calculator guide, and a tested/Scribed first-job workflow with a command reference. |
| 300 - Storage, Troubleshooting & Support | Complete as an authored module; learner validation remains | Completed procedures 301-305 covering storage, auditing, job validation, system status, and escalation. |
| 400 - Specialized Workloads & Staying Current | Deferred to a future semester | Preserved a clearly labeled plan for Ollama, staying current, distributed training, and bioinformatics. No training procedure was completed. |

The team performed internal author self-testing, including the first-job workflow in Procedure 205. This established that the procedure worked for its author, but it is not evidence that a new learner can complete the path independently.

## Implementation status

**No formal implementation occurred during Summer 2026.** There was no independent learner pilot and no broader HAAG rollout. ICE access arrived late, much of the material was completed near the end of a compressed summer term, and the team chose to finish higher-quality core documentation rather than rush a weak pilot. Module 400 was also deferred until subject-matter experts and validation owners can confirm specialized guidance. Long-term hosting for Scribe demonstration videos remained unresolved.

The repository is prepared for structured learner testing. See the [implementation record](implementation/README.md) for the pilot design, evidence limitations, proposed Microsoft Forms, success measures, and next-semester handoff.

## Repository guide

- [Procedures overview](procedures/README.md) - curriculum design, completion status, maintenance rules, and module links.
- [100 - Access and Setup](procedures/100%20-%20Access%20and%20Setup/README.md) - VPN, ICE login, ecosystem, access, and orientation.
- [200 - Running Your First Job](procedures/200%20-%20Running%20Your%20First%20Job/README.md) - resource sizing through a verified Slurm output.
- [300 - Storage, Troubleshooting & Support](procedures/300%20-%20Storage%2C%20Troubleshooting%20%26%20Support/README.md) - storage stewardship, validation, status, and help.
- [400 - Specialized Workloads & Staying Current](procedures/400%20-%20Specialized%20Workloads%20%26%20Staying%20Current/README.md) - explicitly deferred topics and build requirements.
- [Implementation record](implementation/README.md) - what was and was not tested, why implementation stopped, and what the next cohort should do.

## Individual contributions

### Pranav Angadi

- Built the repository's 100-400 structure and organized the combined deliverable.
- Owned and completed Module 200 (Procedures 201-206).
- Tested and created the Scribe walkthrough for Procedure 205, Submitting Your First Job.
- Created the Scribe walkthrough for Procedure 102, Logging Into OnDemand and SSH.
- Revised Procedures 201-204 for technical accuracy after cluster details changed.
- Provided the team with Scribe access, supported team communications and presentations, and proposed the Microsoft Forms feedback workflow.

### Bilal Assaad

- Architected the numbered curriculum and multi-format documentation strategy.
- Owned Module 100 (Procedures 101-105), including the GlobalProtect Scribe guide and the written ecosystem, access, and orientation guidance.
- Introduced the team to Scribe and helped establish when to use visual, written, hybrid, or reference-based formats.
- Coordinated progress, supported team communications and presentations, and co-developed the proposed Microsoft Forms feedback workflow.

### Ahsan Subzwari

- Introduced the group to the HPC Training Initiative and shared prior HAAG compute-sizing resources that informed Procedures 201-204.
- Led the Module 300 content covering storage, troubleshooting, validation, status, and support (Procedures 301-305).
- Proposed the Research Compute Needs Intake form for collecting CPU, GPU/VRAM, RAM, storage, software, usage, and data requirements before access.

### Charlie Clark

- Delivered the team's first PACE/ICE onboarding and usage demonstration.
- Coordinated with PACE to obtain ICE access and answered PACE/ICE questions in Slack.
- Supplied operational context for access, storage, and support guidance and is a recommended partner for future distribution and validation.

## Presentation feedback and continuation reflection

The feedback on our overall structure was very positive. Peers especially liked the way we divided the material into the 100, 200, and 300 series. They felt that this made the repository easy to navigate for both a complete beginner following the full path and someone who only needs help with one specific task. Based on that feedback, we plan to keep the numbered structure and the separate module indexes.

The discussion also gave us a few important things to work on next semester:

1. **Test the guides with people outside the project.** One question was whether we had enough experience to teach these topics and whether the repository would actually help the next group learn faster than we did. We are still learning ourselves, so the next step should be to test the guides with new researchers and have PACE staff or other subject-matter experts review the more technical material. This will be especially important before publishing Module 400.
2. **Measure how long the training takes.** One reviewer suggested using completion time as a KPI. For example, can a researcher who already has credentials finish the access material in less than 45 minutes, and can they go from access to a successful first job in about an hour? These are goals we discussed during the presentation, but we have not tested them yet.
3. **Make sure people know the repository exists.** Reviewers pointed out that even strong documentation will not help if new researchers never hear about it. Once the guides have been tested and improved, they should be shared with HAAG project leads and included in the onboarding information given to new researchers. Charlie can also help distribute the training across different project teams.

Overall, we would keep the current organization but collect more evidence about how well it works. During the pilot, future students should record how long each section takes, where learners become confused, what questions or errors come up, and whether they successfully complete their first job. The guides should also be checked regularly against official PACE documentation, with major updates dated in the repository. A centralized feedback form would make it easier to track corrections instead of letting them get lost in separate Slack conversations.

## Recommended next steps

1. Finish and technically review the remaining 100-series drafts.
2. Pilot the 100-300 path with 2-3 new HAAG researchers who have not used ICE; observe without coaching unless safety requires intervention.
3. Record completion time, questions, errors, documentation corrections, and whether each learner reaches a verified first-job output.
4. Create an **HPC Help & Guide Feedback** Microsoft Form with routes for onboarding questions and broken, unclear, outdated, or incorrect content; capture module/page, issue, screenshot, urgency, contact, owner, response status, and repository fix.
5. Create a **Research Compute Needs Intake** form covering team, project, users, workload, software, CPU, GPU/VRAM, RAM, storage, duration, frequency, data sensitivity, transfer, and retention.
6. Revise from pilot evidence, then distribute the curriculum across HAAG and measure repeated support requests.
7. Build Module 400 only after each topic has a content owner, a subject-matter reviewer, current official sources, and a validation procedure.

## Maintenance note

PACE hardware, quotas, partitions, Slurm options, URLs, and policies change. Maintainers should verify technical claims against dated official Georgia Tech sources before each cohort, record substantial review dates in the affected procedure, and use learner feedback to identify unclear or stale instructions.
