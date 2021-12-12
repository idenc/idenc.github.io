<template>
  <div class="home">
    <div id="background" />
    <img
      ref="clouds"
      src="@/assets/img/clouds.webp"
      class="clouds"
      alt="cloud background"
    />
    <ModalImage
      id="modal"
      :caption="modalCaption"
      :img-src="modalImgSrc"
      :is-visible="modalVisible"
      @modalVis="setModalVisible"
    />
    <Intro id="intro" ref="intro" />
    <Portfolio @imgClick="imgClick" />
    <Resume />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import Intro from "@/components/Intro";
import Portfolio from "@/components/Portfolio";
import ModalImage from "@/components/ModalImage";
import Resume from "@/components/Resume";
import Footer from "@/components/Footer";
import * as TWEEN from "@tweenjs/tween.js";

export default {
  name: "IdenHome",
  components: {
    Footer,
    Resume,
    ModalImage,
    Portfolio,
    Intro,
  },
  data() {
    return {
      modalVisible: false,
      modalImgSrc: String(),
      modalCaption: String(),
    };
  },
  mounted: function () {
    document.title = this.$titlePrefix + "Home";
    // Add listener for closing modal image when clicking outside of it
    window.addEventListener("click", (e) => {
      const modal = document.querySelector(".modal-content");
      if (
        modal &&
        modal.style.visibility !== "none" &&
        !modal.contains(e.target)
      ) {
        this.modalVisible = false;
      }
    });
    this.startCloudLoop();
  },
  methods: {
    introSize: function () {
      const intro = document.getElementById("intro");
      const delta = window.innerHeight - intro.offsetHeight;
      intro.style.marginBottom = `${delta / 2}px`;
      intro.style.marginTop = `${delta / 2}px`;
    },
    imgClick: function (imgInfo) {
      this.modalImgSrc = imgInfo.imgSrc;
      this.modalCaption = imgInfo.caption;
      this.modalVisible = true;
    },
    setModalVisible: function (visibility) {
      this.modalVisible = visibility;
    },
    startCloudLoop: function () {
      const position = { x: 0 };
      const clouds = this.$refs.clouds;
      new TWEEN.Tween(position)
        .to({ x: 3000 }, 30 * 1000)
        .onUpdate(() => {
          clouds.style.transform = `translate3d(${-position.x}px, 0, 0)`;
        })
        .repeat(Infinity)
        .start();
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

#background {
  z-index: -1;
  position: fixed;
  left: 0;
  top: 0;
  height: 110%;
  width: 100%;
  background: url("~@/assets/img/forest.webp");
  background-size: cover;
}

.clouds {
  z-index: 0;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 100%;
  will-change: transform;
}

#intro {
  width: 100%;
  margin: 0;
  height: 100vh;
}
</style>
