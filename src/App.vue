<template>
  <div id="app">
    <NavBar id="nav" />
    <router-view id="router-view" />
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  components: { NavBar },
  // mounted: function () {
  //   // When the user scrolls the page, execute myFunction
  //   window.onscroll = function () {
  //     myFunction();
  //   };
  //
  //   // Get the navbar
  //   const navbar = document.getElementById("nav");
  //
  //   // Get the offset position of the navbar
  //   const sticky = navbar.offsetTop;
  //
  //   // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  //   function myFunction() {
  //     if (window.pageYOffset >= sticky) {
  //       navbar.classList.add("sticky");
  //     } else {
  //       navbar.classList.remove("sticky");
  //     }
  //   }
  // },
};
</script>

<style>
body {
  margin: 0;
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
  font-family: "Araboto-Light";
  src: local("Araboto-Light"),
    url("./assets/fonts/Araboto-Light.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Araboto-Medium";
  src: local("Araboto-Medium"),
    url("./assets/fonts/Araboto-Medium.ttf") format("truetype");
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

@font-face {
  font-family: "Araboto-Thin";
  src: local("Araboto-Thin"),
    url("./assets/fonts/Araboto-Thin.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: Araboto-Black, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
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

#router-view {
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
