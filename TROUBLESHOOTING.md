# Troubleshooting

Use the smallest relevant fix. This workshop needs no package installation and no API key.

## `node` or `npm` is not found

- Run `node --version` and `npm --version` in a newly opened terminal.
- Install the current LTS release from the official [Node.js download page](https://nodejs.org/en/download/).
- macOS: use the `.pkg`, then quit and reopen Terminal.
- Windows: use the `.msi` with the default PATH option, then close and reopen PowerShell or Windows Terminal. Restart Windows if the old terminal environment persists.
- Confirm Node is v22 or newer.

## PowerShell blocks `npm.ps1`

Do not change a university-managed execution policy. Use the Windows command shims instead:

```powershell
npm.cmd run preflight
npm.cmd test
npm.cmd start
```

## npm says `Unknown command: "preflight"`

Use `npm run preflight`. The `run` keyword is required for package scripts; `npm preflight` is not the workshop command.

## Preflight says a file is missing

Confirm you are in the repository root:

```bash
pwd
```

In PowerShell, use:

```powershell
Get-Location
```

The folder should contain `package.json`, `CHALLENGE.md`, `src`, and `tests`. If it does not, `cd` into the cloned `codex-fix-the-glitch` folder. If files are genuinely missing, clone a fresh copy rather than inventing replacements.

## Port 4173 is already in use

Start on another local port:

```bash
npm start -- --port 4174
```

Then open <http://127.0.0.1:4174>.

## The browser shows an old version

- Confirm the terminal still shows the server running.
- Use a normal refresh first, then a hard refresh if necessary.
- Check that the browser URL uses the same port printed by `npm start`.
- Do not open `index.html` directly from Finder or File Explorer; use the local `http://127.0.0.1` address.

## Steering or firing does not respond

- Make sure the round is running; press **Start** first.
- Use the visible Move Left, Fire, and Move Right buttons to confirm the game works independently of shortcut keys.
- Return focus to the game page if the browser address bar, developer tools, or another application has focus.
- Left/Right or A/D steers. Space/Enter fires. When a control button has focus, Enter or Space activates that focused button.
- A shot scores only when the player and invader share a lane. The textual telemetry shows both lanes.

## The game runs at hyper-speed after Restart

On the untouched starter, this is the **intended defect for the challenge**. Do not refresh it away during the measured reproduction. Record the Time and invader telemetry, write your hypothesis, and then follow [CHALLENGE.md](CHALLENGE.md).

After your fix, `npm test` should show all six tests passing. If the browser still runs too fast, stop and restart `npm start`, refresh the page, review every change, and give Codex at most one evidence-based follow-up.

## Codex cannot see the files

- Under **Projects**, select the cloned `codex-fix-the-glitch` folder. If it is missing, add that folder as a local project; do not choose its parent or a ZIP archive.
- Open the **ChatGPT dropdown** and select **Codex**.
- With the student project selected, choose **New chat** and the **Local** environment.
- Confirm the project files appear before sending your request.
- If sign-in or Codex access is unavailable, tell the instructor; do not enter someone else's credentials or an unapproved API key.

## Tests do not match the expected starter counts

Before the exercise, `npm test` should show no failures: five tests pass and one is deliberately unfinished.

```bash
git status --short
git diff
```

These commands only display your current changes; they do not alter files.

If you have not begun and the working tree is changed, ask the instructor whether to restore it or make a fresh clone. Do not run destructive Git commands on work you want to keep.

## The server will not stop

Return to the terminal where it is running and press `Ctrl+C`. Closing that terminal also ends the local server. The server listens only on `127.0.0.1`, so it is not exposed to other machines on the network.
