<template>
  <div id="kitchen">
    <div id="mySidenav" class="sidenav">
      <span class="closebtn" id="clNav" @click="closeNav">&times;</span>
      <div class="tab" v-for="tablink in listTablinks" :key="tablink.tabindex">
        <p class="tablinks" :tabindex="tablink.tabindex" @click="selectMenu">
          {{ tablink.content }}
        </p>
      </div>
    </div>

    <div id="opNav" class="idk" @click="openNav">
      <div class="three-Bar" id="bar">
        <div id="bloc1" class="blocx"></div>
        <div id="bloc2" class="blocx"></div>
        <div id="bloc3" class="blocx"></div>
      </div>
      <span></span>
    </div>
    <div id="qOne" class="tabcontent">
      <SelectGame />
    </div>

    <div id="qTwo" class="tabcontent">
      <Weather />
    </div>
    <div id="qThree" class="tabcontent">
      <SelectAntony />
      <!--<TrueFalse />-->
    </div>
    <div id="qFour" class="tabcontent">
      <Actuality />
    </div>
  </div>
</template>

<script>
import Actuality from "./Actuality.vue";
import SelectGame from "./SelectGame.vue";
import SelectAntony from "./SelectAntony.vue";
import Weather from "./Weather.vue";
export default {
  name: "Kitchen",
  components: {
    Actuality,
    SelectAntony,
    SelectGame,
    Weather,
  },
  data() {
    return {
      listTablinks: [
        { tabindex: 0, content: "Hiverina" },
        { tabindex: 1, content: "Toetr'andro" },
        { tabindex: 2, content: "Fiovan'ny toetr'andro" },
        { tabindex: 3, content: "Anton'ny fiovan'ny toetr'andro" },
        { tabindex: 4, content: "Vahaolana" },
      ],
    };
  },
  methods: {
    openNav() {
      this.$emit("openNav");
    },
    closeNav() {
      this.$emit("closeNav");
    },
    selectMenu(evt) {
      this.$emit("selectMenu", [evt, evt.currentTarget.innerText]);
    },
  },
  mounted() {},
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
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  -webkit-animation-name: fadeIn; /* Fade in the background */
  -webkit-animation-duration: 0.4s;
  animation-name: fadeIn;
  animation-duration: 0.4s;
}

/* Modal Content */
.modal-content {
  position: fixed;
  bottom: 0;
  background-color: #fefefe;
  width: 100%;
  -webkit-animation-name: slideIn;
  -webkit-animation-duration: 0.4s;
  animation-name: slideIn;
  animation-duration: 0.4s;
  font-size: 12px;
}

.modal-body {
  padding: 2px 16px;
}

/* Add Animation */
@-webkit-keyframes slideIn {
  from {
    bottom: -300px;
    opacity: 0;
  }
  to {
    bottom: 0;
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    bottom: -300px;
    opacity: 0;
  }
  to {
    bottom: 0;
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
