import * as THREE from "three";
import vertexShader from "./imageVertexShader.glsl";
import fragmentShader from "./imageFragmentShader.glsl";
import gsap from "gsap";
import { Text, ImageList, Line, Icon, About } from "./ui";
import { Typography, Information } from "./text";
import { CustomEase } from "gsap/all";
import Colors from "./color";
import StackBar from "./bar";

import { data } from "./data";

/* Set up */
const perspective = 800;
const canvas = document.getElementById("stage");
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

const fov =
  (180 * (2 * Math.atan(window.innerHeight / 2 / perspective))) / Math.PI;
const camera = new THREE.PerspectiveCamera(
  fov,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 0, perspective);

// camera.position.set(0, 0, 1000);

// Use this variable to check of it is animating, if so block interaction temporarily
let transitioning = false;
let changing = false;

/* Preloader */
let textures = [];
let meshes = [];
let uniforms = [];
let isLoaded = false;
let isRendered = false;
let isSetup = false;
let imgIndex = 0;

let index = 0;
let lastIndex = 0;
let targetX = 0;
let enlarged = false;

let absoluteShift = 0;
let localShift = 0;

let planeWidth = Math.min(Math.floor(window.innerWidth * 0.066), 80);
let planeHeight = planeWidth * 3.625;
let planeWidthBig = Math.min(Math.floor(window.innerWidth * 0.65), 815);
let planeHeightBig = Math.floor(planeWidthBig / 1.734);
let currentWidth = planeWidth;
let currentHeight = planeHeight;
let gapMin = 15;
let gapMax = 180;
let gap = gapMin;
let planeRatio = planeWidth / planeHeight;

let minLength = 0;
let maxLength = 0;
let currLength = 0;

let opacity = 0.8;
let hoverRate = 0;

// impulse ∈ [-1, 1]; delta ∈ [-delta_max, delta_max];
let impulse = 0;
let imDelta = 0;
const imDeltaMax = 400;

const rotAngle = 25;
// const rotAngle = 0;

const waveRotationAngle = 33;

// the higher the value, the shorter the duration
const rotAnimDuration = 20;

let maxWaveSize = window.innerWidth / 2;
let waveHalf = maxWaveSize / 2;

// color grading
let coloredWidth = 300;
let partiallyColoredWidth = 100;

// explore transition settings
const explr_interval = 0.5;
const explr_ease = "power1.easeOut";

// case animation variables
let caseIndex = 0;

// "Paper landing" animation that happens after loading ends
const initLandDispX = 1600;
const initLandDispZ = 200;
const initLandAlpha = -90;

let landDispX = 0;
let landDispZ = 0;
let landAlpha = 0;

let routeIsDetected = false;
let routeNum = undefined;

/* MATH CONSTANTS */
const toDegree = Math.PI / 180;

const manager = new THREE.LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {
  // console.log(
  //   "Started loading file: " +
  //     url +
  //     ".\nLoaded " +
  //     itemsLoaded +
  //     " of " +
  //     itemsTotal +
  //     " files."
  // );
};

manager.onLoad = function () {
  // console.log("Loading complete!");

  var value1 = {
    x: 0,
  };
  var value2 = {
    x: 0,
  };
  var value3 = {
    x: 0,
  };

  gsap.to(value1, 0.4, {
    x: 115,
    delay: 0.2,
    ease: "power1.easeOut",
    onUpdate: () => {
      firstDigit.style.transform = `translateX(${value1.x}%)`;
    },
  });

  gsap.to(value2, 0.4, {
    x: 115,
    delay: 0.25,
    ease: "power1.easeOut",
    onUpdate: () => {
      secondDigit.style.transform = `translateX(${value2.x}%)`;
    },
  });

  gsap.to(value3, 0.4, {
    x: 115,
    delay: 0.3,
    ease: "power1.easeOut",
    onUpdate: () => {
      thirdDigit.style.transform = `translateX(${value3.x}%)`;
    },
  });

  var values = [
    { x: -115 },
    { x: -115 },
    { x: -115 },
    { x: -115 },
    { x: -115 },
    { x: -115 },
    { x: -115 },
  ];
  for (var i = 0; i < logoLetters.length; i++) {
    const elem = logoLetters[i];
    const delay = 0.4 + i * 0.05;
    const val = values[i];
    gsap.to(val, 0.4, {
      x: 0,
      delay: delay,
      ease: "power1.easeOut",
      onUpdate: () => {
        elem.style.transform = `translateX(${val.x}%)`;
      },
    });
  }

  var navVals = [
    { y: 150 },
    { y: 150 },
    { y: 150 },
    { y: 150 },
    { y: 150 },
    { y: 150 },
  ];

  for (var i = 0; i < navDivs.length; i++) {
    const elem = navDivs[i];
    const delay = 0.5 + i * 0.05;
    const val = navVals[i];

    gsap.to(val, 0.4, {
      y: 0,
      delay: delay,
      ease: "power1.easeOut",
      onUpdate: () => {
        elem.style.transform = `translateY(${val.y}%)`;
      },
      onComplete: () => {
        elem.style.pointerEvents = "all";
      },
    });
  }

  bar.appear();

  setTimeout(createPlanes, 100);
};

