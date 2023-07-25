import * as THREE from "three";
import vertexShader from "./imageVertexShader.glsl";
import fragmentShader from "./imageFragmentShader.glsl";
import gsap from "gsap";
import { Text, ImageList, Line, Icon } from "./ui";
import { Typography, Information } from "./text";
import routes from "./routes";
import { CustomEase } from "gsap/all";

import { data } from "./data";

/* Set up */
const perspective = 800;
const canvas = document.getElementById("stage");
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
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

/* Preloader */
let textures = [];
let meshes = [];
let uniforms = [];
let isLoaded = false;
let isRendered = false;
let isSetup = false;

let index = 0;
// let lastIndex = 99999;
let targetX = 0;
let enlarged = false;

let planeWidth = 79;
let planeHeight = 290;
let planeWidthBig = 740;
let planeHeightBig = 420;
let currentWidth = planeWidth;
let currentHeight = planeHeight;
let gapMin = 15;
let gapMax = 160;
let gap = gapMin;
let planeRatio = planeWidth / planeHeight;

let minLength = 0;
let maxLength = 0;
let currLength = 0;

// impulse ∈ [-1, 1]; delta ∈ [-delta_max, delta_max];
let impulse = 0;
let imDelta = 0;
const imDeltaMax = 400;

const rotAngle = 25;
// const rotAngle = 0;

const waveRotationAngle = 33;

// the higher the value, the shorter the duration
const rotAnimDuration = 20;

const maxWaveSize = window.innerWidth / 1.6;
const waveHalf = maxWaveSize / 2;

// color grading
const coloredWidth = 300;
const partiallyColoredWidth = 100;

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

const manager = new THREE.LoadingManager();
manager.onStart = function (url, itemsLoaded, itemsTotal) {
  //   console.log(
  //     "Started loading file: " +
  //       url +
  //       ".\nLoaded " +
  //       itemsLoaded +
  //       " of " +
  //       itemsTotal +
  //       " files."
  //   );
};

manager.onLoad = function () {
  console.log("Loading complete!");

  createPlanes();
};

manager.onError = function () {
  console.log("There was an error loading " + url);
};

