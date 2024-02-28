<template>
  <div class="quiz-box">
    <p id="viewquestion" class="question">
      Hehehe hbcjervnrihbh hfrbvbruvb hgrfuhbrhfhur byfbur
    </p>
    <ul class="choices">
      <div>
        <li tabindex="0" class="listChoice">
          <img src="assets/PNG/Earth.png" alt="Earth" />
        </li>
        <li tabindex="1" class="listChoice">
          <img src="assets/PNG/Forest.png" alt="Forest" />
        </li>
      </div>
      <div>
        <li tabindex="2" class="listChoice">
          <img src="assets/PNG/Faucet.png" alt="Faucet" />
        </li>
        <li tabindex="3" class="listChoice">
          <img src="assets/PNG/Love.png" alt="Love" />
        </li>
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
          question: "Blablabla",
          choices: ["Earth", "Barrel", "Battery", "Bottle"],
          correctAnswer: "Bottle",
          someInformation: "Aza dakadaka tsony fa avereno ampiasaina",
        },
        {
          question: "Hehehe hbcjervnrihbh hfrbvbruvb hgrfuhbrhfhur byfbur",
          choices: ["Earth", "Forest", "Faucet", "Love"],
          correctAnswer: "Love",
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
      // console.log(evt.key);
      // var containerSlide = document.querySelector(".quiz-box");
      var activeTab = document.querySelector("#opNav");
      if (activeTab.classList.contains("qOne")) {
        if (evt.key === "ArrowRight") {
          this.nav(2);
        } else if (evt.key === "ArrowLeft") {
          this.nav(-2);
        } else if (evt.key === "ArrowUp") {
          this.nav(-1);
        } else if (evt.key === "ArrowDown") {
          this.nav(1);
        } else if (evt.key === "Enter") {
          const focusedElement = document.activeElement;
          if (focusedElement.classList.contains("truefalse")) {
            this.checkAnswer();
          }
        }
      }
    },
    setCurrentAnswer(answer) {
      this.currentAnswer = answer;
    },

    checkAnswer() {
      const correctAnswer =
        this.questionsTrueFalse[this.currentImageIndex].correctAnswer ===
        "true";
      if (this.currentAnswer === correctAnswer) {
        this.score += 1;
        this.updateScore();
        alert("Marina !");
      } else {
        alert("Diso !");
      }
      this.moveToNextImage();
    },
    finalScore() {
      const finalScoreMessage = `nahavoavaly fanontaniana ${
        this.score
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
      const currentIndexThree = document.activeElement.tabIndex;
      var nextThree = currentIndexThree + move;
      const itemsThree = document.querySelectorAll(".listChoice");
      //mety doly reo na le if na le mod na tsy asiana ara
      // if (nextThree >= 4) nextThree = 3;
      // if (nextThree < 0) nextThree = 0;
      // nextThree %= 4;
      const targetElementThree = itemsThree[nextThree];
      if (targetElementThree) {
        targetElementThree.focus();
      }
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
  margin-top: 10px;
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
  margin-top: -10px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 130px;
}
.choices > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 10px;
}
</style>
