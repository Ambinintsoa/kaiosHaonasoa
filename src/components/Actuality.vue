<template>
  <div class="slider-container">
    <div class="nav">
      <span class="tablink active">Vaovao</span>
      <span class="tablink">Nahoana?</span>
      <span class="tablink">Ny atao</span>
      <div class="tabbar"></div>
    </div>

    <div class="slider">
      <div class="slide">
        <div class="content ">
          <p>Akory</p>
        </div>
      </div>
      <div class="slide">
        <div class="content">
          <p>Salama va?</p>
        </div>
      </div>
      <div class="slide">
        <div class="content">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Praesentium non accusantium dicta excepturi tempore, cumque eos
            delectus aut, saepe quaerat sunt amet velit eum fuga maiores quas!
            Repellat, eum esse? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Dolorem id vitae reprehenderit mollitia
            repellendus optio quidem obcaecati! Itaque odit aliquid harum
            placeat illo, ab laudantium neque, molestiae deserunt vero mollitia?
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid sed
            eaque officiis nisi, perferendis quasi odit? Explicabo quod nesciunt
            vel itaque, ab aliquam nihil minima ullam hic quibusdam quia? Totam?
            Ceci est le contenu de l'onglet 3. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Mollitia dolorem veritatis similique
            illo ipsa praesentium, nulla ratione suscipit aperiam est. Suscipit
            dolore quae, sapiente unde saepe deleniti obcaecati harum voluptas.
          </p>
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
      var containerSlide = document.querySelector(".slider-container");
      if (containerSlide) {
        if (evt.key === "ArrowRight") {
          this.moveSlide(1);
        } else if (evt.key === "ArrowLeft") {
          this.moveSlide(-1);
        } else if (evt.key === "ArrowUp") {
          containerSlide.scrollTop -= 20;
        } else if (evt.key === "ArrowDown") {
          containerSlide.scrollTop += 20;
        }
      }
    },
    moveSlide(n) {
      this.slideIndex += n;
      this.showSlides();
      document.querySelector(".slider-container").scrollTop = 0;
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
  overflow: auto;
  height: 260px;
  scrollbar-color: #009b7707 rgba(128, 128, 128, 0);
  scrollbar-width: 5px;
}

.slider {
  display: flex;
  transition: 0.2s;
}

.tabbar {
  position: absolute;
  height: 2px;
  background-color: #009b77;
  transition: 0.2s;
}

.slide {
  flex: 0 0 100%;
  width: 100%;
}

.nav {
  overflow-x: scroll;
}

.slider-container {
  position: relative;
  overflow-x: hidden;
}

.tablink {
  font-size: 15px;
  cursor: pointer;
  transition: color 0.2;
  padding: 2px;
}

.tablink.active {
  color: #009b77;
}
</style>
