import { gsap } from "gsap";

class Typography {
  list = undefined;
  t = undefined;

  // State management, check if the text should be hidden in fact
  visible = false;

  // Top texts
  tt = [];
  // Covering divs
  ttCov = [];
  // Divs containing the letters
  ttCovLet = [];
  ttLetWMax = [];
  ttLetWMin = [];
  ttLetMaxSum = [];
  ttLetMinSum = [];

  // Bottom texts
  tb = [];
  // Bottom letter covers
  tbCov = [];
  // Bottom letters
  tbCovLet = [];

  tbLetWMax = [];
  tbLetWMin = [];

  tbLetMaxSum = [];
  tbLetMinSum = [];

  constructor() {
    this.list = document.querySelectorAll(".text-list li");

    for (var i = 0; i < this.list.length; i++) {
      this.tt[i] = this.list[i].querySelector(".tt");
      this.ttCov[i] = this.tt[i].querySelectorAll(".tc");
      this.ttCovLet[i] = this.tt[i].querySelectorAll(".tc div");

      this.ttLetWMax[i] = [];
      this.ttLetWMin[i] = [];

      this.ttLetMaxSum[i] = [];
      this.ttLetMinSum[i] = [];

      let maxSum = 0;
      let minSum = 0;

      for (var j = 0; j < this.ttCovLet[i].length; j++) {
        this.ttCovLet[i][j].style.transform = "translateX(100%)";
        this.ttLetWMax[i][j] = window
          .getComputedStyle(this.ttCov[i][j], null)
          .getPropertyValue("width");
        this.ttLetWMin[i][j] = window
          .getComputedStyle(this.ttCovLet[i][j], null)
          .getPropertyValue("width");

        this.ttLetMaxSum[i][j] = maxSum;
        this.ttLetMinSum[i][j] = minSum;

        // get integer part if the value is not float
        if (this.ttLetWMax[i][j].match(/\d+\.\d+/) == null) {
          maxSum += parseFloat(this.ttLetWMax[i][j].match(/\d+/)[0]);
        } else {
          maxSum += parseFloat(this.ttLetWMax[i][j].match(/\d+\.\d+/)[0]);
        }

        if (this.ttLetWMin[i][j].match(/\d+\.\d+/) == null) {
          minSum += parseFloat(this.ttLetWMin[i][j].match(/\d+/)[0]);
        } else {
          minSum += parseFloat(this.ttLetWMin[i][j].match(/\d+\.\d+/)[0]);
        }
      }

      this.tb[i] = this.list[i].querySelector(".tb");
      if (this.tb[i] != null) {
        this.tbCov[i] = this.tb[i].querySelectorAll(".tc");
        this.tbCovLet[i] = this.tb[i].querySelectorAll(".tc div");
        this.tbLetWMin[i] = [];
        this.tbLetWMax[i] = [];

        this.tbLetMaxSum[i] = [];
        this.tbLetMinSum[i] = [];

        maxSum = 0;
        minSum = 0;

        for (var j = 0; j < this.tbCovLet[i].length; j++) {
          this.tbCovLet[i][j].style.transform = "translateX(100%)";
          this.tbLetWMax[i][j] = window
            .getComputedStyle(this.tbCov[i][j], null)
            .getPropertyValue("width");
          this.tbLetWMin[i][j] = window
            .getComputedStyle(this.tbCovLet[i][j], null)
            .getPropertyValue("width");

          this.tbLetMaxSum[i][j] = maxSum;
          this.tbLetMinSum[i][j] = minSum;

          // get integer part if the value is not float
          if (this.tbLetWMax[i][j].match(/\d+\.\d+/) == null) {
            maxSum += parseFloat(this.tbLetWMax[i][j].match(/\d+/)[0]);
          } else {
            maxSum += parseFloat(this.tbLetWMax[i][j].match(/\d+\.\d+/)[0]);
          }

          if (this.tbLetWMin[i][j].match(/\d+\.\d+/) == null) {
            minSum += parseFloat(this.tbLetWMin[i][j].match(/\d+/)[0]);
          } else {
            minSum += parseFloat(this.tbLetWMin[i][j].match(/\d+\.\d+/)[0]);
          }
        }
      } else {
        this.tbCov[i] = null;
        this.tbCovLet[i] = null;
      }
    }

    this.setDefaultPositions(0);
  }

  openText(idx) {
    let t = 0.08;
    this.visible = true;

    for (var i = 0; i < this.ttCovLet[idx].length; i++) {
      const value = {
        x: this.ttCovLet[idx][i].style.transform.match(/\d+/)[0],
      };

      const el = this.ttCovLet[idx][i];

      gsap.to(value, 1.2, {
        x: 0,
        ease: "power1.easeOut",
        delay: t * i,
        onUpdate: () => {
          if (this.visible) {
            el.style.transform = `translateX(${value.x}%)`;
          }
        },
      });
    }

    if (this.tbCovLet[idx] != null) {
      for (var i = 0; i < this.tbCovLet[idx].length; i++) {
        const value = {
          x: this.tbCovLet[idx][i].style.transform.match(/\d+/)[0],
        };

        const el = this.tbCovLet[idx][i];

        gsap.to(value, 1.2, {
          x: 0,
          ease: "power1.easeOut",
          delay: t * i,
          onUpdate: () => {
            if (this.visible) {
              el.style.transform = `translateX(${value.x}%)`;
            }
          },
        });
      }
    }
  }

