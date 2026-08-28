import { GlitchSquadronGame } from "./game-engine.mjs";

const LANE_COUNT = 5;
const TRAVEL_ROWS = 7;
const PLAYER_ROW = TRAVEL_ROWS - 1;

const battlefield = document.querySelector("#battlefield");
const timeOutput = document.querySelector("#time-output");
const scoreOutput = document.querySelector("#score-output");
const breachesOutput = document.querySelector("#breaches-output");
const shipOutput = document.querySelector("#ship-output");
const enemyOutput = document.querySelector("#enemy-output");
const rangeOutput = document.querySelector("#range-output");
const roundStatus = document.querySelector("#round-status");
const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");
const stopButton = document.querySelector("#stop-button");
const moveLeftButton = document.querySelector("#move-left-button");
const fireButton = document.querySelector("#fire-button");
const moveRightButton = document.querySelector("#move-right-button");

let phase = "idle";
let laserTimerId = null;
let previousBreaches = 0;

const cells = Array.from({ length: LANE_COUNT * TRAVEL_ROWS }, (_, index) => {
  const row = Math.floor(index / LANE_COUNT);
  const lane = index % LANE_COUNT;
  const cell = document.createElement("div");
  cell.className = "battle-cell";
  cell.dataset.row = String(row);
  cell.dataset.lane = String(lane);
  cell.setAttribute("aria-hidden", "true");
  battlefield.append(cell);
  return cell;
});

const game = new GlitchSquadronGame({
  laneCount: LANE_COUNT,
  travelRows: TRAVEL_ROWS,
  onChange: render,
});

function render(snapshot) {
  const breachOccurred = snapshot.isRunning && snapshot.breaches > previousBreaches;

  if (!snapshot.isRunning && snapshot.remainingSeconds === 0 && phase === "running") {
    phase = "finished";
    setStatus(
      `Mission complete. Score ${snapshot.score}; ${formatBreaches(snapshot.breaches)}.`,
    );
  }

  timeOutput.textContent = `${snapshot.remainingSeconds} s`;
  scoreOutput.textContent = String(snapshot.score);
  breachesOutput.textContent = String(snapshot.breaches);
  shipOutput.textContent = `Lane ${snapshot.playerLane + 1}`;

  if (snapshot.enemyLane === null || snapshot.enemyRow === null) {
    enemyOutput.textContent = "No invader";
    rangeOutput.textContent = "—";
  } else {
    const rowsAway = PLAYER_ROW - snapshot.enemyRow;
    enemyOutput.textContent = `Lane ${snapshot.enemyLane + 1}, row ${snapshot.enemyRow + 1}`;
    rangeOutput.textContent = `${rowsAway} ${rowsAway === 1 ? "row" : "rows"}`;
  }

  for (const cell of cells) {
    const row = Number(cell.dataset.row);
    const lane = Number(cell.dataset.lane);
    const isPlayer = row === PLAYER_ROW && lane === snapshot.playerLane;
    const isEnemy = row === snapshot.enemyRow && lane === snapshot.enemyLane;

    cell.classList.toggle("is-player", isPlayer);
    cell.classList.toggle("is-enemy", isEnemy);
    if (isPlayer) {
      cell.innerHTML = '<span class="entity-symbol">▲</span><span class="entity-name">SHIP</span>';
    } else if (isEnemy) {
      cell.innerHTML = '<span class="entity-symbol">▼</span><span class="entity-name">INVADER</span>';
    } else {
      cell.replaceChildren();
    }
  }

  startButton.disabled = snapshot.isRunning;
  restartButton.disabled = phase === "idle";
  stopButton.disabled = !snapshot.isRunning;
  moveLeftButton.disabled = !snapshot.isRunning;
  fireButton.disabled = !snapshot.isRunning;
  moveRightButton.disabled = !snapshot.isRunning;

  if (breachOccurred) {
    setStatus(
      `Invader breached the line. Breaches ${snapshot.breaches}; new invader incoming.`,
    );
  }
  previousBreaches = snapshot.breaches;
}

function formatBreaches(count) {
  return `${count} ${count === 1 ? "breach" : "breaches"}`;
}

function setStatus(message) {
  if (roundStatus.textContent !== message) {
    roundStatus.textContent = message;
  }
}

function focusBattlefield() {
  battlefield.focus({ preventScroll: true });
}

function startRound() {
  phase = "running";
  game.start();
  setStatus("Mission active. Steer into the invader's lane and fire.");
  focusBattlefield();
}

function restartRound() {
  phase = "running";
  game.restart();
  setStatus("Mission restarted. Watch the invader and countdown closely.");
  focusBattlefield();
}

function stopRound() {
  phase = "stopped";
  game.stop();
  setStatus(`Mission stopped. Score ${game.snapshot.score}; ${formatBreaches(game.snapshot.breaches)}.`);
}

function moveLeft() {
  const previousLane = game.snapshot.playerLane;
  const snapshot = game.moveLeft();
  if (snapshot.playerLane !== previousLane) {
    setStatus(`Ship moved left to lane ${snapshot.playerLane + 1}.`);
  } else if (snapshot.isRunning) {
    setStatus("Ship is already at the left edge.");
  }
}

function moveRight() {
  const previousLane = game.snapshot.playerLane;
  const snapshot = game.moveRight();
  if (snapshot.playerLane !== previousLane) {
    setStatus(`Ship moved right to lane ${snapshot.playerLane + 1}.`);
  } else if (snapshot.isRunning) {
    setStatus("Ship is already at the right edge.");
  }
}

function fire() {
  if (!game.snapshot.isRunning) {
    return;
  }

  const firedLane = game.snapshot.playerLane;
  const hit = game.fire();
  flashLaser(firedLane, hit);
  setStatus(
    hit
      ? `Direct hit in lane ${firedLane + 1}! A new invader has entered.`
      : `Shot missed in lane ${firedLane + 1}. Match the invader's lane and try again.`,
  );
}

function flashLaser(lane, hit) {
  if (laserTimerId !== null) {
    globalThis.clearTimeout(laserTimerId);
  }

  for (const cell of cells) {
    const isFiredLane = Number(cell.dataset.lane) === lane;
    cell.classList.toggle("is-laser", isFiredLane);
    cell.classList.toggle("is-hit-laser", isFiredLane && hit);
  }

  laserTimerId = globalThis.setTimeout(() => {
    for (const cell of cells) {
      cell.classList.remove("is-laser", "is-hit-laser");
    }
    laserTimerId = null;
  }, 180);
}

startButton.addEventListener("click", startRound);
restartButton.addEventListener("click", restartRound);
stopButton.addEventListener("click", stopRound);
moveLeftButton.addEventListener("click", moveLeft);
fireButton.addEventListener("click", fire);
moveRightButton.addEventListener("click", moveRight);

battlefield.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key === "arrowleft" || key === "a") {
    event.preventDefault();
    moveLeft();
  } else if (key === "arrowright" || key === "d") {
    event.preventDefault();
    moveRight();
  } else if (key === " " || key === "enter") {
    event.preventDefault();
    if (!event.repeat) {
      fire();
    }
  }
});

render(game.snapshot);
