import { gsap } from "gsap";

class StackBar {
  // rectangles
  recs = undefined;
  bars = undefined;
  current = undefined;

  constructor() {
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
    this.closeIndex();

    let value = {
      rec: 9,
      bar: 2,
    };

    gsap.to(value, 0.4, {
      rec: 28,
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

  closeIndex() {
    if (this.current != undefined) {
      let value = {
        rec: 28,
        bar: 28,
      };

      gsap.to(value, 0.35, {
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
