
const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");


const highScores = JSON.parse(localStorage.getItem("highScores")) || [ ];

//maximo de usuarios que será salvo ao clicar no botão save
const MAX_HIGH_SCORES = 5;

//console.log(highScores);

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup",() =>{
    console.log(username.value);
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) =>{
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    };

    
    highScores.push(score);

    highScores.sort((a,b) => b.score - a.score);

    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem("highScores",JSON.stringify(highScores));
    
    window.location.assign("index.html");

  //  console.log(highScores);
    
};