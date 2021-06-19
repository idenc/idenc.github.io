<template>
  <div>
    <div id="resume-heading" class="heading">Résumé</div>
    <div id="resume-root" class="card">
      <div id="info">
        <div id="link-imgs">
          <a href="https://github.com/idenc" target="_blank">
            <img src="@/assets/img/github.png" alt="github link" />
          </a>
          <a href="https://www.linkedin.com/in/iden-craven" target="_blank">
            <img src="@/assets/img/linkedin.svg" alt="linkedin link" />
          </a>
        </div>
        <h1>Iden Craven</h1>
        <h2>Programmer</h2>
        <div id="info-bar">
          <span><font-awesome-icon icon="map-marker-alt" /> Calgary, AB</span>
          <span
            ><font-awesome-icon icon="envelope" />
            <a href="mailto:iden.craven@gmail.com">
              iden.craven@gmail.com</a
            ></span
          >
        </div>
      </div>

      <h2><font-awesome-icon icon="user" /> About Me</h2>
      <hr />
      <p>
        Hi! I'm Iden Craven. I am a recent university graduate with a BSc
        honours degree in computer science and a minor in mathematics. My main
        area of interest is in machine learning and computer vision. I have 16
        months of work experience as a computer vision intern at Au-Zone
        technologies.
      </p>

      <h2><font-awesome-icon icon="briefcase" /> Work Experience</h2>
      <hr />
      <WorkExperience
        v-for="ex in experience"
        :key="ex.companyName"
        :job="ex"
      />
      <hr />
      <h2><font-awesome-icon icon="graduation-cap" /> Education</h2>
      <p>
        <span class="bold">Bachelor of Science</span> (Honours) First Class in
        Computer Science
      </p>
      <p>
        <span class="bold">University of Calgary</span>
        <img
          id="ucalgary-img"
          src="@/assets/img/ucalgary.png"
          alt="UCalgary"
          style="height: 1.2em"
        />
      </p>
      <p>
        <span class="bold">September</span> 2017 -
        <span class="bold">May</span> 2021
      </p>
      <p><span class="bold">GPA:</span> 3.9</p>
      <hr />
      <h2><font-awesome-icon icon="code" /> Technologies</h2>
      <div id="tech-imgs">
        <img src="@/assets/img/python.webp" alt="python" />
        <img src="@/assets/img/C++.png" alt="C++" />
        <img src="@/assets/img/Java.png" alt="Java" />
        <img src="@/assets/img/javascript.png" alt="JavaScript" />
        <img src="@/assets/img/HTML5.svg" alt="HTML5" />
        <img src="@/assets/img/CSS3.svg" alt="CSS3" />
        <img src="@/assets/img/vue.png" alt="Vue.js" />
        <img src="@/assets/img/node.png" alt="Node.js" />
        <img src="@/assets/img/tensorflow.png" alt="Tensorflow" />
        <img src="@/assets/img/pytorch.png" alt="PyTorch" />
        <img src="@/assets/img/android.svg" alt="Android" />
      </div>
      <div>
        5K+ lines: Python, C/C++, Java, JavaScript, HTML/CSS, Vue.js, Node.js,
        Tensorflow, Pytorch, Android
      </div>
    </div>
  </div>
</template>

<script>
import WorkExperience from "@/components/WorkExperience";
import experience from "@/assets/js/experience";
export default {
  name: "Resume",
  components: { WorkExperience },
  data() {
    return {
      experience: experience,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

#resume-heading {
  margin-top: 40px;
  margin-bottom: 40px;
}

#tech-imgs {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 0.83em;
}

#tech-imgs img {
  height: 56px;
  transition: 0.3s;
  filter: grayscale(100%);
}

#tech-imgs img:hover {
  filter: grayscale(0);
}

#ucalgary-img {
  margin-left: 5px;
  height: 1.2em;
}

.bold {
  font-weight: bold;
}

#resume-root {
  font-family: "Roboto";
  font-size: 1.2em;
  margin: auto auto 40px;
}

#resume-root:hover {
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.1);
}

#info {
  width: 100%;
}

#info h1 {
  display: inline-block;
}

#info-bar span {
  margin-right: 20px;
}

#info h1,
#info h2 {
  margin: 0;
}

#link-imgs {
  height: 40px;
  display: inline-block;
  float: right;
}

#link-imgs img:first-child {
  margin-right: 20px;
}

#link-imgs img {
  height: 40px;
  cursor: pointer;
  filter: grayscale(100%);
  opacity: 0.6;
}

#link-imgs img:hover {
  filter: grayscale(0);
  opacity: 1;
}

@media screen and (max-width: 768px) {
  #link-imgs {
    float: left;
  }
}
</style>
