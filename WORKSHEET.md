# Debugging worksheet

Write short answers. Plain text in this file or notes on paper are both fine.

## Before Codex

### Observation

What exact sequence did you perform?

> Start →

During ordinary play, what happened to Time and the invader after one real second?

>

After Start → Restart → Restart, record the visible state before and after three real seconds:

> Before — Time: / Invader row or range: / Breaches:
>
> After — Time: / Invader row or range: / Breaches:

What did you expect?

>

What actually happened?

>

### Hypothesis

Complete this sentence before asking Codex:

> I think repeated Restart presses make the game loop run at hyper-speed because…

Which file or function would you inspect first, and why?

>

## After Codex

### Root cause and diff review

What caused the extra countdown ticks and invader steps?

>

What production lines changed?

>

Was every changed line necessary? Why or why not?

>

What could go wrong if the change handled Restart but not Stop or time expiry?

>

Did any file outside `src/game-engine.mjs` and `tests/game-engine.test.mjs` change?

>

### Evidence

Record the final test counts:

> pass:
>
> fail:
>
> todo:

What makes the regression test deterministic?

>

How does the test prove both one active game loop and one frame of progress per fake tick?

>

What did your manual Start → Restart → Restart check show?

>

Did steering, firing, scoring, breaches, Stop, and time expiry still work?

>

### Reflection

What did Codex do well?

>

What did you need to verify yourself?

>

If the tests passed but the browser still ran at hyper-speed, what would you inspect next?

>

## Optional early-finisher extension

Do not change production code. Draft one additional deterministic test for either:

- Restart after the round has already finished, or
- Calling Stop twice.

State the setup, action, and exact assertions, including the expected active-loop count. Then ask a classmate whether your test would catch a real regression or merely repeat existing coverage.

>
