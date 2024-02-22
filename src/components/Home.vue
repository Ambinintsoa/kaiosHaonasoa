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
      <p class="tablinks qFour" tabindex="2" @click="selectMenu">
        <i class="fas fa-globe"></i><span>Vahaolana</span>
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

<style scoped></style>
