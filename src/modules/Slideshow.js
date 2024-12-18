import { imageConfig } from '../config/images.js';

export class Slideshow {
  constructor() {
    this.categories = Object.entries(imageConfig).reduce((acc, [category, config]) => {
      acc[category] = config.images.map(image => `${config.path}/${image}`);
      return acc;
    }, {});
    
    this.currentCategory = 'default';
    this.currentIndex = 0;
  }

  setCategory(category) {
    if (this.categories[category]) {
      this.currentCategory = category;
      this.currentIndex = 0;
      return this.getCurrentImage();
    }
    return null;
  }

  next() {
    const images = this.categories[this.currentCategory];
    this.currentIndex = (this.currentIndex + 1) % images.length;
    return this.getCurrentImage();
  }

  getCurrentImage() {
    return this.categories[this.currentCategory][this.currentIndex];
  }

  reset() {
    this.currentIndex = 0;
    return this.getCurrentImage();
  }

  getCategories() {
    return Object.keys(this.categories);
  }
}