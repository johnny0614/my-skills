---
name: git-helpers
description: Common Git workflows — interactive conventional commits, stale branch cleanup, and pre-PR checklist.
---

# git-helpers Skill

Provides three Git workflow commands. Detect which the user wants from their invocation args or follow-up message.

---

## Commands

### `/git-helpers commit`

Guide the user through creating a well-formed **conventional commit**:

1. Run `git diff --staged --stat` to summarise staged changes
2. If nothing is staged, run `git status` and suggest which files to stage
3. Infer the commit type from the changes: `feat`, `fix`, `chore`, `refactor`, `docs`, `test`, `perf`
4. Ask one clarifying question if the scope is ambiguous
5. Draft the commit message in the format: `<type>(<scope>): <short description>`
6. Add an optional body if the change is non-trivial (breaking changes, reasoning)
7. Show the final message and ask for confirmation before running `git commit -m "..."`

**Rules:**
- Never use `--no-verify`
- Keep the subject line ≤ 72 characters
- Use imperative mood ("add", not "added" or "adds")

---

### `/git-helpers clean`

Clean up stale local branches:

1. Run `git fetch --prune` to sync remote state
2. List branches whose remote tracking ref is gone: `git branch -vv | grep ': gone]'`
3. Show the list to the user with the last commit date and message for each branch
4. Ask: "Delete all of these, or pick specific ones?"
5. Delete confirmed branches with `git branch -d <branch>` (safe delete — use `-D` only if the user explicitly requests force-delete)

---

### `/git-helpers pr-prep`

Prepare the current branch for a pull request:

1. Identify the base branch (ask if unclear; default to `main` or `master`)
2. Run the following checks and report pass/fail for each:
   - [ ] No uncommitted changes (`git status`)
   - [ ] Branch is up to date with base (`git log HEAD..origin/<base> --oneline`)
   - [ ] No merge conflict markers in changed files (`grep -r "<<<<<<" $(git diff --name-only <base>)`)
   - [ ] Commit messages follow conventional format
3. Show a summary of commits since the base: `git log <base>..HEAD --oneline`
4. Suggest a PR title based on the commit summary
5. Offer to push the branch: `git push -u origin <branch>`

---

## Agent Notes

- All commands read from the working directory's git repo — no extra config needed
- Works across Claude Code, Cursor, and OpenCode
- The shell scripts in `scripts/` are optional helpers; the skill works without them
