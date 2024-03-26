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
      <Weather />
    </div>

    <div id="qTwo" class="tabcontent">
      <SelectGame />
    </div>
    <div id="qThree" class="tabcontent">
      <SelectAntony />
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
.qOne::after {
  background-color: #8ecae6;
}
.qTwo::after {
  background-color: #3ab795;
}
.qThree::after {
  background-color: #3ab795;
}
.qFour::after {
  background-color: #d78af1;
}

.qOne {
  background-color: #8ecae6;
}
.qTwo {
  background-color: #3ab795;
}
.qThree {
  background-color: #3ab795;
}
.qFour {
  background-color: #d78af1;
}

#kitchen {
  display: none;
  transition: 0s;
  width: 240px;
  height: 290px;
}
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #f1f1f1;
  overflow-x: hidden;
  transition: 0.1s;
  padding-top: 50px;
  text-align: center;
}

#clNav {
  color: red;
  transition: 0.1s;
  display: block;
  margin-right: -20px;
  font-size: 25px;
  cursor: pointer;
}

#clNav:hover {
  color: #009b77;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}
#opNav {
  cursor: pointer;
  opacity: 0.9;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
#bar {
  width: 35px;
  padding: 5px;
}
#bloc1,
#bloc2,
#bloc3 {
  width: 15px;
  height: 3px;
  background-color: black;
  margin: 3px;
  transition: 0.1s;
}
#bloc1 {
  transform: translate(3px, -1px);
  background-color: white;
}
#bloc2 {
  transform: translate(-3px, 1px);
  background-color: white;
}
#bloc3 {
  transform: translate(5px, 1px);
  background-color: white;
}
#opNav {
  box-shadow: 0px 0px 0px #000;
}
#opNav span {
  color: black;
  font-weight: bolder;
}

.tab {
  overflow: hidden;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  justify-content: center;
}

.tab .tablinks {
  background-color: none;
  cursor: pointer;
  padding: 10px;
  transition: 0.1s;
  font-size: 14px;
  margin: 0px;
}
.tab .tablinks:hover {
  background-color: #009b77;
}

.tab .active {
  background-color: #009b77;
}

.tab .tablinks:focus {
  background-color: #009b772c;
}

.tabcontent {
  padding: 6px 12px;
  border-top: none;
  height: 230px;
  margin-top: -8px;
}
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-animation-name: fadeIn;
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
  font-size: 14px;
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
