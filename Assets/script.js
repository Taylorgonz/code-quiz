


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
    question: "How would you add text to the element with id='something' with JavaScript",
    answers: ["document.selector('.something')","document.getElementById('#something').textContent += 'Hello!';", "document.textcontent(#something, 'Hello!)","addText.textContent('Hello')= #something;"],
    correctAnswer: 1

},{
    question: "",
    answers: ["Holding Too Many Legumes","Hyper Type Making Language", "Hyper Text Markup Language","Hot Topic Members List"],
    correctAnswer: "Hyper Text Markup Language"

},{
    question: "What does HTML stand for?",
    answers: ["Holding Too Many Legumes","Hyper Type Making Language", "Hyper Text Markup Language","Hot Topic Members List"],
    correctAnswer: "Hyper Text Markup Language"

}]

let currentQuestion = 0;
let correctAnswers= 0;
let quizOver= false;
let userAnswers= [];
let timer= 60;
let score = 0;
let finalScore;



$(document).ready(function() {

// timer function
function countdown() {
    let interval = setInterval(function() {
        timer--;

        timerDisplay= $('.timer');
        
        if(timer >= 0) {
            // condition for quiz to be overs
            timerDisplay.html('Time Remaining: ' + timer);

            // going to push game over screen
        }
        if(timer===0) {
            clearInterval(timer);
            // gameOver();
        }

    }, 1000);
};               


    // variable that creates button element with classes
    let startButton= $("<button>");
    startButton.addClass("btn btn-success startButton").text("START")
    // title for start 
    $(".question").text("CODING QUIZ")
    // instructions on how the game works
    $(".info").text("You have one minute to answer as many of the questions as possible. Once the time runs out/you complete all the questions you can save your score and try again! note: choose carefully because once you choose theres no turning back!");
    // start butto
    $(".answers").append(startButton);

    
    $(".startButton").on("click", function(e) {
        countdown();
        $(".startButton").remove();
        displayCurrentQuestion();
        $(".info").text("")
    });
    
// calling the startScreen function

function displayCurrentQuestion() {
    // the current questions, question selector
    let question = questions[currentQuestion].question;
    let questionClass= $("h2.question");
    let choiceList=$("div.answers");
    let numChoices= questions[currentQuestion].answers.length;
    // set the questions class to display current question
    $(questionClass).text(question);
    
    let answer;

    let answerbtn = $("<button>");
    
    for (let i = 0; i < numChoices; i ++) {
        

        choice = questions[currentQuestion].answers[i];

        if(userAnswers[currentQuestion]== i) {
           $('<button class = "btn btn-dark choiceBtn" value = '+ i + '>' + choice + '</button>').appendTo(choiceList);
        }
        else {
            $('<button class = "btn btn-dark choiceBtn" value = '+ i + '>' + choice + '</button>').appendTo(choiceList);
        }
        
    }
    nextQuestion();
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
            timer -= 10;
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