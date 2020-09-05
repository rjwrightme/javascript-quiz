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
const gameOverSlider = document.querySelector('#gameOverSlider');
const finalScore = document.querySelector('#finalScore');
const submitScore = document.querySelector('#submitScore');

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
    qTitle: 'Inside which HTML element do we put JavaScript code?',
    answerArray: ['<scripting>', '<script>', '<js>', '<javascript>'],
    rightAnswer: 2
}, {
    qTitle: 'How do you write "Hello World" in an alert box?',
    answerArray: ['alert("Hello World");', 'alertBox("Hello World");', 'msgBox("Hello World");', 'msg("Hello World");'],
    rightAnswer: 1
}, {
    qTitle: 'How do you create a function in JavaScript?',
    answerArray: ['function = myFunction() {}', 'function:myFunction() {}', 'function myFunction() {}', 'new.function() {}'],
    rightAnswer: 3
}, {
    qTitle: 'How do you call a function named "myFunction"?',
    answerArray: ['call myFunction()', 'myFunction()', 'call function myFunction()', 'run myFunction()'],
    rightAnswer: 2
}, {
    qTitle: 'How do you write an IF statement in JavaScript?',
    answerArray: ['if i == 5 then', 'if i = 5 then', 'if (i == 5)', 'if i = 5'],
    rightAnswer: 3
}, {
    qTitle: 'How does a FOR loop start?',
    answerArray: ['for (var i = 0; i < 5)', 'for (var i < 5; i++)', 'for (var i = 0; i < 5; i++)', 'for i = 1 to 5'],
    rightAnswer: 3
}, {
    qTitle: 'How can you add a comment in a JavaScript?',
    answerArray: ['// This is a comment', '<!-- This is a comment -->', '\' This is a comment', '# This is a comment'],
    rightAnswer: 1
}, {
    qTitle: 'What is the correct way to write a JavaScript array?',
    answerArray: ['0:"red", 1:"green", 2:"blue"', '(1:"red", 2:"green", 3:"blue")', '{"red", "green", "blue"}', '["red", "green", "blue"]'],
    rightAnswer: 4
}, {
    qTitle: 'How do you round the number 7.25, to the nearest integer?',
    answerArray: ['round(7.25)', 'rnd(7.25)', 'Maths.round(7.25)', 'Math.round(7.25)'],
    rightAnswer: 4
}, {
    qTitle: 'How do you find the number with the highest value of x and y?',
    answerArray: ['Math.max(x,y)', 'Math.ceil(x,y)', 'Math.top(x,y)', 'ceil(x,y)'],
    rightAnswer: 1
}, {
    qTitle: 'Which event occurs when the user clicks on an HTML element?',
    answerArray: ['onmouseover', 'onmouseclick', 'onchange', 'onclick'],
    rightAnswer: 4
}, {
    qTitle: 'What keyword do you use to declare a JavaScript variable?',
    answerArray: ['var', 'let', 'Either var or let', 'const'],
    rightAnswer: 3
}, {
    qTitle: 'What is the "=" operator called?',
    answerArray: ['equality operator', 'assignment operator', 'variable operator', 'equals operator'],
    rightAnswer: 2
}, {
    qTitle: 'What will the following code return: Boolean(10 > 9)',
    answerArray: ['NaN', 'undefined', 'true', 'false'],
    rightAnswer: 3
}, {
    qTitle: 'Which method adds one or more elements to the end of an array?',
    answerArray: ['push()', 'last()', 'put()', 'None of the above'],
    rightAnswer: 1
}, {
    qTitle: 'Which of the following String methods returns the character at the specified index?',
    answerArray: ['charAt()', 'charCodeAt()', 'concat()', 'indexOf()'],
    rightAnswer: 1
}, {
    qTitle: 'Which of the following is not a reserved word in JavaScript?',
    answerArray: ['document', 'while', 'case', 'program'],
    rightAnswer: 4
}, {
    qTitle: 'Which one of the following is correct?',
    answerArray: ['i =+ 5', 'i += 5', 'i = i++5', '+i5'],
    rightAnswer: 2
}, {
    qTitle: 'Which array method rearranges the elements of an array alphabetically?',
    answerArray: ['sort()', 'changeOrder(order)', 'order()', 'alpha()'],
    rightAnswer: 1
}, {
    qTitle: 'If we declare a variable, let test = 1, then later, reassign, stating test = 2, what will happen?',
    answerArray: ['test will equal 2', 'test will equal 1', 'JavaScript will raise a TypeError', 'test will equal undefined'],
    rightAnswer: 1
}, {
    qTitle: 'If we declare a variable, const test = 1, then later, reassign, stating test = 2, what will happen?',
    answerArray: ['test will equal 2', 'test will equal 1', 'JavaScript will raise a TypeError', 'test will equal undefined'],
    rightAnswer: 3
}, {
    qTitle: 'For strict equality comparisons, we should use:',
    answerArray: ['=', '==', '===', 'useStrict'],
    rightAnswer: 3
}, {
    qTitle: 'Which of the following is correct to write “Hello World” on the web page?',
    answerArray: ['console.log("Hello World")', 'print("Hello World")', 'display("Hello World")', 'document.write("Hello World")'],
    rightAnswer: 4
}, {
    qTitle: 'Which of the following is not a valid JavaScript variable name?',
    answerArray: ['2manyCats', 'iLoveCats', 'stop_making_cat_vars', 'None of the above'],
    rightAnswer: 1
}, {
    qTitle: 'What is the alternate name for Java script?',
    answerArray: ['LimeScript', 'ECMScript', 'ECMAScript', 'CoffeeScript'],
    rightAnswer: 3
}]

// Functions
function initQuiz() {
    // Render 1st Question
    renderQuestion();
    // Start Timer
    gameInterval = setInterval(function () {
        if (quizTimer < 0 || questionNum >= 7) {
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
    }, 600);
}

function wrongAnswer() {
    incorrectSlider.style.display = 'initial';
    quizTimer -= wrongAnswerPenalty;
    setTimeout(function () {
        incorrectSlider.style.display = 'none';
    }, 600);
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
    let progressPercent = (questionNum + 1) * 12.5;
    progressBar.style.width = progressPercent + '%';
}

//gameOver()
function gameOver() {
    finalScore.textContent = quizTimer < 0 ? 0 : quizTimer;
    quizTimerHandle.style.visibility = 'hidden';
    timerCircle.style.strokeDashoffset = 0;
    gameOverSlider.style.display = 'initial';
}

function readLocalStorage() {
    let savedScores = localStorage.getItem("savedScores");
    if (savedScores != null) {
        return JSON.parse(localStorage.getItem("savedScores"));
    }
}

// Event Handlers
// Multiple Choice Clicks
quizAnswers.addEventListener('click', function (e) {
    if (e.target.className === 'btn') {
        // Use the button ID to extract a numeric answer
        let answer = parseInt(e.target.id.slice(-1));
        checkAnswer(answer);
    };
});

// High Score Submission
submitScore.addEventListener('submit', function (e) {
    // collect name and score
    let initials = e.target[0].value;
    let scoreSubmission = {
        name: initials,
        score: quizTimer < 0 ? 0 : quizTimer
    }
    // check if there's any saved scores from previous completions
    let savedScores = readLocalStorage();
    if (savedScores != undefined) {
        savedScores.push(scoreSubmission);
    } else {
        savedScores = [scoreSubmission];
    }
    // store them in localStorage
    localStorage.setItem("savedScores", JSON.stringify(savedScores));
})

initQuiz();