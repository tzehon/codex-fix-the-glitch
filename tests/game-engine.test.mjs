import assert from "node:assert/strict";
import test from "node:test";

import { GlitchSquadronGame } from "../src/game-engine.mjs";
import { FakeScheduler } from "./fake-scheduler.mjs";

test("a new game exposes a frozen initial snapshot", () => {
  const game = new GlitchSquadronGame();

  assert.deepEqual(game.snapshot, {
    remainingSeconds: 20,
    score: 0,
    breaches: 0,
    playerLane: 2,
    enemyLane: null,
    enemyRow: null,
    isRunning: false,
  });
  assert.equal(Object.isFrozen(game.snapshot), true);
  assert.throws(() => {
    game.snapshot.score = 99;
  }, TypeError);
});

test("start resets the round, spawns an invader, and schedules one loop", () => {
  const scheduler = new FakeScheduler();
  const game = new GlitchSquadronGame({
    durationSeconds: 12,
    laneCount: 5,
    scheduler,
    random: () => 0.5,
  });

  game.start();

  assert.deepEqual(game.snapshot, {
    remainingSeconds: 12,
    score: 0,
    breaches: 0,
    playerLane: 2,
    enemyLane: 2,
    enemyRow: 0,
    isRunning: true,
  });
  assert.equal(scheduler.activeCount, 1);
});

test("one ordinary loop tick lowers time once and advances the invader one row", () => {
  const scheduler = new FakeScheduler();
  const game = new GlitchSquadronGame({ scheduler, random: () => 0 });
  game.start();

  scheduler.advanceOneTick();

  assert.equal(game.snapshot.remainingSeconds, 19);
  assert.equal(game.snapshot.enemyRow, 1);
});

test("steering, firing, breaches, and respawning preserve shooter gameplay", () => {
  const scheduler = new FakeScheduler();
  const randomValues = [0, 0.8, 0.4];
  const game = new GlitchSquadronGame({
    durationSeconds: 20,
    laneCount: 5,
    travelRows: 3,
    scheduler,
    random: () => randomValues.shift(),
  });
  game.start();

  game.moveLeft();
  game.moveLeft();
  game.moveLeft();
  assert.equal(game.snapshot.playerLane, 0);
  assert.equal(game.fire(), true);
  assert.equal(game.snapshot.score, 1);
  assert.equal(game.snapshot.enemyLane, 4);
  assert.equal(game.snapshot.enemyRow, 0);

  assert.equal(game.fire(), false);
  assert.equal(game.snapshot.score, 1);
  game.moveRight();
  game.moveRight();
  game.moveRight();
  game.moveRight();
  game.moveRight();
  assert.equal(game.snapshot.playerLane, 4);

  scheduler.advanceOneTick();
  assert.equal(game.snapshot.breaches, 0);
  assert.equal(game.snapshot.enemyRow, 1);
  scheduler.advanceOneTick();
  assert.equal(game.snapshot.breaches, 1);
  assert.equal(game.snapshot.enemyLane, 2);
  assert.equal(game.snapshot.enemyRow, 0);
});

test("stop and ordinary game-over clear the active loop", () => {
  const stoppedScheduler = new FakeScheduler();
  const stoppedGame = new GlitchSquadronGame({ scheduler: stoppedScheduler });
  stoppedGame.start();
  stoppedGame.stop();

  assert.equal(stoppedGame.snapshot.isRunning, false);
  assert.equal(stoppedGame.snapshot.enemyLane, null);
  assert.equal(stoppedGame.snapshot.enemyRow, null);
  assert.equal(stoppedScheduler.activeCount, 0);

  const finishedScheduler = new FakeScheduler();
  const finishedGame = new GlitchSquadronGame({
    durationSeconds: 1,
    scheduler: finishedScheduler,
  });
  finishedGame.start();
  finishedScheduler.advanceOneTick();

  assert.equal(finishedGame.snapshot.remainingSeconds, 0);
  assert.equal(finishedGame.snapshot.isRunning, false);
  assert.equal(finishedGame.snapshot.enemyLane, null);
  assert.equal(finishedGame.snapshot.enemyRow, null);
  assert.equal(finishedScheduler.activeCount, 0);
});

test.todo("repeated Restart keeps one loop and advances one frame per tick");
