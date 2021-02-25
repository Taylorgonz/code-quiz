


// selection of questions
const questions = [{
    question: "What does HTML stand for?",
    answers: ["Holding Too Many Legumes", "Hyper Type Making Language", "Hyper Text Markup Language", "Hot Topic Members List"],
    correctAnswer: 2

}, {
    question: "What does CSS stand for?",
    answers: ["Cascading Style Sheet", "Coloring Sheet Status", "Creating Safe Space", "Condescending"],
    correctAnswer: 0

}, {
    question: "How do you write 'Hello World' in and alert box",
    answers: ["alertbox('Hello World')", "msg('Hello World');", "alert('Hello World');", "popUp('Hello World')"],
    correctAnswer: 2

}, {
    question: "How do you call and class with jquery",
    answers: ["call('something');", "$('.something');", "comeHere('#something');", "helloWorld('something');"],
    correctAnswer: 1

}, {
    question: "What does JSON stand for?",
    answers: ["Jerry Seinfeld on Neptune", "JavaScript Object Notation", "JavaScript Order Node", "Java Stop Origin Now"],
    correctAnswer: 1

}, {
    question: "You can use a ____ in Javascript to store multiples of similar data(strings, integers, etc...)?",
    answers: ["Booleans", "Concatenation", "API's", "Arrays"],
    correctAnswer: 3

}, {
    question: "in a CSS file what would '.something { }' be calling on?",
    answers: ["the class 'something'", "The element 'something'", "The value 'something'", "The type 'something'"],
    correctAnswer: 0

}, {
    question: "What do you us API's for?",
    answers: ["To push JavaScript to the HTML page", "It's used as a library of CSS with predetermend styling, that can be called upon within the HTML file with classes", "It's used to access data and interact with external softwar components,operating systems, or microservices", "It's used to liven the party up"],
    correctAnswer: 2

}]


let currentQuestion = 0;
let correctAnswers = 0;
const quizOver = false;
const userAnswers = [];
let timeLeft = 30;
let startCountdown;
let score = 0;

const savedScores = JSON.parse(localStorage.getItem("savedScores")) || [];

const Max_high_score = 5;
console.log(savedScores)



$(document).ready(function () {


    let answerEl = $("#answers");
    let questionEl = $("#question");
    let timerEl = $("#timer");
    let infoEl = $("#info");
    let reset = $('#reset');
    let finalScore = $('#finalScore');
    let highScore = $('#highScore');
    // timer function

    function countdown() {
        timeLeft--;
        timerEl.text('Time remaining: ' + timeLeft);
        timer();
    };

    function timer() {
        startCountdown = setTimeout(countdown, 1000);


        // timerDisplay = $('#timer')
        if (timeLeft >= 0) {
            // condition for quiz to be overs

            // going to push game over screen
        }
        if (timeLeft === 0) {
            answerEl.remove()
            endGame();
            localStorage.setItem('mostRecentScore', score);
        }

    };


    // variable that creates button element with classes



    function startGame() {
        // creating button function
        let startButton = $("<button>");
        startButton.addClass("btn btn-dark startButton").text("START")
        // title for start 
        questionEl.text("CODING QUIZ")
        // instructions on how the game works
        infoEl.text("You have 30 seconds to answer as many of the questions as possible. Once the time runs out/you complete all the questions you can save your score and try again! note: choose carefully because once you choose theres no turning back!");
        // start button
        answerEl.append(startButton);

        // start button function
        $(".startButton").on("click", function (e) {
            answerEl.empty();
            displayCurrentQuestion();
            infoEl.text("")
            timer();
        });
    };
    startGame();
    // calling the startScreen function

    // reset button function 
    function resetButton() {
        let resetButton = reset.addClass("btn btn-danger reset").text("reset");
        resetButton.append(reset);
        resetButton.on("click", function (event) {
            event.stopPropagation();
            location.reload();
        });
    }
    // function that displays current question
    function displayCurrentQuestion() {
        if (currentQuestion < questions.length && timeLeft > 0) {
            resetButton();
        

        // the current questions, question selector
        let question = questions[currentQuestion].question;
        let questionClass = questionEl;
        let choiceList = answerEl;
        let numChoices = questions[currentQuestion].answers.length;
        // set the questions class to display current question
        $(questionClass).text(question);
        // loop for creating the multiple answer choices
        for (let i = 0; i < numChoices; i++) {

            // variable that holds 
            let choice = questions[currentQuestion].answers[i];

            if (userAnswers[currentQuestion] == i) {
                $('<button class = "btn btn-dark choiceBtn" value = ' + i + '>' + choice + '</button>').appendTo(choiceList);
            }
            else {
                $('<button class = "btn btn-dark choiceBtn" value = ' + i + '>' + choice + '</button>').appendTo(choiceList);
            }

        }
        nextQuestion();
    }
        else {
        answerEl.remove()
        endGame();
    }
};
// function to move through questions
function nextQuestion() {
    let button = $('.choiceBtn');
    // loop to to check answers
    for (let i = 0; i < button.length; i++) {
        button[i].addEventListener("click", function (e) {
            let correctAns = questions[currentQuestion].correctAnswer;
            let userChoice = parseInt(e.target.getAttribute("value"));
            if (userChoice === correctAns) {
                score += 10;
            } else {
                timeLeft -= 5;
            }
            // next question once the current question has been answered
            currentQuestion++
            $(".answers").empty();
            displayCurrentQuestion();


            console.log(correctAns);
            console.log(userChoice);
            console.log(score);

        });

    }
};

// high score display function
function highScores() {

    highScore.append(`<h2> HighScores </h2>`)
    for (let i = 0; i < 5; i++) {
        let rendInitial = savedScores[i].initial;
        let rendScore = savedScores[i].score;

        highScore.append(`<h3>${rendInitial}: ${rendScore}</h3>`);
        console.log(rendInitial);
    }
}

// end of the game function
function endGame() {
    clearTimeout(startCountdown);
    // reset.remove();

    questionEl.text("GAME OVER!");
    finalScore.append("<h3>Final Score: " + score + "</h3>").append("<input type='text' name='username' id='initials' placeholder='enter initials' maxlength='5'/> ").append("<button type='button' class='btn btn-dark submit'>Submit</button>");

    saveHighScores();


    // allowing submit button to be pressed if input exists

}
});

function saveHighScores() {

    $('.submit').on("click", function (event) {
        initials = $("#initials")[0].value;

        if (initials !== '' || null) {
            saveScore = {
                initial: initials,
                score: score
            };

            savedScores.push(saveScore);

            savedScores.sort((a, b) => b.score - a.score);

            savedScores.splice(5)

            localStorage.setItem("savedScores", JSON.stringify(savedScores));

            highScores
            console.log(savedScores);
        }
    })
}