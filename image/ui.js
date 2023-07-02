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
      delay: 0.7,
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
      delay: 0.7,
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
      delay: 0.7,
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
    top: -100,
    middle: 0,
    bottom: 100,
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
      delay: 0.7,
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
      delay: 0.7,
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

  selector = undefined;
  minImgs = [];

  constructor() {
    this.list = document.querySelector(".image-list");
    this.images = this.list.querySelectorAll(".case-img-container");
    this.selector = document.querySelector(".image-selector");
    this.minImgs = this.selector.querySelectorAll(".img-min-container");

    console.log(this.minImgs);

    for (var i = 0; i < this.minImgs.length; i++) {
      this.minImgs[i].addEventListener("click", (e) => {
        console.log(e.srcElement.dataset.index);
      });
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
      top: 100,
      translateY: 0,
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

    function slideMinImg(i, image) {
      gsap.to(offsets[i], 0.9 + i * 0.04, {
        offset: 0,
        ease: "power1.easeOut",
        onUpdate: function () {
          image.style.transform = `translateY(${this.targets()[0].offset}px)`;
        },
      });
    }

    const that = this;

    gsap.to(value, 0.7, {
      top: 50,
      translateY: -50,
      selectorY: 0,

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
    });

    for (var i = 0; i < this.minImgs.length; i++) {
      slideMinImg(i, this.minImgs[i]);
    }
  }

  closeImages() {
    const value = {
      top: 50,
      translateY: -50,
      selectorY: 0,
    };

    const that = this;

    gsap.to(value, 0.4, {
      top: 100,
      translateY: 10,
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
    });
  }
}

export { ImageList, Text, Line, Icon };
