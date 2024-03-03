<template>
  <div class="container">
    <img :src="currentImageSrc" alt="Game Image" />
    <div class="buttons">



      <button
      v-for="(name, index) in questionsTrueFalse[currentImageIndex].choices" :key="name"
        class="truefalse"
        :class="{ selected: currentAnswer === name }"
        @click="setCurrentAnswer(name)"
       :tabindex="index"
      >
        <img :src="'assets/gif/'+name+'.gif'" />
      </button>
    </div>
    <p class="score score_true_false">
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
          question: "Doro tanety",
          image: "doro_tanety.jpg",
          choices: [true,false],
          correctAnswer: "false",
          someInformation: "Aza dakadaka tsony fa avereno ampiasaina",
        },
        {
          question: "Hehehe hbcjervnrihbh hfrbvbruvb hgrfuhbrhfhur byfbur",
          image: "reboisement.jpg",
          choices: [true,false],
          correctAnswer: "true",
          someInformation: "Aza dakadaka tsony fa avereno ampiasaina",
        },
      ],
      currentAnswer: null,
      currentImageIndex: 0,
      score: 0,
    };
  },
  computed: {
    currentImageSrc() {
      return `/assets/requestImg/${
        this.questionsTrueFalse[this.currentImageIndex].image
      }`;
    },
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
      // var containerSlide = document.querySelector(".container");
      var activeTab = document.querySelector("#opNav");

      if (activeTab.classList.contains("qThree")) {
        if (evt.key === "ArrowRight") {
          this.currentAnswer = false;
          this.nav(1);
        } else if (evt.key === "ArrowLeft") {
          this.currentAnswer = true;
          this.nav(-1);
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
      document.querySelector(".score_true_false span").innerHTML = this.score;
    },
    nav(move) {
      const currentIndex = document.activeElement.tabIndex;

      var nextF = currentIndex + move;
      if (nextF >= 2) nextF = 1;
      if (nextF === -1) nextF = 0;
      const items = document.querySelectorAll(".buttons button");
      const targetElement = items[nextF];
      if (targetElement) {
        targetElement.focus();
      }
    },
  },
};
</script>
<style scoped>
.buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

button {
  padding: 5px 10px;
  margin: 20%;
  /* font-size: 16px; */
  cursor: pointer;
}

img {
  width: 80%;
  margin-left: 10%;
  margin-top: 10%;
}
button img {
  width: 20px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font: inherit;
}

body {
  color: #00031e;
  font-family: Inter, sans-serif;
  font-size: 12px;
}

.popup {
  width: 50%;
  padding: 2%;
  margin: 1.2%;
  position: absolute;
  display: none;
  top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2%;
  border-radius: 20px;
  background: #fff;
  text-align: center;
}

.popup__text {
  max-width: 100%;
  padding-top: 16px;
  padding-bottom: 5%;
  color: #777;
  font-weight: 400;
  line-height: 150%; /* 24px */
}

.popup__action {
  display: flex;
  gap: 16px;
  align-items: center;
}

.btn {
  padding: 10px 30px;
  color: #fff;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background: #027fff;
  cursor: pointer;
}

.btn:focus {
  outline: 2px dashed #027fff;
  outline-offset: 10px;
}
.truefalse:focus {
  outline: 1px solid #6f6f6f;
  outline-offset: 5px;
}
</style>
