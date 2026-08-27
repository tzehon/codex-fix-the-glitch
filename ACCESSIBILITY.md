# Accessibility and accommodations

Bug Blaster is designed so the challenge does not depend on color perception, pointer precision, animation, or hearing.

## Keyboard operation

- Use Tab to reach Start, Restart, Stop, and the game cells.
- Activate a focused button with Enter or Space.
- Once a game cell has focus, use the arrow keys to move within the 4×4 grid.
- The active target shows both a bug symbol and the visible word **BUG**.
- Focus has a thick yellow outline that does not rely on the control's color.

## Screen readers and low vision

- The timer and score are visible text outputs with accessible labels.
- The round status announces start, stop, finish, and the numbered target cell.
- Each cell is announced as “empty” or “bug.”
- Browser zoom up to 200% is supported; the controls stack on narrow layouts.
- High-contrast text and borders identify controls independently of color.

Because countdown announcements every second can be distracting, the timer is not a live region. The separate round-status message is live. A screen-reader user can revisit the labeled Time output whenever desired.

## Motion and time pressure

- The interface honors the operating system's **Reduce Motion** preference.
- The target's small visual pop is decorative; no information depends on it.
- Whacking targets for a high score is optional. Reproducing the Restart behavior and running deterministic tests do not require fast pointer use.
- Students who need more time may use the code and test reproduction only, pause the browser portion, or work with the instructor reading the countdown aloud.

## Color and hearing

- No state is communicated only by color.
- The exercise has no audio cues.
- All instructions, status, time, and score information are available as text.

Tell the instructor if another format or input method would make the exercise easier to access. The learning objective is debugging and verification, not reaction speed.
