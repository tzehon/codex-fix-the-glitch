# Prompt for Codex

Copy everything inside the block into a new Codex chat opened on this repository.

```text
Investigate and fix this Glitch Squadron problem:

After I press Start and then press Restart twice quickly, both the countdown and
the descending invader advance several times per real second. They should each
advance exactly once per real second, regardless of how many times Restart is
pressed.

Please:

1. Find the cause and explain it briefly.
2. Make the smallest change that fixes it without breaking the rest of the game.
3. Add a test that would have caught this problem.
4. Run the tests and make sure everything passes.
5. Summarize what changed and tell me how I can verify the fix myself.

Keep the change focused. Do not redesign the game or remove existing tests.
```

You remain the reviewer: inspect every change, run `npm test` yourself, and repeat the browser steps.
