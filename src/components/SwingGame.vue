<template>
  <div id="swing-container"></div>
</template>

<script>
import Rope from "@/assets/js/rope";

export default {
  name: "SwingGame",
  data() {
    return {
      canvasSelector: "#swing-canvas",
    };
  },
  mounted() {
    new Rope();
  },
};
</script>

<style scoped>
#swing-container {
  position: relative;
}
</style>
