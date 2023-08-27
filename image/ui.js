import gsap from "gsap";

class Text {
  // for transform translateY in %
  states = {
    hidden: 120,
    visible: -20,
    pressed: -140,
  };

  available = undefined;
  state = undefined;
  button = undefined;

  constructor(name) {
    this.available = true;
    this.state = this.states.hidden;
    this.button = document.querySelector(name);
    this.button.style.transform = `translateY(${this.state}%)`;
  }

  toVisible() {
    this.available = true;
    let value = {
      state: this.states.hidden,
    };
    let that = this;

    gsap.to(value, 0.7, {
      state: that.states.visible,
      ease: "power1.easeOut",
      delay: 0.4,
      onUpdate: function () {
        if (that.available) {
          that.state = this.targets()[0].state;
          that.button.style.transform = `translateY(${
            this.targets()[0].state
          }%)`;
        } else {
          this.kill();
        }
      },
    });
  }

  toPressed() {
    let value = {
      state: this.state,
    };
    let that = this;

    gsap.to(value, 0.7, {
      state: that.states.pressed,
      ease: "power1.easeOut",
      onStart: function () {
        that.available = false;
      },
      onUpdate: function () {
        that.state = this.targets()[0].state;
        that.button.style.transform = `translateY(${this.targets()[0].state}%)`;
      },
    });
  }

  toHidden() {
    let value = {
      state: this.state,
    };
    let that = this;

    gsap.to(value, 0.7, {
      state: that.states.hidden,
      ease: "power1.easeOut",
      onStart: function () {
        that.available = false;
      },
      onUpdate: function () {
        that.state = this.targets()[0].state;
        that.button.style.transform = `translateY(${this.targets()[0].state}%)`;
      },
    });
  }
}

class Line {
  states = {
    top: -100,
    middle: 0,
    bottom: 100,
  };

  available = undefined;
  state = undefined;
  line = undefined;

  constructor(name) {
    this.available = true;
    this.state = this.states.top;
    this.line = document.querySelector(name);
    this.line.style.transform = `translateY(${this.state}%)`;
  }

  fromTop() {
    this.available = true;
    let value = {
      state: this.states.top,
    };
    let that = this;

    gsap.to(value, 0.7, {
      state: that.states.middle,
      ease: "power1.easeOut",
      delay: 0.4,
      onUpdate: function () {
        if (that.available) {
          that.state = this.targets()[0].state;
          that.line.style.transform = `translateY(${this.targets()[0].state}%)`;
        } else {
          this.kill();
        }
      },
    });
  }

  fromBottom() {
    this.available = true;
    let value = {
      state: this.states.bottom,
    };
    let that = this;

    gsap.to(value, 0.7, {
      state: that.states.middle,
      ease: "power1.easeOut",
      delay: 0.4,
      onUpdate: function () {
        if (that.available) {
          that.state = this.targets()[0].state;
          that.line.style.transform = `translateY(${this.targets()[0].state}%)`;
        } else {
          this.kill();
        }
      },
    });
  }

  toTop() {
    let value = {
      state: this.state,
    };
    let that = this;

    gsap.to(value, 0.7, {
      state: that.states.top,
      ease: "power1.easeOut",
      onStart: function () {
        that.available = false;
      },
      onUpdate: function () {
        that.state = this.targets()[0].state;
        that.line.style.transform = `translateY(${this.targets()[0].state}%)`;
      },
    });
  }

  toBottom() {
    let value = {
      state: this.state,
    };
    let that = this;

    gsap.to(value, 0.7, {
      state: that.states.bottom,
      ease: "power1.easeOut",
      onStart: function () {
        that.available = false;
      },
      onUpdate: function () {
        that.state = this.targets()[0].state;
        that.line.style.transform = `translateY(${this.targets()[0].state}%)`;
      },
    });
  }
}

class Icon {
  states = {
    top: -105,
    middle: 0,
    bottom: 105,
  };

  available = undefined;
  state = undefined;
  icon = undefined;

  constructor(name) {
    this.available = true;
    this.state = this.states.top;
    this.icon = document.querySelector(name);
    this.icon.style.transform = `translateY(${this.state}%)`;
  }

