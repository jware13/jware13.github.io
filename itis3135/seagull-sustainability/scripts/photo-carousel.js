class PhotoCarousel {
  constructor(images, container) {
    this.images = images;
    this.container = container;
    this.currentIndex = 0;
    this.init();
  }

  init() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.container.innerHTML = `
            <div class="carousel">
                <img src="${
                  this.images[this.currentIndex]
                }" alt="Carousel Image" class="carousel-image">
                <button class="prev">Prev</button>
                <button class="next">Next</button>
            </div>
        `;
  }

  setupEventListeners() {
    const prevButton = this.container.querySelector(".prev");
    const nextButton = this.container.querySelector(".next");

    prevButton.addEventListener("click", () => this.showPrevImage());
    nextButton.addEventListener("click", () => this.showNextImage());
  }

  showPrevImage() {
    this.currentIndex =
      this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    this.updateImage();
  }

  showNextImage() {
    this.currentIndex =
      this.currentIndex === this.images.length - 1 ? 0 : this.currentIndex + 1;
    this.updateImage();
  }

  updateImage() {
    const imageElement = this.container.querySelector(".carousel-image");
    imageElement.src = this.images[this.currentIndex];
  }
}
