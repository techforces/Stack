import gsap from "gsap";

class ExploreButton {
  button = undefined;
  constructor() {
    this.button = document.getElementById("explr-btn");
    return this.button;
  }
}

class Case {
  case = undefined;
  listViewer = undefined;
  images = [];
  idx = 0;

  constructor(id) {
    this.case = document.getElementById(id);
    this.images = this.case.querySelectorAll(".case-img-container");
    console.log(this.images);
  }

  openCase() {
    this.openImages();
  }

  closeCase() {
    this.closeImages();
  }

  openImages() {
    const value = {
      top: 100,
      translateY: 0,
    };

    const that = this;

    gsap.to(value, 0.5, {
      top: 50,
      translateY: -50,
      ease: "power1.easeOut",
      onUpdate: function () {
        that.images[that.idx].style.top = `${this.targets()[0].top}%`;
        that.images[that.idx].style.transform = `translate(-50%, ${
          this.targets()[0].translateY
        }%)`;
      },
    });
  }

  closeImages() {
    const value = {
      top: 50,
      translateY: -50,
    };

    const that = this;

    gsap.to(value, 0.4, {
      top: 100,
      translateY: 10,
      ease: "power1.easeOut",
      onUpdate: function () {
        that.images[that.idx].style.top = `${this.targets()[0].top}%`;
        that.images[that.idx].style.transform = `translate(-50%, ${
          this.targets()[0].translateY
        }%)`;
      },
    });
  }
}

export { ExploreButton, Case };
