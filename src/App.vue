<template>
  <div id="app">
    <!-- <Softkey :softkeys.sync="softkeys" /> -->
    <Home @selectMenu="selectMenu" @openkitchen="displaykitchen" />
    <kitchen
      @openNav="openMenu"
      @closeNav="closeMenu"
      @selectMenu="selectMenu"
    />
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import Kitchen from "./components/Kitchen.vue";
import {
  kitchen,
  home,
  openNav,
  openSelection,
  closeNav,
  showContent,
  nav,
} from "./Navigation";
// import { handleAnswerClick, startStat, displayQuestion } from "./quiz";
// import {
//   displayQuestionTrueFalse,
//   handleAnswerClickTrueFalse,
//   startStatTrueFalse,
// } from "./truefalse";
export default {
  name: "app",
  components: {
    Home,
    Kitchen,
  },
  data: () => ({}),
  mounted() {
    document.activeElement.addEventListener("keydown", handleKeydown);
    const softkeyCallback = {
      left: function() {
        openNav();
      },
      center: function() {
        const focusedElement = document.activeElement;
        showContent(focusedElement);
      },
      right: function() {
        closeNav();
      },
    };
    function handleKeydown(evt) {
      switch (evt.key) {
        case "ArrowUp":
          nav(-1);
          break;
        case "ArrowDown":
          nav(1);
          break;
        case "SoftLeft":
          softkeyCallback.left();
          break;
        case "SoftRight":
          softkeyCallback.right();
          break;
        case "Enter":
          softkeyCallback.center();
          break;
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.onKeyDown);
  },
  methods: {
    openMenu() {
      openNav();
    },
    closeMenu() {
      closeNav();
    },
    selectMenu(data) {
      var text = data[1];
      var event = data[0];
      if (text === "Toetr'andro") {
        openSelection(event, "qOne", "qOne", text);
      } else if (text === "Fiovan'ny toetr'andro") {
        openSelection(event, "qTwo", "qTwo", text);
      } else if (text === "Anton'ny fiovan'ny toetr'andro") {
        openSelection(event, "qThree", "qThree", text);
      } else if (text === "Vahaolana") {
        openSelection(event, "qFour", "qFour", text);
      } else {
        home();
      }
      closeNav();
    },
    displaykitchen() {
      kitchen();
    },
  },
};
</script>

<style>
@import "../public/assets/fontawesome-5/css/all.css";
body {
  font-family: "Lato", sans-serif;
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  margin: 0;
  background-color: white;
}

:focus {
  outline: none;
}

#home {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: 0.6s;
  height: 294px;
  margin: auto;
  overflow: hidden;

  width: 240px;
  /*  background-image: url("test.jpg");*/

  gap: 5px;
}
#home > p {
  margin-top: -10px;
}
#opKitchen {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 160px;
  margin-top: -10px;
  padding: 5px;
}
#footer {
  /* border: 1px solid yellow; */
}
#opKitchen .tablinks {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 4px 10px 4px;
  font-size: 11px;
  outline: 0;
  border: 1px solid rgb(54, 53, 53);
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 150px;
}
#opKitchen .tablinks:after {
  content: "";
  width: 100%;
  z-index: -1;
  position: absolute;
  height: 100%;
  top: 7px;
  left: 7px;
  transition: 0.2s;
}
#opKitchen .tablinks:hover::after {
  top: 0px;
  left: 0px;
}
#opKitchen .tablinks:focus::after {
  top: 0px;
  left: 0px;
}
#opKitchen .tablinks i {
  padding: 5px;
  margin: 0;
  color: white;
}
.qOne::after {
  background-color: #8ecae6;
}
.qTwo::after {
  background-color: #ff95bc;
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
  background-color: #ff95bc;
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
  transition: 0.3s;
  padding-top: 50px;
  text-align: center;
}

#clNav {
  color: red;
  transition: 0.3s;
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
  transition: all 0.3s;
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
  transition: 0.2s;
  font-size: 13px;
  margin: 0px;
}
.tab .tablinks:hover {
  background-color: #ddd;
}

.tab .active {
  background-color: #009b77;
}

.tab .tablinks:focus {
  background-color: #ddd;
}
.tabcontent {
  padding: 6px 12px;
  border-top: none;
  height: 230px;
  margin-top: -8px;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #ddd;
  border-radius: 5px;
  text-align: center;
  padding: 2px;
  font-size: 13px;
  margin-top: 10px;
}

.current-level {
  margin-left: 10px;
}

.score {
  margin-top: 10px;
  margin-left: 10%;
  font-size: 12px;
  text-align: center;
}

.hidden {
  display: none;
}

/* Hevitra taingina*/

#confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;
}

.confetti {
  position: absolute;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  transform: scale(0);
  animation-fill-mode: both;
  animation-timing-function: ease-out;
}
@keyframes confetti-fall {
  0% {
    transform: translateY(0) rotate(0deg) scale(1);
  }
  100% {
    transform: translateY(100vh) rotate(720deg) scale(0);
  }
}
</style>
