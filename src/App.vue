<template>
  <div v-cloak id="app">
    <NavBar id="nav" />
    <Home id="home" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Home from "@/views/Home";

export default {
  components: { NavBar, Home },
};
</script>

<style>
[v-cloak] {
  display: none;
}

body {
  margin: 0;
}

html.sr .load-hidden {
  visibility: hidden;
}

.card {
  background: white;
  padding: 2em 2em 4em 2em;
  border-radius: 40px;
  width: 70vw;
  text-align: left;
  max-width: 1000px;
  transition: box-shadow 0.4s ease-in-out;
}

@font-face {
  font-family: "Araboto-Black";
  src: local("Araboto-Black"),
    url("./assets/fonts/Araboto-Black.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Araboto-Bold";
  src: local("Araboto-Bold"),
    url("./assets/fonts/Araboto-Bold.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Araboto-Normal";
  src: local("Araboto-Normal"),
    url("./assets/fonts/Araboto-Normal.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: Araboto-Black, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  margin: 0;
}

#nav {
  width: 100%;
  height: 80px;
  z-index: 1;
  overflow: hidden;
  position: fixed;
  top: 0;
}

#home {
  height: 100%;
  width: 100%;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.heading {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  height: 3em;
  width: 100%;
  opacity: 75%;
  font-size: 3em;
}
</style>
