---
name: hello-world
description: Minimal example skill that demonstrates the skill format. Use this as a starting point for new skills.
---

# hello-world Skill

This skill exists to demonstrate the skill format and verify that your skill installation is working correctly.

---

## When Invoked

When the user runs `/hello-world`, respond with:

1. Confirm the skill is loaded and working
2. Print a short summary of what skills are and how they work
3. Point the user to the `skills/hello-world/SKILL.md` file in the `my-skills` repository as a template

---

## Example Response

```
✅ hello-world skill is working!

Skills are reusable instruction bundles that extend your AI agent with new slash commands.
This skill lives at: skills/hello-world/SKILL.md

To create your own skill:
  cp -r skills/hello-world skills/my-skill
  # Edit skills/my-skill/SKILL.md
  node bin/install.js my-skill
```

---

## Notes

- This skill has no external dependencies
- It works identically across Claude Code, Cursor, and OpenCode
- See [AGENTS.md](../../AGENTS.md) for the full skill authoring guide
