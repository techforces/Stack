import gsap from "gsap";
import { data } from "./data";

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

  imgPos = [50, 140, 140, 140, 140, 140, 140, 140, 140, 140];

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
          hide: -50,
          show: 50,
          ease: "power1.easeOut",
          onStart: () => {
            for (var i = 0; i < show; i++) {
              if (i != hide) {
                that.imgPos[i] = -50;
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
          hide: 140,
          show: 50,
          ease: "power1.easeOut",
          onStart: () => {
            for (var i = that.imgPos.length; i > show; i--) {
              if (i != hide) {
                that.imgPos[i] = 140;
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
    this.imgPos = [140, 140, 140, 140, 140, 140, 140, 140, 140, 140];
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
      top: 140,
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
      top: 140,
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

class About {
  about = undefined;
  about_btn = undefined;
  aboutContent = undefined;
  isOpen = false;
  aboutTitle = undefined;
  aboutListEls = undefined;
  aboutLines = undefined;

  resetColors = undefined;
  changeColor = undefined;

  constructor() {
    this.about = document.querySelector(".about");
    this.about_btn = document.querySelector(".about-btn");
    this.about_btn.addEventListener("click", (e) => {
      if (this.isOpen) {
        this.closeAbout();
      } else {
        this.openAbout();
      }
    });
    this.aboutContent = document.querySelector(".about-content");
    this.aboutTitle = document.querySelectorAll(".about-letter");
    this.aboutLines = document.querySelectorAll(".about-line");

    const ls = document.createElement("div");
    ls.classList.add("about-list");
    this.aboutContent.appendChild(ls);
    for (var i = 0; i < data.length; i++) {
      const el = document.createElement("div");
      const el2 = document.createElement("div");
      el2.classList.add("about-list-el");
      el2.innerHTML = data[i].title;
      el.appendChild(el2);
      ls.appendChild(el);
    }
    this.aboutListEls = document.querySelectorAll(".about-list-el");
  }

  setResetColors(func) {
    this.resetColors = func;
  }

  setChangeColor(func) {
    this.changeColor = func;
  }

  openAbout() {
    this.setIsOpen(true);
    this.resetColors();

    this.about.style.pointerEvents = "all";

    const val = {
      opacity: 0,
    };
    gsap.to(val, 0.3, {
      opacity: 1,
      onUpdate: () => {
        this.about.style.opacity = val.opacity;
      },
    });

    for (let i = 0; i < this.aboutTitle.length; i++) {
      const val2 = {
        x: -115,
        idx: i,
      };

      const el = this.aboutTitle[i];
      const delay = i * 0.024;

      const anim = gsap.to(val2, 0.5, {
        x: 0,
        delay: delay,
        ease: "power1.easeOut",
        onUpdate: () => {
          if (this.isOpen) {
            el.style.transform = `translateX(${val2.x}%)`;
          } else {
            anim.kill();
          }
        },
      });
    }

    for (let i = 0; i < this.aboutListEls.length; i++) {
      const val3 = {
        y: 115,
        idx: i,
      };

      const el = this.aboutListEls[i];
      const delay = i * 0.024;

      const anim = gsap.to(val3, 0.5, {
        y: 0,
        delay: delay,
        ease: "power1.easeOut",
        onUpdate: () => {
          if (this.isOpen) {
            el.style.transform = `translateY(${val3.y}%)`;
          } else {
            anim.kill();
          }
        },
      });
    }

    for (let i = 0; i < this.aboutLines.length; i++) {
      const val4 = {
        y: 115,
        idx: i,
      };

      const el = this.aboutLines[i];

      const anim = gsap.to(val4, 0.5, {
        y: 0,
        ease: "power1.easeOut",
        onUpdate: () => {
          if (this.isOpen) {
            el.style.transform = `translateY(${val4.y}%)`;
          } else {
            anim.kill();
          }
        },
      });
    }
  }

  closeAbout() {
    this.setIsOpen(false);
    this.changeColor();

    this.about.style.pointerEvents = "none";

    const val = {
      opacity: 1,
    };
    gsap.to(val, 0.3, {
      opacity: 0,
      onUpdate: () => {
        this.about.style.opacity = val.opacity;
      },
    });

    for (let i = 0; i < this.aboutTitle.length; i++) {
      const val2 = {
        x: 0,
        idx: i,
      };

      const el = this.aboutTitle[i];

      gsap.to(val2, 0.5, {
        x: 115,
        ease: "power1.easeOut",
        onUpdate: () => {
          el.style.transform = `translateX(${val2.x}%)`;
        },
      });
    }

    for (let i = 0; i < this.aboutListEls.length; i++) {
      const val3 = {
        y: 0,
        idx: i,
      };

      const el = this.aboutListEls[i];

      gsap.to(val3, 0.5, {
        y: -115,
        ease: "power1.easeOut",
        onUpdate: () => {
          el.style.transform = `translateY(${val3.y}%)`;
        },
      });
    }

    for (let i = 0; i < this.aboutLines.length; i++) {
      const val4 = {
        y: 0,
        idx: i,
      };

      const el = this.aboutLines[i];

      gsap.to(val4, 0.5, {
        y: -115,
        ease: "power1.easeOut",
        onUpdate: () => {
          el.style.transform = `translateY(${val4.y}%)`;
        },
      });
    }
  }

  setIsOpen(val) {
    this.isOpen = val;
  }

  isOpen() {
    return this.isOpen;
  }
}

export { ImageList, Text, Line, Icon, About };
