
<template>
    <div class="container">
    <img :src="currentImageSrc" alt="Game Image" />
    <div class="buttons">
      <button :class="{ selected: currentAnswer === true }" @click="setCurrentAnswer(true)">
        <img src='assets/gif/true.gif'>
      </button>
      <button :class="{ selected: currentAnswer === false }" @click="setCurrentAnswer(false)">
        <img src='assets/gif/false.gif'>
      </button>
    </div>
    <p class="score_true_false">Isa: <span>{{ score }}</span></p>
    <div class="popup" style="display: none;">
      <p class="popup__text"></p>
    </div>
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
          choices: ["true", "false"],
          correctAnswer: "false",
          someInformation: "Aza dakadaka tsony fa avereno ampiasaina",
        },
        {
          question: "Hehehe hbcjervnrihbh hfrbvbruvb hgrfuhbrhfhur byfbur",
          image: "reboisement.jpg",
          choices: ["true", "false"],
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
      return `/assets/requestImg/${this.questionsTrueFalse[this.currentImageIndex].image}`;
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
      var containerSlide = document.querySelector(".container");
      if (containerSlide) {
        if (evt.key === "ArrowRight") {
          this.currentAnswer = false;
        } else if (evt.key === "ArrowLeft") {
          this.currentAnswer = true;
        }
      } else if(evt.key === 'Enter') {
        this.checkAnswer();
      }
    },
    setCurrentAnswer(answer) {
      this.currentAnswer = answer;
    },

    checkAnswer() {
      const correctAnswer = this.questionsTrueFalse[this.currentImageIndex].correctAnswer === "true";
      if (this.currentAnswer === correctAnswer) {
        this.score += 1;
        this.updateScore();
        alert("Vrai !");
      } else {
        alert("Faux !");
      }
      this.moveToNextImage();
    },
    finalScore() {
      const finalScoreMessage = `nahavoavaly fanontaniana ${this.score} tamin'ireo fanontaniana ${
        this.questionsTrueFalse.length
      } ianao!`;
      setTimeout(() => {
        document.querySelector(".popup").style.display = "block";
        document.body.classList.add("blur-background");
        document.querySelector(".popup__text").innerHTML = finalScoreMessage;
      }, 200);

      setTimeout(() => {
        document.body.classList.remove("blur-background");
        document.querySelector(".popup").style.display = "none";
      }, 5000);
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
  padding: 10px 20px;
  margin: 20%;
  /* font-size: 16px; */
  cursor: pointer;
}

img {
  width: 100%;
  margin-top: 30%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font: inherit;
}

body {
  color: #00031E;
  font-family: Inter, sans-serif;
  font-size: 12px;
}

.popup {
  width: 12%;
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
  background: #FFF;
  text-align: center;
  font-size: 4%;
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
  color: #FFF;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background: #027FFF;
  cursor: pointer;
}

.btn:focus {
  outline: 2px dashed #027FFF;
  outline-offset: 5px;
}

</style>
