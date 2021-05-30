<template>
  <footer id="footer-root">
    <div id="mountain1"></div>
    <div id="mountain2"></div>
    <div id="footer-content">
      <img src="../assets/img/logo.png" />
      <div class="vertical-divider"></div>
      <h1>Iden Craven</h1>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
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

#mountain1,
#mountain2 {
  height: 19.688rem;
  width: 8000px;
}

#mountain1 {
  background: url("../assets/img/mountain.svg") repeat-x;
  animation: mountain1Loop 200s linear infinite;
}

#mountain2 {
  background: url("../assets/img/mountain.svg") repeat-x;
  animation: mountain2Loop 150s linear infinite;
}

@keyframes mountain1Loop {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 8000px 0;
  }
}

@keyframes mountain2Loop {
  0% {
    background-position: 500px 0;
  }
  100% {
    background-position: 8000px 0;
  }
}

#footer-content {
  display: flex;
  width: 100vw;
  justify-content: space-around;
  align-items: center;
  flex-flow: row wrap;
  margin-top: 6em;
}

#footer-content img {
  width: clamp(42px, 8vw, 120px);
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
