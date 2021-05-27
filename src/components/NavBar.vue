<template>
  <div>
    <div id="root">
      <img id="logo" alt="logo" src="@/assets/img/logo.png" />
      <div id="links-div">
        <a @click="homeClick">Home </a>
        |
        <a @click="portfolioClick"> Portfolio </a>
        |
        <a @click="resumeClick"> Résumé </a>
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
    scrollToItem: function (selector) {
      const scrollItem = document.querySelector(selector);
      scrollItem.scrollIntoView({ behavior: "smooth" });
    },
    portfolioClick: function () {
      this.scrollToItem("#projects-heading");
    },
    resumeClick: function () {
      this.scrollToItem("#resume-heading");
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
