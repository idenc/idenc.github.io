<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">
        Home
      </router-link>
      |
      <router-link to="/about">
        About
      </router-link>
    </div>
    <router-view id="router-view" />
  </div>
</template>

<style>
body {
  margin: 0;
}

@font-face {
  font-family: "Araboto-Black";
  src: local("Araboto-Black"),
  url('./assets/fonts/Araboto-Black.ttf') format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Araboto-Bold";
  src: local("Araboto-Bold"),
  url('./assets/fonts/Araboto-Bold.ttf') format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Araboto-Light";
  src: local("Araboto-Light"),
  url('./assets/fonts/Araboto-Light.ttf') format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Araboto-Medium";
  src: local("Araboto-Medium"),
  url('./assets/fonts/Araboto-Medium.ttf') format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Araboto-Normal";
  src: local("Araboto-Normal"),
  url('./assets/fonts/Araboto-Normal.ttf') format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Araboto-Thin";
  src: local("Araboto-Thin"),
  url('./assets/fonts/Araboto-Thin.ttf') format("truetype");
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: Araboto-Black, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  margin: 0;
}

#nav {
  width: 100%;
}

#router-view {
  flex: 1;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
