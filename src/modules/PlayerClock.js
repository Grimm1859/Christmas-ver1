export class PlayerClock {
  constructor(timeInSeconds) {
    this.remainingTime = timeInSeconds;
    this.timer = null;
    this.onTick = null;
    this.onTimeout = null;
  }

  start(onTick, onTimeout) {
    this.onTick = onTick;
    this.onTimeout = onTimeout;
    
    this.timer = setInterval(() => {
      this.remainingTime--;
      
      if (this.remainingTime <= 0) {
        this.stop();
        this.remainingTime = 0;
        this.onTimeout?.();
      } else {
        this.onTick?.();
      }
    }, 1000);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  reset(timeInSeconds) {
    this.stop();
    this.remainingTime = timeInSeconds;
  }

  subtractTime(seconds) {
    this.remainingTime = Math.max(0, this.remainingTime - seconds);
    if (this.remainingTime === 0) {
      this.stop();
      this.onTimeout?.();
    } else {
      this.onTick?.();
    }
  }

  isRunning() {
    return this.timer !== null;
  }

  getRemainingTime() {
    return this.remainingTime;
  }
}