<template>
  <div id="calendar-container">
    <div id="container-question">
      <div v-if="!allQuestionsAnswered">
        <h5>{{ currentQuestion.questionText }}</h5>

        <div id="container-monthBefore" class="container-month">
          <h3>{{ pastDays }}</h3>
          <div class="div-custom-select-container">
            <div class="custom-select" tabindex="0" id="firstCst">
              <div class="selected-option">Volana</div>
              <div class="options">
                <option
                  class="option beforeOne"
                  v-for="(month, index) in lstMonth"
                  :key="index"
                  :data-value="month"
                  :tabIndex="index"
                  >{{ month }}</option
                >
              </div>
            </div>

            <div class="custom-select" tabindex="1">
              <div class="selected-option">Volana</div>
              <div class="options right">
                <option
                  class="option beforeTwo"
                  v-for="(month, index) in lstMonth"
                  :key="index"
                  :data-value="month"
                  :tabIndex="index"
                  >{{ month }}</option
                >
              </div>
            </div>
          </div>
        </div>

        <div id="container-monthToday" class="container-month">
          <h3>{{ presentDays }}</h3>
          <div class="div-custom-select-container">
            <div class="custom-select" tabindex="2">
              <div class="selected-option">Volana</div>
              <div class="options">
                <option
                  class="option afterOne"
                  v-for="(month, index) in lstMonth"
                  :key="index"
                  :data-value="month"
                  :tabIndex="index"
                  >{{ month }}</option
                >
              </div>
            </div>

            <div class="custom-select" tabindex="3">
              <div class="selected-option">Volana</div>
              <div class="options right">
                <option
                  class="option afterTwo"
                  v-for="(month, index) in lstMonth"
                  :key="index"
                  :data-value="month"
                  :tabIndex="index"
                  >{{ month }}</option
                >
              </div>
            </div>
          </div>
        </div>
        <input
          class="btn default frm-navigation"
          @click="handleOkButtonClick"
          type="button"
          value="OK"
        />
      </div>

      <div v-else>
        <h2>Vita</h2>
        <p>Isa: {{ score }}</p>
        <button class="btn default frm-navigation">OK</button>
      </div>
    </div>
    <div id="myModal" class="modal">
      <div class="modal-content">
        <div class="modal-body">
          <p class="result">
            {{ currentQuestion.someInformation }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Calendar",
  data() {
    return {
      mth_before_response_one: "",
      mth_before_response_two: "",
      mth_today_response_one: "",
      mth_today_response_two: "",
      selectedAnkehitriny: "",
      presentDays: "Ankehitriny",
      pastDays: "Taloha",
      questions: [
        {
          questionText: "Volana inona ny fahavaratra?",
          before: ["Janoary", "Martsa"],
          today: ["Febroary", "Mey"],
          someInformation:
            "Raha toa ka ... dia ankehitriny kosa, noho ny fahasimban'ny .... dia ...",
        },
        {
          questionText: "Volana inona ny fahavaratra 2?",
          before: ["Janoary", "Martsa"],
          today: ["Febroary", "Mey"],
          someInformation:
            "Raha toa ka ... dia ankehitriny kosa, noho ny fahasimban'ny .... dia ...",
        },
      ],
      lstMonth: [
        "Janoary",
        "Febroary",
        "Martsa",
        "Aprily",
        "Mey",
        "Jona",
        "Jolay",
        "Aogositra",
        "Setpambra",
        "Oktobra",
        "Novambra",
        "Desambra",
      ],
      currentQuestionIndex: 0,
      score: 0,
      isResponseFound: false,
      firstTime: true,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
    allQuestionsAnswered() {
      return this.currentQuestionIndex >= this.questions.length;
    },
  },
  mounted() {
    document.addEventListener("keydown", (e) => {
      var activeTab = document.querySelector("#opNav");
      var activeSubTab = document.querySelector(".selectorMenuQuiz");
      if (
        e.key === "Enter" &&
        document.querySelector(".quizGame.three.activeQuiz") &&
        this.isValidated() &&
        activeTab.classList.contains("qOne")
      ) {
        this.handleOkButtonClick();
      } else if (
        e.key === "ArrowLeft" &&
        this.firstTime &&
        activeTab.classList.contains("qOne") &&
        !activeSubTab.classList.contains("activeQuiz")
      ) {
        document
          .querySelector(".quizGame.three.activeQuiz")
          .classList.add("first");
        document.getElementById("firstCst").focus();
      }
    });
    const customSelects = document.querySelectorAll(".custom-select");
    const self = this;
    for (let i = 0; i < customSelects.length; i++) {
      const customSelect = customSelects[i];
      const selectedOption = customSelect.querySelector(".selected-option");
      const optionsContainer = customSelect.querySelector(".options");
      const options = customSelect.querySelectorAll(".option");

      const toggleOptionsDisplay = () => {
        for (let j = 0; j < customSelects.length; j++) {
          let cs = customSelects[j];
          if (cs !== customSelect) {
            cs.querySelector(".options").style.display = "none";
          }
        }
        optionsContainer.style.display =
          optionsContainer.style.display === "block" ? "none" : "block";
      };

      customSelect.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
          toggleOptionsDisplay();
        } else if (
          event.key === "ArrowRight" &&
          document.querySelector(".quizGame.three.activeQuiz")
        ) {
          for (let j = 0; j < customSelects.length; j++) {
            const cs = customSelects[j];
            cs.querySelector(".options").style.display = "none";
          }
          const index = Array.from(customSelects).indexOf(customSelect);
          const nextIndex = event.shiftKey
            ? (index - 1 + customSelects.length) % customSelects.length
            : (index + 1) % customSelects.length;
          customSelects[nextIndex].focus();
          event.preventDefault();
        }
      });

      customSelect.addEventListener("keydown", function(event) {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          event.preventDefault();
          const index = Array.from(options).indexOf(document.activeElement);
          const nextIndex = (index - 1 + options.length) % options.length;
          options[nextIndex].focus();
        }
      });

      for (let j = 0; j < options.length; j++) {
        const option = options[j];
        option.addEventListener("keydown", function(event) {
          if (event.key === "Enter") {
            selectedOption.textContent = option.textContent;
            optionsContainer.style.display = "none";
            customSelect.focus(); // Focus back on custom select after selecting an option
            toggleOptionsDisplay();
            var classOption = option.classList;
            if (classOption[1] == "beforeOne") {
              self.mth_before_response_one = option.textContent;
            } else if (classOption[1] == "beforeTwo") {
              self.mth_before_response_two = option.textContent;
            } else if (classOption[1] == "afterOne") {
              self.mth_today_response_one = option.textContent;
            } else if (classOption[1] == "afterTwo") {
              self.mth_today_response_two = option.textContent;
            }
          }
        });
      }
    }
  },
  methods: {
    handleOkButtonClick() {
      if (this.currentQuestionIndex < this.questions.length) {
        if (this.isValidated()) {
          if (
            this.mth_before_response_one == this.currentQuestion.before[0] &&
            this.mth_before_response_two == this.currentQuestion.before[1] &&
            this.mth_today_response_one == this.currentQuestion.today[0] &&
            this.mth_today_response_two == this.currentQuestion.today[1]
          ) {
            this.score++;
            this.isResponseFound = true;
          } else {
            this.isResponseFound = false;
          }
          var items = document.querySelectorAll(".selected-option");
          for (let i = 0; i < items.length; i++) {
            const option = items[i];
            option.textContent = "Volana";
          }
          this.mth_before_response_one = "";
          this.mth_before_response_two = "";
          this.mth_today_response_one = "";
          this.mth_today_response_two = "";
          this.displayModalAnswer(this.currentQuestion.someInformation);
          setTimeout(this.closeModalAnswer, 3000);
          if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex += 1;
          } else {
            this.resetGame();
          }
        }
      }
    },
    displayModalAnswer(someInformation) {
      document.getElementById("myModal").style.display = "block";
      var text;
      text = this.isResponseFound ? "Marina" : "Diso";
      document.querySelector(".result").innerHTML =
        text + "<hr/>" + someInformation;
    },
    closeModalAnswer() {
      document.getElementById("myModal").style.display = "none";
    },
    isValidated() {
      return (
        this.mth_before_response_one != "" &&
        this.mth_before_response_two != "" &&
        this.mth_today_response_one != "" &&
        this.mth_today_response_two != ""
      );
    },
    resetGame() {
      this.firstTime = true;
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.isResponseFound = false;
      this.mth_before_response_one = "";
      this.mth_before_response_two = "";
      this.mth_today_response_one = "";
      this.mth_today_response_two = "";
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
}

