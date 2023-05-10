import * as THREE from "three";
import vertexShader from "./imageVertexShader.glsl";
import fragmentShader from "./imageFragmentShader.glsl";
import gsap from "gsap";

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

/* Preloader */
let textures = [];
let meshes = [];
let uniforms = [];
let isLoaded = false;
let isRendered = false;

let index = 0;
let targetX = 0;
let enlarged = false;

let planeWidth = 75;
let planeHeight = 260;
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
const roundAngle = 50;

// Displacement
const maxDisplacement = 110;
const displacementWidth = 550;

// the higher the value, the shorter the duration
const rotAnimDuration = 20;

const maxWaveSize = 700;

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
      Math.min(imDeltaMax, imDelta + event.deltaY)
    );

    // Smoothly transition imDelta to new value
    gsap.to({ val: imDelta }, 0.2, {
      val: newDelta,
      onUpdate: function () {
        imDelta = this.targets()[0].val;
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
    // imitate impulse
    // if (imDelta > 0) {
    //   imDelta = Math.max(0, imDelta - rotAnimDuration);
    // } else {
    //   imDelta = Math.min(0, imDelta + rotAnimDuration);
    // }

    imDelta = imDelta * 0.97;
    impulse = imDelta / imDeltaMax;
    console.log(impulse);

    for (var i = 0; i < meshes.length; i++) {
      // Rotation coefficient: for wave effect ~
      const diff = camera.position.x - meshes[i].position.x;
      const wave_coef = Math.max(-1, Math.min(1, diff / maxWaveSize));
      const alpha = roundAngle * Math.sin((wave_coef * Math.PI) / 2);

      // Scaling coefficient: for wave effect ~
      const abs_diff = Math.abs(diff);
      const scale_coef = 1 - Math.min(1, abs_diff / maxWaveSize);
      meshes[i].scale.set(
        1 + Math.abs(impulse) * scale_coef,
        1 + Math.abs(impulse) * scale_coef,
        1
      );

      // Rotation
      if (
        (meshes[i].position.x < camera.position.x && impulse < 0) ||
        (meshes[i].position.x > camera.position.x && impulse > 0)
      ) {
        meshes[i].rotation.y = impulse * (((-rotAngle / 2) * Math.PI) / 180);
        // meshes[i].rotation.y = (rotAngle * Math.PI) / 180;
      } else {
        meshes[i].rotation.y = impulse * ((-rotAngle * Math.PI) / 180);
        // meshes[i].rotation.y = (rotAngle * Math.PI) / 180;
      }
      // meshes[11].rotation.y = (-10 * Math.PI) / 180;
      // meshes[12].rotation.y = (-25 * Math.PI) / 180;
      // meshes[13].rotation.y = (-10 * Math.PI) / 180;
      // meshes[14].rotation.y = (5 * Math.PI) / 180;
      // meshes[15].rotation.y = (20 * Math.PI) / 180;
      // meshes[16].rotation.y = (25 * Math.PI) / 180;
      // meshes[17].rotation.y = (30 * Math.PI) / 180;
      // meshes[18].rotation.y = (35 * Math.PI) / 180;
      // meshes[19].rotation.y = (40 * Math.PI) / 180;
      // meshes[20].rotation.y = (45 * Math.PI) / 180;
      // meshes[21].rotation.y = (35 * Math.PI) / 180;
      // meshes[22].rotation.y = (32 * Math.PI) / 180;

      // meshes[10].scale.set(1, 1, 1);
      // meshes[11].scale.set(1.1, 1.1, 1);
      // meshes[12].scale.set(1.3, 1.3, 1);
      // meshes[13].scale.set(1.6, 1.6, 1);
      // meshes[14].scale.set(1.8, 1.8, 1);
      // meshes[15].scale.set(2, 2, 1);
      // meshes[16].scale.set(1.8, 1.8, 1);
      // meshes[17].scale.set(1.6, 1.6, 1);
      // meshes[18].scale.set(1.3, 1.3, 1);
      // meshes[19].scale.set(1.1, 1.1, 1);
      // meshes[20].scale.set(1, 1, 1);

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
    }

    // update positioning
    if (isRendered) {
      for (var i = 0; i < meshes.length; i++) {
        const displacement =
          Math.sin(
            Math.min(
              1,
              Math.max(
                -1,
                (meshes[i].position.x - camera.position.x) / displacementWidth
              )
            ) * Math.PI
          ) *
          maxDisplacement *
          Math.abs(impulse);
        meshes[i].position.x = (currentWidth + gap) * i + displacement;
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
    // console.log("add mesh", i);
    scene.add(meshes[i]);
  }

  minLength = (currentWidth + gap) * (images.length - 1);
  maxLength = (planeWidthBig + gapMax) * (images.length - 1);
  currLength = minLength;
  isLoaded = true;
  console.log(minLength, maxLength);

  const markerGeo = new THREE.PlaneGeometry(10, 10);
  const markerMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const marker = new THREE.Mesh(markerGeo, markerMat);

  scene.add(marker);
}
