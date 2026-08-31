const browserScheduler = {
  setInterval(callback, milliseconds) {
    return globalThis.setInterval(callback, milliseconds);
  },
  clearInterval(timerId) {
    globalThis.clearInterval(timerId);
  },
};

export class GlitchSquadronGame {
  #durationSeconds;
  #laneCount;
  #travelRows;
  #scheduler;
  #random;
  #onChange;
  #timerId = null;
  #state;

  constructor({
    durationSeconds = 20,
    laneCount = 5,
    travelRows = 7,
    scheduler = browserScheduler,
    random = Math.random,
    onChange = () => {},
  } = {}) {
    if (!Number.isInteger(durationSeconds) || durationSeconds < 1) {
      throw new TypeError("durationSeconds must be a positive integer");
    }
    if (!Number.isInteger(laneCount) || laneCount < 1) {
      throw new TypeError("laneCount must be a positive integer");
    }
    if (!Number.isInteger(travelRows) || travelRows < 2) {
      throw new TypeError("travelRows must be an integer of at least 2");
    }
    if (
      typeof scheduler?.setInterval !== "function" ||
      typeof scheduler?.clearInterval !== "function"
    ) {
      throw new TypeError("scheduler must provide setInterval and clearInterval");
    }
    if (typeof random !== "function" || typeof onChange !== "function") {
      throw new TypeError("random and onChange must be functions");
    }

    this.#durationSeconds = durationSeconds;
    this.#laneCount = laneCount;
    this.#travelRows = travelRows;
    this.#scheduler = scheduler;
    this.#random = random;
    this.#onChange = onChange;
    this.#state = {
      remainingSeconds: durationSeconds,
      score: 0,
      breaches: 0,
      playerLane: Math.floor(laneCount / 2),
      enemyLane: null,
      enemyRow: null,
      isRunning: false,
    };
  }

  get snapshot() {
    return Object.freeze({ ...this.#state });
  }

  start() {
    this.#state = {
      remainingSeconds: this.#durationSeconds,
      score: 0,
      breaches: 0,
      playerLane: Math.floor(this.#laneCount / 2),
      enemyLane: this.#pickLane(),
      enemyRow: 0,
      isRunning: true,
    };

    this.#timerId = this.#scheduler.setInterval(() => this.#tick(), 1_000);
    this.#emit();
    return this.snapshot;
  }

  restart() {
    return this.start();
  }

  moveLeft() {
    return this.#moveTo(this.#state.playerLane - 1);
  }

  moveRight() {
    return this.#moveTo(this.#state.playerLane + 1);
  }

  fire() {
    if (!this.#state.isRunning || this.#state.playerLane !== this.#state.enemyLane) {
      return false;
    }

    this.#state.score += 1;
    this.#spawnEnemy();
    this.#emit();
    return true;
  }

  stop() {
    this.#clearTimer();
    this.#state.isRunning = false;
    this.#state.enemyLane = null;
    this.#state.enemyRow = null;
    this.#emit();
    return this.snapshot;
  }

  #moveTo(lane) {
    if (!this.#state.isRunning) {
      return this.snapshot;
    }

    const nextLane = Math.min(Math.max(lane, 0), this.#laneCount - 1);
    if (nextLane !== this.#state.playerLane) {
      this.#state.playerLane = nextLane;
      this.#emit();
    }
    return this.snapshot;
  }

  #tick() {
    if (!this.#state.isRunning) {
      return;
    }

    this.#state.remainingSeconds -= 1;
    if (this.#state.remainingSeconds <= 0) {
      this.#state.remainingSeconds = 0;
      this.#clearTimer();
      this.#state.isRunning = false;
      this.#state.enemyLane = null;
      this.#state.enemyRow = null;
      this.#emit();
      return;
    }

    const nextEnemyRow = this.#state.enemyRow + 1;
    if (nextEnemyRow >= this.#travelRows - 1) {
      this.#state.breaches += 1;
      this.#spawnEnemy();
    } else {
      this.#state.enemyRow = nextEnemyRow;
    }
    this.#emit();
  }

  #spawnEnemy() {
    this.#state.enemyLane = this.#pickLane();
    this.#state.enemyRow = 0;
  }

  #pickLane() {
    const randomValue = Number(this.#random());
    if (!Number.isFinite(randomValue)) {
      throw new TypeError("random must return a finite number");
    }
    const boundedValue = Math.min(
      Math.max(randomValue, 0),
      1 - Number.EPSILON,
    );
    return Math.floor(boundedValue * this.#laneCount);
  }

  #clearTimer() {
    if (this.#timerId !== null) {
      this.#scheduler.clearInterval(this.#timerId);
      this.#timerId = null;
    }
  }

  #emit() {
    this.#onChange(this.snapshot);
  }
}
