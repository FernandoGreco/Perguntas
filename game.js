const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
.then(res =>{
    return res.json();
     
})
.then(loadedQuestions =>{
    console.log(loadedQuestions.results);
   questions = loadedQuestions.results.map(loadedQuestion =>{
        const formatedQuestion = {
            question: loadedQuestion.question
        };

        const ansewrChoices = [...loadedQuestion.incorrect_answers];
        formatedQuestion.ansewr = Math.floor(Math.random() * 3) + 1;
        ansewrChoices.splice(formatedQuestion.ansewr -1, 0,
        loadedQuestion.correct_answer);

        ansewrChoices.forEach((choice,index)=>{
            formatedQuestion["choice" + (index +1)] = choice;
        })

        return formatedQuestion;
    });
  
       startGame();
})
.catch( err=>{
 console.err(err);
});

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();

    
       game.classList.remove("hidden");
       loader.classList.add("hidden");
  
    };

getNewQuestion = ( ) => {
    

    if(questionCounter == MAX_QUESTIONS){

        localStorage.setItem("mostRecentScore",score);
        //quando for feita todas perguntas, ou seja questions igual a 0, vai para o final da página
      return window.location.assign('end.html');
   }

    questionCounter++;
    progressText.innerHTML = 'Question' + ' '  + questionCounter + '/' + MAX_QUESTIONS;

    let largura = (questionCounter / MAX_QUESTIONS) *100;
    //aqui altera o progress bar, calcula o espaço de acordo com a quantidade de questões
    progressBarFull.style.width = largura + '%';
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice =>{
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion ["choice" + number];
    });

    availableQuestions.splice(questionIndex,1);

    acceptingAnswers = true;

    
};

    choices.forEach(choice =>{
        choice.addEventListener("click", e =>{
            if(!acceptingAnswers) return;

            acceptingAnswers = false;
            const selectedChoice = e.target;
            const selectedAnser = selectedChoice.dataset["number"];

            //verifica se resposta esta correta
            let classToApply = 'incorrect';
            if(selectedAnser == currentQuestion.ansewr){
                classToApply = 'correct';
                score++;
                scoreText.innerHTML = score;
            }

           selectedChoice.parentElement.classList.add(classToApply);

            setTimeout(() => {
                selectedChoice.parentElement.classList.remove(classToApply);
                getNewQuestion();
            },1000);

        
          
        });
    });