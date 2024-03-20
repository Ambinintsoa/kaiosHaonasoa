<template>
  <div id="home">
    <!-- <p>Hello world</p> -->
    <div id="opKitchen" @click="openkitchen">
      <p class="tablinks qOne" tabindex="0" @click="selectMenu">
        <i class="fas fa-question"></i><span>Toetr'andro</span>
      </p>
      <p class="tablinks qTwo" tabindex="1" @click="selectMenu">
        <span>Fiovan'ny toetr'andro</span><i class="fas fa-search"></i>
      </p>
      <p class="tablinks qThree" tabindex="2" @click="selectMenu">
        <i class="fas fa-globe"></i><span>Anton'ny fiovan'ny toetr'andro</span>
      </p>
      <p class="tablinks qFour" tabindex="3" @click="selectMenu">
        <span>Vahaolana</span><i class="fas fa-globe"></i>
      </p>
    </div>
    <!-- <div id="footer">Bonjour, c'est nous</div> -->
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      notShowHome: () => {},
    };
  },

  mounted() {},
  methods: {
    selectMenu(evt) {
      this.$emit("selectMenu", [evt, evt.currentTarget.innerText]);
    },
    openkitchen() {
      this.$emit("openkitchen");
    },
  },
};
</script>

<style scoped>
#home {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  opacity: 1;
  transition: 0.2s;
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

#opKitchen .tablinks {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 4px 10px 4px;
  font-size: 12px;
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
  transition: 0.1s;
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
</style>
