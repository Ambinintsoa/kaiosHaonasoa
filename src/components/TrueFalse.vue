<template>
  <div class="container" v-if="currentQuestion">
    <span>{{ questionsTrueFalse[currentImageIndex].question }}</span>
    <div id="cont-img">
      <img :src="currentImageSrc" alt="Game Image" />
    </div>
    <div class="buttons">
      <span v-for="(name, index) in questionsTrueFalse[currentImageIndex].choices" :key="name" class="truefalse"
        :class="{ selected: currentAnswer === name }" @click="setCurrentAnswer(name)" :tabindex="index">
        <img :src="'assets/gif/' + name + '.gif'" />
      </span>
    </div>
    <!-- <p class="score score_true_false">
      Isa: <span>{{ score }}</span>
    </p> -->
    <!-- <button class="btn_ok">OK</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      questionsTrueFalse: [
        {
          question: "Andraikitrin’ny tsirairay ve ny fiarovan’ny tontolo iainana?",
          image: "doro_tanety.jpg",
          choices: [true, false],
          correctAnswer: "true",
          someInformation: "Tompon'andraikitra ny tsirairay, ary manana adidy.",
        },
        {
          question: "Manampy amin’ny fanatsarana ny rivotra ve ny fisian’ny ala?",
          image: "reboisement.jpg",
          choices: [true, false],
          correctAnswer: "true",
          someInformation: "Ny ankamaroan'ny karibaona dia tafavoaka ho azy avy amin'ny atmosfera noho ny zavamaniry, ny ahidrano ary ny ranomasimbe izay mitroka ny Cny ankamaroan'ny karibaona dia tafavoaka ho azy avy amin'ny atmosfera noho ny zavamaniry, ny ahidrano ary ny ranomasimbe izay nitroka azy CO2",
        },
        {
          question: "Ny plastika ve dia sarotra levonina?",
          image: "doro_tanety.jpg",
          choices: [true, false],
          correctAnswer: "true",
          someInformation: "Aman-taona maro ny plastika vao levon'ny tany, ka lasa 'poizina' hoan'ny biby anaty rano; izy ireny nefa dia azo ahodina hanaovana zavatra hafa.",
        }, 
        {
          question: "Manimba ny latabatra rano ve ny fampiasana 'pesticide' sy zezika tsy natioraly?",
          image: "doro_tanety.jpg",
          choices: [true, false],
          correctAnswer: "true",
          someInformation: "Mampiakatra ny 'acidité'(mamono ny trondro sy ny tany) ny fampiasana zezika simika be loatra.",
        },
        {
          question: "Ny fanapahana hazo iray dia tsy miteraka olana firy, 'hazo tokana tsy mba ala' hono",
          image: "doro_tanety.jpg",
          choices: [true, false],
          correctAnswer: "false",
          someInformation: "Mba tsinjovy ihany ny zanakao, aleo mamboly hazo.",
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

    currentImageSrc() {
      return `/assets/requestImg/${this.questionsTrueFalse[this.currentImageIndex].image
        }`;
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

        alert("Marina ny valinteninao!\n" +this.currentQuestion.someInformation);
      } else {
        alert("Diso ny valinteninao!\n" +this.currentQuestion.someInformation);
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
        this.startNewGame();
      }
    },

    nav(move) {
      const currentIndex = document.activeElement.tabIndex;

      var nextF = currentIndex + move;
      if (nextF >= 2) nextF = 1;
      if (nextF === -1) nextF = 0;
      const items = document.querySelectorAll(".buttons span");
      const targetElement = items[nextF];
      if (targetElement) {
        targetElement.focus();
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
<style scoped>
.container>span {
  display: inline-block;
  margin-top: 5px;
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

#cont-img img {
  width: 90%;
}

.buttons {
  display: flex;
  justify-content: space-around;
}

span.truefalse {
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
  transition: 0.1s;
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
