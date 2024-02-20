<template>
  <div id="home">
    <p>Hello world</p>
    <div id="opKitchen">
      <p class="tablinks fanontaniana" tabindex="0">
        <i class="fas fa-question"></i><span>Fanontaniana</span>
      </p>
      <p class="tablinks fianarana" tabindex="1">
        <span>Mianatra</span><i class="fas fa-search"></i>
      </p>
      <p class="tablinks tsaraHoFantatra" tabindex="2">
        <i class="fas fa-globe"></i><span>Mahay</span>
      </p>
    </div>
    <div id="footer">Bonjour, c'est nous</div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      listTablinks: document.getElementsByClassName("tablinks"),
      openKitchen: document.getElementById("opKitchen"),
    };
  },

  mounted() {},
  methods: {},
};
</script>

<style scoped></style>