  closeText(idx) {
    this.visible = false;
    for (var i = 0; i < this.ttCovLet[idx].length; i++) {
      const value = {
        x: this.ttCovLet[idx][i].style.transform.match(/\d+/)[0],
      };

      const el = this.ttCovLet[idx][i];

      gsap.to(value, 0.5, {
        x: 100,
        ease: "power1.easeOut",
        onUpdate: () => {
          el.style.transform = `translateX(${value.x}%)`;
        },
      });
    }

    if (this.tbCovLet[idx] != null) {
      for (var i = 0; i < this.tbCovLet[idx].length; i++) {
        const value = {
          x: this.tbCovLet[idx][i].style.transform.match(/\d+/)[0],
        };

        const el = this.tbCovLet[idx][i];

        gsap.to(value, 0.5, {
          x: 100,
          ease: "power1.easeOut",
          onUpdate: () => {
            el.style.transform = `translateX(${value.x}%)`;
          },
        });
      }
    }
  }

  squishText(idx) {
    for (var i = 0; i < this.ttCov[idx].length; i++) {
      const value = {
        l: this.ttLetMaxSum[idx][i],
      };
      let el = this.ttCov[idx][i];
      const l = this.ttLetMinSum[idx][i];
      const that = this;

      gsap.to(value, 0.5, {
        l: l,
        ease: "power1.easeOut",
        onUpdate: () => {
          el.style.left = `${value.l}px`;
        },
      });
    }
    for (var i = 0; i < this.tbCov[idx].length; i++) {
      const value = {
        l: this.tbLetMaxSum[idx][i],
      };
      let el = this.tbCov[idx][i];
      const l = this.tbLetMinSum[idx][i];
      const that = this;
      gsap.to(value, 0.4, {
        l: l,
        ease: "power1.easeOut",
        onUpdate: () => {
          el.style.left = `${value.l}px`;
        },
      });
    }
  }

  unsquishText(idx) {
    for (var i = 0; i < this.ttCov[idx].length; i++) {
      const value = {
        l: this.ttLetMinSum[idx][i],
      };
      let el = this.ttCov[idx][i];
      const l = this.ttLetMaxSum[idx][i];
      const that = this;

      gsap.to(value, 0.5, {
        l: l,
        ease: "power1.easeOut",
        onUpdate: () => {
          el.style.left = `${value.l}px`;
        },
      });
    }
    for (var i = 0; i < this.tbCov[idx].length; i++) {
      const value = {
        l: this.tbLetMinSum[idx][i],
      };
      let el = this.tbCov[idx][i];
      const l = this.tbLetMaxSum[idx][i];
      const that = this;
      gsap.to(value, 0.4, {
        l: l,
        ease: "power1.easeOut",
        onUpdate: () => {
          el.style.left = `${value.l}px`;
        },
      });
    }
  }

  setDefaultPositions(idx) {
    let sum = 0;

    for (var i = 0; i < this.ttCov[idx].length; i++) {
      this.ttCov[idx][i].style.left = `${sum}px`;
      sum += parseFloat(this.ttLetWMax[idx][i].match(/\d+\.\d+/)[0]);
    }
    sum = 0;
    for (var i = 0; i < this.tbCov[idx].length; i++) {
      this.tbCov[idx][i].style.left = `${sum}px`;
      sum += parseFloat(this.tbLetWMax[idx][i].match(/\d+\.\d+/)[0]);
    }
  }
}

class Information {
  left = [];
  right = [];

  constructor() {
    const listL = document.querySelectorAll(".i-l");
    const listR = document.querySelectorAll(".i-r");

    for (var i = 0; i < listL.length; i++) {
      this.left[i] = [];
      const lines = listL[i].querySelectorAll(":scope > div");
      for (var j = 0; j < lines.length; j++) {
        this.left[i][j] = [];
        const cells = lines[j].querySelectorAll("div");
        for (var k = 0; k < cells.length; k++) {
          this.left[i][j][k] = cells[k];
        }
      }
    }

    for (var i = 0; i < listR.length; i++) {
      this.right[i] = [];
      const lines = listR[i].querySelectorAll(":scope > div > div");
      for (var j = 0; j < lines.length; j++) {
        this.right[i][j] = lines[j];
      }
    }
  }

  openText(index) {
    for (var j = 0; j < this.left[index].length; j++) {
      for (var k = 0; k < this.left[index][k].length; k++) {
        const value = {
          y: 100,
        };

        let el = this.left[index][j][k];

        gsap.to(value, 0.5, {
          y: 0,
          delay: 0.5 + 0.08 * j,
          ease: "power1.easeOut",
          onUpdate: () => {
            el.style.transform = `translateY(${value.y}%)`;
          },
        });
      }
    }

    for (var j = 0; j < this.right[index].length; j++) {
      const value = {
        y: 100,
      };

      let el = this.right[index][j];

      gsap.to(value, 0.5, {
        y: 0,
        delay: 0.5 + 0.08 * (2 + j),
        ease: "power1.easeOut",
        onUpdate: () => {
          el.style.transform = `translateY(${value.y}%)`;
        },
      });
    }
  }

  closeText(index) {
    for (var j = 0; j < this.left[index].length; j++) {
      for (var k = 0; k < this.left[index][k].length; k++) {
        const value = {
          y: 0,
        };

        let el = this.left[index][j][k];

        gsap.to(value, 0.5, {
          y: -100,
          ease: "power1.easeOut",
          onUpdate: () => {
            el.style.transform = `translateY(${value.y}%)`;
          },
        });
      }
    }

    for (var j = 0; j < this.right[index].length; j++) {
      const value = {
        y: 0,
      };

      let el = this.right[index][j];

      gsap.to(value, 0.5, {
        y: -100,
        ease: "power1.easeOut",
        onUpdate: () => {
          el.style.transform = `translateY(${value.y}%)`;
        },
      });
    }
  }
}

export { Typography, Information };
