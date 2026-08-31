# Debugging notes

Keep each answer to one or two sentences.

## Before Codex

1. **Observation:** After Start → Restart → Restart, what did you expect after three seconds, and what actually happened?

   >

**Private hypothesis:** Before contacting Codex, write your one-sentence guess on paper or in a note outside this repository. Do not copy it into a project file yet because Codex can read those files.

## After Codex

2. **Original hypothesis and comparison:** Copy your outside-the-project sentence here unchanged. How did it compare with Codex's diagnosis?

   >

3. **Root cause and fix:** What caused the observed behavior, and what was the smallest production change?

   >

4. **Evidence:** What did Codex change, what did `npm test` report, and how does the new test show that repeated Restart is fixed?

   > npm test result:
   >
   > what changed:
   >
   > what the new test showed:

5. **Final verification:** What did repeated Restart and ordinary gameplay show, and what did you verify yourself instead of trusting Codex or a passing test result?

   >
