<template>
  <div id="kitchen">
    <div id="mySidenav" class="sidenav">
      <span class="closebtn" id="clNav">&times;</span>
      <div class="tab">
        <p class="tablinks" tabindex="0">Home</p>
        <p class="tablinks" tabindex="1">Fanontaniana</p>
        <p class="tablinks" tabindex="2">Mianatra</p>
        <p class="tablinks" tabindex="3">Mahay</p>
      </div>
    </div>

    <div id="opNav" class="idk">
      <div class="three-Bar" id="bar">
        <div id="bloc1" class="blocx"></div>
        <div id="bloc2" class="blocx"></div>
        <div id="bloc3" class="blocx"></div>
      </div>
      <span></span>
    </div>
    <div id="Fanontaniana" class="tabcontent">
      <div class="quiz-box">
        <p class="question" id="viewquestion"></p>
        <ul class="choices"></ul>
        <p class="result"></p>
      </div>
      <div class="progress-bar">
        <span class="current-level">Fanontaniana</span>
      </div>

      <p class="score">Isa: <span>0</span></p>
    </div>

    <div id="Mianatra" class="tabcontent">
      <h3>Mianatra</h3>
      <button onclick="playSound()">Écouter le son</button>
      <button onclick="stopSound()">Arrêter le son</button>
      <!-- 
      <audio id="myAudio">
        <source
          src="Rudimental - These Days (feat. Jess Glynne, Macklemore & Dan Caplen) [Official Video] (192 kbps).mp3"
          type="audio/mpeg"
        />
        Tsy mazaka le phone
      </audio> -->
    </div>

    <div id="Mahay" class="tabcontent">
      <h3>Tokyo</h3>
      <p>Hoho</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Kitchen",
  data() {
    return {
      closeMenu: document.getElementById("clNav"),
      openMenu: document.getElementById("bar"),
    };
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped></style>
