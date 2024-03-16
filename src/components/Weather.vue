<template>
  <div class="card-game">
    <div class="title-question">{{ currentQuestion.weather }}</div>
    <div class="cards-container" id="cards-container">
      <div v-for="(card, i) in currentQuestion.choices" :key="i" :tabindex="i" class="cards"
        @click="setCurrentAnswer(card)">
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
      var bLetsynety = evt.target.childNodes[2];
      if (!bLetsynety.classList.contains("letsynety")) {
        bLetsynety.classList.add("letsynety")
      }
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
              "Arahabaina. Hitanao daholo ny valiny"
            );
            if (this.currentQuestionIndex === this.questions.length - 1) {
              alert("Vita ilay lalao.");
              //tokony misy zavatra atao resetgame
            } else {
              this.currentQuestionIndex++;
              this.renderCards();
            }
          }
        } else {
          cardElement.checked = false;
          if (bLetsynety.classList.contains("letsynety")) {
            bLetsynety.classList.remove("letsynety");
          }
        }
      }, 800);
    },
    renderCards() {

      var bAll = document.querySelectorAll(".cards b");
      var items = document.querySelectorAll(".cards input");
      for (var i = 0; i < items.length; i++) {
        items[i].checked = false;
        if (bAll[i].classList.contains("letsynety")) {
          bAll[i].classList.remove("letsynety");
        }

      }
      this.shuffle(this.currentQuestion.choices);
    },
  },
};
</script>

<style scoped>
.title-question {
  height: 50px;
  font-size: 15px;
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

.cards input,
.cards u,
.cards b {
  width: 60px;
  height: 60px;
  position: absolute;
}

.cards>input {
  opacity: 0;
}

.cards>u,
.cards>b {
  display: inline-block;
  text-align: center;
  border: 5px solid #f8fff9;
  box-sizing: border-box;
  border-radius: 8px;
  transition: all 0.3s;
}

.cards>u {
    background: #f8fff9;

  }

.cards>b {
  backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: linear-gradient(#009b77, #159174);
}

.cards img {
  width: 100%;
}

.cards:focus>b {
  box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.493);
}


  .cards>input:checked+u+b {
    z-index: 100;
  } 

  .cards>input:focus+u,
  .cards>input:focus+u+b {
    outline: 0;
  }

.cards>u {
  transform: translateX(160%) rotateY(-180deg);
  transform-origin: -30% center;
  box-shadow: 130px 30px 40px -20px rgba(0, 0, 0, 0);
}

.cards>input:checked+u {
  transform: translateX(0%) rotateY(0deg);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.cards>b {
  transform: translateX(0%) rotateY(0deg);
  transform-origin: 130% center;
}

.cards .letsynety{
  transform: translateX(-160%) rotateY(180deg);
}

.cards>u,
.cards>b {
  cursor: pointer;
}
</style>