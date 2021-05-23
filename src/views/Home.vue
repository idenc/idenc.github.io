<template>
  <div class="home">
    <Intro id="intro" />
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
}

#intro {
  width: 100%;
}
</style>
