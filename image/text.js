import { gsap } from "gsap";
import { data } from "./data";

class Typography {
  container = undefined;
  index = undefined;
  lastIndex = undefined;
  list = undefined;
  t = undefined;

  screenFraction = undefined;

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
    this.container = document.querySelector(".text-list");
    this.screenFraction = window.innerWidth / 100;

    // Add text content from data.js
    for (var i = 0; i < data.length; i++) {
      var li = document.createElement("li");

      // top title
      var temp_tt = document.createElement("div");
      var temp_tt_classes = ["t", `t${i}`, "tt"];
      temp_tt.classList.add(...temp_tt_classes);
      for (var j = 0; j < data[i].topTitle.length; j++) {
        var temp_tc = document.createElement("div");
        temp_tc.classList.add("tc");
        var temp_char = document.createElement("div");
        temp_char.innerHTML = data[i].topTitle.charAt(j).toUpperCase();
        temp_tc.appendChild(temp_char);
        temp_tt.appendChild(temp_tc);
      }

      // bottom title
      var temp_tb = document.createElement("div");
      var temp_tb_classes = ["t", `t${i}`, "tb"];
      temp_tb.classList.add(...temp_tb_classes);
      for (var j = 0; j < data[i].botTitle.length; j++) {
        var temp_tc = document.createElement("div");
        temp_tc.classList.add("tc");
        var temp_char = document.createElement("div");
        temp_char.innerHTML = data[i].botTitle.charAt(j).toUpperCase();
        temp_tc.appendChild(temp_char);
        temp_tb.appendChild(temp_tc);
      }

      var i_l = document.createElement("div");
      i_l.classList.add("i-l");

      var d1 = document.createElement("div");
      var d2 = document.createElement("div");
      var d3 = document.createElement("div");
      var d4 = document.createElement("div");

      var d1_1 = document.createElement("div");
      var d1_2 = document.createElement("div");
      var d1_3 = document.createElement("div");
      d1_1.innerHTML = "A";
      d1_2.innerHTML = data[i].infoLeft.a[0];
      d1_3.innerHTML = data[i].infoLeft.a[1];
      d1.appendChild(d1_1);
      d1.appendChild(d1_2);
      d1.appendChild(d1_3);

      var d2_1 = document.createElement("div");
      var d2_2 = document.createElement("div");
      var d2_3 = document.createElement("div");
      d2_1.innerHTML = "B";
      d2_2.innerHTML = data[i].infoLeft.b[0];
      d2_3.innerHTML = data[i].infoLeft.b[1];
      d2.appendChild(d2_1);
      d2.appendChild(d2_2);
      d2.appendChild(d2_3);

      var d3_1 = document.createElement("div");
      var d3_2 = document.createElement("div");
      var d3_3 = document.createElement("div");
      d3_1.innerHTML = "C";
      d3_2.innerHTML = data[i].infoLeft.c[0];
      d3_3.innerHTML = data[i].infoLeft.c[1];
      d3.appendChild(d3_1);
      d3.appendChild(d3_2);
      d3.appendChild(d3_3);

      var d4_1 = document.createElement("div");
      var d4_2 = document.createElement("div");
      var d4_3 = document.createElement("div");
      d4_1.innerHTML = "D";
      d4_2.innerHTML = data[i].infoLeft.d[0];
      d4_3.innerHTML = data[i].infoLeft.d[1];
      d4.appendChild(d4_1);
      d4.appendChild(d4_2);
      d4.appendChild(d4_3);

      i_l.appendChild(d1);
      i_l.appendChild(d2);
      i_l.appendChild(d3);
      i_l.appendChild(d4);

      var i_r = document.createElement("div");
      i_r.classList.add("i-r");

      var b1 = document.createElement("div");
      var b1_1 = document.createElement("div");
      b1_1.innerHTML = data[i].infoRight.top;
      b1.appendChild(b1_1);
      i_r.appendChild(b1);

      var b2 = document.createElement("div");
      var b2_1 = document.createElement("div");
      b2_1.innerHTML = data[i].infoRight.bot;
      b2.appendChild(b2_1);
      i_r.appendChild(b2);

      li.appendChild(temp_tt);
      li.appendChild(temp_tb);
      li.appendChild(i_l);
      li.appendChild(i_r);
      this.container.appendChild(li);
    }

