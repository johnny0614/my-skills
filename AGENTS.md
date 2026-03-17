# AGENTS.md

This file explains the `my-skills` repository to AI coding agents (Claude Code, Cursor, OpenCode).

## Purpose

This repository is a collection of **installable AI agent skills** — reusable instruction bundles that extend AI coding agents with new slash commands and workflows. Each skill is a self-contained directory with a `SKILL.md` file that defines the skill's behavior.

## Repository Structure

```
my-skills/
├── AGENTS.md                  # This file — explains the repo to AI agents
├── README.md                  # End-user documentation
├── package.json               # Root package; exposes `my-skills` CLI via `bin`
├── bin/
│   └── install.js             # CLI: `npx my-skills <skill> [--agent=...]`
├── lib/
│   └── install-utils.js       # Shared install logic used by bin/ and per-skill installers
└── skills/                    # One subdirectory per skill
    ├── hello-world/
    ├── git-helpers/
    └── code-review/
```

Legacy skills at the repository root (e.g. `proposal-creator/`) pre-date the `skills/` convention. New skills belong under `skills/`.

## Skill Folder Structure

Every skill under `skills/` follows this layout:

```
skills/<skill-name>/
├── SKILL.md         # Required — YAML frontmatter + skill instructions
├── package.json     # Required — enables `npx` installation of this skill alone
└── ...              # Optional: scripts/, references/, templates/, etc.
```

### SKILL.md Format

```markdown
---
name: skill-name
description: One-line description used for skill discovery
---

# skill-name Skill

Instructions, workflows, and examples for the AI agent...
```

- `name` must match the folder name (kebab-case)
- `description` is shown in skill listings; keep it under 120 characters
- The body is the full prompt/instructions the agent receives when the skill is invoked

## How Skills Are Discovered and Used

| Agent       | Skill location                    | Invocation              |
|-------------|-----------------------------------|-------------------------|
| Claude Code | `~/.claude/skills/<skill-name>/`  | `/<skill-name>`         |
| Cursor      | `~/.cursor/skills/<skill-name>/`  | `/<skill-name>`         |
| OpenCode    | `~/.opencode/skills/<skill-name>/`| `/<skill-name>`         |

The `install.js` CLI copies the skill folder to the correct agent path. The agent must be restarted after installation.

## Guidelines for Contributing New Skills

1. **Create a folder** under `skills/` named in kebab-case (e.g. `skills/my-skill/`)
2. **Write `SKILL.md`** with valid YAML frontmatter (`name`, `description`) and clear agent instructions
3. **Add `package.json`** with a `bin` entry pointing to the shared installer:
   ```json
   {
     "name": "@my-skills/<skill-name>",
     "bin": { "<skill-name>": "../../bin/install.js" }
   }
   ```
4. **Test locally**: run `node bin/install.js <skill-name> --agent=claude` and verify the skill appears in your agent
5. **Keep skills focused**: one skill = one workflow or command domain
6. **Reference files go in subdirectories**: `references/`, `templates/`, `scripts/` — keep `SKILL.md` concise and link out to these files
7. **Agent-specific notes**: if a skill behaves differently across agents, document it in a `## Agent Notes` section in `SKILL.md`
