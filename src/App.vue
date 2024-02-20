<template>
  <div id="app">
    <!-- <Softkey :softkeys.sync="softkeys" /> -->
    <Home />
    <kitchen />
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
export default {
  name: "app",
  components: {
    Home,
    Kitchen,
  },
  data: () => ({}),
  mounted() {
    var softkeyCallback;
    window.addEventListener("load", function() {
      document.activeElement.addEventListener("keydown", handleKeydown);
      Kitchen.data().openMenu.addEventListener("click", function() {
        openNav();
      });
      Kitchen.data().closeMenu.addEventListener("click", function() {
        closeNav();
      });
      var tabcontent = Home.data().listTablinks;
      for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].addEventListener("click", function(event) {
          let text = event.currentTarget.innerText;
          if (text === "Fanontaniana") {
            // startStat();
            // displayQuestion();
            openSelection(event, "Fanontaniana", "fanontaniana");
          } else if (text === "Mianatra") {
            openSelection(event, "Mianatra", "fianarana");
          } else if (text === "Mahay") {
            openSelection(event, "Mahay", "tsaraHoFantatra");
          } else {
            home();
          }
          closeNav();
        });
      }
      Home.data().openKitchen.addEventListener("click", function() {
        kitchen();
      });
    });
    softkeyCallback = {
      left: function() {
        openNav();
      },
      center: function() {
        const focusedElement = document.activeElement;
        if (focusedElement.classList.contains("listChoice")) {
          handleAnswerClick(focusedElement.firstChild);
        }
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
        case "ArrowRight":
          nav(2);
          break;
        case "ArrowLeft":
          nav(-2);
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
  methods: {},
};
</script>

<style>
body {
  font-family: "Lato", sans-serif;
  padding: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
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
  font-size: 13px;
  font-weight: 200;
  letter-spacing: 1px;
  outline: 0;
  border: 1px solid black;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 120px;
  font-weight: 200;
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
.fanontaniana::after {
  background-color: #8ecae6;
}
.fianarana::after {
  background-color: #ffafcc;
}
.tsaraHoFantatra::after {
  background-color: #3ab795;
}
.fanontaniana {
  background-color: #8ecae6;
}
.fianarana {
  background-color: #ffafcc;
}
.tsaraHoFantatra {
  background-color: #3ab795;
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
  color: #818181;
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
  padding: 6px;
  cursor: pointer;
  margin-top: -8px;
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
  display: none;
  padding: 6px 12px;
  border-top: none;
  height: 230px;
  margin-top: -8px;
}
/*
  Fanontaniana
*/
.question {
  font-weight: bold;
  font-size: 12px;
}

.choices {
  list-style: none;
  padding: 0;
  margin-top: -10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 130px;
}
.choices > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
}
.choices li {
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.2) 15px 28px 25px -18px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  outline: none;
  padding: 0.3rem;
  transition: all 200ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  touch-action: manipulation;
  width: 60px;
  border: 0.5px solid rgba(128, 128, 128, 0.315);
  margin-top: 10px;
}

.choices li:focus {
  box-shadow: 2px 8px 4px -6px rgba(0, 0, 0, 0.3);
  transform: translate3d(2px, 2px, 0);
  transform: scale(1.5, 1.5);
}
.choices li:hover {
  box-shadow: 2px 8px 8px -5px rgba(0, 0, 0, 0.3);
  transform: translate3d(0, 2px, 0);
}
.choices li img {
  width: 100%;
}
.result {
  font-weight: bold;
  font-size: 10px;
  color: rebeccapurple;
}

.progress-bar {
  width: 100%;
  height: 20px;
  background-color: #ddd;
  border-radius: 5px;
  text-align: center;
  padding: 2px;
  font-size: 13px;
}

.current-level {
  margin-left: 10px;
}

.score {
  margin-top: 10px;
  font-size: 12px;
  text-align: center;
}

.hidden {
  display: none;
}
</style>
