<template>
  <div class="card-game">
    <div class="title-question">{{ currentQuestion.weather }}</div>
    <div class="cards-container" id="cards-container">
      <div v-for="(card, i) in currentQuestion.choices" :key="i" :tabindex="i" class="cards" @click="setCurrentAnswer(card)">
        <input type="checkbox" /><u><img :src="'assets/PNG/' + card" :alt="card" /></u><b></b>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          weather: "Inona no mamaritra ny fahavaratra?",
          choices: [
            "Ocean.png",
            "Forest.png",
            "Product.png",
            "Waste.png",
            "Waste.png",
            "Waste.png",
            "Waste.png",
            "Waste.png",
            "Waste.png",
          ],
          responses: ["Product.png", "Ocean.png", "Forest.png"],
        },
        {
          weather: "Inona no mamaritra ny lohataona?",
          choices: [
            "Ocean.png",
            "Product.png",
            "Forest.png",
            "Waste.png",
            "Waste.png",
            "Waste.png",
            "Waste.png",
            "Waste.png",
            "Waste.png",
          ],
          responses: ["Ocean.png", "Product.png", "Forest.png"],
        },
        {
          weather: "Inona no mamaritra ny ririnina?",
          choices: [
            "Ocean.png",
            "Product.png",
            "Forest.png",
            "Waste.png",
            "Waste.png",
            "Waste.png",
            "Waste.png",
            "Waste.png",
            "Waste.png",
          ],
          responses: ["Ocean.png", "Product.png", "Forest.png"],
        },
      ],
      currentQuestionIndex: 0,
      currentAnswer: null,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
  },
  mounted() {
    this.initializeCards();
    this.renderCards();
    document.addEventListener("keydown", this.handleKeydown);
  },
  methods: {
    handleKeydown(evt) {
      var activeTab = document.querySelector("#opNav");
      if (activeTab.classList.contains("qTwo")) {
        switch (evt.key) {
          case "ArrowLeft":
          case "ArrowRight":
          case "ArrowUp":
          case "ArrowDown":
            this.nav(evt.key === "ArrowLeft" || evt.key === "ArrowUp" ? -1 : 1);
            break;
          case "Enter":
            var focusedElement = document.activeElement;
            if (focusedElement.classList.contains("cards")) {
              this.clickOnCard(evt);
            }
            break;
          default:
            break;
        }
      }
    },
    setCurrentAnswer(answer) {
      this.currentAnswer = answer;
    },
    nav(move) {
      const currentIndex = document.activeElement.tabIndex;
      var next = currentIndex + move;
      next %= 9;
      const items = document.querySelectorAll(".cards");
      const targetElement = items[next];
      if (targetElement) {
        targetElement.focus();
      }
    },
    initializeCards() {
      this.questions.sort(() => Math.random() - 0.5);
      this.shuffle(this.currentQuestion.choices);
    },
    shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    },
    clickOnCard(evt) {
      var cardElement = evt.target.childNodes[0];
      cardElement.checked = true;
      setTimeout(() => {
        if (this.currentQuestion.responses.includes(this.currentAnswer)) {
          cardElement.classList.add("found");
          const remainingResponses = this.currentQuestion.responses.filter(
            (response) => response !== this.currentAnswer
          );
          this.questions[
            this.currentQuestionIndex
          ].responses = remainingResponses;
          if (this.currentQuestion.responses.length === 0) {
            alert(
              "Félicitations ! Vous avez trouvé toutes les réponses pour cette question."
            );
            if (this.currentQuestionIndex === this.questions.length - 1) {
              alert("Bravo ! Vous avez terminé le jeu.");
              //tokony misy zavatra atao resetgame
            } else {
              this.currentQuestionIndex++;
              this.renderCards();
            }
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
      this.shuffle(this.currentQuestion.choices);
    },
  },
};
</script>

<style scoped>
.title-question {
  height: 50px;
  font-size: 12px;
}

#cards-container {
  display: flex;
  height: 200px;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
}

.cards {
  margin: auto;
  width: 60px;
  height: 60px;
}

.cards:focus>b {
  box-shadow: 1px 1px 10px 1px black;
}

.cards>input,
.cards>u,
.cards>b {
  width: auto;
  width: 60px;
  height: 60px;
  position: absolute;
}

.cards>input {
  z-index: 999;
  cursor: pointer;
  opacity: 0;
}

.cards>u,
.cards>b {
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

.cards>u {
  background: #f8fff9;
  text-decoration: none;
  font: italic 12px Arial, Helvetica, sans-serif;
}

.cards>u>b {
  font: bold 14px "Comic Sans MS", cursive, sans-serif;
  color: teal;
  display: block;
}

.cards>b {
  background: linear-gradient(#fede1e, #dabb1e);
  border: 5px solid #f8fff9;
  box-sizing: border-box;
}

.cards {
  perspective: 1450px;
}

.cards>u,
.cards>b {
  transition: all 0.8s;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  z-index: 0;
}

.cards>input:checked+u,
.cards>input:checked+u+b {
  z-index: 100;
}

.cards>input:focus+u,
.cards>input:focus+u+b {
  transition-property: transform, filter, box-shadow;
  outline: 0;
  z-index: 900;
}

.cards>u {
  transform: translateX(160%) rotateY(-180deg);
  transform-origin: -30% center;
  box-shadow: 130px 30px 40px -20px rgba(0, 0, 0, 0);
}

.cards img {
  width: 100%;
}

.cards>input:checked+u {
  transform: translateX(0%) rotateY(0deg);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
}

.cards>b {
  transform: translateX(0%) rotateY(0deg);
  transform-origin: 130% center;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
}

.cards>input:checked+u+b {
  transform: translateX(-160%) rotateY(180deg);
}

.cards>u,
.cards>b {
  cursor: pointer;
}
</style>
