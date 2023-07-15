// Global Constants & Variables ---------------------------

// Quiz Questions
const quizQuestions = [
    {
      question: "Which is a correct way to write a comment in JavaScript?",
      choices: ["{# ... #}", "<!--- .... ---!>", "// ....", "\\\\ ...."],
      answer: "// ...."
    },
    {
      question: "Which of the following is the correct syntax to redirect a URL using JavaScript?",
      choices: ["document.location='http://www.example.com';", "navigator.location='http://www.example.com';", "window.location='http://www.example.com';", "browser.location='http://www.example.com';"],
      answer: "window.location='http://www.example.com';"
    },
    {
      question: "Inside which element do you put JavaScript?",
      choices: ["<var>", "<script>", "<section>", "<code>"],
      answer: "<script>"
    },
    {
      question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
      choices: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>", "<script file='xxx.js'>"],
      answer: "<script src='xxx.js'>"
    },
    {
      question: "How do you write 'Hello World' in an alert box?",
      choices: ["msgBox('Hello World');", "alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');"],
      answer: "alert('Hello World');"
    },
    {
      question: "How do you create a function in JavaScript?",
      choices: ["function myFunction()", "function:myFunction()", "function = myFunction()", "function => myFunction()"],
      answer: "function myFunction()"
    },
    {
      question: "How do you call a function named 'myFunction'?",
      choices: ["call function myFunction()", "myFunction()", "call myFunction()", "call myFunction"],
      answer: "myFunction()"
    },
    {
      question: "How to write an IF statement in JavaScript?",
      choices: ["if i = 5 then", "if i == 5 then", "if (i == 5)", "if i = 5"],
      answer: "if (i == 5)"
    },
    {
      question: "How does a WHILE loop start?",
      choices: ["while (i <= 10)", "while i = 1 to 10", "while (i <= 10; i++)", "while (i = 0; i <= 10; i++)"],
      answer: "while (i <= 10)"
    },
    {
      question: "How does a FOR loop typically start?",
      choices: ["for (var i = 0; i <= 5)", "for (var i = 0; i <= 5; i++)", "for var i = 1 to 5", "for (var i <= 5; i++)"],
      answer: "for (var i = 0; i <= 5; i++)"
    },
    {
      question: "How do you round the number 7.25, to the nearest integer?",
      choices: ["Math.round(7.25)", "Math.rnd(7.25)", "round(7.25)", "rnd(7.25)"],
      answer: "Math.round(7.25)"
    },
    {
      question: "How do you find the number with the highest value of x and y?",
      choices: ["Math.max(x, y)", "Math.ceil(x, y)", "ceil(x, y)", "top(x, y)"],
      answer: "Math.max(x, y)"
    },
    {
      question: "Which event occurs when the user clicks on an HTML element?",
      choices: ["onmouseclick", "onchange", "onmouseover", "onclick"],
      answer: "onclick"
    },
    {
      question: "How do you declare a JavaScript variable?",
      choices: ["variable carName;", "var carName;", "v carName;", "variable = carName;"],
      answer: "var carName;"
    },
    {
      question: "Which operator is used to assign a value to a variable?",
      choices: ["-", "*", "=", "x"],
      answer: "="
    },
    {
      question: "What will the following code return: Boolean(10 > 9)",
      choices: ["true", "false", "NaN", "undefined"],
      answer: "true"
    },
    {
      question: "Is JavaScript case-sensitive?",
      choices: ["Yes", "No", "Sometimes", "Depends"],
      answer: "Yes"
    },
];

// Element Connections
const startButton = document.getElementById("startButton");
const countDownText = document.getElementById("countDownText")
const questionZone = document.getElementById("questionZone");
const answerZone = document.getElementById("answerZone");
const scoreText = document.getElementById("score");
const answerButtons = document.getElementsByClassName("answerBtn");
const feedbackText = document.getElementById("answerFeedback");
const highScoreText = document.getElementById("highScore");

const gameTime = 50; //Total Game Time

var questionIndex = 0;
var timeleft = gameTime;
var gameScore = 0;
var highScore = localStorage.getItem('highScore') || 0;



function generateAnswerBtn() {
// This function creates and displays the answer buttons.
// The question is retrieved from the quizQuestions array, and the answer buttons are created.
// The answer buttons are added to the answerZone section.
// The addEventListeners() function is called to add event listeners to the answer buttons.
    var nextQ = quizQuestions[questionIndex];
    for (var i = 0; i < nextQ.choices.length; i++) {
        var choiceButton = document.createElement("button");
        questionZone.textContent = nextQ.question;
        choiceButton.textContent = nextQ.choices[i];
        choiceButton.setAttribute("class", "answerBtn");
        choiceButton.setAttribute("value", nextQ.choices[i]);
        answerZone.appendChild(choiceButton);
    }
    addEventListeners();
}

function addEventListeners() {
// This function adds event listeners to the answer buttons.
// The event listener will be triggered when the user clicks on an answer button.
// The event listener will check if the user's answer is correct.
// If the answer is correct, the question index is incremented and the score is incremented.
// If the answer is incorrect, the timer is decremented by 5 seconds.
      for (var i = 0; i < answerButtons.length; i++) {
        answerButtons[i].addEventListener("click", function(event) {
          if (event.target.value === quizQuestions[questionIndex].answer) {
            questionIndex++;
            answerZone.innerHTML = "";
            gameScore += 1;
            feedbackText.style.color = "green";
            feedbackText.textContent = "Correct! Your score is " + gameScore;
            if (questionIndex === quizQuestions.length) {
              questionZone.textContent = "You got them all! Your score is " + gameScore;
              answerZone.innerHTML = "";
              feedbackText.textContent = "";
              timeleft = 0;
            }
            else {
              generateAnswerBtn();
            }
          } else {
            timeleft -= 5;
            feedbackText.style.color = "red";
            feedbackText.textContent = "Wrong! -5 seconds on the timer!";
          }
        });
      }
  };

startButton.addEventListener("click", function() {
// This function is triggered when the user clicks on the start button.
// The game timer is started, and the first question is displayed.
// The addEventListeners() function is called to add event listeners to the start button.
    var gameTimer = setInterval(function() {
        startButton.style.display = 'none'; //Hide the start button
        countDownText.innerHTML = timeleft + "</br></br> seconds left";
        timeleft -= 1;
        if (timeleft < 0) {
            clearInterval(gameTimer);
            countDownText.textContent = "~Finished!~";
            startButton.textContent = "Try Again?"; 
            startButton.style.display = 'inline'; //Re-display start button
            timeleft = gameTime;
            questionIndex = 0;
            scoreText.textContent = `Score:  ${gameScore}`;
            answerZone.innerHTML = "";
            feedbackText.textContent = "";
            if (gameScore > highScore) {
                highScore = gameScore;
                localStorage.setItem('highScore', highScore);
            }
            highScoreText.textContent = `High Score:  ${highScore}`;
            gameScore = 0;
        }
    }, 1000);
    generateAnswerBtn();
});