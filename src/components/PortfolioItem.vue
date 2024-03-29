<template>
  <div>
    <div :id="`container-${project.title}`">
      <div :id="`card-${project.title}`" class="root card">
        <div id="header">
          <h1>{{ project.title }}</h1>
          <div class="portfolio-links">
            <a
              v-if="project.project_link"
              class="header-icons"
              :href="`${project.project_link}`"
              target="_blank"
            >
              <img src="@/assets/img/github.svg" alt="github link" />
            </a>
            <a
              v-if="project.video_link"
              class="header-icons"
              :href="`${project.video_link}`"
              target="_blank"
              style="margin-left: 30px"
            >
              <img src="@/assets/img/youtube.svg" alt="video link" />
            </a>
          </div>
        </div>

        <p>{{ project.description }}</p>

        <img
          v-if="project.img && !project.img.endsWith('webm')"
          ref="img"
          class="portfolio-image"
          :src="require(`@/assets/img/${project.img}`)"
          alt="{{ project.title }} image"
          @click.stop="imgClick"
        />
        <video
          v-else
          autoplay
          loop
          muted
          playsinline
          class="portfolio-image"
          @click.stop="imgClick"
        >
          <source
            :src="require(`@/assets/img/${project.img}`)"
            type="video/webm"
          />
        </video>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "PortfolioItem",
  props: {
    project: Object(),
  },
  data() {
    return {
      init: false,
      betaOffset: Number(),
      gammaOffset: Number(),
      alphaOffset: Number(),
    };
  },
  mounted: function () {
    const container = $(`#container-${this.project.title}`);
    const card = $(`#card-${this.project.title}`);

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      if (window.DeviceOrientationEvent) {
        window.addEventListener(
          "deviceorientation",
          (e) => {
            this.tilt(card, e.beta, e.gamma, e.alpha);
          },
          true
        );
      }
    } else {
      container.on("mousemove", this.handleMouseMove(container, card));

      //Animate Out
      container.on("mouseleave", this.handleMouseLeave(card));
    }
  },
  methods: {
    tilt: function (card, beta, gamma) {
      if (!this.init) {
        this.betaOffset = beta;
        this.gammaOffset = gamma;
        this.init = true;
      }
      const rotY = Math.min(Math.max(gamma - this.gammaOffset, -30), 30);
      const rotX = -Math.min(Math.max(beta - this.betaOffset, -30), 30);
      console.log(`rotX ${rotX}`);
      card.attr("style", `transform: rotateY(${rotY}deg) rotateX(${rotX}deg)`);
    },
    imgClick: function (el) {
      console.log(el.target.src);
      console.log(el.target.currentSrc);
      this.$emit("imgClick", {
        imgSrc: el.target.src || el.target.currentSrc,
        caption: this.project.title,
      });
    },
    handleMouseMove: function (container, card) {
      return (t) => {
        const x = t.pageX - container.offset().left;
        const y = t.pageY - container.offset().top;
        const e = -(container.innerWidth() / 2 - x) / 80;
        const n = (container.innerHeight() / 2 - y) / 80;

        card.attr(
          "style",
          "transform: rotateY(" +
            e +
            "deg) rotateX(" +
            n +
            "deg);-webkit-transform: rotateY(" +
            e +
            "deg) rotateX(" +
            n +
            "deg);-moz-transform: rotateY(" +
            e +
            "deg) rotateX(" +
            n +
            "deg)"
        );
      };
    },
    handleMouseLeave: function (card) {
      return () => {
        card.attr(
          "style",
          "transition: all 0.5s ease;" +
            "transform: rotateY(0) rotateX(0);" +
            "-webkit-transform: rotateY(0) rotateX(0);" +
            "-moz-transform: rotateY(0) rotateX(0)"
        );
      };
    },
  },
};
</script>

<style scoped>
.root {
  margin: 2em 0 0;
  display: flex;
  flex-flow: column nowrap;
  max-height: 90vh;
}

.root * {
  box-sizing: border-box;
}

.root > * {
  flex: 1;
}

#header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  flex: 0 1 auto;
}

#header * {
  margin: 0;
}

.header-icons {
  opacity: 0.6;
  width: 30px;
  filter: grayscale(100%);
}

.header-icons img {
  max-width: 30px;
}

.header-icons:hover {
  opacity: 1;
  filter: grayscale(0%);
}

h1 {
  font-size: clamp(20px, 4vw, 4vw);
  color: #1c1c1c;
}

p {
  font-size: clamp(16px, 1.2vw, 1.2vw);
  line-height: 1.6;
}

.portfolio-image {
  border-radius: 40px;
  min-height: 0;
  align-self: center;
  max-width: 100%;
  cursor: pointer;
}

.item {
  perspective: 1000px;
}

.card {
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.2), 0 0 50px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
}

.portfolio-links {
  display: flex;
  align-items: center;
}
</style>
