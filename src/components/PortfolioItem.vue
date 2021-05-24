<template>
  <div>
    <h1>{{ project.title }}</h1>
    <p>{{ project.description }}</p>
    <img
      :src="require(`@/assets/img/${project.img}`)"
      alt="{{ project.title }} image"
    />
  </div>
</template>

<script>
export default {
  name: "PortfolioItem",
  props: {
    project: Object(),
  },
};
</script>

<style scoped></style>
