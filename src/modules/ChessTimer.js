import { PlayerClock } from './PlayerClock';
import { formatTime } from '../utils/timeFormatter';

export class ChessTimer {
  constructor(settings) {
    this.settings = settings;
    this.player1Clock = null;
    this.player2Clock = null;
    this.activePlayer = null;
    this.onTick = null;
    this.onTimeout = null;
    this.reset();
  }

  reset() {
    const initialTime = this.settings.getTimeInSeconds();
    this.player1Clock = new PlayerClock(initialTime);
    this.player2Clock = new PlayerClock(initialTime);
    this.activePlayer = null;
    this.stop();
  }

  start() {
    if (!this.activePlayer) {
      this.activePlayer = 1;
    }
    
    const activeClock = this.activePlayer === 1 ? this.player1Clock : this.player2Clock;
    activeClock.start(
      () => this.onTick?.(),
      () => this.onTimeout?.(this.activePlayer)
    );
  }

  stop() {
    this.player1Clock?.stop();
    this.player2Clock?.stop();
  }

  switchPlayer() {
    this.stop();
    this.activePlayer = this.activePlayer === 1 ? 2 : 1;
    this.start();
  }

  getFormattedTime(player) {
    const clock = player === 1 ? this.player1Clock : this.player2Clock;
    return formatTime(clock.getRemainingTime());
  }

  setOnTick(callback) {
    this.onTick = callback;
  }

  setOnTimeout(callback) {
    this.onTimeout = callback;
  }

  get isRunning() {
    return this.player1Clock?.isRunning() || this.player2Clock?.isRunning();
  }
}