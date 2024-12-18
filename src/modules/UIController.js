import { DOMElements } from './DOMElements';
import { Slideshow } from './Slideshow';

export class UIController {
  constructor(timer, settings) {
    this.timer = timer;
    this.settings = settings;
    this.elements = new DOMElements();
    this.slideshow = new Slideshow();
    this.setupEventListeners();
  }

  initialize() {
    this.updateDisplay();
    this.timer.setOnTick(() => this.updateDisplay());
    this.timer.setOnTimeout((player) => this.handleTimeout(player));
    this.updateSlideshow();
  }

  setupEventListeners() {
    const startBtn = this.elements.get('startBtn');
    const resetBtn = this.elements.get('resetBtn');
    const settingsBtn = this.elements.get('settingsBtn');
    const saveSettings = this.elements.get('saveSettings');
    const cancelSettings = this.elements.get('cancelSettings');
    const player1 = this.elements.get('player1');
    const player2 = this.elements.get('player2');
    const pass1 = this.elements.get('pass1');
    const pass2 = this.elements.get('pass2');
    const categorySelect = this.elements.get('categorySelect');

    if (startBtn) startBtn.addEventListener('click', () => this.handleStartClick());
    if (resetBtn) resetBtn.addEventListener('click', () => this.handleResetClick());
    if (settingsBtn) settingsBtn.addEventListener('click', () => this.showSettings());
    if (saveSettings) saveSettings.addEventListener('click', () => this.saveSettings());
    if (cancelSettings) cancelSettings.addEventListener('click', () => this.hideSettings());
    if (player1) player1.addEventListener('click', () => this.handlePlayerClick(1));
    if (player2) player2.addEventListener('click', () => this.handlePlayerClick(2));
    if (pass1) pass1.addEventListener('click', (e) => this.handlePassClick(e, 1));
    if (pass2) pass2.addEventListener('click', (e) => this.handlePassClick(e, 2));
    if (categorySelect) {
      categorySelect.addEventListener('change', (e) => {
        const newImage = this.slideshow.setCategory(e.target.value);
        if (newImage) {
          this.elements.updateSlideshowImage(newImage);
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        this.handleStartClick();
      } else if (e.code === 'KeyR') {
        this.handleResetClick();
      }
    });
  }

  handlePassClick(event, player) {
    event.stopPropagation();
    if (!this.timer.isRunning) return;

    const clock = player === 1 ? this.timer.player1Clock : this.timer.player2Clock;
    clock.subtractTime(3);
    this.updateDisplay();
    this.updateSlideshow();
  }

  handleStartClick() {
    if (!this.timer.isRunning) {
      this.timer.start();
      this.elements.setStartButtonText('Pause');
    } else {
      this.timer.stop();
      this.elements.setStartButtonText('Start');
    }
    this.updateDisplay();
  }

  handleResetClick() {
    this.timer.reset();
    this.elements.setStartButtonText('Start');
    this.updateDisplay();
    this.slideshow.reset();
    this.updateSlideshow();
  }

  handlePlayerClick(player) {
    if (!this.timer.isRunning) return;
    
    if ((player === 1 && this.timer.activePlayer === 1) ||
        (player === 2 && this.timer.activePlayer === 2)) {
      this.timer.switchPlayer();
      this.updateDisplay();
      this.updateSlideshow();
    }
  }

  handleTimeout(player) {
    this.elements.markTimeout(player);
    this.elements.setStartButtonText('Start');
  }

  updateDisplay() {
    this.elements.updatePlayerTime(1, this.timer.getFormattedTime(1));
    this.elements.updatePlayerTime(2, this.timer.getFormattedTime(2));

    this.elements.updatePlayerStatus(
      this.timer.activePlayer === 1 && this.timer.isRunning,
      this.timer.activePlayer === 2 && this.timer.isRunning
    );
  }

  updateSlideshow() {
    const imageSrc = this.slideshow.next();
    this.elements.updateSlideshowImage(imageSrc);
  }

  showSettings() {
    const timeInput = this.elements.get('timeInput');
    if (timeInput) {
      timeInput.value = this.settings.getTimeInMinutes();
    }
    this.elements.showSettingsModal();
  }

  hideSettings() {
    this.elements.hideSettingsModal();
  }

  saveSettings() {
    const timeInput = this.elements.get('timeInput');
    if (timeInput) {
      const minutes = parseInt(timeInput.value, 10);
      if (minutes > 0) {
        this.settings.setTimeInMinutes(minutes);
        this.timer.reset();
        this.updateDisplay();
      }
    }
    this.hideSettings();
  }
}