manager.onError = function () {
  // console.log("There was an error loading " + url);
};

manager.onProgress = function (url, itemsLoaded, itemsTotal) {
  // console.log(
  //   "Loading file: " +
  //     url +
  //     ".\nLoaded " +
  //     imgIndex +
  //     " of " +
  //     data.length +
  //     " files."
  // );

  const percentage = Math.floor((imgIndex / data.length) * 100);
  let progressText;
  if (percentage < 10) {
    progressText = `00${percentage}`;
    firstDigit.innerHTML = "0";
    secondDigit.innerHTML = "0";
    thirdDigit.innerHTML = `${percentage}`;
  } else if (percentage < 100) {
    progressText = `0${percentage}`;
    firstDigit.innerHTML = "0";
    secondDigit.innerHTML = progressText.charAt(1);
    thirdDigit.innerHTML = progressText.charAt(2);
  } else {
    progressText = `100`;
    firstDigit.innerHTML = "1";
    secondDigit.innerHTML = "0";
    thirdDigit.innerHTML = "0";
  }

  // loadingPerc.innerHTML = progressText;
};

/* Page transitions */
// window.addEventListener("hashchange", () => {
//   const content = routes[path];
//   console.log(path);
//   const appContainer = document.getElementById("app");
//   appContainer.innerHTML = content;
// });

/* Raycaster */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2(999, 999);

/* UI */
const exploreBtn = document.querySelector(".e-btn");
exploreBtn.style.display = "block";
exploreBtn.style.pointerEvents = "none";
const projectsBtn = document.querySelector(".p-btn");
projectsBtn.style.display = "block";
projectsBtn.style.pointerEvents = "none";

const exploreText = new Text(".e-t-c");
const projectText = new Text(".p-t-c");

const exploreLine = new Line(".e-l-c");
const projectLine = new Line(".p-l-c");

const exploreIcon = new Icon(".e-s-c");
const projectIcon = new Icon(".p-s-c");

const imageList = new ImageList();

const coverDiv = document.querySelector(".cover");
const loadingPerc = document.querySelector(".percent");
const firstDigit = document.querySelector(".fst-digit");
const secondDigit = document.querySelector(".snd-digit");
const thirdDigit = document.querySelector(".trd-digit");
const logoLetters = document.querySelectorAll(".logo-letter");

const navDivs = document.querySelectorAll(".nav > div > div");

/* Typography */
const typo = new Typography();
const info = new Information();

/* StackBar */
const bar = new StackBar();
const recs = bar.returnRectangles();

for (var i = 0; i < recs.length; i++) {
  recs[i].addEventListener("click", (event) => {
    if (enlarged) {
      jumpTo(event.srcElement.dataset.index);
    } else {
      scrollTo(event.srcElement.dataset.index);
    }
  });
}

/* Colors */
const colors = new Colors();
let caseIsOpen = false;

/* About */
const about = new About();
about.setResetColors(colors.resetColors.bind(colors));
about.setChangeColor(colors.changeColor.bind(colors));

