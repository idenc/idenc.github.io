<template>
  <canvas id="background-canvas" />
</template>

<script>
import Sketch from "../assets/js/postprocess";

export default {
  name: "Background",
  mounted() {
    const sketch = new Sketch("background-canvas");
    const mesh = sketch.createMesh({
      width: window.innerWidth,
      height: window.innerHeight,
      src: require("@/assets/img/forest.jpg"),
      iWidth: 3840,
      iHeight: 2190,
    });
    sketch.scene.add(mesh);
  },
};
</script>

<style scoped>
canvas {
  display: block;
  position: fixed;
  z-index: -1;
  left: 0;
  top: 0;
}
</style>
