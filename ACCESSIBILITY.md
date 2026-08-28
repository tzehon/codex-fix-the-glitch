# Accessibility and accommodations

Glitch Squadron is designed so the debugging challenge does not depend on color perception, pointer precision, animation, hearing, or fast reactions.

## Keyboard and alternative input

- Use Tab to reach Start, Restart, Stop, Move Left, Fire, and Move Right.
- Activate a focused button with Enter or Space.
- During play, Left Arrow or A moves the ship left; Right Arrow or D moves it right; Space or Enter fires.
- The ship is clamped to the five lanes, so movement cannot leave the playfield.
- Visible movement and Fire buttons provide the same actions for pointer, touch, switch, or keyboard users.
- Every interactive control has a visible high-contrast focus indicator.

## Screen readers and low vision

- Time, Score, and Breaches are visible text outputs with accessible labels.
- Text telemetry identifies the ship lane, invader lane, and remaining range, so state is not conveyed only by position or animation.
- The player ship and invader use distinct visible symbols and text labels, not color alone.
- Round status announces meaningful events such as start, hit, breach, stop, and finish.
- Browser zoom up to 200% is supported; controls and telemetry reflow on narrow layouts.
- High-contrast borders and labels remain identifiable in forced-colors modes.

The countdown and invader position are not live-announced every second because constant announcements can be distracting. A screen-reader user can revisit the labeled Time output and telemetry whenever desired.

## Motion and time pressure

- The interface honors the operating system's **Reduce Motion** preference.
- The laser is an instant high-contrast flash; no essential information depends on motion or a long animation.
- Scoring is optional. To reproduce the defect, press Start → Restart → Restart and observe the textual Time and invader telemetry without steering or firing.
- The deterministic `FakeScheduler` regression test requires no real waiting or quick reaction.
- Students who need more time may use only the telemetry-and-test path, pause the browser portion, or work with an instructor or partner reading state changes aloud.

## Color and hearing

- No state is communicated only by color.
- The exercise has no required audio cues.
- Instructions, controls, status, time, score, breaches, and telemetry are available as text.

Tell the instructor if another format or input method would make the exercise easier to access. The learning objective is debugging and verification, not shooter performance or reaction speed.