exploreBtn.addEventListener("click", (e) => {
  e.preventDefault();

  openCase();

  if (typeof history.pushState != "undefined") {
    var obj = {
      title: data[index].title,
      url: data[index].url,
    };

    document.title = "Stack — " + obj.title;

    history.pushState(obj, obj.title, obj.url);
  }

  // Hide EXPLORE button
  exploreText.toPressed();
  exploreLine.toBottom();
  exploreIcon.toTop();
  exploreBtn.style.pointerEvents = "none";

  // Show PROJECTS button
  projectText.toVisible();
  projectLine.fromTop();
  projectIcon.fromBottom();
  projectsBtn.style.pointerEvents = "all";

  typo.squishText(index);

  bar.hideBar();
});

projectsBtn.addEventListener("click", (e) => {
  e.preventDefault();

  closeCase();

  if (typeof history.pushState != "undefined") {
    var obj = {
      title: "Stack",
      url: "/",
    };

    document.title = obj.title;

    history.pushState(obj, obj.title, obj.url);
  }

  // Show EXPLORE button
  exploreText.toVisible();
  exploreLine.fromTop();
  exploreIcon.fromBottom();
  exploreBtn.style.pointerEvents = "all";

  // Hide PROJECTS button
  projectText.toHidden();
  projectLine.toTop();
  projectIcon.toBottom();
  projectsBtn.style.pointerEvents = "none";

  typo.unsquishText(index);

  bar.showBar();
});

function openCase() {
  let next, prev;

  if (meshes[index - 1]) {
    prev = meshes[index - 1].offset_x;
  }
  if (meshes[index + 1]) {
    next = meshes[index + 1].offset_x;
  }

  let value = {
    posY: meshes[index].position.y,
    prev: prev,
    next: next,
    transitioning: transitioning,
  };

  transitioning = true;
  caseIsOpen = true;

  imageList.openCase();

  if (meshes[index - 1]) {
    gsap.to(value, explr_interval, {
      prev: -window.innerWidth / 2 + currentWidth / 2 + gap,
      ease: explr_ease,
      onUpdate: function () {
        meshes[index - 1].offset_x = this.targets()[0].prev;
      },
    });
  }

  if (meshes[index + 1]) {
    gsap.to(value, explr_interval, {
      next: window.innerWidth / 2 - currentWidth / 2 - gap,
      ease: explr_ease,
      onUpdate: function () {
        meshes[index + 1].offset_x = this.targets()[0].next;
      },
    });
  }

  gsap.to(value, explr_interval, {
    posY: window.innerHeight / 2 + currentHeight / 2,
    ease: explr_ease,
    onUpdate: function () {
      meshes[index].position.y = this.targets()[0].posY;
    },
    onComplete: function () {
      transitioning = false;
    },
  });
}

function closeCase() {
  let next, prev;

  if (meshes[index - 1]) {
    prev = meshes[index - 1].offset_x;
  }
  if (meshes[index + 1]) {
    next = meshes[index + 1].offset_x;
  }

  let value = {
    posY: meshes[index].position.y,
    prev: prev,
    next: next,
    transitioning: transitioning,
  };

  transitioning = true;
  imageList.closeCase();
  caseIsOpen = false;

  if (meshes[index - 1]) {
    gsap.to(value, explr_interval, {
      prev: 0,
      ease: explr_ease,
      onUpdate: function () {
        meshes[index - 1].offset_x = this.targets()[0].prev;
      },
    });
  }

  if (meshes[index + 1]) {
    gsap.to(value, explr_interval, {
      next: 0,
      ease: explr_ease,
      onUpdate: function () {
        meshes[index + 1].offset_x = this.targets()[0].next;
      },
    });
  }

  gsap.to(value, explr_interval, {
    posY: 0,
    ease: explr_ease,
    onUpdate: function () {
      meshes[index].position.y = this.targets()[0].posY;
    },
    onComplete: function () {
      transitioning = false;
    },
  });
}

