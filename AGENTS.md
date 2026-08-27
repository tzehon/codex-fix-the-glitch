# Workshop instructions for Codex

This repository is a deliberately small debugging exercise. Follow these rules for the student task.

## Allowed changes

- You may edit only `src/game-engine.mjs` and `tests/game-engine.test.mjs`.
- Make the smallest production change that fixes the reported behavior.
- Replace the existing behavior-named `test.todo` with one deterministic regression test.
- Preserve the exported `BugBlasterGame` class, its constructor options, public methods, and the exact snapshot fields.

## Required verification

- Run `npm test` after making changes.
- Stop only when all six tests pass and there are no TODO tests.
- Summarize the root cause, the exact change, and how the new test proves the fix.
- Tell the student to review the complete diff before accepting the work.

## Boundaries

- Do not install packages or add dependencies.
- Do not browse the web.
- Do not use plugins, skills, subagents, image generation, or external services.
- Do not add a backend, API key, deployment configuration, generated assets, or build tooling.
- Do not edit documentation, the browser UI, workflow files, package metadata, or unrelated code.
- Do not delete or weaken an existing passing test.
