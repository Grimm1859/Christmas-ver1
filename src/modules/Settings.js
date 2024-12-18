export class Settings {
  constructor() {
    this.timeInMinutes = 10;
  }

  setTimeInMinutes(minutes) {
    this.timeInMinutes = minutes;
  }

  getTimeInMinutes() {
    return this.timeInMinutes;
  }

  getTimeInSeconds() {
    return this.timeInMinutes * 60;
  }
}