function updateRaycaster() {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(meshes);

  if (intersects.length > 0) {
    // If the intersected object is not colored, then color it
    if (!uniforms[intersects[0].object.arr_id].hovered.value) {
      const val = {
        rate: uniforms[intersects[0].object.arr_id].hoverRate.value,
      };
      gsap.to(val, 0.5, {
        rate: 1,
        ease: "power1.easeOut",
        onUpdate: () => {
          uniforms[intersects[0].object.arr_id].hoverRate.value = val.rate;
        },
      });
    }

    // Loop through every mesh, if the mesh is colored, but not hovered, then decolor it
    for (var i = 0; i < meshes.length; i++) {
      const indx = i;
      if (
        uniforms[indx].hovered.value &&
        !uniforms[intersects[0].object.arr_id].hovered.value
      ) {
        const val = {
          rate: uniforms[indx].hoverRate.value,
        };
        gsap.to(val, 0.5, {
          rate: 0,
          ease: "power1.easeOut",
          onUpdate: () => {
            uniforms[indx].hoverRate.value = val.rate;
          },
        });
      }
      uniforms[indx].hovered.value = false;
    }
    uniforms[intersects[0].object.arr_id].hovered.value = true;
  } else {
    for (let i = 0; i < meshes.length; i++) {
      const indx = i;
      if (uniforms[indx].hovered.value) {
        const val = {
          rate: uniforms[indx].hoverRate.value,
        };
        gsap.to(val, 0.5, {
          rate: 0,
          ease: "power1.easeOut",
          onUpdate: () => {
            uniforms[indx].hoverRate.value = val.rate;
          },
        });
      }
      uniforms[indx].hovered.value = false;
    }
  }
}

// track pointing position
canvas.addEventListener("mousemove", () => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // updateRaycaster();
});

function enlargePlane(mesh, uniform) {
  enlarged = true;
  changing = true;
  // transitioning = true;
  let value = {
    width: currentWidth,
    height: currentHeight,
    gap: gap,
    length: currLength,
    cameraPosX: camera.position.x,
  };

  const anim = gsap.to(value, {
    duration: 1.2,
    width: planeWidthBig,
    height: planeHeightBig,
    ease: "power2.inOut",
    gap: gapMax,
    length: maxLength,
    cameraPosX: targetX,

    onUpdate: () => {
      if (enlarged) {
        mesh.geometry.dispose();
        mesh.geometry = new THREE.PlaneGeometry(value.width, value.height);
        gap = value.gap;
        currentWidth = value.width;
        currentHeight = value.height;
        currLength = value.length;
        camera.position.x = value.cameraPosX;
        uniform.planeRatio = { value: value.width / value.height };
      } else {
        anim.kill();
      }
    },
    onComplete: () => {
      transitioning = false;
      changing = false;
    },
  });

  let value2 = {
    opacity: opacity,
  };
  gsap.to(value2, 1.2, {
    opacity: 0.5,
    onUpdate: () => {
      opacity = value2.opacity;
      uniform.opacity = { value: value2.opacity };
    },
  });
}

function reducePlane(mesh, uniform) {
  // transitioning = true;
  enlarged = false;
  changing = true;
  let value = {
    width: currentWidth,
    height: currentHeight,
    gap: gap,
    length: currLength,
    cameraPosX: camera.position.x,
  };
  const anim = gsap.to(value, 0.6, {
    width: planeWidth,
    height: planeHeight,
    ease: "power2.inOut",
    gap: gapMin,
    length: minLength,
    cameraPosX: targetX,
    onUpdate: () => {
      if (!enlarged) {
        mesh.geometry.dispose();
        mesh.geometry = new THREE.PlaneGeometry(value.width, value.height);
        gap = value.gap;
        currentWidth = value.width;
        currentHeight = value.height;
        currLength = value.length;
        // camera.position.x = value.cameraPosX;
        uniform.planeRatio = { value: value.width / value.height };
      } else {
        anim.kill();
      }
    },
    onComplete: () => {
      transitioning = false;
      changing = false;
    },
  });

  let value2 = {
    opacity: opacity,
  };
  gsap.to(value2, 1.2, {
    opacity: 1,
    onUpdate: () => {
      opacity = value2.opacity;
      uniform.opacity = { value: value2.opacity };
    },
  });

  uniform.selected.value = false;
}

