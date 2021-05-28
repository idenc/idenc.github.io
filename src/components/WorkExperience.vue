<template>
  <div>
    <p style="font-weight: bold">
      {{ job.jobTitle }},
      <a href="{{job.companyLink}}">{{ job.companyName }}</a>
    </p>
    <p>
      <font-awesome-icon icon="clock" /> {{ job.startDate }} - {{ job.endDate }}
    </p>
    <ul>
      <li v-for="(duty, index) in job.duties" :key="index">{{ duty }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "WorkExperience",
  props: {
    job: Object(),
  },
};
</script>

<style scoped></style>
