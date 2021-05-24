<template>
  <div>
    <div id="root">
      <img
        id="logo"
        alt="logo"
        src="../assets/logo.png"
      >
      <div id="links-div">
        <router-link to="/">
          Home
        </router-link>
        |
        <router-link to="/about">
          About
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
#root {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

#logo {
  height: 100%;
  margin-left: 20px;
}

#links-div {
  margin-right: 20px;
}

#logo {
  max-height: 90%;
}
</style>