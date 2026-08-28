# Challenge: Fix the Glitch

Your goal is to diagnose and repair one Glitch Squadron behavior while keeping the shooter intact. The symptom is designed to be obvious; the cause is yours to investigate.

## 1. Establish the baseline (minutes 0–5)

From the repository root, run:

```bash
npm run preflight
npm test
npm start
```

Open <http://127.0.0.1:4173>. The starter suite should show five passing tests and one TODO, with no failures.

Press **Start**. Use Left/Right or A/D to steer and Space/Enter to fire. The visible Move Left, Fire, and Move Right buttons provide the same actions. In ordinary play, Time should drop once and the invader should descend one row per real second.

## 2. Reproduce and measure the problem (minutes 5–8)

Use this exact sequence so everyone observes the same behavior:

1. Press **Start** and watch Time and the invader telemetry for two seconds.
2. Refresh the browser page to reset everything.
3. Press **Start**, then press **Restart** twice quickly.
4. Do not steer or fire. Watch Time and the invader's row/range for three real seconds. Use a phone clock if helpful.

Expected: no matter how often Restart was pressed, one real second causes one countdown tick and one invader step.

Actual: after repeated Restarts, the countdown and invader run at obvious hyper-speed. The invader may breach and respawn several times while the clock falls multiple seconds per real second.

This reproduction does not require quick reflexes. Record the visible Time and telemetry before and after the three-second observation in [WORKSHEET.md](WORKSHEET.md).

## 3. Write a hypothesis (minutes 8–10)

Write a one-sentence hypothesis in [WORKSHEET.md](WORKSHEET.md) **before** opening Codex. A hypothesis can be wrong; it just needs to be specific enough to investigate.

## 4. Give Codex one bounded task (minutes 10–19)

Open this repository folder in Codex Desktop. Copy the prompt from [STUDENT_PROMPT.md](STUDENT_PROMPT.md) into a new Codex task.

Codex may change only:

- `src/game-engine.mjs`
- `tests/game-engine.test.mjs`

Let it complete one primary attempt. If verification exposes a problem, use at most one short correction prompt that describes the evidence.

## 5. Review the complete diff and test (minutes 19–24)

Before accepting the result, inspect the **complete diff** in Codex or run:

```bash
git diff -- src/game-engine.mjs tests/game-engine.test.mjs
```

Check that:

- Only the two allowed files changed.
- The production fix is focused rather than a rewrite.
- The existing behavior-named `test.todo` became a deterministic test using `FakeScheduler`.
- The regression test proves repeated Restarts leave one active loop and one fake tick advances Time and the invader exactly once.
- No test was deleted, skipped, weakened, or made dependent on real waiting.
- The `GlitchSquadronGame` public API and exact snapshot shape remain unchanged.
- No package or unrelated feature was added.

If you cannot explain a changed line, ask Codex what it does before moving on.

Run:

```bash
npm test
```

Success means six passing tests, zero failures, and zero TODOs.

## 6. Verify in the browser (minutes 24–27)

Run the game and repeat Start → Restart → Restart several times. Time and the invader should now advance once per real second, regardless of the number of Restarts.

Also confirm that:

- Left/Right and A/D stay within the five lanes.
- A miss does not score; a lined-up shot scores once and respawns the invader.
- Reaching the player row adds one Breach and respawns the invader.
- Stop and time expiry end the round cleanly.

## 7. Correct once if needed, then debrief (minutes 27–30)

If your evidence shows a remaining defect, give Codex at most one short correction prompt quoting that evidence. Rerun the tests and manual check, then record your root cause and final evidence in [WORKSHEET.md](WORKSHEET.md).

## Success criteria

- The hyper-speed symptom no longer occurs after any number of Restarts.
- Exactly one game loop is active during a round.
- One elapsed second produces one countdown tick and one invader step.
- Stopping or finishing a round leaves no active loop.
- Steering, firing, scoring, breaches, and respawning still work.
- All six tests pass with no TODOs.
- You can explain the root cause, fix, and regression test in your own words.

Finished early? Explain why the injected fake scheduler makes a better regression test than real-time waiting. Do not add extra production features until the required fix is verified.
