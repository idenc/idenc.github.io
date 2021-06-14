<template>
  <div>
    <div id="projects-heading" class="heading">Projects</div>
    <div id="items">
      <PortfolioItem
        v-for="project in myProjects"
        :id="project.title"
        :key="project.title"
        :project="project"
        class="item"
        @imgClick="imgClick"
      />
    </div>
  </div>
</template>
<script>
import projects from "@/assets/projects";
import PortfolioItem from "@/components/PortfolioItem";
import ScrollReveal from "scrollreveal";

export default {
  name: "Portfolio",
  components: { PortfolioItem },
  data() {
    return {
      myProjects: projects,
    };
  },
  mounted: function () {
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // Weird bug with scrollreveal where items will reveal on page load even if not in view
    // waiting for a bit and then adding the scrollreveal works around this
    sleep(200).then(() => {
      const items = document.getElementsByClassName("card");
      let tick = false;
      Array.from(items).map((child) => {
        const textReveal = {
          reset: false,
          origin: tick ? "left" : "right",
          delay: 200,
          distance: "120px",
          easing: "ease-in-out",
        };
        tick = !tick;
        ScrollReveal().reveal(`#${child.id}`, textReveal);
      });
    });
  },
  methods: {
    imgClick: function (imgInfo) {
      this.$emit("imgClick", imgInfo);
    },
  },
};
</script>

<style scoped>
#items {
  display: flex;
  flex-direction: column;
  align-items: center;
  perspective: 1000px;
}
</style>
