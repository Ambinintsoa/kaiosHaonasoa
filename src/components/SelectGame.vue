<template>
  <div id="selectionThreeGame ">
    <div class="selectorMenuQuiz activeQuiz" v>
      <p
        class="selectorGame"
        v-for="quiz in listQuiz"
        :key="quiz.tabindex"
        :tabindex="quiz.tabindex"
      >
        {{ quiz.content }}
      </p>
    </div>
    <div class="containerQuiz ">
      <div class="quizGame one"><QuizImage /></div>
      <div class="quizGame two"><QuizText/></div>
      <div class="quizGame three"><Calendar /></div>
    </div>
  </div>
</template>

<script>
import QuizImage from "./QuizImage.vue";
import Calendar from "./Calendar.vue";
import QuizText from "./QuizText.vue"
export default {
  components: {
    QuizImage,
    Calendar,
    QuizText
  },
  data() {
    return {
      name: "Select game ",
      listQuiz: [
        { tabindex: 0, content: "Sary" },
        { tabindex: 1, content: "Soratra" },
        { tabindex: 2, content: "Calendrier" },
      ],
    };
  },
  computed: {},
  mounted() {
    document.addEventListener("keydown", (evt) => {
      this.handleKeydown(evt);
    });
  },
  methods: {
    handleKeydown(evt) {
      var activeTab = document.querySelector("#opNav");
      if (activeTab.classList.contains("qOne")) {
        if (evt.key === "ArrowUp") {
          this.nav(-1);
        } else if (evt.key === "ArrowDown") {
          this.nav(1);
        } else if (evt.key === "Enter") {
          const focusedElement = document.activeElement;
          if (focusedElement.classList.contains("selectorGame")) {
            this.openQuiz(evt);
          }
        }
      }
    },

    openQuiz(evt) {
      var containerSelectorQuiz = document.querySelector(".selectorMenuQuiz");
      var itemsQuiz = document.querySelectorAll(".quizGame");
      for (let i = 0; i < itemsQuiz.length; i++) {
        itemsQuiz[i].className = itemsQuiz[i].className.replace(
          " activeQuiz",
          ""
        );
      }
      itemsQuiz[evt.target.getAttribute("tabindex")].className += " activeQuiz";
      containerSelectorQuiz.classList.remove("activeQuiz");
      document.querySelector(".containerQuiz").classList.add("activeQuiz");
    },
    nav(move) {
      if (document.querySelector(".selectorMenuQuiz.activeQuiz")) {
        const currentIndex = document.activeElement.tabIndex;
        var next = currentIndex + move;
        next %= 3;
        const items = document.querySelectorAll(".selectorGame");
        const targetElement = items[next];
        if (targetElement) {
          targetElement.focus();
        }
      }
    },
  },
};
</script>
<style scoped>
.selectorGame:focus {
  background-color: rgba(203, 202, 202, 0.499);
}
.selectorGame:hover {
  background-color: rgba(205, 202, 202, 0.499);
}

.containerQuiz,
.quizGame,
.selectorMenuQuiz {
  display: none;
}

.selectorMenuQuiz.activeQuiz,
.containerQuiz.activeQuiz,
.quizGame.activeQuiz {
  display: block;
}</style
>./QuizImage.vue
