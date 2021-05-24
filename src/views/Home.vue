<template>
  <div class="home">
    <Intro id="intro" />
    <div
      class="moving-clouds"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Intro from '@/components/Intro'

export default {
  name: 'Home',
  components: {
    Intro
  },
  mounted: function () {
    document.title = this.$titlePrefix + "Home"
  }
}
</script>

<style scoped>
.home {
  background: url("../assets/forest.jpg") no-repeat fixed center;
  background-size: cover;
  display: flex;
  position: relative;
  overflow: hidden;
}

.moving-clouds {
  background-image: url("../assets/clouds.png");
  position: absolute;
  bottom: 0;
  left: 0;
  width: 250.625em;
  height: 100%;
  -webkit-animation: cloudLoop 100000s linear infinite;
  animation: cloudLoop 100000s linear infinite;
}

@keyframes cloudLoop {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 3000000px 0;
  }
}

#intro {
  width: 100%;
  z-index: 1;
}
</style>
