<template>
  <div id="container_antonyMachin" v-if="currentQuestion">
    <p>{{ currentQuestion.question }}</p>
    <div class="container_img">
      <div v-for="(question, index) in currentQuestion.choices" :key="index">
        <div class="list_img" :tabindex="index" @click="setCurrentAnswer(question)" ref="firstElement">
          <img class="lst_response" :src="'assets/PNG/' + question + '.png'" :alt="question" />
        </div>
        <span>{{ currentDescipt }}</span>
      </div>
    </div>
    <button class="btn_ok">OK</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      questionsAntonyMachin: [
        {
          question: "Blablabla",
          choices: ["Earth", "Barrel"],
          correctAnswer: "Earth",
          someInformation: "Aza dakadaka tsony fa avereno ampiasaina",
        },
        {
          question: "Hehehe hbcjervnrihbh hfrbvbruvb hgrfuhbrhfhur byfbur",
          choices: ["Faucet", "Love"],
          correctAnswer: "Love",
          someInformation: "Tiako be",
        },
      ],
      currentAnswer: null,
      currentIndex: 0,
      score: 0,
      shuffledQuestions: [],
    };
  },
  computed: {
    currentQuestion() {
      return this.shuffledQuestions[this.currentIndex];
    },
    currentDescipt() {
      return this.questionsAntonyMachin[this.currentIndex].someInformation;
    },
  },
  mounted() {
    document.addEventListener("keydown", (evt) => {
      this.handleKeydown(evt);
    });
    this.startNewGame();
    this.$nextTick(() => {
      if (this.$refs.firstElement) {
        this.$refs.firstElement[0].focus();
      }
    });
  },
  methods: {
    handleKeydown(evt) {
      evt.stopPropagation();
      var activeTab = document.querySelector("#opNav");
      if (activeTab.classList.contains("qThree")) {
        if (evt.key === "ArrowRight") {
          this.nav(1);
        } else if (evt.key === "ArrowLeft") {
          this.nav(-1);
        } else if (evt.key === "Enter") {
          const focusedElement = document.activeElement;
          if (focusedElement.classList.contains("list_img")) {
            this.checkAnswer();
          }
        }
      }
    },
    setCurrentAnswer(answer) {
      this.currentAnswer = answer;
    },

    checkAnswer() {
      const correctAnswer = this.currentQuestion.correctAnswer;
      if (this.currentAnswer === correctAnswer) {
        this.score += 1;
        alert("Marina !");
      } else {
        alert("Diso !");
      }
      this.moveToNextImage();
    },
    finalScore() {
      const finalScoreMessage = `nahavoavaly fanontaniana ${this.score
        } tamin'ireo fanontaniana ${this.questionsAntonyMachin.length} ianao!`;
      alert(finalScoreMessage);
    },
    moveToNextImage() {
      this.currentAnswer = null;
      if (this.currentIndex < this.questionsAntonyMachin.length - 1) {
        this.currentIndex += 1;
      } else {
        this.currentIndex = 0;
        this.finalScore();
        this.score = 0;
        this.startNewGame();
      }
    },
    nav(move) {
      if (document.querySelector(".antonyGame.two.activeAntony")) {
        const currentIndexThree = document.activeElement.tabIndex;
        var nextThree = currentIndexThree + move;
        nextThree %= 2;
        const itemsThree = document.querySelectorAll(".list_img");
        const targetElementThree = itemsThree[nextThree];
        if (targetElementThree) {
          targetElementThree.focus();
        }
      }
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    startNewGame() {
      this.shuffledQuestions = this.shuffleArray(this.questionsAntonyMachin);

    },
  },
};
</script>
<style>
#container_antonyMachin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container_img {
  display: flex;
  gap: 2px;
  width: 240px;
  justify-content: space-around;
}

.container_img>div {
  width: 120px;
  font-size: 12px;
  text-align: center;
  border: 1px solid #ffe4fd;
  padding: 5px;
}

.list_img {
  width: 93px;
  border-radius: 5px;
  border: 1px solid rgb(197, 197, 197);
  margin: auto;
}

.list_img:focus {
  box-shadow: 1px 1px 1px #009b77;
}

.lst_response {
  width: 100%;
}

.btn_ok {
  border: 0px solid black;
  padding: 5px;
  font-size: 14px;
  cursor: pointer;
  bottom: 0;
  left: 0;
  position: absolute;
  width: 100%;
}
</style>
