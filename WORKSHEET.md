# Debugging notes

Keep each answer to one or two sentences. You may write here or use paper.

## Before Codex

1. **Observation:** After Start → Restart → Restart, what did you expect after three seconds, and what actually happened?

   >

2. **Hypothesis:** Why might repeated Restarts make both Time and the invader advance too quickly, and what would you inspect first?

   >

## After Codex

3. **Root cause and fix:** What survived Restart, and what was the smallest production change?

   >

4. **Diff and test evidence:** Record the changed files and final `npm test` counts. In one sentence, explain how the `FakeScheduler` test proves there is one loop and one frame per tick.

   > pass: / fail: / todo:
   >
   > files changed:
   >
   > test evidence:

5. **Final verification:** What did repeated Restart and ordinary gameplay show, and what did you verify yourself instead of trusting Codex or a green test result?

   >
