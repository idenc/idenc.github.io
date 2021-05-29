<template>
  <div>
    <HamburgerButton id="burger-button" @mouseup="menuClick" />
    <div id="burger-menu">
      <nav id="nav-list">
        <a @click="homeClick">Home</a>
        <a @click="portfolioClick">Projects</a>
        <a @click="resumeClick">Résumé</a>
      </nav>
    </div>
  </div>
</template>

<script>
import HamburgerButton from "@/components/HamburgerButton";
export default {
  name: "NavMenu",
  components: { HamburgerButton },
  props: {
    homeClick: {
      type: Function,
      required: true,
    },
    portfolioClick: {
      type: Function,
      required: true,
    },
    resumeClick: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      menuOpen: false,
    };
  },
  methods: {
    menuClick: function () {
      if (!this.menuOpen) {
        document.getElementById("burger-menu").style.width = "100%";
        this.menuOpen = true;
      } else {
        document.getElementById("burger-menu").style.width = "0";
        this.menuOpen = false;
      }
    },
  },
};
</script>

<style scoped>
#burger-button {
  cursor: pointer;
  position: relative;
  z-index: 2;
}
#burger-menu {
  height: 100%;
  width: 0;
  background-color: #2c3e50;
  position: fixed;
  top: 0;
  right: 0;
  left: auto;
  overflow-x: hidden;
  padding-top: 60px;
  z-index: 1;
  transition: 0.5s;
}

#nav-list {
  margin-left: 10%;
  font-size: 20px;
}

#nav-list a {
  font-weight: bold;
  color: white;
}

#nav-list > * {
  display: flex;
  text-decoration: none;
  padding: 0.7em;
}
</style>
