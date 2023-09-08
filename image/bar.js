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
    if (this.current != undefined) {
      this.recs[this.current].style.width = "9px";
      this.bars[this.current].style.width = "2px";
    }

    this.current = idx;
    console.log(idx);
    this.recs[idx].style.width = "28px";
    this.bars[idx].style.width = "28px";
  }

  closeIndex() {
    if (this.current != undefined) {
      this.recs[this.current].style.width = "9px";
      this.bars[this.current].style.width = "2px";
    }
  }
}

export default StackBar;
