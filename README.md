# Codex: Fix the Glitch — Glitch Squadron

Welcome to a short, hands-on debugging challenge. You will investigate a visible defect in **Glitch Squadron**, form a hypothesis, ask Codex for one bounded change, and verify the result yourself.

Glitch Squadron is a small top-down shooter with five lanes and seven rows. Steer the ship left or right, line up with the descending invader, and fire before it breaches the bottom row. The project uses only Node.js built-ins plus browser-native HTML, CSS, and JavaScript. There is no `npm install`, backend, or API key. The game and tests make no external network requests; `npm start` serves only this folder on your own computer.

## What you will practice

- Reproduce a bug before changing code.
- State expected and actual behavior precisely.
- Give a coding agent a narrow, testable task.
- Inspect a code diff instead of accepting it blindly.
- Use a deterministic regression test to verify a fix.

Allow about 30 minutes. Start with [CHALLENGE.md](CHALLENGE.md) after setup.

## How to play

- Press **Start** to begin a 20-second round.
- With the battlefield focused, use **Left Arrow**/**A** and **Right Arrow**/**D**, or the visible Move buttons, to steer. Start and Restart focus it automatically.
- Use **Space**/**Enter**, or the visible Fire button, to shoot.
- A hit scores one point and spawns another invader.
- An invader that reaches the player's row adds one **Breach** and respawns. The round continues until time reaches zero or you press **Stop**.

The Time, Score, Breaches, and telemetry text make the game state observable without relying on animation or reaction speed.

## Quick start

You need Git, Node.js 22 or newer, a modern browser, and access to Codex in the ChatGPT desktop app.

Clone this repository using the URL your instructor provides. Then, from the cloned repository:

```bash
cd codex-fix-the-glitch
npm run preflight
npm test
npm start
```

Run each command separately. The word `run` is required in `npm run preflight`; `npm preflight` is not a valid npm command.

Do **not** run `npm install`; this repository has no third-party packages.

After npm's package-script banner, `npm run preflight` prints:

```text
[ok] Node v<your-version> is supported
[ok] Found all 9 required workshop files
[ok] No third-party packages are declared

Preflight passed. You are ready to start the challenge.
```

`npm test` should report **6 tests, 5 passes, 0 failures, and 1 TODO**. Node may prefix its summary lines with `#`, and the symbols and spacing can differ between Node versions.

Finally, `npm start` stays running and prints:

```text
Glitch Squadron is running at http://127.0.0.1:4173
Press Ctrl+C to stop the server.
```

Open <http://127.0.0.1:4173>. Press `Ctrl+C` in the server terminal when you want to stop it.

## Install Node.js on macOS

The workshop requires Node.js 22 or newer. Use the release marked **LTS** on the official download page.

1. Open the official [Node.js download page](https://nodejs.org/en/download/).
2. Select the release marked **LTS**, choose **macOS**, and download the `.pkg` installer for your Mac's architecture.
3. Open the downloaded package and follow the installer prompts.
4. Quit and reopen Terminal, then verify:

   ```bash
   node --version
   npm --version
   ```

5. Confirm the Node version begins with `v22`, `v24`, or a newer supported major version.

If `node: command not found` appears, close every Terminal window and open a new one. If it still fails, rerun the installer and make sure its installation completed successfully.

## Install Node.js on Windows

1. Open the official [Node.js download page](https://nodejs.org/en/download/).
2. Select the release marked **LTS**, choose **Windows**, and download the `.msi` installer for your PC's architecture (usually x64).
3. Run the installer with its default options, including the option to add Node.js to `PATH`.
4. Close and reopen PowerShell or Windows Terminal, then verify:

   ```powershell
   node --version
   npm --version
   ```

5. Confirm the Node version begins with `v22`, `v24`, or a newer supported major version.

If PowerShell says `node` is not recognized, restart the terminal first, then restart Windows if necessary. If PowerShell blocks `npm.ps1`, use `npm.cmd test`, `npm.cmd run preflight`, and `npm.cmd start` for this workshop; you do not need to change your execution policy.

## Set up Codex in the ChatGPT desktop app

OpenAI's [official desktop quickstart](https://learn.chatgpt.com/docs/quickstart) is the source of truth for current installation and sign-in steps.

1. Download and install the ChatGPT desktop app for your operating system from the quickstart page.
2. Open it and sign in with the ChatGPT account approved for your class.
3. Under **Projects**, select the cloned `codex-fix-the-glitch` folder. If it is not listed, use the app's option to open a folder and add that folder as a **local project**. Do not select the parent kit, a ZIP file, or the instructor companion.
4. Open the **ChatGPT dropdown** and select **Codex**. If the app already shows Codex, stay there.
5. In that local project, choose **New chat**.
6. For this new chat, choose the **Local** environment so Codex edits this clone directly. Do not choose Worktree or Cloud for this exercise.
7. Confirm the selected project contains `AGENTS.md`, `CHALLENGE.md`, `src`, and `tests`.
8. Leave **Fast mode** off to conserve usage. If Luna is available and your instructor approves it, select it for this focused task.

The official [projects guide](https://learn.chatgpt.com/docs/projects) explains local projects, and the [Codex environments guide](https://learn.chatgpt.com/docs/environments/modes) explains Local, Worktree, and Cloud. Account, model, and exact control availability can vary, so complete this check before the session.

At minute 10, paste the one bounded prompt from [STUDENT_PROMPT.md](STUDENT_PROMPT.md) into that new chat. To keep usage low, use at most one short correction based on concrete test or browser evidence. No exact credit amount is promised because usage and account limits vary; see OpenAI's current [Codex pricing guidance](https://learn.chatgpt.com/docs/pricing).

## Repository map

```text
.
├── AGENTS.md                 Rules Codex must follow
├── CHALLENGE.md              Exercise instructions and success criteria
├── STUDENT_PROMPT.md         The bounded prompt to give Codex
├── WORKSHEET.md              Short observation and verification notes
├── ACCESSIBILITY.md          Keyboard and accommodation guidance
├── TROUBLESHOOTING.md        Setup and runtime fixes
├── index.html / styles.css   Browser interface
├── src/
│   ├── app.mjs               Browser wiring
│   └── game-engine.mjs       Testable game logic
└── tests/
    ├── fake-scheduler.mjs    Deterministic timer test double
    └── game-engine.test.mjs  Five tests and one TODO
```

## Begin the challenge

Continue with [CHALLENGE.md](CHALLENGE.md). Keep brief notes in [WORKSHEET.md](WORKSHEET.md); the challenge itself contains the success criteria.

If setup fails, use [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or ask your instructor before spending workshop time reinstalling tools.
