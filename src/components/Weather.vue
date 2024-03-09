<template>
  <div class="card-game">
    <div class="cards-container" id="cards-container">
      <div v-for="(card, i) in cards" class="cards" :key="card" :tabindex="i">
        <input type="checkbox" /><u>{{ card }}</u
        ><b></b>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      cardsToFind: ["1", "2", "3"],
      cards: [],
      cardsContainer: document.getElementById("card"),
    };
  },
  computed: {},
  mounted() {
    document.addEventListener("keydown", (evt) => {
      this.handleKeydown(evt);
    });
    this.initializeCards();
    //le render ty ngamba hoe inna ny climat zao
    this.renderCards();
  },
  methods: {
    handleKeydown(evt) {
      var activeTab = document.querySelector("#opNav");
      if (activeTab.classList.contains("qTwo")) {
        if (evt.key === "ArrowLeft") {
          this.nav(-1);
        } else if (evt.key === "ArrowRight") {
          this.nav(1);
        } else if (evt.key === "Enter") {
          const focusedElement = document.activeElement;
          if (focusedElement.classList.contains("cards")) {
            this.clickOnCard(evt);
          }
        }
      }
    },
    nav(move) {
      //   if (document.querySelector(".selectorMenuAntony.activeAntony")) {
      const currentIndex = document.activeElement.tabIndex;
      var next = currentIndex + move;
      next %= 9;
      const items = document.querySelectorAll(".cards");
      const targetElement = items[next];
      if (targetElement) {
        targetElement.focus();
      }
      //   }
    },
    initializeCards() {
      this.cards = [];
      for (let i = 0; i < 9; i++) {
        this.cards.push(i + 1);
      }
      this.shuffle(this.cards);
    },
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
    clickOnCard(evt) {
      var cardValue = evt.target.childNodes[1].textContent;
      var cardElement = evt.target.childNodes[0];
      cardElement.checked = true;
      setTimeout(() => {
        if (this.cardsToFind.includes(cardValue)) {
          cardElement.classList.add("found");
          this.cardsToFind.splice(this.cardsToFind.indexOf(cardValue), 1);
          if (this.cardsToFind.length === 0) {
            alert(
              "Félicitations ! Vous avez trouvé toutes les cartes à chercher."
            );
            this.initializeCards();
            this.renderCards();
          }
        } else {
          cardElement.checked = false;
        }
      }, 800);
    },
    renderCards() {
      var items = document.querySelectorAll(".cards input");
      items.forEach((item) => {
        item.checked = false;
      });
    },
  },
};
</script>
<style scoped>
/* Conteneur de la table */
#cards-container {
  display: flex;
  height: 260px;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}
.cards {
  margin: auto;
  width: 60px;
  height: 60px;
}
.cards:focus > b {
  box-shadow: 1px 1px 10px 1px black;
}
/* Styles pour le contenu de la carte */
.cards > input,
.cards > u,
.cards > b {
  width: auto;
  width: 60px;
  height: 60px;
  position: absolute;
}

.cards > input {
  z-index: 999;
  cursor: pointer;
  opacity: 0;
}

.cards > u,
.cards > b {
  display: inline-block;
  text-align: center;
  vertical-align: top;
  border: 5px solid #f8fff9;
  box-sizing: border-box;
  border-radius: 8px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Face avant */
.cards > u {
  background: #f8fff9;
  text-decoration: none;
  font: italic 12px Arial, Helvetica, sans-serif;
}

.cards > u > b {
  font: bold 14px "Comic Sans MS", cursive, sans-serif;
  color: teal;
  display: block;
}

/* Face arrière */
.cards > b {
  background: linear-gradient(#fede1e, #dabb1e);
  border: 5px solid #f8fff9;
  box-sizing: border-box;
}

/* Animation et effets 3D */
.cards {
  perspective: 1450px;
}

.cards > u,
.cards > b {
  transition: all 0.8s;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  z-index: 0;
}

.cards > input:checked + u,
.cards > input:checked + u + b {
  z-index: 100;
}

.cards > input:focus + u,
.cards > input:focus + u + b {
  transition-property: transform, filter, box-shadow;
  outline: 0;
  z-index: 900;
}

/* Animation de la face avant */
.cards > u {
  transform: translateX(160%) rotateY(-180deg);
  transform-origin: -30% center;
  box-shadow: 130px 30px 40px -20px rgba(0, 0, 0, 0);
}

.cards > input:checked + u {
  transform: translateX(0%) rotateY(0deg);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
}

/* Animation de la face arrière */
.cards > b {
  transform: translateX(0%) rotateY(0deg);
  transform-origin: 130% center;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
}

.cards > input:checked + u + b {
  transform: translateX(-160%) rotateY(180deg);
}

.cards > u,
.cards > b {
  cursor: pointer;
}
</style>
