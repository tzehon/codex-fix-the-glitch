# Challenge: Fix the Glitch

Your goal is to diagnose and repair one Bug Blaster behavior while keeping the rest of the game intact. The symptom is designed to be obvious; the cause is yours to investigate.

## 1. Establish the baseline

From the repository root, run:

```bash
npm run preflight
npm test
npm start
```

Open <http://127.0.0.1:4173>. The starter suite should show five passing tests and one TODO, with no failures.

## 2. Reproduce the problem

Use this exact sequence so everyone observes the same behavior:

1. Press **Start** and watch the countdown for two seconds.
2. Refresh the browser page to reset everything.
3. Press **Start**, then press **Restart** twice quickly.
4. Watch the countdown for three real seconds. Use a phone clock if helpful.

Expected: the countdown loses about one second per real second, no matter how often Restart was pressed.

Actual: after repeated Restarts, the countdown loses several seconds per real second.

Write a one-sentence hypothesis in [WORKSHEET.md](WORKSHEET.md) **before** opening Codex. A hypothesis can be wrong; it just needs to be specific enough to investigate.

## 3. Give Codex one bounded task

Open this repository folder in Codex Desktop. Copy the prompt from [STUDENT_PROMPT.md](STUDENT_PROMPT.md) into a new Codex task.

Codex may change only:

- `src/game-engine.mjs`
- `tests/game-engine.test.mjs`

Let it complete one primary attempt. If verification exposes a problem, use at most one short correction prompt that describes the evidence.

## 4. Review the work

Before accepting the result, inspect the **complete diff** in Codex or run:

```bash
git diff -- src/game-engine.mjs tests/game-engine.test.mjs
```

Check that:

- Only the two allowed files changed.
- The production fix is focused rather than a rewrite.
- The existing `test.todo` became a real deterministic test using `FakeScheduler`.
- No test was deleted, skipped, weakened, or made dependent on real waiting.
- No package or unrelated feature was added.

If you cannot explain a changed line, ask Codex what it does before moving on.

## 5. Verify independently

Run:

```bash
npm test
```

Success means six passing tests, zero failures, and zero TODOs. Then run the game and repeat Start → Restart → Restart. The countdown should now lose one second per real second.

Finish [WORKSHEET.md](WORKSHEET.md). Be ready to explain what Codex did and what evidence convinced you it was correct.

## Success criteria

- The symptom no longer occurs after any number of Restarts.
- Exactly one game countdown is active during a round.
- Stopping or finishing a round leaves no countdown active.
- Normal scoring still works.
- All six tests pass with no TODOs.
- You can explain the root cause, fix, and regression test in your own words.

Finished early? See the optional extension in [WORKSHEET.md](WORKSHEET.md). Do not add extra production features until the required fix is verified.
