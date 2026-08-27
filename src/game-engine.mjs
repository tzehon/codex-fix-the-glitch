const browserScheduler = {
  setInterval(callback, milliseconds) {
    return globalThis.setInterval(callback, milliseconds);
  },
  clearInterval(timerId) {
    globalThis.clearInterval(timerId);
  },
};

export class BugBlasterGame {
  #durationSeconds;
  #boardSize;
  #scheduler;
  #random;
  #onChange;
  #timerId = null;
  #state;

  constructor({
    durationSeconds = 20,
    boardSize = 16,
    scheduler = browserScheduler,
    random = Math.random,
    onChange = () => {},
  } = {}) {
    if (!Number.isInteger(durationSeconds) || durationSeconds < 1) {
      throw new TypeError("durationSeconds must be a positive integer");
    }
    if (!Number.isInteger(boardSize) || boardSize < 1) {
      throw new TypeError("boardSize must be a positive integer");
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
    this.#boardSize = boardSize;
    this.#scheduler = scheduler;
    this.#random = random;
    this.#onChange = onChange;
    this.#state = {
      remainingSeconds: durationSeconds,
      score: 0,
      targetIndex: null,
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
      targetIndex: this.#pickTarget(),
      isRunning: true,
    };

    this.#timerId = this.#scheduler.setInterval(() => this.#tick(), 1_000);
    this.#emit();
    return this.snapshot;
  }

  restart() {
    return this.start();
  }

  whack(index) {
    if (!this.#state.isRunning || index !== this.#state.targetIndex) {
      return false;
    }

    this.#state.score += 1;
    this.#state.targetIndex = this.#pickTarget();
    this.#emit();
    return true;
  }

  stop() {
    this.#clearTimer();
    this.#state.isRunning = false;
    this.#state.targetIndex = null;
    this.#emit();
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
      this.#state.targetIndex = null;
    }
    this.#emit();
  }

  #pickTarget() {
    const randomValue = Number(this.#random());
    if (!Number.isFinite(randomValue)) {
      throw new TypeError("random must return a finite number");
    }
    const boundedValue = Math.min(Math.max(randomValue, 0), 1 - Number.EPSILON);
    return Math.floor(boundedValue * this.#boardSize);
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
