
// var questionsTrueFalse = [
//   {
//     question: "Doro tanety",
//     image: "doro_tanety",
//     choices: ["true", "false"],
//     correctAnswer: "false",
//     someInformation: "Aza dakadaka tsony fa avereno ampiasaina",
//   },
//   {
//     question: "Hehehe hbcjervnrihbh hfrbvbruvb hgrfuhbrhfhur byfbur",
//     image: "tanety",
//     choices: ["true", "false"],
//     correctAnswer: "true",
//     someInformation: "Aza dakadaka tsony fa avereno ampiasaina",
//   },
// ];
// let currentQuestion = 0;
// let score = 0;
// function displayQuestionTrueFalse() {
//   const question = questionsTrueFalse[currentQuestion];
//   document.getElementById("questionContent").textContent = question.question;
//   const elementImg = document.getElementById("questionImg");
//   elementImg.innerHTML = "";
//   const image = document.createElement("img");
//   image.setAttribute("src", `assets/requestImg/${question.image}.jpg`);
//   elementImg.appendChild(image);
//   const choicesList = document.querySelector(".truefalseAnswer");
//   choicesList.innerHTML = ""; // Clear previous choices
//   const div1 = document.createElement("div");
//   let count = 0;
//   question.choices.forEach((choice) => {
//     const lichoiceElement = document.createElement("li");
//     const choiceElement = document.createElement("img");
//     choiceElement.setAttribute("src", `assets/gif/${choice}.gif`);
//     choiceElement.setAttribute("alt", choice);
//     lichoiceElement.appendChild(choiceElement);
//     lichoiceElement.setAttribute("tabindex", count);
//     lichoiceElement.classList.add("listChoiceTrueFalse");
//     div1.appendChild(lichoiceElement);
//     choicesList.appendChild(div1);
//     count++;
//   });
//   document.querySelector(".result").textContent = " ";
//   closeModalAnswer();
// }
// function startStatTrueFalse() {
//   currentQuestion = 0;
//   score = 0;
//   document.querySelector(".quiz-box").classList.remove("hidden");
//   document.querySelector(".result").textContent = "";
//   shuffleArray(questionsTrueFalse);
//   updateScore();
//   updateNbQuestion(questionsTrueFalse);
// }
// function handleAnswerClickTrueFalse(elt) {
//   const chosenAnswer = elt.getAttribute("alt");
//   const correctAnswer = questionsTrueFalse[currentQuestion].correctAnswer;
//   const someInformation = questionsTrueFalse[currentQuestion].someInformation;
//   if (chosenAnswer === correctAnswer) {
//     displayModalAnswer("Marina", someInformation);
//     score++;
//   } else {
//     displayModalAnswer(
//       "Diso. Ny valiny dia " + correctAnswer + ".",
//       someInformation
//     );
//   }
//   currentQuestion++;
//   if (currentQuestion < questionsTrueFalse.length) {
//     setTimeout(displayQuestionTrueFalse, 2000); // Delay before next question
//     updateNbQuestion(questionsTrueFalse);
//   } else {
//     setTimeout(showFinalScore, 2000);
//     setTimeout(() => {
//       emitConfetti(score * 10);
//     }, 2000);
//   }
//   updateScore();
// }
// function displayModalAnswer(text, someInformation) {
//   document.getElementById("myModal").style.display = "block";
//   document.querySelector(".result").innerHTML =
//     text + "<br/> " + someInformation;
// }
// function closeModalAnswer() {
//   document.getElementById("myModal").style.display = "none";
// }
// function emitConfetti(numConfetti) {
//   const confettiContainer = document.getElementById("confetti-container");
//   const colors = ["#ffafcc", "#3ab795", "#8ecae6", "#3385ff"];

//   for (let i = 0; i < numConfetti; i++) {
//     const confetti = document.createElement("div");
//     confetti.className = "confetti";
//     confetti.style.backgroundColor =
//       colors[Math.floor(Math.random() * colors.length)];
//     confetti.style.left = Math.random() * 100 + "%";
//     confetti.style.animation = `confetti-fall ${2 +
//       Math.random() * 2}s linear ${Math.random() * 2}s`;

//     confetti.addEventListener("animationend", () => {
//       confetti.remove();
//     });
//     confettiContainer.appendChild(confetti);
//   }
// }
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }
// function showFinalScore() {
//   const finalScoreMessage = `nahavoavaly  fanontaniana ${score} tamin'ireo fanontaniana ${
//     questionsTrueFalse.length
//   } ianao!`;
//   document.querySelector(".score span").innerHTML = finalScoreMessage;
//   document.querySelector(".quiz-box").classList.add("hidden");
// }

// function updateScore() {
//   document.querySelector(".score span").innerHTML = score;
// }
// function updateNbQuestion(questionsMark) {
//   document.querySelector(
//     ".current-level"
//   ).textContent = `Fanontaniana ${currentQuestion + 1}/${questionsMark.length}`;
// }

// export {
//   displayQuestionTrueFalse,
//   handleAnswerClickTrueFalse,
//   startStatTrueFalse,
// };
