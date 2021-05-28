<template>
  <div class="home">
    <div id="background" />
    <div class="moving-clouds" />
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
  </div>
</template>

<script>
// @ is an alias to /src
import Intro from "@/components/Intro";
import Portfolio from "@/components/Portfolio";
import ModalImage from "@/components/ModalImage";
import Resume from "@/components/Resume";

export default {
  name: "Home",
  components: {
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
    window.addEventListener("load", () => {
      this.introSize();
    });
    window.addEventListener("resize", () => {
      this.introSize();
    });
    window.addEventListener("click", (e) => {
      const modal = document.querySelector(".modal-content");
      if (modal.style.visibility !== "none" && !modal.contains(e.target)) {
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
  height: 110%;
  width: 100%;
  background: url("~@/assets/img/forest.jpg");
  background-size: cover;
}

.moving-clouds {
  z-index: -1;
  background: url("~@/assets/img/clouds.png") repeat-x;
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
}
</style>
