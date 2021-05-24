<template>
  <div class="home">
    <div id="background" />
    <div class="moving-clouds" />
    <Intro id="intro" />
    <Portfolio />
  </div>
</template>

<script>
// @ is an alias to /src
import Intro from "@/components/Intro";
import Portfolio from "@/components/Portfolio";
import $ from "jquery";

export default {
  name: "Home",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Portfolio,
    Intro,
  },
  mounted: function () {
    document.title = this.$titlePrefix + "Home";
    const intro = $("#intro");
    const delta = $(window).height() - (intro.offset().top + intro.height());
    console.log(delta);
    intro.css("margin-bottom", `${delta / 2}px`);
    intro.css("margin-top", `${delta / 2}px`);
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

#background {
  z-index: -1;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: url("../assets/img/forest.jpg");
  background-size: cover;
}

.moving-clouds {
  background: url("../assets/img/clouds.png") repeat-x;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 43.75em;
  -webkit-animation: cloudLoop 100000s linear infinite;
  animation: cloudLoop 100000s linear infinite;
}

@keyframes cloudLoop {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 10000000px 0;
  }
}

#intro {
  width: 100%;
  margin: 0;
  z-index: 1;
}
</style>
