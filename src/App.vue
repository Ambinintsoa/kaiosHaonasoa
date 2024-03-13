<template>
  <div id="app">
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



/* 
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
 */


.hidden {
  display: none;
}
</style>
