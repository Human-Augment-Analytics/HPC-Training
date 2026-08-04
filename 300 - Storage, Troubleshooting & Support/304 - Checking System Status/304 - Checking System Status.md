# 304 — Checking System Status

**Type:** Markdown Explainer
**Source:** [PACE System Status](https://pace.gatech.edu/system-status/)

---

## What this covers

Before assuming a failed job is your fault, check whether PACE itself is having a problem. PACE publishes a live status page that pulls directly from Georgia Tech OIT's central status system, showing whether PACE is Operational or experiencing an outage/incident.

## Why it matters

Debugging a script that isn't actually broken wastes real time. If jobs across the board are failing, hanging, or timing out in ways that don't match anything in your own script, checking system status takes ten seconds and can save an hour of unnecessary troubleshooting.

## Where to check

- **[pace.gatech.edu/system-status](https://pace.gatech.edu/system-status/)** — PACE's own status summary
- **[status.gatech.edu](https://status.gatech.edu/)** — the underlying OIT status page, with more detail on planned maintenance windows and unplanned incidents

## When to check it

- Before spending time debugging a job failure that doesn't obviously trace back to your own script
- Before a big or time-sensitive submission, to check for scheduled maintenance windows
- If multiple people in HAAG report similar failures around the same time — that's a strong signal to check status before assuming it's a shared mistake

## Related

- [303 — Validating Your Job Before Submission](303%20-%20Validating%20Your%20Job%20Before%20Submission.md) — rule out your own script first
- [305 — Getting Help](305%20-%20Getting%20Help.md) — what to do if status is fine but you're still stuck
