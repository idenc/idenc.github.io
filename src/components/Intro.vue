<template>
  <div id="intro" ref="intro">
    <div id="text-wrapper">
      <div id="intro-text">
        <p>Hi, I'm</p>
        <p id="name">Iden.</p>
        <div id="job-title">Software Developer</div>
      </div>
    </div>
    <div id="pic-div">
      <ProfilePic id="profile-pic" ref="profilePic" />
    </div>
  </div>
</template>

<script>
import ScrollReveal from "scrollreveal";
import ProfilePic from "@/components/ProfilePic";

export default {
  name: "Intro",
  components: { ProfilePic },
  mounted: function () {
    this.$refs.intro.style.visibility = "visible";
    const textReveal = {
      reset: true,
      origin: "left",
      delay: 200,
      distance: "120px",
      easing: "ease-in-out",
    };
    ScrollReveal().reveal("#intro-text", textReveal);

    const imgReveal = {
      reset: true,
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
  width: 100%;
  align-items: center;
  visibility: hidden;
}

#text-wrapper {
  flex: 1 1 50%;
  display: flex;
  justify-content: center;
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
  transition: 0.4s;
}

#job-title:hover {
  background: #b2cdd6;
}

p {
  font-size: 5vw;
  font-family: Araboto-Normal, Helvetica, sans-serif;
}

#name {
  font-size: 10vw;
  font-family: Araboto-Black, Helvetica, sans-serif;
}

#profile-pic,
#pic-div {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}

@media screen and (max-width: 768px) {
  #intro {
    flex-direction: column-reverse;
  }
  #job-title {
    font-size: 5vw;
  }

  #pic-div {
    flex: 0;
  }

  p {
    font-size: 7vw;
  }

  #name {
    font-size: 15vw;
  }
}
</style>
