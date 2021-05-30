<template>
  <div class="root card">
    <div id="header">
      <h1>{{ project.title }}</h1>
      <div>
        <a
          v-if="project.project_link"
          class="header-icons"
          :href="`${project.project_link}`"
          target="_blank"
        >
          <img src="@/assets/img/github.png" alt="github link" />
        </a>
        <a
          v-if="project.video_link"
          class="header-icons"
          :href="`${project.video_link}`"
          target="_blank"
          style="margin-left: 30px"
        >
          <img src="@/assets/img/youtube.png" alt="video link" />
        </a>
      </div>
    </div>

    <p>{{ project.description }}</p>

    <img
      id="img"
      ref="img"
      :src="require(`@/assets/img/${project.img}`)"
      alt="{{ project.title }} image"
      @click.stop="imgClick"
    />
  </div>
</template>

<script>
export default {
  name: "PortfolioItem",
  props: {
    project: Object(),
  },
  methods: {
    imgClick: function () {
      this.$emit("imgClick", {
        imgSrc: this.$refs.img.src,
        caption: this.project.title,
      });
    },
  },
};
</script>

<style scoped>
.root {
  margin: 2em 0 0;
  display: flex;
  flex-flow: column nowrap;
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
  color: #1c1c1c;
}

p {
  line-height: 1.6;
}

#img {
  border-radius: 40px;
  min-height: 0;
  align-self: center;
  max-width: 100%;
  cursor: pointer;
}

.root:hover {
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
}
</style>
