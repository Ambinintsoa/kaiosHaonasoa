import {
  closeModalAnswer,
  showFinalScore,
  emitConfetti,
  shuffleArray,
  updateScore,
  updateNbQuestion,
  displayModalAnswer,
} from "./quiz";
var questions = [
  {
    question: "Doro tanety",
    image: "doro_tanety",
    choices: ["true", "false"],
    correctAnswer: "false",
    someInformation: "Aza dakadaka tsony fa avereno ampiasaina",
  },
  {
    question: "Hehehe hbcjervnrihbh hfrbvbruvb hgrfuhbrhfhur byfbur",
    image: "tanety",
    choices: ["true", "false"],
    correctAnswer: "true",
    someInformation: "Aza dakadaka tsony fa avereno ampiasaina",
  },
];
let currentQuestion = 0;
let score = 0;
function displayQuestionTrueFalse() {
  const question = questions[currentQuestion];
  document.getElementById("questionContent").textContent = question.question;
  const elementImg = document.getElementById("questionImg");
  elementImg.innerHTML = "";
  const image = document.createElement("img");
  image.setAttribute("src", `assets/requestImg/${question.image}.jpg`);
  elementImg.appendChild(image);
  const choicesList = document.querySelector(".truefalseAnswer");
  choicesList.innerHTML = ""; // Clear previous choices
  const div1 = document.createElement("div");
  let count = 0;
  question.choices.forEach((choice) => {
    const lichoiceElement = document.createElement("li");
    const choiceElement = document.createElement("img");
    choiceElement.setAttribute("src", `assets/gif/${choice}.gif`);
    choiceElement.setAttribute("alt", choice);
    lichoiceElement.appendChild(choiceElement);
    lichoiceElement.setAttribute("tabindex", count);
    lichoiceElement.classList.add("listChoiceTrueFalse");
    div1.appendChild(lichoiceElement);
    choicesList.appendChild(div1);
    count++;
  });
  document.querySelector(".result").textContent = " ";
  closeModalAnswer();
}
function startStatTrueFalse() {
  currentQuestion = 0;
  score = 0;
  document.querySelector(".quiz-box").classList.remove("hidden");
  document.querySelector(".result").textContent = "";
  shuffleArray(questions);
  // updateScore();
  // updateNbQuestion();
}
function handleAnswerClickTrueFalse(elt) {
  const chosenAnswer = elt.getAttribute("alt");
  const correctAnswer = questions[currentQuestion].correctAnswer;
  const someInformation = questions[currentQuestion].someInformation;
  if (chosenAnswer === correctAnswer) {
    displayModalAnswer("Marina", someInformation);
    score++;
  } else {
    displayModalAnswer(
      "Diso. Ny valiny dia " + correctAnswer + ".",
      someInformation
    );
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
    setTimeout(displayQuestionTrueFalse, 2000); // Delay before next question
    updateNbQuestion();
  } else {
    setTimeout(showFinalScore, 2000);
    setTimeout(() => {
      emitConfetti(score * 10);
    }, 2000);
  }
  updateScore();
}
export {
  displayQuestionTrueFalse,
  handleAnswerClickTrueFalse,
  startStatTrueFalse,
};
