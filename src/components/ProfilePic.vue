<template>
  <canvas class="webgl" />
</template>

<script>
import * as THREE from "three";
import * as dat from "dat.gui";
export default {
  name: "ProfilePic",
  mounted: function () {
    // Loading
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(require("@/assets/img/me.jpg"));
    // Debug
    const gui = new dat.GUI();
    gui.domElement.id = "gui";

    // Canvas
    const sceneCanvas = document.querySelector("canvas.webgl");

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
      color: new THREE.Color(0xffffff),
    });

    // Objects
    const ringGeometry = this.makeRing();
    const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 0.1, 8);
    cylinderGeometry.rotateX(Math.PI / 2);
    cylinderGeometry.center();

    const ringMesh = new THREE.Mesh(ringGeometry, material);
    const cylinderMesh = new THREE.Mesh(cylinderGeometry, [
      new THREE.MeshStandardMaterial({ color: new THREE.Color(255, 0, 0) }),
      texturedMat,
      texturedMat,
    ]);

    scene.add(ringMesh);
    scene.add(cylinderMesh);

    // Lights

    const hemiLight = new THREE.HemisphereLight(0xdcdcc2, 0x808089, 1.4);
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

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = this.getSceneWidth();
      sizes.height = this.getSceneHeight();
      console.log(sizes);

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      36,
      sizes.width / sizes.height,
      0.1,
      100
    );
    const cameraFolder = gui.addFolder("camera");
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 3.5;
    cameraFolder.add(camera.position, "x");
    cameraFolder.add(camera.position, "y");
    cameraFolder.add(camera.position, "z");
    cameraFolder.add(camera, "fov");
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
    texture.anisotropy = renderer.getMaxAnisotropy();

    /**
     * Animate
     */

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update sizes
      sizes.width = this.getSceneWidth();
      sizes.height = this.getSceneHeight();
      const canvas = renderer.domElement;
      if (canvas.width !== sizes.width || canvas.height !== sizes.height) {
        // Update camera
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();

        // Update renderer
        renderer.setSize(sizes.width, sizes.height, false);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }

      // Update objects
      cylinderMesh.rotation.y = 0.5 * elapsedTime;
      ringMesh.rotation.y = 0.5 * elapsedTime;

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  },
  methods: {
    getSceneWidth: function () {
      return document.getElementById("intro-text").getBoundingClientRect()
        .width;
    },
    getSceneHeight: function () {
      return document.getElementById("intro-text").getBoundingClientRect()
        .height;
    },
    makeRing: function () {
      const outerRadius = 1;
      const innerRadius = 0.9;
      const height = 0.15;

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
  },
};
</script>

<style scoped></style>
