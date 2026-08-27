import { BugBlasterGame } from "./game-engine.mjs";

const BOARD_SIZE = 16;
const BOARD_WIDTH = 4;

const board = document.querySelector("#board");
const timeOutput = document.querySelector("#time-output");
const scoreOutput = document.querySelector("#score-output");
const roundStatus = document.querySelector("#round-status");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");
const stopButton = document.querySelector("#stop-button");

let phase = "idle";
const cells = Array.from({ length: BOARD_SIZE }, (_, index) => {
  const cell = document.createElement("button");
  cell.className = "cell";
  cell.type = "button";
  cell.dataset.index = String(index);
  cell.textContent = String(index + 1);
  cell.setAttribute("aria-label", `Cell ${index + 1}, empty`);
  cell.disabled = true;
  board.append(cell);
  return cell;
});

const game = new BugBlasterGame({ onChange: render });

function render(snapshot) {
  if (!snapshot.isRunning && snapshot.remainingSeconds === 0 && phase === "running") {
    phase = "finished";
  }

  timeOutput.textContent = `${snapshot.remainingSeconds} s`;
  scoreOutput.textContent = `${snapshot.score} ${snapshot.score === 1 ? "point" : "points"}`;

  for (const [index, cell] of cells.entries()) {
    const isBug = snapshot.isRunning && snapshot.targetIndex === index;
    cell.disabled = !snapshot.isRunning;
    cell.classList.toggle("is-bug", isBug);
    cell.textContent = isBug ? "🐛 BUG" : String(index + 1);
    cell.setAttribute("aria-label", isBug ? `Cell ${index + 1}, bug` : `Cell ${index + 1}, empty`);
  }

  startButton.disabled = snapshot.isRunning;
  restartButton.disabled = phase === "idle";
  stopButton.disabled = !snapshot.isRunning;

  const messages = {
    idle: "Ready. Press Start when you are set.",
    running: `Round in progress. The bug is in cell ${snapshot.targetIndex + 1}.`,
    stopped: `Round stopped. Your score is ${snapshot.score}.`,
    finished: `Time is up. Your final score is ${snapshot.score}.`,
  };
  const nextMessage = messages[phase];
  if (roundStatus.textContent !== nextMessage) {
    roundStatus.textContent = nextMessage;
  }
}

startButton.addEventListener("click", () => {
  phase = "running";
  game.start();
});

restartButton.addEventListener("click", () => {
  phase = "running";
  game.restart();
});

stopButton.addEventListener("click", () => {
  phase = "stopped";
  game.stop();
});

for (const [index, cell] of cells.entries()) {
  cell.addEventListener("click", () => game.whack(index));
  cell.addEventListener("keydown", (event) => {
    const row = Math.floor(index / BOARD_WIDTH);
    const column = index % BOARD_WIDTH;
    let nextIndex = index;

    if (event.key === "ArrowLeft" && column > 0) nextIndex -= 1;
    if (event.key === "ArrowRight" && column < BOARD_WIDTH - 1) nextIndex += 1;
    if (event.key === "ArrowUp" && row > 0) nextIndex -= BOARD_WIDTH;
    if (event.key === "ArrowDown" && row < BOARD_WIDTH - 1) nextIndex += BOARD_WIDTH;

    if (nextIndex !== index) {
      event.preventDefault();
      cells[nextIndex].focus();
    }
  });
}

render(game.snapshot);
