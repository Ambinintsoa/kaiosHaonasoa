<template>
  <div id="calendar-container">
    <div id="container-question">
      <h5>{{ currentQuestion.questionText }}</h5>
      <div class="custom-select">
        <form id="form">
          <h3>{{ pastDays }}</h3>
          <div id="container-monthBefore" class="container-month">
            <select v-model="selectedTaloha" class="monthBefore frm-navigation" id="mth-before-one" tabindex="0">
              <option disabled value="">Safidy</option>
              <option v-for="(month, index) in lstMonth" :key="index" :value="month">{{ month }}</option>
            </select>
            <span>-</span>
            <select class="monthBefore frm-navigation" id="mth-before-two" tabindex="1">
              <option v-for="(month, index) in lstMonth" :key="index" :value="month">{{ month }}</option>
            </select>
          </div>
          <h3>{{ presentDays }}</h3>
          <div id="container-monthToday" class="container-month">
            <select class="monthToday frm-navigation" id="mth-today-one" tabindex="2">
              <option v-for="(month, index) in lstMonth" :key="index" :value="month">{{ month }}</option>
            </select>
            <span> - </span>
            <select class="monthToday frm-navigation" id="mth-today-two" tabindex="3">
              <option v-for="(month, index) in lstMonth" :key="index" :value="month">{{ month }}</option>
            </select>
          </div>
          <input class="btn default frm-navigation" type="button" value="OK" tabindex="4">
        </form>
      </div>
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
      selectedTaloha: '',
      selectedAnkehitriny: '',
      presentDays: "Ankehitriny",
      pastDays: "Taloha",
      questions: [
        {
          questionText: "Volana inona ny fahavaratra?",
          before: "Janoary-Martsa",
          today: "Febroary-Mey"
        },
        {
          questionText: "Volana inona ny fahavaratra 2?",
          before: "Janoary-martsa",
          today: "Febroary-mey"
        },
      ],
      lstMonth: ["Janoary", "Febroary", "Martsa", "Aprily", "Mey", "Jona", "Jolay", "Aogositra", "Setpambra", "Oktobra", "Novambra", "Desambra"],
      currentQuestionIndex: 0,
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

      const key = event.key;
      var activeTab = document.querySelector("#opNav");
      if (activeTab.classList.contains("qOne")) {
        switch (key) {
          case "ArrowRight":
            this.nav(1);
            break;
          case "ArrowLeft":
            this.nav(-1);
            break;
          case "Enter":
            var focusedElement = document.activeElement;
            if (focusedElement.classList.contains("btn")) {
              this.handleOkButtonClick();
            }
            break;
          default:
            return;
        }
      }


    },
    nav(move) {
      if (document.querySelector(".quizGame.three.activeQuiz")) {
        const currentIndex = document.activeElement.tabIndex;
        let nextIndex = currentIndex + move;
        const items = document.querySelectorAll(".frm-navigation");
        const targetElement = items[nextIndex];
        if (targetElement) {
          targetElement.focus();
        }
      }
    },
    handleOkButtonClick() {
      console.log(this.selectedTaloha)
    },
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
  border: 1px solid black;
  border-radius: 5px;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  background-color: white;
  box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.315);
}

.custom-select select:focus {
  border: none;
}

.btn {
  border: 2px solid black;
  background-color: white;
  color: black;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;

}

.default {
  border-color: #e7e7e7;
  color: black;
}

.default:focus {
  background: #e7e7e7;
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
