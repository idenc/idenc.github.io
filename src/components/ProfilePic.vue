<template>
  <canvas />
</template>

<script>
import * as THREE from "three";
import * as dat from "dat.gui";
import * as TWEEN from "@tweenjs/tween.js";
import * as MathUtils from "three/src/math/MathUtils";
import $ from "jquery";
import ScrollReveal from "scrollreveal";
export default {
  name: "ProfilePic",
  props: {},
  data() {
    return {
      canvasSelector: "#profile-pic",
      ringColour: new THREE.Color(0xffffff),
      skyColor: 0xcacaca,
      groundColor: 0x273640,
      // maximum delta that profile pic can rotate in degrees
      maxTilt: 70,
      ringRadius: 1.0,
      defaultRotation: { x: 0, y: MathUtils.degToRad(-20) },
    };
  },
  mounted: function () {
    // Loading
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(
      require("@/assets/img/me.jpg"),
      this.profilePicLoaded
    );
    // Debug
    const gui = new dat.GUI();
    gui.domElement.id = "gui";
    if (process.env.NODE_ENV !== "development") {
      dat.GUI.toggleHide();
    }

    // Canvas
    const sceneCanvas = document.querySelector(this.canvasSelector);

    // Scene
    const scene = new THREE.Scene();

    // Materials
    texture.center = new THREE.Vector2(0.5, 0.5);
    texture.rotation = Math.PI / 2;
    texture.center = new THREE.Vector2(0.53, 0.53);

    const texturedMat = new THREE.MeshStandardMaterial({
      map: texture,
    });
    const material = new THREE.MeshStandardMaterial({
      color: this.ringColour,
    });

    // Objects
    const ringGeometry = this.makeRing();
    const cylinderGeometry = new THREE.CylinderGeometry(
      this.ringRadius,
      this.ringRadius,
      0.1,
      8
    );
    cylinderGeometry.rotateX(Math.PI / 2);
    cylinderGeometry.center();

    const ringMesh = new THREE.Mesh(ringGeometry, material);
    const cylinderMesh = new THREE.Mesh(cylinderGeometry, [
      new THREE.MeshStandardMaterial({ color: new THREE.Color(255, 0, 0) }),
      texturedMat,
      texturedMat,
    ]);

    const combinedMesh = new THREE.Group();
    combinedMesh.add(ringMesh);
    combinedMesh.add(cylinderMesh);
    combinedMesh.rotation.x = this.defaultRotation.x;
    combinedMesh.rotation.y = this.defaultRotation.y;

    scene.add(combinedMesh);

    // Lights

    const hemiLight = new THREE.HemisphereLight(
      this.skyColor,
      this.groundColor,
      1.8
    );
    scene.add(hemiLight);
    const params = {
      skyColor: hemiLight.color.getHex(),
      groundColor: hemiLight.groundColor.getHex(),
    };
    gui.addColor(params, "skyColor").onChange(() => {
      hemiLight.color.setHex(
        Number(params.skyColor.toString().replace("#", "0x"))
      );
    });
    gui.addColor(params, "groundColor").onChange(() => {
      hemiLight.groundColor.setHex(
        Number(params.groundColor.toString().replace("#", "0x"))
      );
    });
    gui.add(hemiLight, "intensity");

    /**
     * Sizes
     */
    const sizes = {
      width: this.getSceneWidth(),
      height: this.getSceneHeight(),
    };

    const updateSizes = () => {
      // Update sizes
      sizes.width = this.getSceneWidth();
      sizes.height = this.getSceneHeight();
      const canvas = renderer.domElement;
      if (canvas.width !== sizes.width || canvas.height !== sizes.height) {
        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    };

    window.addEventListener("resize", updateSizes);

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      60,
      sizes.width / sizes.height,
      0.1,
      100
    );
    const cameraFolder = gui.addFolder("camera");
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 3.5;
    // this.fitCameraToObject(camera, combinedMesh, 0);
    cameraFolder.add(camera.position, "x");
    cameraFolder.add(camera.position, "y");
    cameraFolder.add(camera.position, "z");
    cameraFolder.add(camera, "fov").onChange(() => {
      camera.updateProjectionMatrix();
    });
    scene.add(camera);

    // Controls

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: sceneCanvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    /**
     * Animate
     */

    let mouseX = 0;
    let mouseIn = false;
    // let mouseY = 0;
    let tween = null;
    let animPlaying = false;

    sceneCanvas.addEventListener("mousemove", (event) => {
      if (animPlaying) {
        return;
      }
      if (tween) {
        tween.stop();
      }
      const windowHalfX = sceneCanvas.getBoundingClientRect().width / 2;
      // const windowHalfY = sceneCanvas.getBoundingClientRect().height / 2;
      mouseIn = true;
      mouseX = (event.offsetX - windowHalfX) / windowHalfX;
      // mouseY = (event.offsetY - windowHalfY) / windowHalfY;
    });
    sceneCanvas.addEventListener("mouseleave", () => {
      if (animPlaying) {
        return;
      }
      mouseIn = false;
      tween = new TWEEN.Tween(combinedMesh.rotation)
        .to({ x: this.defaultRotation.x, y: this.defaultRotation.y }, 500)
        .start();
    });
    sceneCanvas.addEventListener("click", () => {
      animPlaying = true;
      new TWEEN.Tween(combinedMesh.rotation)
        .to({ y: `+${4 * Math.PI}` }, 1500)
        .easing(TWEEN.Easing.Back.InOut)
        .onComplete(() => {
          animPlaying = false;
        })
        .start();
      new TWEEN.Tween(combinedMesh.position)
        .easing(TWEEN.Easing.Back.InOut)
        .to({ y: [1, 0] }, 1500)
        .start();
    });

    const tick = (time) => {
      // Update objects
      if (!animPlaying && mouseIn) {
        combinedMesh.rotation.y = mouseX * MathUtils.degToRad(this.maxTilt);
      }
      // combinedMesh.rotation.x = mouseY * this.degToRad(70);

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      requestAnimationFrame(tick);

      TWEEN.update(time);
    };
    updateSizes();
    requestAnimationFrame(tick);
  },
  methods: {
    profilePicLoaded: function () {
      $(".loader-wrapper").fadeOut("slow");
      $("#nav").fadeIn("slow");
      this.$emit("profilePicLoaded");

      this.revealCards();
    },
    revealCards: function () {
      const items = document.getElementsByClassName("card");
      let tick = false;
      Array.from(items).map((child) => {
        const textReveal = {
          reset: false,
          origin: tick ? "left" : "right",
          delay: 200,
          distance: "120px",
          easing: "ease-in-out",
        };
        tick = !tick;
        ScrollReveal().reveal(`#${child.id}`, textReveal);
      });
    },
    getSceneWidth: function () {
      const mw = window.matchMedia("(max-width: 768px)");
      const mh = window.matchMedia("(min-height: 400px)");
      if (mw.matches && mh.matches) {
        // Window width is less than 768px and height is greater than 400px
        return $("#intro").width();
      } else {
        return $("#intro").width() / 2;
      }
    },
    getSceneHeight: function () {
      const mw = window.matchMedia("(max-width: 768px)");
      const mh = window.matchMedia("(min-height: 400px)");
      if (mw.matches && mh.matches) {
        // Window width is less than 768px and height is greater than 400px
        return $("#intro").height() / 2;
      } else {
        return $("#intro").height();
      }
    },
    makeRing: function () {
      const outerRadius = this.ringRadius;
      const innerRadius = this.ringRadius - 0.1;
      const height = 0.2;

      const arcShape = new THREE.Shape();
      arcShape.moveTo(outerRadius * 2, outerRadius);
      arcShape.absarc(
        outerRadius,
        outerRadius,
        outerRadius,
        0,
        Math.PI * 2,
        false
      );
      const holePath = new THREE.Path();
      holePath.moveTo(outerRadius + innerRadius, outerRadius);
      holePath.absarc(
        outerRadius,
        outerRadius,
        innerRadius,
        0,
        Math.PI * 2,
        true
      );
      arcShape.holes.push(holePath);

      const geometry = new THREE.ExtrudeGeometry(arcShape, {
        depth: height,
        bevelEnabled: false,
        steps: 1,
        curveSegments: 256,
      });
      geometry.center();

      return geometry;
    },
    fitCameraToObject: function (camera, object, offset, controls) {
      offset = offset || 1.25;

      const boundingBox = new THREE.Box3();

      // get bounding box of object - this will be used to setup controls and camera
      boundingBox.setFromObject(object);

      const center = boundingBox.getCenter();

      const size = boundingBox.getSize();

      // get the max side of the bounding box (fits to width OR height as needed )
      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      let cameraZ = Math.abs((maxDim / 4) * Math.tan(fov * 2));

      cameraZ *= offset; // zoom out a little so that objects don't fill the screen

      camera.position.z = cameraZ;

      const minZ = boundingBox.min.z;
      const cameraToFarEdge = minZ < 0 ? -minZ + cameraZ : cameraZ - minZ;

      camera.far = cameraToFarEdge * 3;
      camera.updateProjectionMatrix();

      if (controls) {
        // set camera to rotate around center of loaded object
        controls.target = center;

        // prevent camera from zooming out far enough to create far plane cutoff
        controls.maxDistance = cameraToFarEdge * 2;

        controls.saveState();
      } else {
        camera.lookAt(center);
      }
    },
  },
};
</script>

<style scoped>
canvas.webgl {
  cursor: pointer;
}
</style>
