<template>
    <div id="container_antonyMachin">
        <p>{{ questionsAntonyMachin[currentIndex].question }}</p>
        <div class="container_img">
            <div v-for="(question, index) in currentQuestion.choices" :key="index">
                <div class="list_img" :tabindex="index"  @click="setCurrentAnswer(question)">
                    <img class="lst_response" :src="'assets/PNG/' + question+ '.png'" :alt="question"  />
                </div>
                <span>{{ currentDescipt }}</span>
            </div>

        </div>
        <button class="btn_ok">OK</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            questionsAntonyMachin: [
                {
                    question: "Blablabla",
                    choices: ["Earth", "Barrel"],
                    correctAnswer: "Earth",
                    someInformation: "Aza dakadaka tsony fa avereno ampiasaina",
                },
                {
                    question: "Hehehe hbcjervnrihbh hfrbvbruvb hgrfuhbrhfhur byfbur",
                    choices: ["Faucet", "Love"],
                    correctAnswer: "Love",
                    someInformation: "Tiako be",
                },
            ],
            currentAnswer: null,
            currentIndex: 0,
            score: 0,
        };
    },
    computed: {
        currentQuestion() {
            return this.questionsAntonyMachin[this.currentIndex];
        },
        currentDescipt() {
            return this.questionsAntonyMachin[this.currentIndex].someInformation;
        }
    },
    mounted() {
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
                    this.nav(1);
                } else if (evt.key === "ArrowLeft") {
                    this.nav(-1);
                } else if (evt.key === "Enter") {
                    const focusedElement = document.activeElement; 
                    if (focusedElement.classList.contains("list_img")) {
                        // this.setCurrentAnswer(focusedElement.firstChild.getAttribute("alt"));
                        this.checkAnswer();
                    }
                }
            }
        },
        setCurrentAnswer(answer) {
            this.currentAnswer = answer;
        },

        checkAnswer() {
            const correctAnswer=this.currentQuestion.correctAnswer;
            if (this.currentAnswer === correctAnswer) {
                this.score += 1;
                alert("Marina !");
            } else {
                alert("Diso !");
            }
            this.moveToNextImage();
        },
        finalScore() {
            const finalScoreMessage = `nahavoavaly fanontaniana ${this.score
                } tamin'ireo fanontaniana ${this.questionsAntonyMachin.length} ianao!`;
            alert(finalScoreMessage);
        },
        moveToNextImage() {
            this.currentAnswer = null;
            if (this.currentIndex < this.questionsAntonyMachin.length - 1) {
                this.currentIndex += 1;
            } else {
                this.currentIndex = 0;
                this.finalScore();
                this.score = 0;
            }
        },
        nav(move) {
            if (document.querySelector(".antonyGame.two.activeAntony")) {
                const currentIndexThree = document.activeElement.tabIndex;
                var nextThree = currentIndexThree + move;
                nextThree %= 2;
                const itemsThree = document.querySelectorAll(".list_img");
                const targetElementThree = itemsThree[nextThree];
                if (targetElementThree) {
                    targetElementThree.focus();

                }
            }
        },
    },
};
</script>
<style>
#container_antonyMachin {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.container_img {
    display: flex;
    gap: 2px;
    width: 240px;
    justify-content: space-around;
}

.container_img>div {
    width: 120px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #ffe4fd;
    padding: 5px;
}

.list_img {
    width: 95px;
    border-radius: 5px;
    border: 1px solid rgb(197, 197, 197);
    margin: auto;
}

.list_img:focus {
    box-shadow: 1px 1px 1px rgba(126, 126, 126, 0.705);

}

.lst_response {
    width: 100%;
}

.btn_ok {
    border: 2px solid black;
    background: #e4e4e4;
    color: black;
    padding: 5px;
    font-size: 14px;
    cursor: pointer;
    bottom: -42px;
    position: relative;
    width: 250px;
    border-color: #e7e7e7;
}
</style>