export class Slideshow {
  constructor() {
    this.images = [
      '/images/image2.jpg',
      '/images/image3.jpg',
      '/images/image4.jpg',
      '/images/image5.jpg',
      '/images/image6.jpg'
    ];
    this.currentIndex = 0;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    return this.getCurrentImage();
  }

  getCurrentImage() {
    return this.images[this.currentIndex];
  }

  reset() {
    this.currentIndex = 0;
    return this.getCurrentImage();
  }
}