.container-month {
  height: 58px;
}

h5 {
  margin-top: 5px;
}
.container-month h3 {
  font-size: 12px;
  text-align: center;
}

.div-custom-select-container {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.custom-select {
  position: relative;
  display: inline-block;
  cursor: pointer;
  border: 1px solid #ccc;
}

.custom-select:focus {
  border-bottom: 1px solid black;
}

.selected-option {
  padding: 6px;
  width: 110px;
}

.options {
  display: none;
  position: absolute;
  background-color: #d4d4d4;
  width: 244px;
  z-index: 1;
  margin-top: 5px;
  height: auto;
  overflow: scroll;
  left: -10px;
}

.options.right {
  left: -7.7em;
}

.option {
  padding: 10px;
  cursor: pointer;
}

.option:hover,
.option:focus {
  background-color: #009b77;
}

.btn {
  border: 0px solid black;
  padding: 5px;
  font-size: 14px;
  cursor: pointer;
  bottom: 0;
  left: 0;
  position: absolute;
  width: 100%;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  /* filter: blur(1px); */
  -webkit-animation-name: fadeIn;
  -webkit-animation-duration: 0.3s;
  animation-name: fadeIn;
  animation-duration: 0.3s;
}

.modal-content {
  position: fixed;
  bottom: 0;
  background-color: #fefefe;
  width: 100%;
  -webkit-animation-name: slideIn;
  -webkit-animation-duration: 0.3s;
  animation-name: slideIn;
  animation-duration: 0.3s;
  font-size: 12px;
}

.modal-body {
  padding: 2px 16px;
}

@-webkit-keyframes slideIn {
  from {
    bottom: -300px;
    opacity: 0;
  }

  to {
    bottom: 0;
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    bottom: -300px;
    opacity: 0;
  }

  to {
    bottom: 0;
    opacity: 1;
  }
}

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