// enlarge on click
canvas.addEventListener("click", () => {
  if (!transitioning && !changing && Math.abs(impulse) <= 0.09) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      index = intersects[0].object.arr_id;

      localShift = index * (currentWidth + gap) - absoluteShift;
      absoluteShift = index * (currentWidth + gap);
      camera.position.x -= localShift;

      targetX = 0;

      if (!enlarged) {
        // from wave state to enlarged state
        // Show EXPLORE button
        exploreText.toVisible();
        exploreLine.fromTop();
        exploreIcon.fromBottom();
        exploreBtn.style.pointerEvents = "all";

        typo.openText(index);
        info.openText(index);
        bar.openIndex(index);
        colors.toColor(data[index].bgColor, data[index].color);
      } else {
        if (lastIndex != index) {
          typo.closeText(lastIndex, index);
          info.closeText(lastIndex, index);

          setTimeout(() => {
            typo.openText(index);
            info.openText(index);
            bar.openIndex(index);
          }, 150);

          // from enlarged state to enlarged state
          // Hide EXPLORE button
          exploreText.toPressed();
          exploreLine.toBottom();
          exploreIcon.toTop();
          exploreBtn.style.pointerEvents = "none";

          colors.toColor(data[index].bgColor, data[index].color);

          setTimeout(() => {
            // Show EXPLORE button
            exploreText.toVisible();
            exploreLine.fromTop();
            exploreIcon.fromBottom();
            exploreBtn.style.pointerEvents = "all";
          }, 500);
        }
      }

      caseIndex = intersects[0].object.arr_id;
      imageList.adjustSelector(data[caseIndex]);
      imageList.adjustStack(data[caseIndex]);

      for (var i = 0; i < meshes.length; i++) {
        enlargePlane(meshes[i], uniforms[i]);
        uniforms[i].selected.value = false;
      }
      uniforms[index].selected.value = true;

      lastIndex = index;
    }
  }
});

window.addEventListener("resize", () => {
  typo.resize();
  onWindowResize();
});

