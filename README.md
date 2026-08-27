# Codex: Fix the Glitch

Welcome to a short, hands-on debugging challenge. You will investigate a visible bug in **Bug Blaster**, form a hypothesis, ask Codex for one bounded change, and verify the result yourself.

The project is intentionally tiny and uses only Node.js built-ins plus browser-native HTML, CSS, and JavaScript. There is no `npm install`, backend, API key, or external network access; `npm start` serves only this folder on your own computer.

## What you will practice

- Reproduce a bug before changing code.
- State expected and actual behavior precisely.
- Give a coding agent a narrow, testable task.
- Inspect a code diff instead of accepting it blindly.
- Use a deterministic regression test to verify a fix.

Allow about 30 minutes. Start with [CHALLENGE.md](CHALLENGE.md) after setup.

## Quick start

You need Git, Node.js 22 or newer, a modern browser, and access to Codex in the ChatGPT desktop app.

Clone this repository using the URL your instructor provides. Then, from the
cloned repository:

```bash
cd codex-fix-the-glitch
npm run preflight
npm test
npm start
```

Do **not** run `npm install`; this repository has no third-party packages. Open <http://127.0.0.1:4173> after the server starts. Press `Ctrl+C` in the terminal to stop it.

A correct starter setup reports:

```text
Preflight passed. You are ready to start the challenge.
tests 6
pass 5
fail 0
todo 1
```

The exact symbols and spacing in Node's test output can differ, but those four counts should match.

## Install Node.js on macOS

The workshop requires Node.js 22+, and the **current LTS** release is recommended. Node 24 is the current LTS line when this workshop was published; if the official page now labels a newer release **LTS**, use that newer LTS release.

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

## Set up Codex Desktop

OpenAI's [official desktop quickstart](https://learn.chatgpt.com/docs/quickstart) is the source of truth for current installation and sign-in steps.

1. Download and install the ChatGPT desktop app for your operating system from the quickstart page.
2. Open it and sign in with the ChatGPT account approved for your class.
3. Choose **Open folder** and select this cloned `codex-fix-the-glitch` folder.
4. Select **Codex** from the product dropdown for the coding task.
5. Keep the app in its normal/Standard mode unless your instructor says otherwise.

The desktop app is available on macOS and Windows, can work with local folders, and uses the folder you select as its codebase context. Account availability can vary, so complete this check before the session.

## Repository map

```text
.
├── AGENTS.md                 Rules Codex must follow
├── CHALLENGE.md              Exercise instructions and success criteria
├── STUDENT_PROMPT.md         The bounded prompt to give Codex
├── WORKSHEET.md              Hypothesis and reflection worksheet
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

## Completion checklist

- [ ] I reproduced the bug and wrote expected versus actual behavior.
- [ ] I wrote a hypothesis before asking Codex.
- [ ] Codex changed only `src/game-engine.mjs` and `tests/game-engine.test.mjs`.
- [ ] The production change is small and addresses the root cause.
- [ ] The TODO became a deterministic regression test.
- [ ] `npm test` reports six passing tests, zero failures, and zero TODOs.
- [ ] I inspected the complete diff.
- [ ] I manually repeated the Restart sequence and the countdown stayed correct.
- [ ] I completed the reflection in [WORKSHEET.md](WORKSHEET.md).

If setup fails, use [TROUBLESHOOTING.md](TROUBLESHOOTING.md) or ask your instructor before spending workshop time reinstalling tools.
