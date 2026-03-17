# Code Review Checklist

Use this checklist during Phase 2 of the `code-review` skill. Only report categories with findings.

---

## Correctness

- [ ] Logic errors, off-by-one mistakes, wrong operator
- [ ] Incorrect handling of edge cases (empty input, zero, null/undefined, max values)
- [ ] Race conditions or non-atomic operations on shared state
- [ ] Wrong return type or missing return in all code paths
- [ ] Incorrect error propagation (swallowed exceptions, wrong error codes)

---

## Security

- [ ] **Injection** — SQL, shell, HTML/JS, path traversal (user input hitting a sink without sanitisation)
- [ ] **Auth/Authz** — missing authentication check, IDOR, privilege escalation
- [ ] **Secrets** — API keys, tokens, or passwords hardcoded or logged
- [ ] **Crypto** — weak algorithm (MD5/SHA1 for passwords, ECB mode), hardcoded IV/salt
- [ ] **Dependency** — known-vulnerable package version, unpinned transitive dependency
- [ ] **SSRF / open redirect** — user-controlled URLs passed to HTTP clients

---

## Performance

- [ ] N+1 query inside a loop
- [ ] Missing index on a frequently-filtered column
- [ ] Unbounded result set (no LIMIT / pagination)
- [ ] Blocking I/O in an async/event-loop context
- [ ] Unnecessary re-render or recomputation (frontend)
- [ ] Large payload serialised/deserialised repeatedly

---

## Maintainability

- [ ] Function or method does too many things (violates single responsibility)
- [ ] Magic numbers or strings with no named constant
- [ ] Duplicated logic that should be extracted
- [ ] Dead code, commented-out blocks, unused imports
- [ ] Inconsistent naming with the surrounding codebase
- [ ] Missing or misleading error messages

---

## Test Coverage

- [ ] New logic has no tests
- [ ] Happy path only — no tests for error/edge cases
- [ ] Test assertions too broad (e.g., `assert result is not None`)
- [ ] Mocked out the thing actually being tested

---

## Language-Specific Checks

### JavaScript / TypeScript
- [ ] `any` type used where a proper type exists
- [ ] Unhandled promise rejection (missing `.catch` or `await` without try/catch)
- [ ] `==` instead of `===`
- [ ] Mutating function arguments

### Python
- [ ] Mutable default argument (`def f(x=[]):`)
- [ ] Bare `except:` catching `BaseException`
- [ ] `is` used for value comparison instead of `==`
- [ ] Missing `__all__` on public-facing modules

### Go
- [ ] Unchecked error return
- [ ] Goroutine leak (no context cancellation or done channel)
- [ ] Nil pointer dereference on interface or pointer return

### SQL
- [ ] `SELECT *` where specific columns should be named
- [ ] Non-parameterised query (string concatenation with user input)
- [ ] Missing transaction around multi-statement writes
