# Workshop instructions for Codex

This repository is a deliberately small debugging exercise. Treat the student's request as the task, investigate before editing, and follow these rules.

## Scope

- Make the smallest code change that fixes the behavior reported by the student.
- Keep production and test changes limited to the existing game logic and its test suite.
- Preserve the exported game class, its current public API, the exact frozen snapshot shape, and unaffected gameplay behavior.
- Complete one focused automated regression test that would catch the reported problem if it returned.

## Required verification

- The new test must fail on the untouched starter and pass with the fix.
- Keep the test fast and reliable; do not wait for real time.
- Run `npm test` after making changes.
- Stop only when all six tests pass and there are no TODO tests.
- Summarize the root cause, the exact change, and how the new test would catch the problem if it returned.
- Explain the result in plain language and define any testing term you must use.
- Tell the student to review the complete diff before accepting the work.

## Boundaries

- Do not install packages or add dependencies.
- Do not browse the web.
- Do not use plugins, skills, subagents, image generation, or external services.
- Do not add a backend, API key, deployment configuration, generated assets, or build tooling.
- Do not edit documentation, the browser UI, workflow files, package metadata, or unrelated code.
- Do not delete, skip, or weaken an existing passing test.
