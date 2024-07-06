
const questions = [
    { question: "¿Cuál es el animal con el que te identifico🤔?", answer: "pinguino" },
    { question: "¿Cuál fue la primera película que vimos juntos🍿?", answer: "gran turismo" },
    { question: "¿Cuál es mi color favorito😝?", answer: "azul" },
    { question: "Escribe algo bonito sobre nosotros❤️‍🔥", answer: "libre" }
];

let currentQuestion = 0;

document.addEventListener("DOMContentLoaded", () => {
    showQuestion();
});

function showQuestion() {
    if (currentQuestion < questions.length) {
        document.getElementById("question").innerText = questions[currentQuestion].question;
    } else {
        document.getElementById("game").style.opacity = 0;
        setTimeout(() => {
            document.getElementById("game").style.display = "none";
            document.getElementById("end").style.display = "block";
            document.getElementById("end").style.opacity = 1;
        }, 500);
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    if (questions[currentQuestion].answer === "libre" || userAnswer === questions[currentQuestion].answer) {
        currentQuestion++;
        showQuestion();
    } else {
        alert("Respuesta incorrecta. Intenta de nuevo.");
    }
    document.getElementById("answer").value = "";
}

function startGame() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("game").style.opacity = 1;
    showQuestion();
}

function restartGame() {
    currentQuestion = 0;
    document.getElementById("end").style.opacity = 0;
    setTimeout(() => {
        document.getElementById("end").style.display = "none";
        document.getElementById("intro").style.display = "block";
        document.getElementById("intro").style.opacity = 1;
    }, 500);
}
