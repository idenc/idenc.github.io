<template>
  <div>
    <div id="projects-heading" class="heading">Projects</div>
    <div id="items">
      <PortfolioItem
        v-for="project in myProjects"
        :key="project.title"
        :project="project"
        class="item"
        @imgClick="imgClick"
      />
    </div>
  </div>
</template>
<script>
import projects from "../assets/projects";
import PortfolioItem from "@/components/PortfolioItem";

export default {
  name: "Portfolio",
  components: { PortfolioItem },
  data() {
    return {
      myProjects: projects,
    };
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
}
</style>
