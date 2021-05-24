<template>
  <div id="intro">
    <div id="intro-text">
      <p>Hi, I'm</p>
      <p id="name">Iden.</p>
      <div id="job-title">Software Developer</div>
    </div>
    <div id="pic-div">
      <img id="profile-pic" alt="profile picture" src="../assets/img/me.jpg" />
    </div>
  </div>
</template>

<script>
import ScrollReveal from "scrollreveal";

export default {
  name: "Intro",
  mounted: function () {
    const textReveal = {
      origin: "left",
      delay: 200,
      distance: "120px",
      easing: "ease-in-out",
    };
    ScrollReveal().reveal("#intro-text", textReveal);

    const imgReveal = {
      origin: "right",
      delay: 200,
      distance: "120px",
      easing: "ease-in-out",
    };
    ScrollReveal().reveal("#pic-div", imgReveal);
  },
};
</script>

<style scoped>
#intro {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

#intro-text {
  text-align: left;
  color: white;
}

#intro-text p {
  margin: 10px 0;
}

#job-title {
  text-align: center;
  background: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  padding: 15px;
  font-size: 3vw;
  color: #2c3e50;
}

p {
  font-size: 5vw;
  font-family: Araboto-Normal, Helvetica, sans-serif;
}

#name {
  font-size: 10vw;
  font-family: Araboto-Black, Helvetica, sans-serif;
}

#pic-div {
  height: 50%;
}

#profile-pic {
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  border: 5px solid white;
  max-height: 100%;
}
</style>
