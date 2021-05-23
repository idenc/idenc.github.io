<template>
  <div id="intro">
    <div id="intro-text">
      <p>Hi I'm</p>
      <p id="name">
        Iden.
      </p>
      <div id="job-title">
        Software Developer
      </div>
    </div>
    <div id="pic-div">
      <img
        id="profile-pic"
        alt="profile picture"
        src="../assets/me.jpg"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Intro"
}
</script>

<style scoped>
#intro {
  display: flex;
  justify-content: space-around;
  margin: 20px;
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