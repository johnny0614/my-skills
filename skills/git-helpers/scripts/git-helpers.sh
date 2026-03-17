#!/usr/bin/env bash
# git-helpers.sh — standalone helpers that mirror the skill's workflows
# These are optional; the AI skill above does not require them.

set -euo pipefail

cmd="${1:-help}"

case "$cmd" in
  commit)
    # Show staged diff summary and open $EDITOR for commit message
    git diff --staged --stat
    git commit --edit -m "$(git log -1 --pretty=%s 2>/dev/null || echo 'feat: ')"
    ;;

  clean)
    # List and delete branches whose remote is gone
    git fetch --prune
    gone=$(git branch -vv | grep ': gone]' | awk '{print $1}')
    if [ -z "$gone" ]; then
      echo "No stale branches found."
    else
      echo "Stale branches:"
      echo "$gone"
      read -rp "Delete all? [y/N] " confirm
      if [[ "$confirm" =~ ^[Yy]$ ]]; then
        echo "$gone" | xargs git branch -d
      fi
    fi
    ;;

  pr-prep)
    base="${2:-main}"
    echo "=== Uncommitted changes ==="
    git status --short

    echo "=== Commits since $base ==="
    git log "${base}..HEAD" --oneline

    echo "=== Behind $base ==="
    git log "HEAD..origin/${base}" --oneline || true
    ;;

  help|*)
    echo "Usage: git-helpers.sh <commit|clean|pr-prep [base-branch]>"
    ;;
esac
