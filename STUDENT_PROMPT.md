# Prompt for Codex

Copy everything inside the block into a new Codex task opened on this repository.

```text
Fix this Glitch Squadron defect:

After I press Start and then press Restart twice quickly, both the countdown and
the descending invader advance several times per real second. They should each
advance exactly once per real second, regardless of how many times Restart is
pressed.

Please inspect the existing implementation and tests, then:

1. Explain the root cause briefly.
2. Make the smallest reasonable production fix in src/game-engine.mjs.
3. Replace the behavior-named test.todo in tests/game-engine.test.mjs with one
   deterministic regression test using the existing FakeScheduler. The test
   must prove repeated restarts leave one active game loop and one fake tick
   decreases the countdown by one second and moves the invader by one row. Do
   not use real waiting.
4. Run npm test and stop only when all six tests pass with no TODOs.
5. Summarize the files changed and tell me what to inspect in the complete diff.

You may edit only src/game-engine.mjs and tests/game-engine.test.mjs. Preserve
the exported GlitchSquadronGame class; constructor options durationSeconds,
laneCount, travelRows, scheduler, random, and onChange; public methods start(),
restart(), moveLeft(), moveRight(), fire(), and stop(); and the exact frozen
snapshot fields remainingSeconds, score, breaches, playerLane, enemyLane,
enemyRow, and isRunning.

Do not install packages, browse the web, use plugins or subagents, redesign the
UI, deploy anything, or modify any other file. Do not delete or weaken existing
tests.
```

You remain the reviewer. A confident explanation is not proof: inspect the diff, run the tests yourself, and manually repeat the browser reproduction sequence.
