class UI {
  button = undefined;
  constructor() {
    this.button = document.getElementById("explr-btn");
  }

  getExploreBtn() {
    return this.button;
  }
}

export default UI;