function onWindowResize() {
  const newW = Math.min(Math.floor(window.innerWidth * 0.65), 815);
  const newH = Math.floor(newW / 1.734);

  const newMinW = Math.min(Math.floor(window.innerWidth * 0.066), 80);
  const newMinH = Math.floor(newMinW * 3.625);

  const newGap = Math.min(Math.floor(window.innerWidth * 0.095), 180);
  const newMinGap = Math.min(Math.floor(window.innerWidth * 0.015), 15);

  planeWidthBig = newW;
  planeHeightBig = newH;
  gapMax = newGap;
  gapMin = newMinGap;

  planeWidth = newMinW;
  planeHeight = newMinH;

  minLength = (currentWidth + gap) * (images.length - 1);
  maxLength = (planeWidthBig + gapMax) * (images.length - 1);

  if (enlarged) {
    currentWidth = planeWidthBig;
    currentHeight = planeHeightBig;
    gap = gapMax;
    currLength = maxLength;
  } else {
    currentWidth = planeWidth;
    currentHeight = planeHeight;
    gap = gapMin;
    currLength = minLength;
  }

  maxWaveSize = window.innerWidth / 2;
  waveHalf = maxWaveSize / 2;

  for (var i = 0; i < meshes.length; i++) {
    meshes[i].geometry.dispose();
    meshes[i].geometry = new THREE.PlaneGeometry(currentWidth, currentHeight);
    uniforms[i].planeRatio = { value: currentWidth / currentHeight };
    uniforms[i].waveHalf.value = waveHalf;
    uniforms[i].windowHalf.value = window.innerWidth / 2;
  }

  coloredWidth = window.innerWidth * 0.15625;
  partiallyColoredWidth = coloredWidth / 3;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

// document.addEventListener("keypress", (event) => {
//   if (event.key === " ") {
//     console.log("spacebar");
//     startAtCase(Math.floor(Math.random() * 30));
//   }
// });

document.addEventListener("wheel", (event) => {
  if (!about.isOpen) {
    if (!enlarged) {
      // console.log(about.isOpen);
      if (
        camera.position.x > 100 - absoluteShift &&
        currLength - camera.position.x - absoluteShift > 100
      ) {
        // Scrolling animation for wave
        const newDelta = Math.max(
          -imDeltaMax,

          Math.min(imDeltaMax, imDelta + event.deltaY / 1.7)
        );

        // Smoothly transition imDelta to new value
        // 0.2 on windows with high fps
        // 0 on mac with low fps, quickfix
        var isTrackpad = false;
        var duration = 0.2;
        if (event.wheelDeltaY) {
          if (event.wheelDeltaY === event.deltaY * -3) {
            isTrackpad = true;
            duration = 0;
          }
        } else if (event.deltaMode === 0) {
          isTrackpad = true;
          duration = 0;
        }

        gsap.to({ val: imDelta }, duration, {
          val: newDelta,
          onUpdate: function () {
            imDelta = this.targets()[0].val;
          },
        });
      }

      // Move Camera
      const targetPosX = Math.max(
        -absoluteShift,
        Math.min(
          currLength - absoluteShift,
          camera.position.x + event.deltaY * 2.7
        )
      );
      gsap.to(camera.position, 0.5, { x: targetPosX });
    } else {
      if (!caseIsOpen) {
        // Hide EXPLORE button
        exploreText.toPressed();
        exploreLine.toBottom();
        exploreIcon.toTop();
        exploreBtn.style.pointerEvents = "none";

        typo.closeText(index, index);
        info.closeText(index, index);
        bar.closeIndex();
        colors.colorsToDefault();
        colors.resetColors();

        for (var i = 0; i < meshes.length; i++) {
          reducePlane(meshes[i], uniforms[i]);
        }
      }
    }
  }
});

/* Load textures */
const loader = new THREE.TextureLoader(manager);
const images = document.querySelectorAll(".image");

function loadImage(i) {
  if (i < images.length) {
    loader.load(
      images[i].src,
      (el) => {
        textures.push(el);
        imgIndex++;
        loadImage(imgIndex);
      },
      undefined,
      function () {
        loadImage(imgIndex);
      }
    );
  }
}

loadImage(imgIndex);
loader.load();

function scrollTo(idx) {
  gsap.to(camera.position, 0.8, {
    x: meshes[idx].position.x,
    ease: "power1.easeOut",
  });

  gsap.to({ val: imDelta }, 0.75, {
    val: Math.min(400, (meshes[idx].position.x - camera.position.x) / 3),
    onUpdate: function () {
      imDelta = this.targets()[0].val;
    },
  });
}

function jumpTo(idx) {
  index = parseInt(idx);

  localShift = index * (currentWidth + gap) - absoluteShift;
  absoluteShift = index * (currentWidth + gap);
  camera.position.x -= localShift;

  targetX = 0;

  let val = {
    x: camera.position.x,
    i: idx,
  };

  const anim = gsap.to(val, 0.8, {
    x: targetX,
    ease: "power1.easeOut",
    onUpdate: () => {
      if (val.i == index) {
        camera.position.x = val.x;
      } else {
        anim.kill();
      }
    },
  });

  if (lastIndex != index) {
    typo.closeText(lastIndex, index);
    info.closeText(lastIndex, index);

    setTimeout(() => {
      typo.openText(index);
      info.openText(index);
      bar.openIndex(index);
    }, 150);

    // from enlarged state to enlarged state
    // Hide EXPLORE button
    exploreText.toPressed();
    exploreLine.toBottom();
    exploreIcon.toTop();
    exploreBtn.style.pointerEvents = "none";

    colors.toColor(data[index].bgColor, data[index].color);

    setTimeout(() => {
      // Show EXPLORE button
      exploreText.toVisible();
      exploreLine.fromTop();
      exploreIcon.fromBottom();
      exploreBtn.style.pointerEvents = "all";
    }, 500);
  }

  caseIndex = parseInt(idx);
  imageList.adjustSelector(data[caseIndex]);
  imageList.adjustStack(data[caseIndex]);

  for (var i = 0; i < meshes.length; i++) {
    uniforms[i].selected.value = false;
  }
  uniforms[index].selected.value = true;

  lastIndex = index;
}

function enlargePlanesInstantly() {
  gap = gapMax;
  currentWidth = planeWidthBig;
  currentHeight = planeHeightBig;
  currLength = maxLength;

  for (var i = 0; i < meshes.length; i++) {
    meshes[i].geometry.dispose();
    meshes[i].geometry = new THREE.PlaneGeometry(currentWidth, currentHeight);
    uniforms[i].planeRatio = { value: currentWidth / currentHeight };
    meshes[i].position.x = (currentWidth + gap) * i - absoluteShift;
  }
}

function startAtCase(num) {
  enlargePlanesInstantly();
  camera.position.x = 0;

  caseIsOpen = true;
  enlarged = true;

  index = num;
  lastIndex = num;
  caseIndex = num;
  imageList.adjustSelector(data[caseIndex]);
  imageList.adjustStack(data[caseIndex]);

  if (meshes[index - 1]) {
    meshes[index - 1].offset_x =
      -window.innerWidth / 2 + currentWidth / 2 + gap;
  }

  if (meshes[index + 1]) {
    meshes[index + 1].offset_x = window.innerWidth / 2 - currentWidth / 2 - gap;
  }

  meshes[index].position.y = window.innerHeight / 2 + currentHeight / 2;

  // Show PROJECTS button
  projectText.toVisible();
  projectLine.fromTop();
  projectIcon.fromBottom();
  projectsBtn.style.pointerEvents = "all";

  imageList.openCase();

  bar.hideInstantly();
  bar.openIndex(num);

  uniforms[index].selected.value = true;
  colors.toColor(data[index].bgColor, data[index].color);

  typo.openText(index);
  info.openText(index);

  typo.squishText(index);
  // openCase();
}

function update() {
  if (isLoaded) {
    imDelta = imDelta * 0.95;

    impulse = Math.min(Math.max(-1, imDelta / imDeltaMax), 1);
    if (Math.abs(impulse) < 0.00005) impulse = 0;

    for (var i = 0; i < meshes.length; i++) {
      // Rotation coefficient: for wave effect ~
      const diff = camera.position.x - meshes[i].position.x;
      const abs_diff = Math.abs(diff);

      uniforms[i].impulse.value = Math.min(1, Math.abs(impulse) * 1.7);
      // uniforms[i].hoverRate.value = hoverRate;

      // Alpha is an angle based on displacement.
      // Sin(Max(-1, Min([-inf, +inf], 1)
      // meaning that the possible range is [-1, 1] * waveRotationAngle

      let alpha =
        Math.sin(
          Math.max(
            -1,
            Math.min(1, (meshes[i].position.x - camera.position.x) / waveHalf)
          ) * Math.PI
        ) * waveRotationAngle;

      // Scaling coefficient: for wave effect ~
      const scale_coef = 1 - Math.min(1, Math.pow(abs_diff / waveHalf, 2));

      meshes[i].position.z =
        (perspective / 2) * Math.abs(impulse) * scale_coef +
        landDispZ * (i + 1);
      // const scale = 1 + 0.5 * scale_coef * Math.abs(impulse);
      // meshes[i].scale.set(scale, scale, scale);

      bar.scaleBar(i, scale_coef * Math.abs(impulse));

      // Rotation (converted to radians)
      if (impulse > 0) {
        if (alpha > 0) {
          // To create a rounded shape of the wave we need to compensate for the rotation and subtract the alpha
          alpha *= 1.5;
        } else {
          alpha *= 0.8;
        }

        meshes[i].rotation.y =
          (impulse * (-rotAngle + alpha) + landAlpha * (i + 1)) * toDegree;
        // meshes[i].rotation.y = impulse * ((-rotAngle * Math.PI) / 180);
      } else {
        if (alpha < 0) {
          alpha *= 1.5;
        } else {
          alpha *= 0.8;
        }

        meshes[i].rotation.y =
          (impulse * (-rotAngle - alpha) + landAlpha * (i + 1)) * toDegree;
      }
    }

    // update positioning
    if (isSetup) {
      absoluteShift = index * (currentWidth + gap);

      for (var i = 0; i < meshes.length; i++) {
        meshes[i].position.x =
          (currentWidth + gap) * i +
          meshes[i].offset_x +
          landDispX +
          landDispX * 0.001 * i -
          absoluteShift;
      }
    } else if (isRendered) {
      landDispX = initLandDispX;
      landDispZ = initLandDispZ;
      landAlpha = initLandAlpha;

      const value = {
        dispX: landDispX,
        dispZ: landDispZ,
        alpha: landAlpha,
      };
      // Start displacement animation
      let duration = 1.2;
      if (routeIsDetected) {
        duration = 0;
      }
      gsap.to(value, duration, {
        dispX: 0,
        dispZ: 0,
        alpha: 0,
        ease: "power1.easeOut",
        onUpdate: () => {
          landDispX = value.dispX;
          landDispZ = value.dispZ;
          landAlpha = value.alpha;
        },
      });

      // Cover the first frame then remove it
      // Not a big fan of this solution
      setTimeout(() => {
        coverDiv.style.display = "none";
      }, 10);
      if (routeIsDetected) {
        startAtCase(routeNum);
      }
      isSetup = true;
    } else {
      // Initial Positioning, for performance optimization!
      meshes[0].position.x = 0;
      for (var i = 1; i < meshes.length; i++) {
        meshes[i].position.x = ((currentWidth + gap) * i) / 10;
      }

      detectRoute();
      isRendered = true;
    }

    updateRaycaster();
  }

  renderer.render(scene, camera);
}

const fpsCap = createFpsCap(update, 144);

function onAnimationFrame(time) {
  fpsCap.loop(time);
  requestAnimationFrame(onAnimationFrame);
}
requestAnimationFrame(onAnimationFrame);

function createPlanes() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;
  const warning = document.getElementsByClassName("mobile-warning")[0];

  if (
    /windows phone/i.test(userAgent) ||
    /android/i.test(userAgent) ||
    (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream)
  ) {
    warning.style.display = "flex";
  } else {
    const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

    // Create planes (literally) and assign uniforms
    for (var i = 0; i < images.length; i++) {
      images[i].style.opacity = "0";

      const imageRatio = textures[i].image.width / textures[i].image.height;
      uniforms.push({
        u_image: { type: "t", value: textures[i] },
        pixelRatio: {
          value: window.devicePixelRatio,
        },
        imageRatio: {
          value: imageRatio,
        },
        planeRatio: {
          value: planeRatio,
        },
        hovered: {
          value: false,
        },
        hoverRate: {
          value: hoverRate,
        },
        opacity: {
          value: opacity,
        },
        selected: {
          value: false,
        },
        windowHalf: {
          value: window.innerWidth / 2,
        },
        waveHalf: {
          value: waveHalf,
        },
        impulse: {
          value: impulse,
        },
      });

      var planeMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms[i],
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        defines: {
          PR: window.devicePixelRatio.toFixed(1),
        },
      });

      meshes.push(new THREE.Mesh(planeGeometry, planeMaterial));
      meshes[i].arr_id = i;
      meshes[i].offset_x = 0;
      scene.add(meshes[i]);
    }

    // Set scene limits for camera
    minLength = (currentWidth + gap) * (images.length - 1);
    maxLength = (planeWidthBig + gapMax) * (images.length - 1);
    currLength = minLength;
    isLoaded = true;

    // Red dot
    const markerGeo = new THREE.PlaneGeometry(10, 10);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const marker = new THREE.Mesh(markerGeo, markerMat);
  }

  // scene.add(marker);
}

function detectRoute() {
  const path = window.location.pathname;

  for (var i = 0; i < data.length; i++) {
    if (data[i].url == path) {
      document.title = "Stack — " + data[i].title;
      routeIsDetected = true;
      routeNum = i;
      break;
    }
  }
}

function createFpsCap(loop, fps = 60) {
  let targetFps = 0,
    fpsInterval = 0;
  let lastTime = 0,
    lastOverTime = 0,
    prevOverTime = 0,
    deltaTime = 0;

  function updateFps(value) {
    targetFps = value;
    fpsInterval = 1000 / targetFps;
  }

  updateFps(fps);

  return {
    // the targeted frame rate
    get fps() {
      return targetFps;
    },
    set fps(value) {
      updateFps(value);
    },

    // the frame-capped loop function
    loop: function (time) {
      deltaTime = time - lastTime;

      if (deltaTime < fpsInterval) {
        return;
      }

      prevOverTime = lastOverTime;
      lastOverTime = deltaTime % fpsInterval;
      lastTime = time - lastOverTime;

      deltaTime -= prevOverTime;

      return loop(deltaTime);
    },
  };
}
