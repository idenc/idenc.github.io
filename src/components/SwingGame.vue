<template>
  <div id="swing-container"></div>
</template>

<script>
import SwingGame from "@/assets/js/SwingGame";

export default {
  name: "SwingGame",
  data() {
    return {
      canvasSelector: "#swing-canvas",
    };
  },
  mounted() {
    new SwingGame();
  },
};
</script>

<style scoped>
#swing-container {
  position: relative;
}
</style>
