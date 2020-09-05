// read localStorage
// if no files, display a message "There are currently no saved scores. Be sure to save your score after completing the quiz to bask in your own glory."

const scoreList = document.querySelector('#scoreList');
let savedScores;

function readLocalStorage() {
    savedScores = localStorage.getItem("savedScores");
    if (savedScores != null) {
        savedScores = JSON.parse(localStorage.getItem("savedScores"));
    }
}

function renderHighScores() {
    readLocalStorage();
    // if we do find saved scores, loop through them and add them to the DOM
    if (savedScores != undefined) {
        for (let i = 0; i < savedScores.length; i++) {
            let score = document.createElement('li');
            score.textContent = `${savedScores[i].name} -> ${savedScores[i].score}`;
            scoreList.appendChild(score);
        }
    } else {
        let noScore = document.createElement('li');
        noScore.textContent = 'There are currently no saved scores. Be sure to save your score after completing the quiz to bask in your own glory.';
        scoreList.appendChild(noScore);
    }
}

renderHighScores();