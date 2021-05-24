<template>
  <div>
    <div class="heading">Projects</div>
    <PortfolioItem
      v-for="project in myProjects"
      :key="project.title"
      :project="project"
    />
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

<style scoped></style>
