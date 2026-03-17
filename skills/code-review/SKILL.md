---
name: code-review
description: Structured code review covering correctness, security, performance, and maintainability — with a per-language checklist.
---

# code-review Skill

Perform a thorough, structured code review of the files or diff the user provides. Follow the phases below in order.

---

## Phase 1 — Scope

Identify what to review:
- If the user provides a file path or diff, review that
- If no target is given, check `git diff main...HEAD` (or `git diff HEAD~1`) for the most recent changes
- Confirm the scope with the user before proceeding if it's more than ~500 lines

---

## Phase 2 — Review

Work through the checklist in `templates/review-checklist.md`. For each category, list only the **findings** — skip categories with no issues.

Format each finding as:

```
**[SEVERITY]** `path/to/file.ext:LINE` — Short title
> Explanation of the problem and why it matters.
> Suggested fix (code snippet if helpful).
```

Severity levels: `CRITICAL` · `HIGH` · `MEDIUM` · `LOW` · `NIT`

Use **CRITICAL** only for security vulnerabilities, data loss risks, or correctness bugs that will cause failures in production.

---

## Phase 3 — Summary

After the findings, output:

```
## Review Summary

**Files reviewed**: N  |  **Lines changed**: ~N
**Findings**: N critical · N high · N medium · N low · N nits

### Must Fix Before Merge
- [ ] Finding title (CRITICAL/HIGH)
- [ ] ...

### Suggested Improvements
- [ ] Finding title (MEDIUM/LOW)
- [ ] ...
```

If there are no findings in a tier, omit it.

---

## Phase 4 — Positive Notes (optional)

If the code has notable strengths (clever algorithm, good test coverage, clean API design), mention 1–3 of them briefly after the summary.

---

## Agent Notes

- Adapt the review depth to the diff size: quick scan for < 50 lines, deep review for > 200 lines
- For language-specific checks, use the per-language sections in `templates/review-checklist.md`
- If the user asks for a review of a specific category only (e.g. "just check security"), skip the others
- Works across Claude Code, Cursor, and OpenCode
