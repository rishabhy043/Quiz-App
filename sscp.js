const questions = [
    {
      question: "Biggest Animal on the earth",
      answers: [
        { text: "Rabbit", correct: false },
        { text: "Elephant", correct: true },
        { text: "Camel", correct: false },
        { text: "Buffalow", correct: false }
      ]
    },
    {
      question: "Smallest Animal on the earth",
      answers: [
        { text: "Rabbit", correct: false },
        { text: "Elephant", correct: false },
        { text: "Camel", correct: false },
        { text: "Myxobolus shekel", correct: true }
      ]
    },
    {
      question: "Biggest state on the India",
      answers: [
        { text: "Goa", correct: false },
        { text: "Rajasthan", correct: true },
        { text: "chennai", correct: false },
        { text: "jammu & Kashmir", correct: false }
      ]
    },
    {
      question: "Smallest state of india",
      answers: [
        { text: "Goa", correct: true },
        { text: "Rajasthan", correct: false },
        { text: "chennai", correct: false },
        { text: "jammu & Kashmir", correct: false }
      ]
    }
  ];
  
  const questionelement = document.getElementById("question");
  const answerbutton = document.getElementById("answer-buttons");
  const nextbutton = document.getElementById("next-btn");
  
  let currentquestionindex = 0;
  let score = 0;
  
  function startquiz() {
    currentquestionindex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showquestion();
  }
  
  function showquestion() {
    resetstate();
    let currentquestion = questions[currentquestionindex];
    let questionNumber = currentquestionindex + 1;
    questionelement.innerHTML = questionNumber + ". " + currentquestion.question;
  
    currentquestion.answers.forEach(answer => {
      const button = document.createElement("button");
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerbutton.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectanswer);
    });
  }
  
  function resetstate() {
    nextbutton.style.display = "none";
    while (answerbutton.firstChild) {
      answerbutton.removeChild(answerbutton.firstChild);
    }
  }
  
  function selectanswer(e) {
    const selectbtn = e.target;
    const iscorrect = selectbtn.dataset.correct === "true";
    if (iscorrect) {
      selectbtn.classList.add("correct");
      score++;
    } else {
      selectbtn.classList.add("incorrect");
    }
    Array.from(answerbutton.children).forEach(button => {
      if (button.dataset.correct === "true") {
        button.classList.add("correct");
      }
      button.disabled = true;
    });
    nextbutton.style.display = "block";
  }
  
  function showscore() {
    resetstate();
    questionelement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
  }
  
  function handleNextButton() {
    currentquestionindex++;
    if (currentquestionindex < questions.length) {
      showquestion();
    } else {
      showscore();
    }
  }
  
  nextbutton.addEventListener("click", () => {
    if (currentquestionindex < questions.length) {
      handleNextButton();
    } else {
      startquiz();
    }
  });
  
  startquiz();
  