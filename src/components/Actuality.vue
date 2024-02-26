<template>
  <div class="slider-container">
    <div class="nav">
      <button class="tablink active">1</button>
      <button class="tablink">2</button>
      <button class="tablink">3</button>
      <div class="tabbar"></div>
    </div>

    <div class="slider">
      <div class="slide">
        <div class="content ">
          <h3>Contenu de l'onglet 1</h3>
          <p>Ceci est le contenu de l'onglet 1.</p>
        </div>
      </div>
      <div class="slide">
        <div class="content">
          <h3>Contenu de l'onglet 2</h3>
          <p>Ceci est le contenu de l'onglet 2.</p>
        </div>
      </div>
      <div class="slide">
        <div class="content">
          <h3>Contenu de l'onglet 3</h3>
          <p>Ceci est le contenu de l'onglet 3.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Actuality",
  data() {
    return {
      slideIndex: 0,
    };
  },

  mounted() {
    document.addEventListener("keydown", (evt) => {
      this.handleKeydown(evt);
    });
  },
  methods: {
    handleKeydown(evt) {
      if (evt.key === "ArrowRight") {
        this.moveSlide(1);
      } else if (evt.key === "ArrowLeft") {
        this.moveSlide(-1);
      }
    },
    moveSlide(n) {
      this.slideIndex += n;
      this.showSlides();
    },

    currentSlide(n) {
      this.slideIndex = n - 1;
      this.showSlides();
    },

    showSlides() {
      var slides = document.getElementsByClassName("slide");
      var slider = document.querySelector(".slider");
      var navButtons = document.querySelectorAll(".tablink");
      var tabbar = document.querySelector(".tabbar");

      if (this.slideIndex >= slides.length) {
        this.slideIndex = 0;
      }
      if (this.slideIndex < 0) {
        this.slideIndex = slides.length - 1;
      }

      var slideWidth = slides[0].offsetWidth;
      var offset = -slideWidth * this.slideIndex;
      slider.style.transform = "translateX(" + offset + "px)";

      for (var i = 0; i < navButtons.length; i++) {
        navButtons[i].classList.remove("active");
      }
      navButtons[this.slideIndex].classList.add("active");

      var activeTab = navButtons[this.slideIndex].getBoundingClientRect();
      tabbar.style.width = activeTab.width - 23 + "px";
      tabbar.style.transform = "translateX(" + activeTab.left + "px)";
    },
  },
};
</script>

<style scoped>
.slider-container {
  position: relative;
  overflow: hidden;
  border: 1px solid red;
  height: 260px;
  width: 240px;
}

.slider {
  display: flex;
  transition: transform 0.5s ease;
}
.tabbar {
  position: absolute;
  height: 2px;
  background-color: blue;
  transition: transform 0.3s ease;
}

.slide {
  flex: 0 0 100%;
  width: 100%;
}

.content {
  padding: 20px;
}

.content h3 {
  margin-top: 0;
}

.nav {
  text-align: center;
}

.tablink.active {
  color: blue;
}
.slider-container {
  position: relative;
  overflow: hidden;
}

.tablink {
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px 20px;
  transition: color 0.3s ease;
}

.tablink.active {
  color: blue;
}
</style>
