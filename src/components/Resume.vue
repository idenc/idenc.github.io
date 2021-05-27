<template>
  <div>
    <div id="resume-heading" class="heading">Résumé</div>
    <div id="resume-root">
      <h1>About Me</h1>
      <div id="link-imgs">
        <a href="https://github.com/idenc" target="_blank">
          <img src="@/assets/img/github.png" alt="github link" />
        </a>
        <a href="https://www.linkedin.com/in/iden-craven" target="_blank">
          <img src="@/assets/img/linkedin.svg" alt="linkedin link" />
        </a>
      </div>
      <p>
        Hi! I'm Iden Craven. I am a recent university graduate with a BSc
        honours degree in computer science and a minor in mathematics. My main
        area of interest is in machine learning and computer vision. I have 16
        months of work experience as a computer vision intern at Au-Zone
        technologies.
      </p>

      <h2><font-awesome-icon icon="briefcase" /> Work Experience</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "Resume",
};
</script>

<style scoped>
#resume-heading {
  margin-top: 40px;
  margin-bottom: 40px;
}

#resume-root {
  background: white;
  border-radius: 40px;
  margin: auto;
  padding: 2em 2em 4em 2em;
  width: 70vw;
  text-align: left;
  max-width: 1000px;
  transition: box-shadow 0.4s ease-in-out;
  max-height: 70vh;
}

#resume-root:hover {
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
}

#resume-root h1 {
  display: inline-block;
  margin: 0;
}

#link-imgs {
  height: 40px;
  display: inline-block;
  float: right;
}

#link-imgs img {
  height: 40px;
  cursor: pointer;
  margin-left: 20px;
  filter: grayscale(100%);
  opacity: 0.6;
}

#link-imgs img:hover {
  filter: grayscale(0);
  opacity: 1;
}
</style>
