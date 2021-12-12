<template>
  <div class="home">
    <div id="background" />
    <div class="container">
      <div ref="clouds" class="clouds" />
    </div>

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
  height: 100%;
  width: 100%;
  background: url("~@/assets/img/forest.webp");
  background-size: cover;
}

.container {
  overflow: hidden;
}

.clouds {
  z-index: -1;
  position: fixed;
  left: 0;
  bottom: 0;
  background: url("~@/assets/img/clouds.webp") round;
  will-change: transform;
  height: 100%;
  width: 3759px;
  animation: cloudLoop 30s linear infinite;
}

@keyframes cloudLoop {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-1253px, 0, 0);
  }
}

#intro {
  width: 100%;
  margin: 0;
  height: 100vh;
}
</style>
