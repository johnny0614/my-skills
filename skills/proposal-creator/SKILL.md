---
name: proposal-creator
description: Creates software project proposals by clarifying requirements with the user, then generates a PRD (Product Requirements Document) and an Implementation Plan. Use this skill whenever the user asks to create a proposal, PRD, product spec, implementation plan, technical plan, or project brief — even if they don't use those exact words. Also trigger when the user describes a feature idea and wants it formalised into documents.
---

# proposal-creator Skill

You are helping the user create a software project proposal. This involves:

1. Understanding their requirements (from the invocation args or conversation)
2. Clarifying gaps with targeted questions
3. Generating a PRD (Product Requirements Document)
4. Generating an Implementation Plan

Templates and format guidance are in:

- [prd-template.md](references/prd-template.md)
- [impl-plan-template.md](references/impl-plan-template.md)

---

## Phase 1 — Intake

Read the user's initial description carefully. Extract everything already known:

| Field                | Extract from description                      |
| -------------------- | --------------------------------------------- |
| Product/feature name | The thing being built                         |
| Primary goal         | Problem being solved or outcome desired       |
| Target users         | Who will use this                             |
| Tech stack           | Languages, frameworks, services mentioned     |
| Constraints          | Timeline, budget, team size, existing systems |
| In-scope features    | What's explicitly mentioned for v1            |
| Output save path     | Where docs should be saved                    |
| Ticket ID            | If mentioned (e.g. JIRA ticket)               |

If the user's description is very short (< 2 sentences), still proceed to Phase 2 — do not ask them to elaborate in plain text; use AskUserQuestion instead.

---

## Phase 2 — Clarification Loop

Use `AskUserQuestion` to fill key gaps. Rules:

- Maximum **2 rounds** of questions
- Maximum **4 questions per round**
- Only ask questions that **cannot be reasonably inferred** from the description
- Group related questions together in one round
- Do not ask about things the user already told you

### Questions to consider (pick the most important gaps):

**Round 1 — Core scope:**

- "What is the primary problem this solves, or what user pain point does it address?"
- "Who are the primary users or stakeholders?"
- "What features are in scope for v1 vs future phases?"
- "Are there any hard constraints (tech stack, existing systems it must integrate with, timeline)?"

**Round 2 — Technical & delivery (only if needed):**

- "What are the non-functional requirements (scale, performance, security, availability)?"
- "What milestones or timeline are you targeting?"
- "Where should I save the output documents? (e.g. `docs/` folder)" — default to `docs/` if not answered
- "Is there a ticket ID or project code for the implementation plan filename?"

After at most 2 rounds, proceed to Phase 3 regardless of remaining unknowns. Mark unresolved questions as open questions in the documents.

---

## Phase 3 — PRD Generation

Read [prd-template.md](references/prd-template.md) for the full section structure.

**Output file**: `{output_dir}/PRD_{ProductName}.md`

- Default `output_dir`: `docs/`
- `ProductName`: CamelCase, no spaces (e.g. `EmailReminders`, `AutomatedDatabaseDocumentation`)

**Requirements:**

- Include ALL 13 sections from the PRD template
- Use the exact section numbering and heading format from the template
- Fill every section with content derived from the user's answers
- For unknown/unresolved items, write them as open questions in §12
- Match the writing style of the example PRD: concise bullet points, tables for structured data, code blocks for examples
- The product header block (before §1) must include: Product name, Primary Goal, Primary Users, Tech stack/Datastore, Scope Mode, Output format, Auth/Access

**After writing the PRD**, tell the user where it was saved and briefly summarise the key scope decisions.

---

## Phase 4 — Implementation Plan Generation

Read [impl-plan-template.md](references/impl-plan-template.md) for the full structure.

**Output file**: `{output_dir}/{TicketId}-implementation-plan.md`

- If no ticket ID: `{output_dir}/{ProductName}-implementation-plan.md`

**Requirements:**

- Include: header block, Overview, Milestone Summary table, Task Dependency Graph (ASCII), File Layout (end state), per-milestone task blocks, Pre-push Checklist, Open Questions table
- Milestones: use M0 (prerequisites/design), M1 (MVP), M2 (hardening) structure — adjust names to fit the domain
- Each task must have: Owner, Depends on, Blocks, Goal, Steps/specs, Acceptance criteria checkboxes
- Task IDs: `T-{milestone}.{number}` (e.g. T-0.1, T-1.1)
- Cross-reference the PRD with a relative link in the header
- The Task Dependency Graph must be an ASCII arrow diagram showing which tasks block which

**After writing the plan**, tell the user where it was saved and list the milestones with their goals.

---

## Output Summary

After both documents are created, provide the user with:

```
## Proposal Created

**PRD**: `{path}/PRD_{ProductName}.md`
**Implementation Plan**: `{path}/{filename}-implementation-plan.md`

### Key Decisions
- Scope: [2-3 bullets on what's in/out of scope]
- Milestones: M0 (X), M1 (Y), M2 (Z)
- Open Questions: [count] items remaining (see §12 of PRD)
```

---

## Style Guidelines

- Use the **same tone and format** as the example PRD and implementation plan
- Use bold for emphasis on key constraints and decisions
- Use tables for structured comparisons
- Use code blocks for CLI examples, SQL snippets, file layouts, and sample output
- Use ✅ to mark resolved open questions
- Milestone estimates: use "≤ N weeks" format, not specific dates
- Acceptance criteria: always as checkbox lists `- [ ]`
