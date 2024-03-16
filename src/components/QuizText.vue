<template>
  <div class="container_quizText">
    <p id="viewquestion" class="question">
      {{questionsTrueFalse[currentImageIndex].question}}
    </p>
    <ul class="choices_container">

      <div v-for="(name, index) in questionsTrueFalse[currentImageIndex].choices" :key="index">
        <li :tabindex="index" class="listChoiceText" @click="setCurrentAnswer(name)">
          {{ name }}
        </li>
      </div>

    </ul>
    <p class="score">
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
          question: "Blablabla",
          choices: ["Earth", "Barrel", "Battery", "Bottle"],
          correctAnswer: "Bottle",
          someInformation: "Aza dakadaka tsony fa avereno ampiasaina",
        },
        {
          question: "Hehehe hbcjervnrihbh hfrbvbruvb hgrfuhbrhfhur byfbur",
          choices: ["Earth", "Forest", "Faucet", "Love"],
          correctAnswer: "Forest",
          someInformation: "Tiako be",
        },
      ],
      currentAnswer: null,
      currentImageIndex: 0,
      score: 0,
    };
  },
  mounted() {
    document.addEventListener("keydown", (evt) => {
      this.handleKeydown(evt);
    });
  },
  methods: {
    handleKeydown(evt) {
      evt.stopPropagation();
      var activeTab = document.querySelector("#opNav");
      if (activeTab.classList.contains("qOne")) {
        if (evt.key === "ArrowUp") {
          this.nav(-1);
        } else if (evt.key === "ArrowDown") {
          this.nav(1);
        } else if (evt.key === "Enter") {
          const focusedElement = document.activeElement;
          if (focusedElement.classList.contains("listChoiceText")) {

            this.checkAnswer();
          }
        }
      }
    },
    setCurrentAnswer(answer) {
      this.currentAnswer = answer;
    },

    checkAnswer() {
      const correctAnswer =this.questionsTrueFalse[this.currentImageIndex].correctAnswer;
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
        } tamin'ireo fanontaniana ${this.questionsTrueFalse.length} ianao!`;
      alert(finalScoreMessage);
    },
    moveToNextImage() {
      this.currentAnswer = null;
      if (this.currentImageIndex < this.questionsTrueFalse.length - 1) {
        this.currentImageIndex += 1;
      } else {
        this.currentImageIndex = 0;
        this.finalScore();
        this.score = 0;
      }
    },
    updateScore() {
      document.querySelector(".score_quiz span").innerHTML = this.score;
    },
    nav(move) {
      if (document.querySelector(".quizGame.two.activeQuiz")) {
        const currentIndexThree = document.activeElement.tabIndex;
        var nextThree = currentIndexThree + move;
        nextThree%=4;
        const itemsThree = document.querySelectorAll(".listChoiceText");
        const targetElementThree = itemsThree[nextThree];
        if (targetElementThree) {
          targetElementThree.focus();
        }
      }
    },
  },
};
</script>
<style scoped>
.container_quizText {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.choices_container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  list-style: none;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin: auto;
  text-align: center;
  margin-left: -20px;

}

.choices_container li {

  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.2) 15px 28px 25px -18px;
  box-sizing: border-box;
  cursor: pointer;
  outline: none;
  padding: 0.3rem;
  transition: all 0.2 ease-in-out;
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  touch-action: manipulation;
  width: 180px;
  border: 0.5px solid rgba(128, 128, 128, 0.315);

}

.choices_container li:focus {
  box-shadow: 2px 8px 4px -6px rgba(0, 0, 0, 0.3);
  transform: translate3d(2px, 2px, 0);
  transform: scale(1.2, 1.2);
}
</style>
