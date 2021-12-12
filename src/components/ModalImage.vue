<template>
  <div
    ref="modal"
    class="modal"
    :style="{
      display: `${isVisible ? 'flex' : 'none'}`,
    }"
  >
    <div id="modal-div">
      <!-- The Close Button -->
      <span class="close" @click="$emit('modalVis', false)">&times;</span>

      <!-- Modal Content (The Image) -->
      <img
        v-if="imgSrc && !imgSrc.endsWith('.webm')"
        class="modal-content"
        :src="imgSrc"
        :alt="`${caption} img`"
      />
      <video v-else autoplay loop muted playsinline class="model-content">
        <source :src="imgSrc" type="video/webm" />
      </video>

      <!-- Modal Caption (Image Text) -->
      <div id="caption">{{ caption }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalImage",
  props: {
    imgSrc: String(),
    caption: String(),
    isVisible: Boolean(false),
  },
};
</script>

<style scoped>
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
  justify-content: center;
  align-items: center;
}

#modal-div {
  height: 80%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#model-div > * {
  flex: 1;
}

/* Modal Content (Image) */
.modal-content {
  /*height: 100%;*/
  max-width: 100%;
  max-height: 100%;
}

/* Caption of Modal Image (Image Text) - Same Width as the Image */
#caption {
  color: #ccc;
}

/* Add Animation - Zoom in the Modal */
.modal-content,
#caption {
  -webkit-animation-name: zoom;
  -webkit-animation-duration: 0.6s;
  animation-name: zoom;
  animation-duration: 0.6s;
}

@-webkit-keyframes zoom {
  from {
    -webkit-transform: scale(0);
  }
  to {
    -webkit-transform: scale(1);
  }
}

@keyframes zoom {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

/* The Close Button */
.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px) {
  .modal-content {
    width: 100%;
  }
}
</style>
