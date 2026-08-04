# 301 — Storage on ICE

**Type:** Markdown Explainer
**Source:** [PACE Storage Guide (ICE) — KB0042094](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0042094)

---

## What this covers

Storage on PACE ICE is shared across every project using the same account, not carved out per-researcher. That means one project filling its directory affects everyone else on that same storage path — a bad upload, an un-pruned checkpoint folder, or a forgotten dataset copy can put the whole group at risk of hitting capacity.

This page explains the concept well enough to work with day to day. For exact quota numbers and tier-by-tier specifics, PACE's own KB article (KB0042094, linked above) is the authoritative source — check it directly rather than relying on numbers repeated secondhand, since quotas can change between semesters.

## Why it matters

A real HAAG example makes this concrete: one shared HAAG storage path is currently sitting at **97% utilized** (3.9 TB used of a 4.0 TB allocation), with the largest single project folder alone taking up 1.1 TB. At that level, there's very little room left before jobs relying on that storage start failing outright — not because of anything wrong with the job itself, but because there's nowhere left to write.

This is exactly why storage isn't a "set it and forget it" concern. A project that looked fine at the start of the semester can become the reason a labmate's job fails in week twelve.

## What to do about it

- Know roughly how much space your project's data and checkpoints actually need before you start generating large amounts of output — treat storage like compute, something to size, not something to assume is unlimited.
- Periodically check actual usage rather than assuming — see [302 — Auditing Your Storage Usage](302%20-%20Auditing%20Your%20Storage%20Usage.md) for the tool that does this for you.
- If your project is inactive or has stale checkpoints/data that no longer needs to live on shared storage, clean it up rather than letting it sit — see the ongoing storage sanitation effort referenced in 302.

## Related

- [PACE Storage Guide (ICE) — KB0042094](https://gatech.service-now.com/home?id=kb_article_view&sysparm_article=KB0042094) — authoritative tiers/quota reference
- [302 — Auditing Your Storage Usage](302%20-%20Auditing%20Your%20Storage%20Usage.md)
