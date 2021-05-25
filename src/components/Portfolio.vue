<template>
  <div>
    <div class="heading">Projects</div>
    <div id="items">
      <PortfolioItem
        v-for="project in myProjects"
        :key="project.title"
        :project="project"
        class="item"
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
};
</script>

<style scoped>
#items {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
