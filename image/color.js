import { gsap } from "gsap";
import { data } from "./data";

class Colors {
  body = undefined;

  p_l_c = undefined;
  p_t_c = undefined;
  p_t_line = undefined;
  p_s_i = undefined;

  e_l_c = undefined;
  e_t_c = undefined;
  e_t_line = undefined;
  e_s_i = undefined;

  bars = undefined;

  selector = undefined;

  TRANSITIONING = false;

  r = 51;
  g = 51;
  b = 51;

  t_r = 255;
  t_g = 255;
  t_b = 255;

  constructor() {
    this.body = document.querySelector("body");
    this.p_l_c = document.querySelector(".p-l-c");
    this.p_t_c = document.querySelector(".p-t-c");
    this.p_t_line = document.querySelector(".p-t-line");
    this.p_s_i = document.querySelector(".p-s-i");

    this.e_l_c = document.querySelector(".e-l-c");
    this.e_t_c = document.querySelector(".e-t-c");
    this.e_t_line = document.querySelector(".e-t-line");
    this.e_s_i = document.querySelector(".e-s-i");

    this.selector = document.querySelector(".selector-indicator");

    this.bars = document.querySelectorAll(".bar");
  }

  toColor(bgObj, colObj) {
    var value = {
      r: this.r,
      g: this.g,
      b: this.b,
      t_r: this.t_r,
      t_g: this.t_g,
      t_b: this.t_b,
    };
    this.TRANSITIONING = true;
    const anim = gsap.to(value, 1.2, {
      r: bgObj.r,
      g: bgObj.g,
      b: bgObj.b,

      t_r: colObj.r,
      t_g: colObj.g,
      t_b: colObj.b,

      ease: "power1.easeOut",
      onUpdate: () => {
        if (this.TRANSITIONING) {
          this.r = value.r;
          this.g = value.g;
          this.b = value.b;

          this.t_r = value.t_r;
          this.t_g = value.t_g;
          this.t_b = value.t_b;
          this.body.style.backgroundColor = `rgb(${value.r}, ${value.g}, ${value.b})`;
          this.body.style.color = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;

          this.e_t_c.style.color = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;
          this.e_l_c.style.backgroundColor = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;
          this.e_t_line.style.borderColor = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;
          this.e_s_i.style.stroke = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;

          this.p_t_c.style.color = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;
          this.p_l_c.style.backgroundColor = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;
          this.p_t_line.style.borderColor = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;
          this.p_s_i.style.stroke = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;

          this.selector.style.borderColor = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;

          for (var i = 0; i < data.length; i++) {
            this.bars[
              i
            ].style.borderColor = `rgba(${value.t_r}, ${value.t_g}, ${value.t_b}, 0.6)`;
          }
        } else {
          anim.kill();
        }
      },
    });
  }

  resetColors() {
    var value = {
      r: this.r,
      g: this.g,
      b: this.b,
      t_r: this.t_r,
      t_g: this.t_g,
      t_b: this.t_b,
    };

    this.TRANSITIONING = false;

    gsap.to(value, 0.4, {
      r: 51,
      g: 51,
      b: 51,

      t_r: 255,
      t_g: 255,
      t_b: 255,

      ease: "power1.easeOut",
      onUpdate: () => {
        this.r = value.r;
        this.g = value.g;
        this.b = value.b;

        this.t_r = value.t_r;
        this.t_g = value.t_g;
        this.t_b = value.t_b;
        this.body.style.backgroundColor = `rgb(${value.r}, ${value.g}, ${value.b})`;
        this.body.style.color = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;

        this.e_t_c.style.color = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;
        this.e_l_c.style.backgroundColor = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;
        this.e_t_line.style.borderColor = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;
        this.e_s_i.style.stroke = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;

        this.p_t_c.style.color = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;
        this.p_l_c.style.backgroundColor = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;
        this.p_t_line.style.borderColor = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;
        this.p_s_i.style.stroke = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;

        this.selector.style.borderColor = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;

        for (var i = 0; i < data.length; i++) {
          this.bars[
            i
          ].style.borderColor = `rgba(${value.t_r}, ${value.t_g}, ${value.t_b}, 0.5)`;
        }
      },
    });
  }
}

export default Colors;
