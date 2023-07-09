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

  // Bottom texts
  tb = [];
  // Bottom letter covers
  tbCov = [];
  // Bottom letters
  tbCovLet = [];

  constructor() {
    this.list = document.querySelectorAll(".text-list li");

    for (var i = 0; i < this.list.length; i++) {
      this.tt[i] = this.list[i].querySelector(".tt");
      this.ttCov[i] = this.tt[i].querySelectorAll(".tc");
      this.ttCovLet[i] = this.tt[i].querySelectorAll(".tc div");
      for (var j = 0; j < this.ttCovLet[i].length; j++) {
        this.ttCovLet[i][j].style.transform = "translateX(100%)";
      }

      this.tb[i] = this.list[i].querySelector(".tb");
      if (this.tb[i] != null) {
        this.tbCov[i] = this.tb[i].querySelectorAll(".tc");
        this.tbCovLet[i] = this.tb[i].querySelectorAll(".tc div");

        for (var j = 0; j < this.tbCovLet[i].length; j++) {
          this.tbCovLet[i][j].style.transform = "translateX(100%)";
        }
      } else {
        this.tbCov[i] = null;
        this.tbCovLet[i] = null;
      }
    }

    console.log(this.tt);
    console.log(this.ttCov);
    console.log(this.ttCovLet);

    console.log(this.tb);
    console.log(this.tbCov);
    console.log(this.tbCovLet);
  }

  openText(idx) {
    let t = 0.08;
    this.visible = true;

    console.log(
      parseInt(this.ttCovLet[idx][0].style.transform.match(/\d+/)[0])
    );

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
}

export { Typography };
