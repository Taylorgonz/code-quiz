


// selection of questions
const questions = [{
    question: "What does HTML stand for?",
    answers: ["Holding Too Many Legumes","Hyper Type Making Language", "Hyper Text Markup Language","Hot Topic Members List"],
    correctAnswer: 2

},{
    question: "What does CSS stand for?",
    answers: ["Cascading Style Sheet","Coloring Sheet Status", "Creating Safe Space","Condescending"],
    correctAnswer: 0

},{
    question: "How do you write 'Hello World' in and alert box",
    answers: ["alertbox('Hello World')","msg('Hello World');", "alert('Hello World');","popUp('Hello World')"],
    correctAnswer: 2

},{
    question: "How do you call and class with jquery",
    answers: ["call('something');","$('.something');", "comeHere('#something');","helloWorld('something');"],
    correctAnswer: 1

},{
    question: "What does JSON stand for?",
    answers: ["Jerry Seinfeld on Neptune","JavaScript Object Notation", "JavaScript Order Node","Java Stop Origin Now"],
    correctAnswer: 1

},{
    question: "You can use a ____ in Javascript to store multiples of similar data(strings, integers, etc...)?",
    answers: ["Booleans","Concatenation", "API's","Arrays"],
    correctAnswer: 3

},{
    question: "in a CSS file what would '.something { }' be calling on?",
    answers: ["the class 'something'", "The element 'something'", "The value 'something'","The type 'something'"],
    correctAnswer: 0

},{
    question: "What do you us API's for?",
    answers: ["To push JavaScript to the HTML page", "It's used as a library of CSS with predetermend styling, that can be called upon within the HTML file with classes","It's used to access data and interact with external softwar components,operating systems, or microservices", "It's used to liven the party up"],
    correctAnswer: 2

}]

// let answerEl = document.getElementById("answers");
// let questionEl = document.getElementById("question");
// let timerEl = document.getElementById("timer");
// let infoEl = document.getElementById("info");
let currentQuestion = 0;
let correctAnswers= 0;
let quizOver= false;
let userAnswers= [];
let timer= 30;
let score = 0;
let finalScore;



$(document).ready(function() {

let answerEl = $("#answers");
let questionEl = $("#question");
let timerEl = $("#timer");
let infoEl = $("#info");
// timer function
function countdown() {
    let interval = setInterval(function() {
        timer--;
        // timerDisplay = $('#timer')
        if(timer >= 0) {
            // condition for quiz to be overs
            timerEl.text("Time remaining: " + timer);

            // going to push game over screen
        }
        if(timer===0) {
            clearInterval(timer);
            endGame();
            
        }

    }, 1000);
};               


    // variable that creates button element with classes
    
    let startButton= $("<button>");
    
    startButton.addClass("btn btn-dark startButton").text("START")
    function startGame() {
    // title for start 
    questionEl.text("CODING QUIZ")
    // instructions on how the game works
    infoEl.text("You have one minute to answer as many of the questions as possible. Once the time runs out/you complete all the questions you can save your score and try again! note: choose carefully because once you choose theres no turning back!");
    // start button
    answerEl.append(startButton);

    
    $(".startButton").on("click", function(e) {
        countdown();
        answerEl.empty();
        displayCurrentQuestion();
        infoEl.text("")
    });
};
    startGame();
// calling the startScreen function

function displayCurrentQuestion() {
    if(currentQuestion< questions.length && timer > 0 ){
    // the current questions, question selector
    let question = questions[currentQuestion].question;
    let questionClass= questionEl;
    let choiceList= answerEl;
    let numChoices= questions[currentQuestion].answers.length;
    // set the questions class to display current question
    $(questionClass).text(question);
    // loop for creating the multiple answer choices
    for (let i = 0; i < numChoices; i ++) {
        
        // variable that holds 
        let choice = questions[currentQuestion].answers[i];

        if(userAnswers[currentQuestion]== i) {
           $('<button class = "btn btn-dark choiceBtn" value = '+ i + '>' + choice + '</button>').appendTo(choiceList);
        }
        else {
            $('<button class = "btn btn-dark choiceBtn" value = '+ i + '>' + choice + '</button>').appendTo(choiceList);
        }
        
    }
    nextQuestion();
}
else {

    $('h2.answers').text("Game over!")
    
}
};

function nextQuestion () {
    let button= $('.choiceBtn');

    for (let i = 0; i<button.length; i++) {
        button[i].addEventListener("click", function(e) {
            let correctAns = questions[currentQuestion].correctAnswer;
            let userChoice= parseInt(e.target.getAttribute("value"));
        if(userChoice === correctAns) {
            score += 10;
        } else {
            timer -= 5;
        }
        
        currentQuestion++
        $(".answers").empty();
        displayCurrentQuestion();

        
        console.log(correctAns);
        console.log(userChoice);
        console.log(score);

    });

}
};

});