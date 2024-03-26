<template>
  <div class="quiz-box" v-if="currentQuestion">
    <p id="viewquestion" class="question">
      {{ currentQuestion.question }}
    </p>
    <ul class="choices">
      <div>
        <div v-for="(name, index) in currentQuestion.choices" :key="index" v-if="index % 2 === 0">
          <li :tabindex="index" class="listChoice" :class="{ selected: currentAnswer === true }"
            @click="setCurrentAnswer(name)">
            <img :src="'assets/PNG/' + name + '.png'" :alt="name" />
          </li>

          <li :tabindex="index + 1" class="listChoice" :class="{ selected: currentAnswer === false }"
            @click="setCurrentAnswer(currentQuestion.choices[index + 1])">
            <img :src="'assets/PNG/' +
    currentQuestion.choices[index + 1] +
    '.png'
    " :alt="currentQuestion.choices[index + 1]" />
          </li>
        </div>
      </div>
    </ul>

    <p class="score score_quiz">
      Isa: <span>{{ score }}</span>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      questionsTrueFalse: [
        {
          question: "Inona no anarana iantsoana an'ny Madagasikara ankehitriny?",
          choices: ["Earth", "Barrel", "Battery", "Bottle"],
          correctAnswer: "Bottle",
          someInformation: "Raha toa ka nosy maintso no anarany taloha, taty aoriana nefa de ravan'ny zanak'olombelona ny ala teto amintsika.",
        },
        {
          question: "Inona ny mahatonga ny tsirairay voakasika amin’ny fiovan’ny toetr’andro?",
          choices: ["Earth", "Forest", "Faucet", "Love"],
          correctAnswer: "Love",
          someInformation: "Samy tsisy afa-miala ny tsirairay ary samy tompon'andraikitra, manomboka @ kely izany.",
        },
        {
          question: "Inona ny tranga ratsy indrindra hita taratra eny amin’ny fiaharamonina vokarin’ny fanimbana ny ala?",
          choices: ["Earth", "Forest", "Faucet", "Love"],
          correctAnswer: "Love",
          someInformation: "Tsy isika olombelona ihany no voa, ny biby ihany koa dia voakasika, very trano fonenana.",
        },
      ],
      currentAnswer: null,
      currentImageIndex: 0,
      score: 0,
      shuffledQuestions: [],
    };
  },
  computed: {
    currentQuestion() {
      return this.shuffledQuestions[this.currentImageIndex];
    },

  },
  mounted() {
    this.startNewGame();
    document.addEventListener("keydown", (evt) => {
      this.handleKeydown(evt);
    });

  },
  methods: {
    handleKeydown(evt) {
      evt.stopPropagation();
      var activeTab = document.querySelector("#opNav");
      if (activeTab.classList.contains("qTwo")) {
        if (evt.key === "ArrowRight") {
          this.nav(1);
        } else if (evt.key === "ArrowLeft") {
          this.nav(-1);
        } else if (evt.key === "ArrowUp") {
          this.nav(-2);
        } else if (evt.key === "ArrowDown") {
          this.nav(2);
        } else if (evt.key === "Enter") {
          const focusedElement = document.activeElement;
          if (focusedElement.classList.contains("listChoice")) {
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
        alert("Marina !\n" +this.currentQuestion.someInformation);
      } else {
        alert("Diso !\n" +this.currentQuestion.someInformation);
      }
      this.moveToNextImage();
    },
    finalScore() {
      const finalScoreMessage = `nahavoavaly fanontaniana ${this.score
        } tamin'ireo fanontaniana ${this.questionsTrueFalse.length} ianao!`;
      alert(finalScoreMessage);
    },
    moveToNextImage() {
      this.currentAnswer = null;
      if (this.currentImageIndex < this.shuffledQuestions.length - 1) {
        this.currentImageIndex += 1;
      } else {
        this.currentImageIndex = 0;
        this.finalScore();
        this.score = 0;
        this.startNewGame();
      }
    },

    nav(move) {
      if (document.querySelector(".quizGame.one.activeQuiz")) {
        const currentIndexThree = document.activeElement.tabIndex;
        var nextThree = currentIndexThree + move;
        const itemsThree = document.querySelectorAll(".listChoice");
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
      this.shuffledQuestions = this.shuffleArray(this.questionsTrueFalse);
    },
  },
};
</script>
<style>
.choices li {
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.2) 15px 28px 25px -18px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  outline: none;
  padding: 0.3rem;
  transition: all 200ms ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  touch-action: manipulation;
  width: 60px;
  border: 0.5px solid rgba(128, 128, 128, 0.315);
  margin: 5px;
}

.choices li:focus {
  box-shadow: 2px 8px 4px -6px rgba(0, 0, 0, 0.3);
  transform: translate3d(2px, 2px, 0);
  transform: scale(1.2, 1.2);
}

.choices li:hover {
  box-shadow: 2px 8px 8px -5px rgba(0, 0, 0, 0.3);
  transform: translate3d(0, 2px, 0);
}

.choices li img {
  width: 100%;
}

.question {
  font-weight: bold;
  font-size: 12px;
}

.choices {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 130px;
}

.choices>div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
}

.score {
  margin-top: 10px;
  margin-left: 10%;
  font-size: 12px;
  text-align: center;
}
</style>
