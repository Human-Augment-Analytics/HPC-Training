---
title: "Implementation and testing"
---

# Implementation and Testing Record

## Procedure implemented

No procedure received a formal implementation or broader HAAG rollout during Summer 2026. The team internally self-tested parts of the authored curriculum, most notably [Procedure 205 - Submitting Your First Job](../procedures/200%20-%20Running%20Your%20First%20Job/205%20-%20Submitting%20Your%20First%20Job/205%20-%20Submitting%20Your%20First%20Job.md), and used that run to create its Scribe walkthrough and [command reference](../procedures/200%20-%20Running%20Your%20First%20Job/205%20-%20Submitting%20Your%20First%20Job/205%20-%20Submitting%20Your%20First%20Job%20-%20Command%20Reference.md). This was author verification, not independent learner validation.

## Context and participants

- **Where:** Georgia Tech PACE ICE, using the repository's learner-facing guidance.
- **When:** Late in the compressed Summer 2026 term, after delayed ICE access arrived.
- **Participants:** Procedure authors/team members only. No 2-3-person beginner cohort, independent HAAG learner, or broader project group participated.
- **Intended audience:** New HAAG researchers with provisioned PACE/ICE credentials and little or no HPC experience.

## Implementation approach

The planned implementation was a structured pilot of the 100-300 learning path. Instead, the team:

1. organized the repository and documentation formats while waiting for ICE access;
2. completed the core authored materials, prioritizing Modules 200 and 300;
3. ran internal author checks, including the first-job submission workflow;
4. corrected technical guidance against dated official PACE sources; and
5. deferred independent testing, broader rollout, the Microsoft Forms workflows, and Module 400.

No adaptations were observed in learner use because no independent learner executed the procedures.

## Outcomes and evidence

Evidence available this semester is limited to the repository artifacts, the working author-tested Procedure 205 example, and the team's self-testing observations. The team did **not** collect independent completion rates, elapsed time, learner questions, error counts, adoption, support-request reduction, or broader HAAG feedback. No claim of learner effectiveness or time saved can therefore be made.

Current status: **prepared for structured learner testing, not implemented across HAAG**.

## Effectiveness

Internal testing showed that the authors could execute the documented first-job workflow and generate the expected output. It also helped identify technical details that needed correction. However, authors already knew the intended path, so this evidence cannot show whether a beginner will understand the vocabulary, navigation, resource choices, or missing assumptions. The original goal - independent onboarding and first-job completion with fewer repeated questions - remains unvalidated.

## Challenges and limitations

- **Delayed ICE access:** external approval constrained the time available for hands-on testing.
- **Compressed semester:** substantial content was completed near the end of the term, so the team prioritized usable documentation over a rushed pilot.
- **Incomplete scope:** Module 100 was presented as approximately 70% complete; Module 400 was intentionally deferred.
- **Subject-matter validation:** specialized workloads should not be released until appropriate experts validate the instructions.
- **Video hosting:** the long-term location for Scribe demonstration videos was unresolved; an unlisted YouTube option required confirmation.
- **Changing infrastructure:** GPU inventory, quotas, partitions, Slurm options, storage policies, and support contacts can become stale.
- **Evidence gap:** self-testing is not learner validation, and no baseline or post-rollout support data was captured.

## Next steps

### 1. Polish and review

Finish the remaining Module 100 review, verify all current claims against official PACE sources, and obtain subject-matter review where the team is not authoritative.

### 2. Pilot with 2-3 new researchers

Select researchers who have never used ICE. Confirm that credentials are provisioned before timing begins. Ask each person to follow the 100-300 path without coaching unless safety or policy requires intervention.

Record:

- time for the access sequence and the complete access-to-first-job path;
- completion or drop-off by module;
- questions, errors, unclear steps, and documentation corrections;
- whether the expected first-job output is produced; and
- any support intervention required.

The presentation discussion suggested testing whether the 100-series can be completed in under 45 minutes and whether a credentialed learner can reach a first job in roughly an hour. These are pilot hypotheses, not current performance claims.

### 3. Create an HPC Help & Guide Feedback form

Provide two routes: ask a PACE/ICE onboarding question, or report broken, unclear, outdated, or incorrect training content. Capture module/page, issue description, screenshot, urgency, contact, assigned owner, response status, and repository correction.

### 4. Create a Research Compute Needs Intake form

Collect team, project, expected users, workload type, software dependencies, CPU, GPU/VRAM, RAM, storage, duration, frequency, data sensitivity, transfer, and retention needs before cluster access.

### 5. Revise and expand adoption

Revise the procedures from pilot evidence, repeat any failed scenarios, and only then distribute the curriculum through HAAG project leads and onboarding channels. Track repeated support questions before and after distribution where feasible.

### 6. Build Module 400 carefully

Add specialized topics only after each has an owner, a domain/PACE reviewer, a reproducible example, and a learner-validation plan. The initial backlog is Ollama, staying current, distributed training, and bioinformatics; other tracks such as computer vision may be added when demand is demonstrated.

## Contributors

- Pranav Angadi - internal Procedure 205 test, Scribe production, technical revisions, pilot/feedback proposal, and implementation documentation.
- Bilal Assaad - curriculum strategy, Module 100 work, access-path self-testing, coordination, and feedback proposal.
- Ahsan Subzwari - Module 300 work, compute-sizing sources, and Research Compute Needs Intake proposal.
- Charlie Chark - PACE/ICE onboarding demonstration, access coordination, and operational questions/support.
