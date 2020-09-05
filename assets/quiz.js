// Top UI Handles
const questionNumHandle = document.querySelector('#questionCounter');
const progressBar = document.querySelector('#progressBarFill');
const quizTimerHandle = document.querySelector('#timer');
const timerCircle = document.querySelector('#timerCircle');

// Quiz Handles
const quizQuestion = document.querySelector('#quizQuestion');
const quizAnswers = document.querySelector('#answers');
const correctSlider = document.querySelector('#correctSlider');
const incorrectSlider = document.querySelector('#incorrectSlider');

// Variables
let questionNum = 0;
let quizTimer = 75;
let wrongAnswerPenalty = 15;

// Question Array
// Each object in the array will need:
// questionTitle
// answerArray [answer1, answer2, answer3, answer4]
// rightAnswer 0-3
const qArray = [{
    qTitle: 'Test Question. 3 is the right answer',
    answerArray: ['pick me!', 'or me!', 'especially me!', 'forget me!'],
    rightAnswer: 3
}, {
    qTitle: 'Another Test Question. 1 is the right answer',
    answerArray: ['pick me!', 'pick me!', 'pick me!', 'pick me!'],
    rightAnswer: 1
}, {
    qTitle: 'Test Question #3. 4 is the right answer',
    answerArray: ['pick me!', 'pick me!', 'pick me!', 'pick me!'],
    rightAnswer: 4
}]

// Functions
function initQuiz() {
    // Render 1st Question
    renderQuestion();
    // Start Timer
    gameInterval = setInterval(function () {
        if (quizTimer < 0) {
            timerCircle.style.strokeDashoffset = 125;
            clearInterval(gameInterval);
            gameOver(); //Needs to be definied
        } else {
            quizTimerHandle.textContent = quizTimer;
            timerCircle.style.strokeDashoffset = (75 - quizTimer) * 1.67;
            quizTimer--;
        }
    }, 1000);
}

function checkAnswer(answer) {
    if (answer === qArray[questionNum].rightAnswer) {
        rightAnswer();
    } else {
        wrongAnswer();
    }
    questionNum++;
    renderQuestion();
}

function rightAnswer() {
    correctSlider.style.display = 'initial';
    setTimeout(function () {
        correctSlider.style.display = 'none';
    }, 1000);
}

function wrongAnswer() {
    incorrectSlider.style.display = 'initial';
    quizTimer -= wrongAnswerPenalty;
    setTimeout(function () {
        incorrectSlider.style.display = 'none';
    }, 1000);
}

function renderQuestion() {
    let question = qArray[questionNum];
    quizQuestion.textContent = question.qTitle;
    // get an array of the multiple choice buttons
    let buttons = quizAnswers.children;
    // loop through the buttons to populate the multiple choice options
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].textContent = question.answerArray[i];
    }
    // Update the progress bar in the top UI
    updateProgress()
}

function updateProgress() {
    questionNumHandle.textContent = questionNum + 1;
    let progressPercent = (questionNum + 1) * 4;
    progressBar.style.width = progressPercent + '%';
}

//gameOver()


// Event Handlers
// Delegate event handler on quizAnswers if event.target == .btn
quizAnswers.addEventListener('click', function (e) {
    if (e.target.className === 'btn') {
        // Use the button ID to extract a numeric answer
        let answer = parseInt(e.target.id.slice(-1));
        checkAnswer(answer);
    };
});

initQuiz();