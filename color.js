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

  about = undefined;
  about_u = undefined;

  bars = undefined;

  selector = undefined;

  TRANSITIONING = false;

  r = 51;
  g = 51;
  b = 51;

  t_r = 255;
  t_g = 255;
  t_b = 255;

  new_r = undefined;
  new_g = undefined;
  new_b = undefined;

  new_t_r = undefined;
  new_t_g = undefined;
  new_t_b = undefined;

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
    this.about = document.querySelector(".about-btn");
    this.about_u = document.querySelector(".about-btn-underline");
  }

  toColor(bgObj, colObj) {
    this.setColor(bgObj, colObj);
    this.changeColor();
  }

  setColor(bgObj, colObj) {
    this.new_r = bgObj.r;
    this.new_g = bgObj.g;
    this.new_b = bgObj.b;

    this.new_t_r = colObj.r;
    this.new_t_g = colObj.g;
    this.new_t_b = colObj.b;
  }

  changeColor() {
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
      r: this.new_r,
      g: this.new_g,
      b: this.new_b,

      t_r: this.new_t_r,
      t_g: this.new_t_g,
      t_b: this.new_t_b,

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

          this.about.style.color = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;
          this.about_u.style.backgroundColor = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;

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
    console.log("reset");
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
      r: 20,
      g: 20,
      b: 20,

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

        this.about.style.color = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;
        this.about_u.style.backgroundColor = `rgb(${value.t_r}, ${value.t_g}, ${value.t_b})`;

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
