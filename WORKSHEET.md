# Debugging worksheet

Write short answers. Plain text in this file or notes on paper are both fine.

## Before Codex

### Observation

What did you do?

> Start →

What did you expect?

>

What actually happened? Include a rough measurement.

>

### Hypothesis

Complete this sentence before asking Codex:

> I think repeated Restart presses cause the countdown to speed up because…

Which file or function would you inspect first, and why?

>

## After Codex

### Diff review

What production lines changed?

>

Was every changed line necessary? Why or why not?

>

What could go wrong if the change handled Restart but not Stop or game over?

>

### Evidence

Record the final test counts:

> pass:
> fail:
> todo:

What setup makes the regression test deterministic?

>

What did your manual browser check show?

>

### Reflection

What did Codex do well?

>

What did you need to verify yourself?

>

If the test passed but the browser still failed, what would you inspect next?

>

## Optional early-finisher extension

Do not change production code. Draft (on paper or below) one additional test case for either:

- Restart after the round has already finished, or
- Calling Stop twice.

State the setup, action, and exact assertions. Then ask a classmate whether your test would catch a real regression or merely repeat existing coverage.

>
