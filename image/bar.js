import { gsap } from "gsap";
import { data } from "./data";

class StackBar {
  // rectangles
  recs = undefined;
  bars = undefined;
  lefts = undefined;
  rights = undefined;
  current = undefined;

  constructor() {
    let stack = document.querySelector(".stack-bar");

    for (var i = 0; i < data.length; i++) {
      var tmp_rec = document.createElement("div");
      tmp_rec.classList.add("rectangle");

      var tmp_bar = document.createElement("div");
      tmp_bar.classList.add("bar");

      var tmp_bar_left = document.createElement("div");
      tmp_bar_left.classList.add("bar-left");

      var tmp_bar_left_content = document.createElement("div");
      tmp_bar_left_content.classList.add("bar-left-content");
      if (i + 1 < 10) {
        tmp_bar_left_content.innerHTML = "0" + (i + 1);
      } else {
        tmp_bar_left_content.innerHTML = i + 1;
      }

      var tmp_bar_right = document.createElement("div");
      tmp_bar_right.classList.add("bar-right");

      var tmp_bar_right_content = document.createElement("div");
      tmp_bar_right_content.classList.add("bar-right-content");
      tmp_bar_right_content.innerHTML = data.length;

      tmp_bar_left.appendChild(tmp_bar_left_content);
      tmp_bar_right.appendChild(tmp_bar_right_content);
      tmp_rec.appendChild(tmp_bar_left);
      tmp_rec.appendChild(tmp_bar);
      tmp_rec.appendChild(tmp_bar_right);
      stack.appendChild(tmp_rec);
    }

    this.recs = document.querySelectorAll(".rectangle");
    this.lefts = document.querySelectorAll(".bar-left");
    this.rights = document.querySelectorAll(".bar-right");

    this.bars = [];

    for (var i = 0; i < this.recs.length; i++) {
      this.bars[i] = this.recs[i].querySelector(".bar");
      // this.recs[i].setAttribute("data-index", `i`);
      this.recs[i].dataset.index = i;
      this.recs[i].addEventListener("click", (event) => {
        this.openIndex(event.srcElement.dataset.index);
      });
    }
  }

  openIndex(idx) {
    // if (idx != this.current) {
    this.closeIndex();

    let value = {
      rec: 9,
      bar: 2,
      l_c: 0,
      r_c: 0,
    };

    gsap.to(value, 0.24, {
      rec: 98,
      bar: 28,
      l_c: 25,
      r_c: 25,
      ease: "power1.easeOut",
      onUpdate: () => {
        this.recs[idx].style.width = `${value.rec}px`;
        this.bars[idx].style.width = `${value.bar}px`;
        this.lefts[idx].style.width = `${value.l_c}px`;
        this.rights[idx].style.width = `${value.r_c}px`;
      },
      onComplete: () => {
        this.current = idx;
      },
    });
    // }
  }

  closeIndex() {
    if (this.current != undefined) {
      let value = {
        rec: 98,
        bar: 28,
        l_c: 25,
        r_c: 25,
      };

      gsap.to(value, 0.24, {
        rec: 9,
        bar: 2,
        l_c: 0,
        r_c: 0,
        ease: "power1.easeOut",
        onUpdate: () => {
          this.recs[this.current].style.width = `${value.rec}px`;
          this.bars[this.current].style.width = `${value.bar}px`;
          this.lefts[this.current].style.width = `${value.l_c}px`;
          this.rights[this.current].style.width = `${value.r_c}px`;
        },
      });
    }
  }
}

export default StackBar;