    this.list = document.querySelectorAll(".text-list li");
    setTimeout(() => {
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
          this.ttCovLet[i][
            j
          ].style.color = `rgb(${data[i].color.r}, ${data[i].color.g}, ${data[i].color.b})`;
          this.ttLetWMax[i][j] = window
            .getComputedStyle(this.ttCov[i][j], null)
            .getPropertyValue("width");
          this.ttLetWMin[i][j] = window
            .getComputedStyle(this.ttCovLet[i][j], null)
            .getPropertyValue("width");

          if (i == 0) {
            console.log(this.ttCovLet[i][j]);
          }

          this.ttLetMaxSum[i][j] = 0;
          this.ttLetMinSum[i][j] = 0;

          this.ttLetMaxSum[i][j] =
            data[i].topGaps[j] * this.screenFraction + maxSum;
          this.ttLetMinSum[i][j] = minSum;

          maxSum += data[i].topGaps[j] * this.screenFraction;

          // get integer part if the value is not float
          if (this.ttLetWMin[i][j].match(/\d+\.\d+/) == null) {
            maxSum += parseFloat(this.ttLetWMin[i][j].match(/\d+/)[0]);
          } else {
            maxSum += parseFloat(this.ttLetWMin[i][j].match(/\d+\.\d+/)[0]);
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
            this.tbCovLet[i][
              j
            ].style.color = `rgb(${data[i].color.r}, ${data[i].color.g}, ${data[i].color.b})`;
            this.tbLetWMax[i][j] = window
              .getComputedStyle(this.tbCov[i][j], null)
              .getPropertyValue("width");
            this.tbLetWMin[i][j] = window
              .getComputedStyle(this.tbCovLet[i][j], null)
              .getPropertyValue("width");

            this.tbLetMaxSum[i][j] = 0;
            this.tbLetMinSum[i][j] = 0;

            this.tbLetMaxSum[i][j] =
              data[i].botGaps[j] * this.screenFraction + maxSum;
            this.tbLetMinSum[i][j] = minSum;

            maxSum += data[i].botGaps[j] * this.screenFraction;

            // get integer part if the value is not float
            if (this.tbLetWMin[i][j].match(/\d+\.\d+/) == null) {
              maxSum += parseFloat(this.tbLetWMin[i][j].match(/\d+/)[0]);
            } else {
              maxSum += parseFloat(this.tbLetWMin[i][j].match(/\d+\.\d+/)[0]);
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

      // Set up

      for (var i = 0; i < this.tt.length; i++) {
        this.setDefaultPositions(i);
      }
    }, 100);
  }

  openText(idx) {
    let t = 0.08;
    this.visible = true;
    this.index = idx;

    // tt - text top animation
    for (var i = 0; i < this.ttCovLet[idx].length; i++) {
      let value;
      if (this.index >= this.lastIndex || this.lastIndex == undefined) {
        value = {
          x: 100,
        };
      } else {
        value = {
          x: -100,
        };
      }

      // const value = {
      //   x: this.ttCovLet[idx][i].style.transform.match(/\d+/)[0],
      // };

      const el = this.ttCovLet[idx][i];

      const anim = gsap.to(value, 1.2, {
        x: 0,
        ease: "power1.easeOut",
        delay: t * i,
        onUpdate: () => {
          if (this.visible && this.index == idx) {
            el.style.transform = `translateX(${value.x}%)`;
          } else {
            anim.kill();
          }
        },
      });
    }

    // tb - text bottom animation
    if (this.tbCovLet[idx] != null) {
      for (var i = 0; i < this.tbCovLet[idx].length; i++) {
        let value;
        if (this.index >= this.lastIndex || this.lastIndex == undefined) {
          value = {
            x: 100,
          };
        } else {
          value = {
            x: -100,
          };
        }

        // const value = {
        //   x: this.tbCovLet[idx][i].style.transform.match(/\d+/)[0],
        // };

        const el = this.tbCovLet[idx][i];

        const anim = gsap.to(value, 1.2, {
          x: 0,
          ease: "power1.easeOut",
          delay: t * i,
          onUpdate: () => {
            if (this.visible && this.index == idx) {
              el.style.transform = `translateX(${value.x}%)`;
            } else {
              anim.kill();
            }
          },
        });
      }
    }
  }

  closeText(idx, nextIdx) {
    this.visible = false;
    this.lastIndex = idx;

    for (var i = 0; i < this.ttCovLet[idx].length; i++) {
      const value = {
        x: this.ttCovLet[idx][i].style.transform.match(/\d+/)[0],
      };

      const el = this.ttCovLet[idx][i];

      let closeTarget;
      if (idx >= nextIdx) {
        closeTarget = 100;
      } else {
        closeTarget = -100;
      }

      gsap.to(value, 0.4, {
        x: closeTarget,
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

        let closeTarget;
        if (idx >= nextIdx) {
          closeTarget = 100;
        } else {
          closeTarget = -100;
        }

        gsap.to(value, 0.4, {
          x: closeTarget,
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

      gsap.to(value, 0.4, {
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

      gsap.to(value, 0.4, {
        l: l,
        delay: i * 0.015,
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
        delay: i * 0.015,
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
      sum = this.ttLetMaxSum[idx][i];
      this.ttCov[idx][i].style.left = `${sum}px`;
      // if (this.ttLetWMax[idx][i].match(/\d+\.\d+/) == null) {
      //   sum += parseFloat(this.ttLetWMax[idx][i].match(/\d+/)[0]);
      // } else {
      //   sum += parseFloat(this.ttLetWMax[idx][i].match(/\d+\.\d+/)[0]);
      // }
    }
    sum = 0;
    if (this.tbCov[idx] != null) {
      for (var i = 0; i < this.tbCov[idx].length; i++) {
        sum = this.tbLetMaxSum[idx][i];
        // sum += data[idx].botGaps[i] * this.screenFraction;
        this.tbCov[idx][i].style.left = `${sum}px`;
        // if (this.tbLetWMax[idx][i].match(/\d+\.\d+/) == null) {
        //   sum += parseFloat(this.tbLetWMax[idx][i].match(/\d+/)[0]);
        // } else {
        //   sum += parseFloat(this.tbLetWMax[idx][i].match(/\d+\.\d+/)[0]);
        // }
      }
    }
  }

  resize() {
    this.screenFraction = window.innerWidth / 100;

    for (var i = 0; i < this.list.length; i++) {
      let maxSum = 0;
      let minSum = 0;

      for (var j = 0; j < this.ttCovLet[i].length; j++) {
        this.ttLetWMax[i][j] = window
          .getComputedStyle(this.ttCov[i][j], null)
          .getPropertyValue("width");
        this.ttLetWMin[i][j] = window
          .getComputedStyle(this.ttCovLet[i][j], null)
          .getPropertyValue("width");

        // get integer part if the value is not float
        if (this.ttLetWMax[i][j].match(/\d+\.\d+/) == null) {
          maxSum +=
            parseFloat(this.ttLetWMax[i][j].match(/\d+/)[0]) +
            data[i].topGaps[j] * this.screenFraction;
        } else {
          maxSum +=
            parseFloat(this.ttLetWMax[i][j].match(/\d+\.\d+/)[0]) +
            data[i].topGaps * this.screenFraction;
        }

        if (this.ttLetWMin[i][j].match(/\d+\.\d+/) == null) {
          minSum += parseFloat(this.ttLetWMin[i][j].match(/\d+/)[0]);
        } else {
          minSum += parseFloat(this.ttLetWMin[i][j].match(/\d+\.\d+/)[0]);
        }
      }

      if (this.tb[i] != null) {
        maxSum = 0;
        minSum = 0;

        for (var j = 0; j < this.tbCovLet[i].length; j++) {
          this.tbLetWMax[i][j] = window
            .getComputedStyle(this.tbCov[i][j], null)
            .getPropertyValue("width");
          this.tbLetWMin[i][j] = window
            .getComputedStyle(this.tbCovLet[i][j], null)
            .getPropertyValue("width");

          // get integer part if the value is not float
          if (this.tbLetWMax[i][j].match(/\d+\.\d+/) == null) {
            maxSum +=
              parseFloat(this.tbLetWMax[i][j].match(/\d+/)[0]) +
              data[i].botGaps[j] * this.screenFraction;
          } else {
            maxSum +=
              parseFloat(this.tbLetWMax[i][j].match(/\d+\.\d+/)[0]) +
              data[i].botGaps[j] * this.screenFraction;
          }

          this.tbLetMaxSum[i][j] = maxSum;
          this.tbLetMinSum[i][j] = minSum;

          if (this.tbLetWMin[i][j].match(/\d+\.\d+/) == null) {
            minSum += parseFloat(this.tbLetWMin[i][j].match(/\d+/)[0]);
          } else {
            minSum += parseFloat(this.tbLetWMin[i][j].match(/\d+\.\d+/)[0]);
          }
        }
      }
    }

    // Set up

    for (var i = 0; i < this.tt.length; i++) {
      this.setDefaultPositions(i);
    }
  }
}

class Information {
  left = [];
  right = [];
  visible = false;
  index = undefined;

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
    this.index = index;
    this.visible = true;
    for (var j = 0; j < this.left[index].length; j++) {
      for (var k = 0; k < this.left[index][k].length; k++) {
        const value = {
          y: 100,
        };

        let el = this.left[index][j][k];

        const anim = gsap.to(value, 0.4, {
          y: 0,
          delay: 0.4 + 0.08 * j,
          ease: "power1.easeOut",
          onUpdate: () => {
            if (this.visible && this.index == index) {
              el.style.transform = `translateY(${value.y}%)`;
            } else {
              anim.kill();
            }
          },
        });
      }
    }

    for (var j = 0; j < this.right[index].length; j++) {
      const value = {
        y: 100,
      };

      let el = this.right[index][j];

      const anim = gsap.to(value, 0.4, {
        y: 0,
        delay: 0.4 + 0.08 * (2 + j),
        ease: "power1.easeOut",
        onUpdate: () => {
          if (this.visible && this.index == index) {
            el.style.transform = `translateY(${value.y}%)`;
          } else {
            anim.kill();
          }
        },
      });
    }
  }

  closeText(index) {
    this.visible = false;
    for (var j = 0; j < this.left[index].length; j++) {
      for (var k = 0; k < this.left[index][k].length; k++) {
        const value = {
          y: 0,
        };

        let el = this.left[index][j][k];

        gsap.to(value, 0.4, {
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

      gsap.to(value, 0.4, {
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
