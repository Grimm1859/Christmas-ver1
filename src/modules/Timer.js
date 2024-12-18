export class Timer {
  constructor(callback, interval = 1000) {
    this.callback = callback;
    this.interval = interval;
    this.timerId = null;
  }

  start() {
    if (!this.timerId) {
      this.timerId = setInterval(this.callback, this.interval);
    }
  }

  stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  isRunning() {
    return this.timerId !== null;
  }
}