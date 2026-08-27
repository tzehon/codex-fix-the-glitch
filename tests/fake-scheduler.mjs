export class FakeScheduler {
  #nextId = 1;
  #intervals = new Map();

  setInterval(callback, milliseconds) {
    if (typeof callback !== "function" || milliseconds <= 0) {
      throw new TypeError("setInterval requires a callback and a positive delay");
    }

    const timerId = this.#nextId;
    this.#nextId += 1;
    this.#intervals.set(timerId, { callback, milliseconds });
    return timerId;
  }

  clearInterval(timerId) {
    this.#intervals.delete(timerId);
  }

  advanceOneTick() {
    const timersAtStart = [...this.#intervals.entries()];
    for (const [timerId, { callback }] of timersAtStart) {
      if (this.#intervals.has(timerId)) {
        callback();
      }
    }
  }

  get activeCount() {
    return this.#intervals.size;
  }
}
