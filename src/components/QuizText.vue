<template>
  <div class="container_quizText" v-if="currentQuestion">
    <p id="viewquestion" class="question">
      {{ currentQuestion.question }}
    </p>
    <ul class="choices_container">
      <div v-for="(name, index) in currentQuestion.choices" :key="index">
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
          question: "Inona no atao hoe fiovan’ny toetr’andro?",
          choices: ["Fiakaran’ny maripana", "Fikorotanan’ny vanim-potoana", "Fiovana maharitra ny toetry ny tany"],
          correctAnswer: "Fiovana maharitra ny toetry ny tany",
          someInformation: "Tokony misy zvtr",
        },
        {
          question: "Inona no fanao manimba indrindra ny tontolo iainana?",
          choices: ["Ny fanapahana ala",
            "Ny fampiharana ny 'Tavy'",
            "Ny fanamboarana 'charbon'",
          ],
          correctAnswer: "Ny fanapahana ala",
          someInformation: "Ny fanapahana sy ny fandoroana izany no antony voalohany eto Madagasikara.",
        },
        {
          question: "Inona no tranga mifandray amin’ny fiovan’ny toetr’andro?",
          choices: ["Fiakaran’ny rano",
            "Fikorontanan’ny vanim-potoana mahazatra",
            "Fitomboan’ny zavamananaina"
          ],
          correctAnswer: "Fikorontanan’ny vanim-potoana mahazatra",
          someInformation: "Rehefa mafana ny tany dia manova ny toetry ny rivotra sy ny ranomasina izany (fiovaovan'ny rotsak'orana na ny maripana).",
        },
        {
          question: "Nahoana no mampanahy ny famohana CO2 be loatra?",
          choices: ["Mandray anjara amin’ny fiakaran’ny maripana",
            "Mety hitarika amin’ny fiovan’ny toetr’andro mahery vaika",
            "Misy fiantraikan’ny amin’ny fahasalamanan’ny olombelona sy ny tontolo iainana",
          ],
          correctAnswer: "Misy fiantraikan’ny amin’ny fahasalamanan’ny olombelona sy ny tontolo iainana",
          someInformation: "Mba hiarovana antsika dia tsy maintsy ampidinina ny tahan'ny CO2 maneran-tany ho lasa ampahany 350 isaky ny tapitrisa ao amin'ny atmosfera (raha toa ka 410 ppm izany ankehitriny) ary tsy maintsy atsahatra ny hafanana mihoatra ny 1,5 degré Celsius (raha toa ka 1 degré ankehitriny).",
        },
        {
          question: "Inona no tanjona amin’ny fanambeazana momban’ny fiovan’ny toetr’andro?",
          choices: ["Fanentanana ny vahoaka amin’ny fitondran-tena ara-ekolojika",
            "Fanentanana amin’ny hetaisika hiadivana amin’ny fiovan’ny toetr’andro",
            "Fanamafisana ny fisihan’ny fiovan’ny toetr’andro",

          ],
          correctAnswer: "Fanentanana amin’ny hetsika hiadivana amin’ny fiovan’ny toetr’andro",
          someInformation: "Samy tompon'andraikitra daholo ny tsirairay, ka aoka samy hifanentana hatrany ka hanova zavatra.",
        },
        {
          question: "Inona no atao hoe faritra arovana?",
          choices: ["Faritra ahitana fifampifehezana na politikam-pitantanana mba hifehezana ny fampiasana ilay faritra",
            "Faritra tsy azo idirana na anaovana maloto", "Faritra ahitana zava-manan’aina voaro"

          ],
          correctAnswer: "Faritra ahitana zava-manan’aina voaro",
          someInformation: "Voarara'ny lalàna malagasy ary mahavoasazy ny fanimbana ny faritra arovana izay ahitana zava-maniry sy zava-manann'aina mampihavaka an'ny Madagasikara",
        },
      ],
      currentAnswer: null,
      currentImageIndex: 0,
      score: 0,
      shuffledQuestions: []
    };
  },
  mounted() {
    this.startNewGame();
    document.addEventListener("keydown", (evt) => {
      this.handleKeydown(evt);
    });
  },
  computed: {
    currentQuestion() {
      return this.shuffledQuestions[this.currentImageIndex];
    },

  },
  methods: {
    handleKeydown(evt) {
      evt.stopPropagation();
      var activeTab = document.querySelector("#opNav");
      if (activeTab.classList.contains("qTwo")) {
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
      const correctAnswer = this.questionsTrueFalse[this.currentImageIndex]
        .correctAnswer;
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
      if (this.currentImageIndex < this.questionsTrueFalse.length - 1) {
        this.currentImageIndex += 1;
      } else {
        this.currentImageIndex = 0;
        this.finalScore();
        this.score = 0;
        this.startNewGame();
      }
    },
    updateScore() {
      document.querySelector(".score_quiz span").innerHTML = this.score;
    },
    nav(move) {
      if (document.querySelector(".quizGame.two.activeQuiz")) {
        const currentIndexThree = document.activeElement.tabIndex;
        var nextThree = currentIndexThree + move;
        nextThree %= 4;
        const itemsThree = document.querySelectorAll(".listChoiceText");
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
  transition: 0.1s;
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
