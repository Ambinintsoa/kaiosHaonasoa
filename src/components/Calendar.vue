<template>
  <div id="calendar-container">
    <div v-if="currentQuestionIndex < questions.length">
      <div id="container-question">
        <h5>{{ currentQuestion.questionText }}</h5>
        <div class="custom-select">
          <form id="form">
            <h3>{{ pastDays }}</h3>
            <div id="container-monthBefore" class="container-month">
              <select v-model="mth_before_response_one" class="monthBefore frm-navigation" id="mth-before-one"
                tabindex="0">
                <option disabled value="">Volana</option>
                <option v-for="(month, index) in lstMonth" :key="index" :value="month">{{ month }}</option>
              </select>
              <span>-</span>
              <select v-model="mth_before_response_two" class="monthBefore frm-navigation" id="mth-before-two"
                tabindex="1">
                <option disabled value="">Volana</option>
                <option v-for="(month, index) in lstMonth" :key="index" :value="month">{{ month }}</option>
              </select>
            </div>
            <h3>{{ presentDays }}</h3>
            <div id="container-monthToday" class="container-month">
              <select v-model="mth_today_response_one" class="monthToday frm-navigation" id="mth-today-one"
                tabindex="2">
                <option disabled value="">Volana</option>
                <option v-for="(month, index) in lstMonth" :key="index" :value="month">{{ month }}</option>
              </select>
              <span> - </span>
              <select v-model="mth_today_response_two" class="monthToday frm-navigation" id="mth-today-two"
                tabindex="3">
                <option disabled value="">Volana</option>
                <option v-for="(month, index) in lstMonth" :key="index" :value="month">{{ month }}</option>
              </select>
            </div>
            <input class="btn default frm-navigation" type="button" value="OK">
          </form>
        </div>
      </div>
    </div>
    <div v-else>
      Vita le jeu, ato ny stat, tokony atao otrzao ny sasany ngamba e?
      <h2>Isa : {{ score }}</h2>
    </div>
    <div id="myModal" class="modal">
      <div class="modal-content">
        <div class="modal-body">
          <p class="result">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Reprehenderit cum quibusdam nihil optio quasi
            perspiciatis earum expedita illo autem ducimus ex, voluptates tempora exercitationem sit, quis aliquid
            itaque eum quas.
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
      mth_before_response_one: '',
      mth_before_response_two: '',
      mth_today_response_one: '',
      mth_today_response_two: '',
      selectedAnkehitriny: '',
      presentDays: "Ankehitriny",
      pastDays: "Taloha",
      questions: [
        {
          questionText: "Volana inona ny fahavaratra?",
          before: ["Janoary", "Martsa"],
          today: ["Febroary", "Mey"],
          someInformation: "Raha toa ka ... dia ankehitriny kosa, noho ny fahasimban'ny .... dia ..."

        },
        {
          questionText: "Volana inona ny fahavaratra 2?",
          before: ["Janoary", "martsa"],
          today: ["Febroary", "mey"],
          someInformation: "Raha toa ka ... dia ankehitriny kosa, noho ny fahasimban'ny .... dia ..."
        },
      ],
      lstMonth: ["Janoary", "Febroary", "Martsa", "Aprily", "Mey", "Jona", "Jolay", "Aogositra", "Setpambra", "Oktobra", "Novambra", "Desambra"],
      currentQuestionIndex: 0,
      score: 0,
      isResponseFound: false,
    };
  },
  computed: {
    currentQuestion() {
      return this.questions[this.currentQuestionIndex];
    },
  },
  mounted() {
    document.addEventListener("keydown", this.handleKeydown);
  },
  methods: {
    handleKeydown(event) {
      event.stopPropagation();
      // event.preventDefault();
      const key = event.key;

      var activeTab = document.querySelector("#opNav");
      if (activeTab.classList.contains("qOne")) {
        switch (key) {
          case "ArrowRight":
            this.nav(1, event);
            break;
          case "ArrowLeft":
            this.nav(-1, event);
            break;
          case "Enter":
            if (document.querySelector(".quizGame.three.activeQuiz")) {
              this.handleOkButtonClick();
            }
            break;
          case "Escape":
            this.closeModalAnswer();
            break;
          default:
            return;
        }
      }


    },
    nav(move, evt) {
      if (document.querySelector(".quizGame.three.activeQuiz")) {
        const currentIndex = document.activeElement.tabIndex;
        let nextIndex = currentIndex + move;
        nextIndex %= 4;
        const items = document.querySelectorAll(".frm-navigation");
        const targetElement = items[nextIndex];
        if (targetElement) {
          targetElement.focus();
        }
        evt.preventDefault();
      }
    },
    handleOkButtonClick() {
      if (this.currentQuestionIndex < this.questions.length) {
        if (this.mth_before_response_one != "" && this.mth_before_response_two != "" && this.mth_today_response_one != "" && this.mth_today_response_two != "") {
          if (this.mth_before_response_one == this.currentQuestion.before[0] && this.mth_before_response_two == this.currentQuestion.before[1] && this.mth_today_response_one == this.currentQuestion.today[0] && this.mth_today_response_two == this.currentQuestion.today[1]) {
            this.score++;
            this.isResponseFound = true;
          }
          else {
            this.isResponseFound = false;
          }
          this.displayModalAnswer(this.currentQuestion.someInformation);
          setTimeout(this.closeModalAnswer, 3000);
          this.currentQuestionIndex++;
        } else {
          alert("Safidio ny valiny ;)");
        }
      }
    },
    displayModalAnswer(someInformation) {
      document.getElementById("myModal").style.display = "block";
      document.querySelector(".result").innerHTML = someInformation;
    },
    closeModalAnswer() {
      document.getElementById("myModal").style.display = "none";
    }
  },
};
</script>




<style scoped>
* {
  margin: 0;
  box-sizing: border-box;
}

.custom-select {
  position: relative;
  margin: 20px auto;
}

.container-month {
  display: flex;
  padding: 10px;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

}


.custom-select select {
  display: inline-block;
  width: 100%;
  padding: 10px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.418);
  border-radius: 5px;
  outline: none;

  background-color: white;
}

.custom-select select:focus {
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.315);
}

.btn {
  border: 2px solid black;
  background: #e4e4e4;
  color: black;
  padding: 5px;
  font-size: 14px;
  cursor: pointer;
  bottom: -42px;
  position: relative;
  width: 250px;
  left: -20px;
  border-color: #e7e7e7;


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
  background-color: rgba(0, 0, 0, 0.705);
  /* filter: blur(1px); */
  -webkit-animation-name: fadeIn;
  -webkit-animation-duration: 0.4s;
  animation-name: fadeIn;
  animation-duration: 0.4s;
}

.modal-content {
  position: fixed;
  bottom: 0;
  background-color: #fefefe;
  width: 100%;
  -webkit-animation-name: slideIn;
  -webkit-animation-duration: 0.4s;
  animation-name: slideIn;
  animation-duration: 0.4s;
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
