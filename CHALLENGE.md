# Challenge: Fix the Glitch

Your goal is to diagnose and repair one Glitch Squadron behavior while keeping the shooter intact. The symptom is designed to be obvious; the cause is yours to investigate.

## 1. Establish the baseline (minutes 0–5)

From the repository root, run:

```bash
npm run preflight
npm test
npm start
```

Open <http://127.0.0.1:4173>. `npm test` should finish with no failures: five checks pass and one is deliberately unfinished.

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

Write a one-sentence hypothesis on paper or in a note **outside this repository** before contacting Codex. A hypothesis can be wrong; it just needs to be specific enough to investigate. Do not put it in a project file yet because Codex can read those files. After Codex reports its diagnosis, copy your original sentence into [WORKSHEET.md](WORKSHEET.md) unchanged so you can compare the two.

## 4. Write your own Codex request (minutes 10–19)

In the ChatGPT desktop app, select this clone under **Projects**, choose **Codex** from the ChatGPT dropdown, then start **New chat** in the **Local** environment.

Do not paste a prepared prompt. Write one short request yourself. It should:

- State what you observed and what you expected, using your measurements from step 2.
- Ask Codex to investigate and fix the problem without naming a file or suggesting a cause.
- Ask for a focused change and an automated check that would catch the same problem if it returned.
- Ask Codex to run the checks, explain the cause in plain language, and tell you how to verify the result.

The repository includes rules that keep Codex focused while leaving the diagnosis to it. Keep your outside-the-project hypothesis private until Codex reports its cause.

Let Codex complete one primary attempt. If verification exposes a problem, use at most one short follow-up that describes the evidence.

## 5. Review what changed and run the checks (minutes 19–24)

Copy your original hypothesis into [WORKSHEET.md](WORKSHEET.md) unchanged, then compare it with Codex's diagnosis.

Open Codex's changes view and inspect every changed line. This before-and-after view is called a **diff**. If you prefer the terminal, run:

```bash
git status --short
git diff
```

Check that:

- The change is small and directly related to the bug.
- Codex added a test that would catch the repeated-Restart problem if it returned.
- The original tests are still present and still pass.
- No packages, unrelated features, or unrelated files were added.

If you cannot explain a changed line, ask Codex what it does before moving on.

Run:

```bash
npm test
```

Success means all six tests pass, with no failures or unfinished tests.

## 6. Verify in the browser (minutes 24–27)

Run the game and repeat Start → Restart → Restart several times. Time and the invader should now advance once per real second, regardless of the number of Restarts.

Also confirm that:

- Left/Right and A/D stay within the five lanes.
- A miss does not score; a lined-up shot scores once and respawns the invader.
- Reaching the player row adds one Breach and respawns the invader.
- Stop and time expiry end the round cleanly.

## 7. Correct once if needed, then debrief (minutes 27–30)

If your evidence shows a remaining defect, give Codex at most one short follow-up quoting that evidence. Rerun the tests and manual check, then record your root cause and final evidence in [WORKSHEET.md](WORKSHEET.md).

## Success criteria

- The hyper-speed symptom no longer occurs after any number of Restarts.
- One elapsed second produces one countdown tick and one invader step.
- After Stop or time expiry, further elapsed time does not change the round.
- Steering, firing, scoring, breaches, and respawning still work.
- All six tests pass.
- You can explain the cause, the code change, and the new test in your own words.

Finished early? Explain why an automated test is more reliable than timing the game by hand. Do not add extra production features until the required fix is verified.
