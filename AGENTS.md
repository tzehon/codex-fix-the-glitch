# Workshop instructions for Codex

This repository is a deliberately small debugging exercise. Follow these rules for the student task.

## Allowed changes

- You may edit only `src/game-engine.mjs` and `tests/game-engine.test.mjs`.
- Make the smallest code change that fixes the reported repeated-Restart behavior.
- Complete the unfinished test with one focused automated test that would have caught the reported behavior.
- Preserve the exported `GlitchSquadronGame` class.
- Preserve constructor options `durationSeconds`, `laneCount`, `travelRows`, `scheduler`, `random`, and `onChange`.
- Preserve public methods `start()`, `restart()`, `moveLeft()`, `moveRight()`, `fire()`, and `stop()`.
- Preserve the exact frozen snapshot fields `remainingSeconds`, `score`, `breaches`, `playerLane`, `enemyLane`, `enemyRow`, and `isRunning`.
- Preserve steering bounds, firing and hit behavior, scoring, breaches, respawning, Stop, and time-expiry behavior.

## Required verification

- The new test must reproduce repeated Restarts and fail on the untouched starter.
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
