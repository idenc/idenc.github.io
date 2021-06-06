<template>
  <footer id="footer-root">
    <Mountain />
    <div id="footer-content">
      <img src="../assets/img/logo.png" alt="logo" />
      <div class="vertical-divider"></div>
      <h1>Iden Craven</h1>
    </div>
  </footer>
</template>

<script>
import Mountain from "@/components/Mountain";
export default {
  name: "Footer",
  components: { Mountain },
};
</script>

<style scoped>
#footer-root {
  display: grid;
  grid-template-columns: 1fr;
}

#footer-root > * {
  grid-row-start: 1;
  grid-column-start: 1;
}

#footer-content {
  display: flex;
  width: 100vw;
  justify-content: space-around;
  align-items: center;
  flex-flow: row wrap;
  margin-top: 6em;
  z-index: 4;
}

#footer-content img {
  width: clamp(42px, 20vw, 120px);
}

#footer-content h1 {
  font-size: clamp(32px, 5vw, 72px);
  color: #fff;
}

.vertical-divider {
  height: 50%;
  width: 2px;
  background-color: #fff;
}
</style>
