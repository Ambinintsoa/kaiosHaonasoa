<template>
  <div id="selectionAntony">
    <div class="selectorMenuAntony activeAntony">
      <p
        class="selectorAntony"
        v-for="quiz in listQuiz"
        :key="quiz.tabindex"
        :tabindex="quiz.tabindex"
      >
        {{ quiz.content }}
      </p>
    </div>
    <div class="containerAntony ">
      <div class="antonyGame one"><TrueFalse /></div>
      <div class="antonyGame two">test 2</div>
    </div>
  </div>
</template>

<script>
import TrueFalse from "./TrueFalse.vue";
export default {
  components: { TrueFalse },
  data() {
    return {
      name: "Select antony",
      listQuiz: [
        { tabindex: 0, content: "Marina sa diso" },
        // { tabindex: 1, content: "" },
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
      if (activeTab.classList.contains("qThree")) {
        if (evt.key === "ArrowUp") {
          this.nav(-1);
        } else if (evt.key === "ArrowDown") {
          this.nav(1);
        } else if (evt.key === "Enter") {
          const focusedElement = document.activeElement;
          if (focusedElement.classList.contains("selectorAntony")) {
            this.openQuiz(evt);
          }
        }
      }
    },

    openQuiz(evt) {
      var containerSelectorQuiz = document.querySelector(".selectorMenuAntony");
      var itemsQuiz = document.querySelectorAll(".antonyGame");
      for (let i = 0; i < itemsQuiz.length; i++) {
        itemsQuiz[i].className = itemsQuiz[i].className.replace(
          " activeAntony",
          ""
        );
      }
      itemsQuiz[evt.target.getAttribute("tabindex")].className +=
        " activeAntony";
      containerSelectorQuiz.classList.remove("activeAntony");
      document.querySelector(".containerAntony").classList.add("activeAntony");
    },
    nav(move) {
      if (document.querySelector(".selectorMenuAntony.activeAntony")) {
        const currentIndex = document.activeElement.tabIndex;
        var next = currentIndex + move;
        next %= 2;
        const items = document.querySelectorAll(".selectorAntony");
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
.selectorAntony:focus {
  background-color: rgba(203, 202, 202, 0.499);
}
.selectorAntony:hover {
  background-color: rgba(205, 202, 202, 0.499);
}

.containerAntony,
.antonyGame,
.selectorMenuAntony {
  display: none;
}

.selectorMenuAntony.activeAntony,
.containerAntony.activeAntony,
.antonyGame.activeAntony {
  display: block;
}
</style>
