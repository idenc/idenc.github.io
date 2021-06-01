<template>
  <canvas class="webgl" />
</template>

<script>
import * as THREE from "three";
export default {
  name: "ProfilePic",
  data() {
    return {
      sceneCanvas: null,
      scene: null,
      camera: null,
      renderer: null,
      controls: null,
    };
  },
  computed: {
    sceneWidth: function () {
      return this.sceneCanvas.getBoundingClientRect().width;
    },
    sceneHeight: function () {
      return this.sceneCanvas.getBoundingClientRect().height;
    },
  },
  mounted: function () {
    // Debug
    // const gui = new dat.GUI();

    // Canvas
    this.sceneCanvas = document.querySelector("canvas.webgl");

    // Scene
    const scene = new THREE.Scene();

    // Objects
    const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);

    // Materials

    const material = new THREE.MeshBasicMaterial();
    material.color = new THREE.Color(0xff0000);

    // Mesh
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lights

    const pointLight = new THREE.PointLight(0xffffff, 0.1);
    pointLight.position.x = 2;
    pointLight.position.y = 3;
    pointLight.position.z = 4;
    scene.add(pointLight);

    /**
     * Sizes
     */
    const sizes = {
      width: this.sceneWidth,
      height: this.sceneHeight,
    };

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = this.sceneWidth;
      sizes.height = this.sceneHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 2;
    scene.add(camera);

    // Controls
    // const controls = new OrbitControls(camera, canvas)
    // controls.enableDamping = true

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: this.sceneCanvas,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    /**
     * Animate
     */

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      // Update objects
      sphere.rotation.y = 0.5 * elapsedTime;

      // Update Orbital Controls
      // controls.update()

      // Render
      renderer.render(scene, camera);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  },
};
</script>

<style scoped></style>
