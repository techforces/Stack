import * as THREE from "three";
import vertexShader from "./imageVertexShader.glsl";
import fragmentShader from "./imageFragmentShader.glsl";
import gsap from "gsap";
import UI from "./ui";

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

let index = 0;
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
const rotAngle = 30;
const waveRotationAngle = 40;
// the higher the value, the shorter the duration
const rotAnimDuration = 20;

const maxWaveSize = 700;
const waveHalf = maxWaveSize / 2;

// color grading
const coloredWidth = 300;
const partiallyColoredWidth = 100;

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

/* Raycaster */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

/* UI */
const ui = new UI();
console.log(ui);
const exploreBtn = ui.getExploreBtn();
console.log(exploreBtn);

let caseIsOpen = false;

exploreBtn.addEventListener("click", () => {
  const interval = 0.5;
  const ease = "power1.easeOut";
  let next, prev;
  transitioning = true;

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

  if (caseIsOpen) {
    // Close
    caseIsOpen = false;

    if (meshes[index - 1]) {
      gsap.to(value, interval, {
        prev: 0,
        ease: ease,
        onUpdate: function () {
          meshes[index - 1].offset_x = this.targets()[0].prev;
        },
      });
    }

    if (meshes[index + 1]) {
      gsap.to(value, interval, {
        next: 0,
        ease: ease,
        onUpdate: function () {
          meshes[index + 1].offset_x = this.targets()[0].next;
        },
      });
    }

    gsap.to(value, interval, {
      posY: 0,
      ease: ease,
      onUpdate: function () {
        console.log(transitioning);
        meshes[index].position.y = this.targets()[0].posY;
      },
      onComplete: function () {
        transitioning = false;
        console.log(transitioning);
      },
    });
  } else {
    // Open
    caseIsOpen = true;

    if (meshes[index - 1]) {
      gsap.to(value, interval, {
        prev: -window.innerWidth / 2 + currentWidth / 2 + gap,
        ease: ease,
        onUpdate: function () {
          meshes[index - 1].offset_x = this.targets()[0].prev;
        },
      });
    }

    if (meshes[index + 1]) {
      gsap.to(value, interval, {
        next: window.innerWidth / 2 - currentWidth / 2 - gap,
        ease: ease,
        onUpdate: function () {
          meshes[index + 1].offset_x = this.targets()[0].next;
        },
      });
    }

    gsap.to(value, interval, {
      posY: window.innerHeight / 2 + currentHeight / 2,
      ease: ease,
      onUpdate: function () {
        console.log(transitioning);
        meshes[index].position.y = this.targets()[0].posY;
      },
      onComplete: function () {
        transitioning = false;
        console.log(transitioning);
      },
    });
  }
});

function updateRaycaster() {
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(meshes);

  if (intersects.length > 0) {
    // console.log("", intersects[0].object.arr_id);
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
  let value = {
    width: currentWidth,
    height: currentHeight,
    gap: gap,
    length: currLength,
    cameraPosX: camera.position.x,
  };
  gsap.to(value, {
    duration: 1.5,
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
      // console.log(currLength, maxLength);
      uniform.planeRatio = { value: value.width / value.height };
    },
  });
}

function reducePlane(mesh, uniform) {
  let value = {
    width: currentWidth,
    height: currentHeight,
    gap: gap,
    length: currLength,
    cameraPosX: camera.position.x,
    enlarged: enlarged,
  };
  gsap.to(value, {
    duration: 1.5,
    width: planeWidth,
    height: planeHeight,
    ease: "power2.inOut",
    gap: gapMin,
    length: minLength,
    cameraPosX: targetX,
    enlarged: false,
    onUpdate: () => {
      mesh.geometry = new THREE.PlaneGeometry(value.width, value.height);
      gap = value.gap;
      currentWidth = value.width;
      currentHeight = value.height;
      currLength = value.length;
      camera.position.x = value.cameraPosX;
      enlarged = value.enlarged;
      uniform.planeRatio = { value: value.width / value.height };
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
  console.log("Key pressed:", event.key);
  if (event.key === " ") {
    targetX = (planeWidth + gapMin) * index;
    for (var i = 0; i < meshes.length; i++) {
      reducePlane(meshes[i], uniforms[i]);
    }
  }
});

document.addEventListener("wheel", (event) => {
  if (!enlarged) {
    // Scrolling animation
    const newDelta = Math.max(
      -imDeltaMax,
      Math.min(imDeltaMax, imDelta + event.deltaY / 2)
    );

    // Smoothly transition imDelta to new value
    // 0.2 on windows with high fps
    // 0 on mac with low fps, quickfix
    gsap.to({ val: imDelta }, 0.2, {
      val: newDelta,
      onUpdate: function () {
        imDelta = this.targets()[0].val;
        // console.log(event.deltaY);
      },
    });

    // Move Camera
    const targetPosX = Math.max(
      0,
      Math.min(currLength, camera.position.x + event.deltaY * 2)
    );
    gsap.to(camera.position, 0.5, { x: targetPosX });
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
    imDelta = imDelta * 0.95;
    impulse = imDelta / imDeltaMax;
    // console.log(imDelta);

    for (var i = 0; i < meshes.length; i++) {
      // Rotation coefficient: for wave effect ~
      const diff = camera.position.x - meshes[i].position.x;
      const abs_diff = Math.abs(diff);

      const alpha =
        Math.sin(
          Math.max(
            -1,
            Math.min(1, (meshes[i].position.x - camera.position.x) / waveHalf)
          ) * Math.PI
        ) * waveRotationAngle;

      // Scaling coefficient: for wave effect ~
      const scale_coef = 1 - Math.min(1, abs_diff / waveHalf);
      meshes[i].position.z = (perspective / 2) * Math.abs(impulse) * scale_coef;

      // Rotation
      if (impulse > 0) {
        meshes[i].rotation.y =
          impulse * (((-rotAngle + alpha) * Math.PI) / 180);
      } else {
        meshes[i].rotation.y =
          impulse * (((-rotAngle - alpha) * Math.PI) / 180);
      }

      // color grade
      let colorGrade = 0;
      if (abs_diff > coloredWidth + partiallyColoredWidth) {
        colorGrade = 0;
      } else if (abs_diff <= coloredWidth) {
        colorGrade = 1;
      } else {
        colorGrade = 1 - (abs_diff - coloredWidth) / partiallyColoredWidth;
        // console.log("color grade", colorGrade);
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
    if (isRendered) {
      for (var i = 0; i < meshes.length; i++) {
        meshes[i].position.x = (currentWidth + gap) * i + meshes[i].offset_x;
      }
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
    // console.log("add mesh", i);
    scene.add(meshes[i]);
  }

  minLength = (currentWidth + gap) * (images.length - 1);
  maxLength = (planeWidthBig + gapMax) * (images.length - 1);
  currLength = minLength;
  isLoaded = true;
  // console.log(minLength, maxLength);

  const markerGeo = new THREE.PlaneGeometry(10, 10);
  const markerMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const marker = new THREE.Mesh(markerGeo, markerMat);

  // scene.add(marker);
}
