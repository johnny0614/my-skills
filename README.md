# my-skills

A collection of installable AI agent skills for Claude Code, Cursor, and OpenCode.

## Install a Skill

```bash
# Install a skill to your active AI agent
npx my-skills <skill-name>

# Install to a specific agent
npx my-skills <skill-name> --agent=claude
npx my-skills <skill-name> --agent=cursor
npx my-skills <skill-name> --agent=opencode

# List available skills
npx my-skills list
```

After installation, restart your agent and invoke the skill with `/<skill-name>`.

## Available Skills

| Skill | Description |
|-------|-------------|
| [`hello-world`](skills/hello-world/) | Minimal example skill — demonstrates the skill format |
| [`git-helpers`](skills/git-helpers/) | Interactive commit creation, branch cleanup, and PR prep |
| [`code-review`](skills/code-review/) | Structured code review with security, perf, and style checklists |
| [`proposal-creator`](proposal-creator/) | Generate PRDs and implementation plans from feature descriptions |

## Create a New Skill

```bash
# 1. Copy the hello-world template
cp -r skills/hello-world skills/my-skill

# 2. Edit the frontmatter and instructions
edit skills/my-skill/SKILL.md

# 3. Test locally
node bin/install.js my-skill --agent=claude
```

See [AGENTS.md](AGENTS.md) for the full skill authoring guide.

## Contribute

1. Fork this repo
2. Create a skill under `skills/` following the structure in [AGENTS.md](AGENTS.md)
3. Open a PR — include a short demo or usage example in the PR description
