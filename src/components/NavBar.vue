<template>
  <div>
    <div id="root">
      <img id="logo" alt="logo" src="../assets/img/logo.png" />
      <div id="links-div">
        <a @click="homeClick">Home </a>
        |
        <a @click="portfolioClick"> Portfolio </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    homeClick: function () {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    },
    portfolioClick: function () {
      const portfolioHeading = document.getElementById("projects-heading");
      portfolioHeading.scrollIntoView({ behavior: "smooth" });
    },
  },
};
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
  font-size: clamp(16px, 1.2vw, 1.2vw);
}

#links-div a {
  text-decoration: none;
  cursor: pointer;
}

#logo {
  max-height: 90%;
}
</style>
