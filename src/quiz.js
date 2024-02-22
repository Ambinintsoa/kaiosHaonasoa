var questions = [
  {
    question: "Blablabla",
    choices: ["Earth", "Barrel", "Battery", "Bottle"],
    correctAnswer: "Bottle",
    information: "Some text",
  },
  {
    question: "Hehehe hbcjervnrihbh hfrbvbruvb hgrfuhbrhfhur byfbur",
    choices: ["Earth", "Forest", "Faucet", "Love"],
    correctAnswer: "Love",
    information: "Eto be resaska kely",
  },
];
let currentQuestion = 0;
let score = 0;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function startStat() {
  currentQuestion = 0;
  score = 0;
  document.querySelector(".quiz-box").classList.remove("hidden");
  document.querySelector(".result").textContent = "";
  shuffleArray(questions);
  updateScore();
  updateNbQuestion();
}
// c'est sale mais bon
function displayQuestion() {
  const question = questions[currentQuestion];
  document.getElementById("viewquestion").textContent = question.question;
  const choicesList = document.querySelector(".choices");
  choicesList.innerHTML = ""; // Clear previous choices
  const div1 = document.createElement("div");
  const div2 = document.createElement("div");
  let count = 0;
  question.choices.forEach((choice) => {
    const lichoiceElement = document.createElement("li");
    const choiceElement = document.createElement("img");
    choiceElement.setAttribute("src", `assets/PNG/${choice}.png`);
    choiceElement.setAttribute("alt", choice);
    lichoiceElement.appendChild(choiceElement);
    lichoiceElement.setAttribute("tabindex", count);
    lichoiceElement.classList.add("listChoice");
    if (count < 2) {
      div1.appendChild(lichoiceElement);
    } else {
      div2.appendChild(lichoiceElement);
    }
    choicesList.appendChild(div1);
    choicesList.appendChild(div2);
    count++;
  });
  document.querySelector(".result").textContent = " ";
  closeModalAnswer();
}

function handleAnswerClick(elt) {
  const chosenAnswer = elt.getAttribute("alt");
  const correctAnswer = questions[currentQuestion].correctAnswer;
  const someInformation = questions[currentQuestion].information;
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
    setTimeout(displayQuestion, 2000); // Delay before next question
    updateNbQuestion();
  } else {
    setTimeout(showFinalScore, 2000);
    setTimeout(() => {
      emitConfetti(score * 10);
    }, 1000);
  }
  updateScore();
}

function showFinalScore() {
  const finalScoreMessage = `Nahavoavaly  fanontaniana ${score} tamin'ireo fanontaniana ${
    questions.length
  } ianao!`;
  document.querySelector(".score").innerHTML = finalScoreMessage;
  document.querySelector(".quiz-box").classList.add("hidden");
}

function updateScore() {
  document.querySelector(".score span").textContent = score;
}
function updateNbQuestion() {
  document.querySelector(
    ".current-level"
  ).textContent = `Fanontaniana ${currentQuestion + 1}/${questions.length}`;
}
function emitConfetti(numConfetti) {
  const confettiContainer = document.getElementById("confetti-container");
  const colors = ["#ffafcc", "#3ab795", "#8ecae6", "#3385ff"];

  for (let i = 0; i < numConfetti; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.animation = `confetti-fall ${2 +
      Math.random() * 2}s linear ${Math.random() * 2}s`;

    confetti.addEventListener("animationend", () => {
      confetti.remove();
    });
    confettiContainer.appendChild(confetti);
  }
}

function displayModalAnswer(text, currentInformation) {
  document.getElementById("myModal").style.display = "block";
  document.querySelector(
    ".result"
  ).textContent = `${text} <br/> ${currentInformation} `;
}
function closeModalAnswer() {
  document.getElementById("myModal").style.display = "none";
}

export { handleAnswerClick, startStat, displayQuestion };