manager.onProgress = function (url, itemsLoaded, itemsTotal) {
  //   console.log(
  //     "Loading file: " +
  //       url +
  //       ".\nLoaded " +
  //       itemsLoaded +
  //       " of " +
  //       itemsTotal +
  //       " files."
  //   );
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
const mouse = new THREE.Vector2();

/* UI */
const exploreBtn = document.querySelector(".e-btn");
exploreBtn.style.display = "block";
const projectsBtn = document.querySelector(".p-btn");
projectsBtn.style.display = "block";
const exploreText = new Text(".e-t-c");
const projectText = new Text(".p-t-c");

const exploreLine = new Line(".e-l-c");
const projectLine = new Line(".p-l-c");

const exploreIcon = new Icon(".e-s-c");
const projectIcon = new Icon(".p-s-c");

const imageList = new ImageList();

const coverDiv = document.querySelector(".cover");

/* Typography */
const typo = new Typography();
const info = new Information();

let caseIsOpen = false;

exploreBtn.addEventListener("click", (e) => {
  e.preventDefault();

  openCase();

  if (typeof history.pushState != "undefined") {
    var obj = {
      title: "First",
      url: "/image/first",
    };

    history.pushState(obj, obj.title, obj.url);
  }

  // Hide EXPLORE button
  exploreText.toPressed();
  exploreLine.toBottom();
  exploreIcon.toTop();

  // Show PROJECTS button
  projectText.toVisible();
  projectLine.fromTop();
  projectIcon.fromBottom();

  typo.squishText(0);
});

projectsBtn.addEventListener("click", (e) => {
  e.preventDefault();

  closeCase();

  if (typeof history.pushState != "undefined") {
    var obj = {
      title: "Hello",
      url: "/image/image.html",
    };

    history.pushState(obj, obj.title, obj.url);
  }

  // Show EXPLORE button
  exploreText.toVisible();
  exploreLine.fromTop();
  exploreIcon.fromBottom();

  // Hide PROJECTS button
  projectText.toHidden();
  projectLine.toTop();
  projectIcon.toBottom();

  typo.unsquishText(0);
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
    for (var i = 0; i < meshes.length; i++) {
      uniforms[i].hovered.value = false;
    }
    uniforms[intersects[0].object.arr_id].hovered.value = true;
  } else {
    for (var i = 0; i < meshes.length; i++) {
      uniforms[i].hovered.value = false;
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
  // transitioning = true;
  let value = {
    width: currentWidth,
    height: currentHeight,
    gap: gap,
    length: currLength,
    cameraPosX: camera.position.x,
  };
  gsap.to(value, {
    duration: 1.2,
    width: planeWidthBig,
    height: planeHeightBig,
    ease: "power2.inOut",
    gap: gapMax,
    length: maxLength,
    cameraPosX: targetX,
    onUpdate: () => {
      mesh.geometry = new THREE.PlaneGeometry(value.width, value.height);
      gap = value.gap;
      currentWidth = value.width;
      currentHeight = value.height;
      currLength = value.length;
      camera.position.x = value.cameraPosX;
      uniform.planeRatio = { value: value.width / value.height };
    },
    onComplete: () => {
      transitioning = false;
    },
  });
}

function reducePlane(mesh, uniform) {
  // transitioning = true;
  let value = {
    width: currentWidth,
    height: currentHeight,
    gap: gap,
    length: currLength,
    cameraPosX: camera.position.x,
  };
  gsap.to(value, {
    duration: 0.8,
    width: planeWidth,
    height: planeHeight,
    ease: "power2.inOut",
    gap: gapMin,
    length: minLength,
    cameraPosX: targetX,
    onStart: () => {
      enlarged = false;
    },
    onUpdate: () => {
      mesh.geometry = new THREE.PlaneGeometry(value.width, value.height);
      gap = value.gap;
      currentWidth = value.width;
      currentHeight = value.height;
      currLength = value.length;
      camera.position.x = value.cameraPosX;
      uniform.planeRatio = { value: value.width / value.height };
    },
    onComplete: () => {
      transitioning = false;
    },
  });

  uniform.selected.value = false;
}

// enlarge on click
canvas.addEventListener("click", () => {
  if (!transitioning) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      index = intersects[0].object.arr_id;
      targetX = (planeWidthBig + gapMax) * index;

      if (!enlarged) {
        // from wave state to enlarged state
        // Show EXPLORE button
        exploreText.toVisible();
        exploreLine.fromTop();
        exploreIcon.fromBottom();

        typo.openText(index);
        info.openText(index);
      } else {
        // from enlarged state to enlarged state
        // Hide EXPLORE button
        exploreText.toPressed();
        exploreLine.toBottom();
        exploreIcon.toTop();

        setTimeout(() => {
          // Show EXPLORE button
          exploreText.toVisible();
          exploreLine.fromTop();
          exploreIcon.fromBottom();
        }, 500);
      }

      caseIndex = intersects[0].object.arr_id;
      imageList.adjustSelector(data[caseIndex]);
      imageList.adjustStack(data[caseIndex]);

      for (var i = 0; i < meshes.length; i++) {
        enlargePlane(meshes[i], uniforms[i]);
        uniforms[i].selected.value = false;
      }
      uniforms[index].selected.value = true;
    }
  }
});

// reduce plane
document.addEventListener("keypress", (event) => {
  if (event.key === " ") {
    console.log("spacebar");
    if (!caseIsOpen) {
      // Hide EXPLORE button
      exploreText.toPressed();
      exploreLine.toBottom();
      exploreIcon.toTop();

      targetX = (planeWidth + gapMin) * index;
      for (var i = 0; i < meshes.length; i++) {
        reducePlane(meshes[i], uniforms[i]);
      }
    }
  } else if (event.key === "c") {
    closeCase();
  }
});

document.addEventListener("wheel", (event) => {
  if (!enlarged) {
    console.log(camera.position.x, currLength);

    if (camera.position.x > 100 && currLength - camera.position.x > 100) {
      // Scrolling animation for wave
      const newDelta = Math.max(
        -imDeltaMax,
        Math.min(imDeltaMax, imDelta + event.deltaY / 1.7)
      );

      // console.log(imDelta);

      // Smoothly transition imDelta to new value
      // 0.2 on windows with high fps
      // 0 on mac with low fps, quickfix
      gsap.to({ val: imDelta }, 0.2, {
        val: newDelta,
        onUpdate: function () {
          imDelta = this.targets()[0].val;
        },
      });
    }

    // Move Camera
    const targetPosX = Math.max(
      0,
      Math.min(currLength, camera.position.x + event.deltaY * 2.7)
    );
    gsap.to(camera.position, 0.5, { x: targetPosX });

    console.log(camera.position.x, targetPosX);
  } else {
    if (!caseIsOpen) {
      // Hide EXPLORE button
      exploreText.toPressed();
      exploreLine.toBottom();
      exploreIcon.toTop();

      typo.closeText(index);
      info.closeText(index);

      targetX = (planeWidth + gapMin) * index;
      for (var i = 0; i < meshes.length; i++) {
        reducePlane(meshes[i], uniforms[i]);
      }
    }
  }
});

/* Load textures */
const loader = new THREE.TextureLoader(manager);
const images = document.querySelectorAll(".image");
for (var i = 0; i < images.length; i++) {
  loader.load(images[i].src, (el) => {
    textures.push(el);
  });
}

function update() {
  requestAnimationFrame(update);

  if (isLoaded) {
    imDelta = imDelta * 0.92;
    impulse = imDelta / imDeltaMax;

    for (var i = 0; i < meshes.length; i++) {
      // Rotation coefficient: for wave effect ~
      const diff = camera.position.x - meshes[i].position.x;
      const abs_diff = Math.abs(diff);

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
      const scale_coef =
        1 - Math.min(1, 0.25 + Math.pow(abs_diff / waveHalf, 2));
      meshes[i].position.z =
        (perspective / 2) * Math.abs(impulse) * scale_coef +
        landDispZ * (i + 1);

      // Rotation (converted to radians)
      if (impulse > 0) {
        if (alpha > 0) {
          // To create a rounded shape of the wave we need to compensate for the rotation and subtract the alpha
          alpha *= 2.2;
        } else {
          alpha *= 0.9;
        }

        meshes[i].rotation.y =
          ((impulse * (-rotAngle + alpha) + landAlpha * (i + 1)) * Math.PI) /
          180;
        // meshes[i].rotation.y = impulse * ((-rotAngle * Math.PI) / 180);
      } else {
        if (alpha < 0) {
          alpha *= 2.2;
        } else {
          alpha *= 0.9;
        }

        meshes[i].rotation.y =
          ((impulse * (-rotAngle - alpha) + landAlpha * (i + 1)) * Math.PI) /
          180;
      }

      // color grade
      let colorGrade = 0;
      if (abs_diff > coloredWidth + partiallyColoredWidth) {
        colorGrade = 0;
      } else if (abs_diff <= coloredWidth) {
        colorGrade = 1;
      } else {
        colorGrade = 1 - (abs_diff - coloredWidth) / partiallyColoredWidth;
      }

      colorGrade = colorGrade * Math.min(1, Math.abs(impulse) * 2);

      // greyscale/color animation on hover/click
      if (uniforms[i].hovered.value || uniforms[i].selected.value) {
        uniforms[i].mixValue.value = Math.min(
          1,
          Math.max(0, uniforms[i].mixValue.value + 0.1)
        );
      } else {
        uniforms[i].mixValue.value = Math.min(
          1,
          Math.max(0, uniforms[i].mixValue.value - 0.1)
        );
      }
      uniforms[i].mixValue.value = Math.max(
        uniforms[i].mixValue.value,
        colorGrade
      );
    }

    // update positioning
    if (isSetup) {
      for (var i = 0; i < meshes.length; i++) {
        meshes[i].position.x =
          (currentWidth + gap) * i +
          meshes[i].offset_x +
          landDispX +
          landDispX * 0.001 * i;
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
      gsap.to(value, 1.2, {
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
      isSetup = true;
    } else {
      // Initial Positioning, for performance optimization!
      meshes[0].position.x = 0;
      for (var i = 1; i < meshes.length; i++) {
        meshes[i].position.x = ((currentWidth + gap) * i) / 10;
      }

      isRendered = true;
    }

    updateRaycaster();
  }

  renderer.render(scene, camera);
}

update();

function createPlanes() {
  const planeGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight);

  // Create planes (literally) and assign uniforms
  for (var i = 0; i < images.length; i++) {
    images[i].style.opacity = "0";

    const imageRatio = textures[i].image.width / textures[i].image.height;
    uniforms.push({
      u_image: { type: "t", value: textures[i] },
      u_time: { value: 0 },
      imageRatio: {
        value: imageRatio,
      },
      planeRatio: {
        value: planeRatio,
      },
      hovered: {
        value: false,
      },
      mixValue: {
        value: 0,
      },
      opacity: {
        value: 1,
      },
      selected: {
        value: false,
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

  // scene.add(marker);
}
