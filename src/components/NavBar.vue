<template>
  <div>
    <div id="root">
      <img
        id="logo"
        alt="logo"
        src="@/assets/img/logo.png"
        @click="homeClick"
      />
      <nav id="links-div">
        <a @click="homeClick">Home </a>
        |
        <a @click="portfolioClick"> Projects </a>
        |
        <a @click="resumeClick"> Résumé </a>
      </nav>
      <NavMenu
        id="nav-menu"
        :home-click="mobileHomeClick"
        :portfolio-click="portfolioClick"
        :resume-click="resumeClick"
      />
    </div>
  </div>
</template>

<script>
import NavMenu from "@/components/NavMenu";
export default {
  name: "NavBar",
  components: { NavMenu },
  methods: {
    mobileHomeClick: function () {
      this.homeClick();
      this.closeNavMenu();
    },
    homeClick: function () {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    },
    closeNavMenu: function () {
      const burgerButton = document.getElementById("burger-button");
      const evt = document.createEvent("MouseEvents");
      evt.initEvent("mouseup", true, true);
      burgerButton.dispatchEvent(evt);
      burgerButton.click();
    },
    scrollToItem: function (selector) {
      const scrollItem = document.querySelector(selector);
      scrollItem.scrollIntoView({ behavior: "smooth" });
    },
    portfolioClick: function () {
      this.scrollToItem("#projects-heading");
      this.closeNavMenu();
    },
    resumeClick: function () {
      this.scrollToItem("#resume-heading");
      this.closeNavMenu();
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
  margin-left: 2vw;
  cursor: pointer;
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

#nav-menu {
  display: none;
  margin-right: 2vw;
}

@media screen and (max-width: 768px) {
  #nav-menu {
    display: block;
  }

  #links-div {
    display: none;
  }
}
</style>