  fromTop() {
    this.available = true;
    let value = {
      state: this.states.top,
    };
    let that = this;

    gsap.to(value, 0.7, {
      state: that.states.middle,
      ease: "power1.easeOut",
      delay: 0.4,
      onUpdate: function () {
        if (that.available) {
          that.state = this.targets()[0].state;
          that.icon.style.transform = `translateY(${this.targets()[0].state}%)`;
        } else {
          this.kill();
        }
      },
    });
  }

  fromBottom() {
    this.available = true;
    let value = {
      state: this.states.bottom,
    };
    let that = this;

    gsap.to(value, 0.7, {
      state: that.states.middle,
      ease: "power1.easeOut",
      delay: 0.4,
      onUpdate: function () {
        if (that.available) {
          that.state = this.targets()[0].state;
          that.icon.style.transform = `translateY(${this.targets()[0].state}%)`;
        } else {
          this.kill();
        }
      },
    });
  }

  toTop() {
    let value = {
      state: this.state,
    };
    let that = this;

    gsap.to(value, 0.7, {
      state: that.states.top,
      ease: "power1.easeOut",
      onStart: function () {
        that.available = false;
      },
      onUpdate: function () {
        that.state = this.targets()[0].state;
        that.icon.style.transform = `translateY(${this.targets()[0].state}%)`;
      },
    });
  }

  toBottom() {
    let value = {
      state: this.state,
    };
    let that = this;

    gsap.to(value, 0.7, {
      state: that.states.bottom,
      ease: "power1.easeOut",
      onStart: function () {
        that.available = false;
      },
      onUpdate: function () {
        that.state = this.targets()[0].state;
        that.icon.style.transform = `translateY(${this.targets()[0].state}%)`;
      },
    });
  }
}

class ImageList {
  list = undefined;
  images = [];
  idx = 0;
  prevIdx = 0;

  imgPos = [50, 125, 125, 125, 125, 125, 125, 125, 125, 125];

  selector = undefined;
  minImgs = [];

  indicator = undefined;
  indicatorY = 0;
  currentIndY = 0;
  indicatorIdx = 0;

  constructor() {
    this.list = document.querySelector(".image-list");
    this.images = this.list.querySelectorAll(".case-img-container");
    this.selector = document.querySelector(".image-selector");
    this.minImgs = this.selector.querySelectorAll(".img-min-container");
    this.indicator = this.selector.querySelector(".selector-indicator");

    for (var i = 0; i < this.minImgs.length; i++) {
      this.minImgs[i].addEventListener("click", (e) => {
        this.moveIndicator(e.srcElement.dataset.index);
        this.slideStack(this.prevIdx, e.srcElement.dataset.index);
      });
    }

    this.indicator.style.top = `${this.minImgs[0].offsetTop - 6}px`;
    this.currentIndY = this.minImgs[0].offsetTop - 6;
  }

  moveIndicator(i) {
    this.prevIdx = this.idx;
    this.idx = i;

    const value = {
      y: this.currentIndY,
    };

    const that = this;

    gsap.to(value, 0.4, {
      y: that.minImgs[i].offsetTop - 6,
      ease: "power1.easeOut",
      onUpdate: function () {
        that.indicator.style.top = `${this.targets()[0].y}px`;
        that.currentIndY = this.targets()[0].y;
      },
    });
  }

  slideStack(hide, show) {
    if (hide != show) {
      let hideObj = this.list.querySelector(`[data-stack="${hide}"]`);
      let showObj = this.list.querySelector(`[data-stack="${show}"]`);

      const value = {
        hide: this.imgPos[hide],
        show: this.imgPos[show],
      };

      const that = this;

      if (show > hide) {
        gsap.to(value, 0.4, {
          hide: -25,
          show: 50,
          ease: "power1.easeOut",
          onStart: () => {
            for (var i = 0; i < show; i++) {
              if (i != hide) {
                that.imgPos[i] = -25;
              }
            }
          },
          onUpdate: () => {
            hideObj.style.top = `${value.hide}%`;
            that.imgPos[hide] = value.hide;
            showObj.style.top = `${value.show}%`;
            that.imgPos[show] = value.show;
          },
        });
      } else {
        gsap.to(value, 0.4, {
          hide: 125,
          show: 50,
          ease: "power1.easeOut",
          onStart: () => {
            for (var i = that.imgPos.length; i > show; i--) {
              if (i != hide) {
                that.imgPos[i] = 125;
              }
            }
          },
          onUpdate: () => {
            hideObj.style.top = `${value.hide}%`;
            that.imgPos[hide] = value.hide;
            showObj.style.top = `${value.show}%`;
            that.imgPos[show] = value.show;
          },
        });
      }
    }
  }

