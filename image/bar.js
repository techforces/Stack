import { gsap } from "gsap";
import { data } from "./data";

class StackBar {
  // rectangles
  recs = undefined;
  bars = undefined;
  current = undefined;

  constructor() {
    let stack = document.querySelector(".stack-bar");

    for (var i = 0; i < data.length; i++) {
      var tmp_rec = document.createElement("div");
      tmp_rec.classList.add("rectangle");

      var tmp_bar = document.createElement("div");
      tmp_bar.classList.add("bar");

      tmp_rec.appendChild(tmp_bar);
      stack.appendChild(tmp_rec);
    }

    this.recs = document.querySelectorAll(".rectangle");
    console.log(this.recs);
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
    if (idx != this.current) {
      this.closeIndex();

      let value = {
        rec: 9,
        bar: 2,
        margin: 0,
      };

      gsap.to(value, 0.24, {
        rec: 108,
        bar: 28,
        ease: "power1.easeOut",
        onUpdate: () => {
          this.recs[idx].style.width = `${value.rec}px`;
          this.bars[idx].style.width = `${value.bar}px`;
        },
        onComplete: () => {
          this.current = idx;
        },
      });
    }
  }

  closeIndex() {
    if (this.current != undefined) {
      let value = {
        rec: 108,
        bar: 28,
      };

      gsap.to(value, 0.24, {
        rec: 9,
        bar: 2,
        ease: "power1.easeOut",
        onUpdate: () => {
          this.recs[this.current].style.width = `${value.rec}px`;
          this.bars[this.current].style.width = `${value.bar}px`;
        },
      });
    }
  }
}

export default StackBar;
