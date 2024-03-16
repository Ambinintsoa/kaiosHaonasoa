<template>
  <div class="container">
    <span>{{ questionsTrueFalse[currentImageIndex].question }}</span>
    <div id="cont-img">
      <img :src="currentImageSrc" alt="Game Image" />
    </div>
    <div class="buttons">
      <button v-for="(name, index) in questionsTrueFalse[currentImageIndex].choices" :key="name" class="truefalse"
        :class="{ selected: currentAnswer === name }" @click="setCurrentAnswer(name)" :tabindex="index">
        <img :src="'assets/gif/' + name + '.gif'" />
      </button>
    </div>
    <!-- <p class="score score_true_false">
      Isa: <span>{{ score }}</span>
    </p> -->
    <button class="btn_ok">OK</button>
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
          choices: [true, false],
          correctAnswer: "false",
          someInformation: "Aza dakadaka tsony fa avereno ampiasaina",
        },
        {
          question: "Hehehe hbcjervnrihbh hfrbvbruvb hgrfuhbrhfhur byfbur",
          image: "reboisement.jpg",
          choices: [true, false],
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
      return `/assets/requestImg/${this.questionsTrueFalse[this.currentImageIndex].image
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
        alert("Marina ny valinteninao!");
      } else {
        alert("Diso ny valinteninao!");
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
.container>span {
  display: inline-block;
}

.buttons {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

#cont-img {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 215px;
  margin-top: 2%;
}
#cont-img img{
  width: 90%;
}
.buttons{
  display: flex;
  justify-content: space-around;
}

button.truefalse {
  width: 30px;
  cursor: pointer;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font: inherit;
}
/*
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
  line-height: 150%; /* 24px 
}

.popup__action {
  display: flex;
  gap: 16px;
  align-items: center;
}
*/
.truefalse {
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
  border: 0.5px solid rgba(128, 128, 128, 0.315);
  margin-top: 10px;
  padding: 5px;
  transform: scale(1.4, 1.2);
}

.truefalse:focus {
  box-shadow: 2px 8px 4px -6px rgba(0, 0, 0, 0.3);
  transform: translate3d(2px, 2px, 0);
  transform: scale(1.6, 1.4);
}

.truefalse img {
  width: 100%;
}

.btn_ok {
  border: 2px solid black;
  background: black;
  color: white;
  padding: 5px;
  font-size: 14px;
  cursor: pointer;
  bottom: -42px;
  position: relative;
  width: 230px;
}
</style>
