# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Repo Is

A collection of installable AI agent skills. Each skill is a directory containing a `SKILL.md` with YAML frontmatter (`name`, `description`) and agent instructions. Skills are installed to agent-specific paths via the `bin/install.js` CLI.

## Key Commands

```bash
# List available skills
node bin/install.js list

# Install a skill (auto-detects agent)
node bin/install.js <skill-name>

# Install to a specific agent
node bin/install.js <skill-name> --agent=claude
node bin/install.js <skill-name> --agent=cursor
node bin/install.js <skill-name> --agent=opencode
```

## Architecture

```
bin/install.js          # CLI entry point (the `my-skills` npx command)
lib/install-utils.js    # Shared logic: agent detection, install paths, file copy
skills/<name>/
  SKILL.md              # Required: YAML frontmatter + agent instructions
  package.json          # Required: bin entry for per-skill npx installation
  scripts/ templates/ references/   # Optional supporting files
proposal-creator/       # Legacy skill at root (pre-dates skills/ convention)
```

### Agent Install Paths

| Agent     | Path                           |
|-----------|--------------------------------|
| Claude    | `~/.claude/skills/<name>/`     |
| Cursor    | `~/.cursor/skills/<name>/`     |
| OpenCode  | `~/.opencode/skills/<name>/`   |

Agent detection order in `lib/install-utils.js`: env vars → presence of `~/.claude` / `~/.cursor` / `~/.opencode`.

## Adding a New Skill

1. Create `skills/<name>/SKILL.md` with `name` and `description` frontmatter
2. Add `skills/<name>/package.json` with `"bin": { "<name>": "../../bin/install.js" }`
3. Verify: `node bin/install.js list` should show the new skill

## Skill SKILL.md Format

```markdown
---
name: skill-name
description: One-line description (≤120 chars)
---

# skill-name Skill

Instructions the agent follows when /<skill-name> is invoked...
```