  resetStack() {
    this.prevIdx = 0;
    this.idx = 0;
    this.imgPos = [125, 125, 125, 125, 125, 125, 125, 125, 125, 125];
    for (var i = 0; i < this.imgPos.length; i++) {
      if (i != this.idx) {
        this.images[i].style.top = `${this.imgPos[i]}%`;
      }
    }
  }

  adjustSelector(object) {
    for (var i = 0; i < object.images.length; i++) {
      this.minImgs[i].querySelector("img").src = object.images[i];

      if (object.images[i] == undefined) {
        this.minImgs[i].classList.add("min-img-hidden");
      } else {
        this.minImgs[i].classList.remove("min-img-hidden");
      }
    }
  }

  adjustStack(object) {
    for (var i = 0; i < object.images.length; i++) {
      this.images[i].querySelector("img").src = object.images[i];

      if (object.images[i] == undefined) {
        this.images[i].classList.add("img-hidden");
      } else {
        this.images[i].classList.remove("img-hidden");
      }
    }
  }

  openCase() {
    this.openImages();
  }

  closeCase() {
    this.closeImages();
  }

  openImages() {
    const value = {
      top: 125,
      selectorY: 100,
    };

    const offsets = [
      { offset: 0 },
      { offset: 200 },
      { offset: 400 },
      { offset: 600 },
      { offset: 800 },
      { offset: 1000 },
      { offset: 1200 },
      { offset: 1400 },
      { offset: 1600 },
      { offset: 1800 },
    ];

    for (var i = 0; i < this.minImgs.length; i++) {
      if (!this.minImgs[i].classList.contains("min-img-hidden")) {
        this.indicator.style.top = `${this.minImgs[i].offsetTop - 6}px`;
        this.currentIndY = this.minImgs[i].offsetTop - 6;
        this.indicatorIdx = i;
        break;
      }
    }

    function slideMinImg(i, image, indIdx) {
      if (i == indIdx) {
        gsap.to(offsets[i], 0.66 + i * 0.04, {
          offset: 0,
          ease: "power1.easeOut",
          onUpdate: function () {
            image.style.transform = `translateY(${this.targets()[0].offset}px)`;
            that.indicator.style.transform = `translateY(${
              this.targets()[0].offset
            }px)`;
          },
        });
      } else {
        gsap.to(offsets[i], 0.66 + i * 0.04, {
          offset: 0,
          ease: "power1.easeOut",
          onUpdate: function () {
            image.style.transform = `translateY(${this.targets()[0].offset}px)`;
          },
        });
      }
    }

    const that = this;

    var firstImage = 0;
    while (
      this.images[firstImage].classList.contains("img-hidden") &&
      firstImage < 10
    ) {
      firstImage++;
    }
    this.idx = firstImage;

    gsap.to(value, 0.7, {
      top: 50,
      selectorY: 0,

      ease: "power1.easeOut",
      onUpdate: function () {
        that.images[firstImage].style.top = `${this.targets()[0].top}%`;

        that.imgPos[firstImage] = this.targets()[0].top;
        that.selector.style.transform = `translateY(${
          this.targets()[0].selectorY
        }vh)`;
      },
    });

    for (var i = 0; i < this.minImgs.length; i++) {
      slideMinImg(i, this.minImgs[i], this.indicatorIdx);
    }
  }

  closeImages() {
    const value = {
      top: 50,
      selectorY: 0,
    };

    const that = this;

    gsap.to(value, 0.4, {
      top: 125,
      selectorY: 100,
      ease: "power1.easeOut",

      onUpdate: function () {
        that.images[that.idx].style.top = `${this.targets()[0].top}%`;
        that.images[that.idx].style.transform = `translate(-50%, ${
          this.targets()[0].translateY
        }%)`;
        that.selector.style.transform = `translateY(${
          this.targets()[0].selectorY
        }vh)`;
      },
      onComplete: function () {
        that.resetStack();
      },
    });
  }
}

export { ImageList, Text, Line, Icon };
