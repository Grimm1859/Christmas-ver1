export class DOMElements {
  constructor() {
    this.elements = this.cacheElements();
    this.preloadedImage = new Image();
  }

  cacheElements() {
    return {
      player1: document.getElementById('player1'),
      player2: document.getElementById('player2'),
      pass1: document.getElementById('pass1'),
      pass2: document.getElementById('pass2'),
      startBtn: document.getElementById('startBtn'),
      resetBtn: document.getElementById('resetBtn'),
      settingsBtn: document.getElementById('settingsBtn'),
      settingsModal: document.getElementById('settingsModal'),
      saveSettings: document.getElementById('saveSettings'),
      cancelSettings: document.getElementById('cancelSettings'),
      timeInput: document.getElementById('timeInput'),
      slideshow: document.getElementById('slideshow'),
      categorySelect: document.getElementById('categorySelect')
    };
  }

  get(elementName) {
    if (!this.elements[elementName]) {
      console.warn(`Element "${elementName}" not found in cached elements`);
      return null;
    }
    return this.elements[elementName];
  }

  updatePlayerTime(player, time) {
    const clockElement = this.elements[`player${player}`];
    if (clockElement) {
      const timeElement = clockElement.querySelector('.time');
      if (timeElement) {
        timeElement.textContent = time;
      }
    }
  }

  setStartButtonText(text) {
    const startBtn = this.elements.startBtn;
    if (startBtn) {
      startBtn.textContent = text;
    }
  }

  updatePlayerStatus(player1Active, player2Active) {
    const player1Element = this.elements.player1;
    const player2Element = this.elements.player2;

    if (player1Element && player2Element) {
      player1Element.classList.remove('active', 'inactive');
      player2Element.classList.remove('active', 'inactive');

      if (player1Active) {
        player1Element.classList.add('active');
        player2Element.classList.add('inactive');
      } else if (player2Active) {
        player1Element.classList.add('inactive');
        player2Element.classList.add('active');
      }
    }
  }

  markTimeout(player) {
    const playerElement = this.elements[`player${player}`];
    if (playerElement) {
      playerElement.classList.add('timeout');
    }
  }

  updateSlideshowImage(src) {
    const img = this.elements.slideshow;
    if (!img) return;

    // Preload the new image
    this.preloadedImage.onload = () => {
      // Only start transition after new image is loaded
      img.style.opacity = '0';
      
      setTimeout(() => {
        img.src = src;
        img.style.opacity = '1';
      }, 300); // Match the CSS transition duration
    };
    
    this.preloadedImage.src = src;
  }

  showSettingsModal() {
    const modal = this.elements.settingsModal;
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  hideSettingsModal() {
    const modal = this.elements.settingsModal;
    if (modal) {
      modal.classList.add('hidden');
    }
  }
}