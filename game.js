const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [ 

       {
        question: "Qual forma correta de inserir JavasScript no HTML?",
        choice1: "<script>",
        choice2: "<javascript>",
        choice3: "<js>",
        choice4: "<scripting>",
        ansewr:1
    },
    {
    question: "Qual a sintaxe corrreta para referenciar um script externo chamado 'xxx.js'",
        choice1: "<script href='xxx.js>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        ansewr:3
    },
    {
        question: "Como escrever 'Ola mundo' em um box de alerta?",
            choice1: "msgBox('Ola mundo')",
            choice2: "alertBox('Ola mundo')",
            choice3: "msg('Ola mundo')",
            choice4: "alert('Ola mundo')",
            ansewr:4
        },
]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () =>{
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
    };

getNewQuestion = ( ) => {

  //  if(!availableQuestions.length == 0 || questionCounter > MAX_QUESTIONS){
        //quando for feita todas perguntas, ou seja questitons igual a 0, vai para o final da página
     //   return window.location.assign('/end.html');

 //   }

    questionCounter++;
    questionCounterText.innerHTML = questionCounter + "/" + MAX_QUESTIONS;
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

startGame();