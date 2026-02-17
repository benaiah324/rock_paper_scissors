// =====================================================
// ROCK PAPER SCISSORS - COMPLETE ARCADE VERSION
// =====================================================


// ==========================
// DOM ELEMENTS
// ==========================

const buttons = document.querySelectorAll(".buttons button");
const playerImage = document.getElementById("playerImage");
const computerImage = document.getElementById("computerImage")
const resultDiv = document.getElementById("result");

const playerScoreSpan = document.getElementById("playerScore");
const computerScoreSpan = document.getElementById("computerScore");

const difficultySelect = document.getElementById("difficulty");

const winnerModal = document.getElementById("winnerModal");
const winnerText = document.getElementById("winnerText");
const restartBtn = document.getElementById("restartBtn");

const confettiCanvas = document.getElementById("confetti");
const confettiCtx = confettiCanvas.getContext("2d");

const particlesCanvas = document.getElementById("particles");
const particlesCtx = particlesCanvas.getContext("2d")

// ==========================
// INITIAL SETUP
// ==========================

confettiCanvas.width = particlesCanvas.width = window.innerWidth;
confettiCanvas.height = particlesCanvas.height = window.innerHeight;

let playerScore = Number(localStorage.getItem("playerScore")) || 0;
let computerScore = Number(localStorage.getItem("computerScore")) || 0;

playerScoreSpan.textContent = playerScore;
computerScoreSpan.textContent = computerScore;

// Player pattern memory
let playerHistory = {
  rock: 0,
  paper: 0,
  scissors: 0
};

// ==========================
// GAME BUTTON EVENTS
// ==========================

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    animateShake(playerChoice);
  });
});

// ==========================
// HAND SHAKE ANIMATION
// ==========================

function animateShake(playerChoice) {

  const choices = ["rock", "paper", "scissors"];
  let index = 0;
  let count = 0;

  const interval = setInterval(() => {

    playerImage.src = `./images/${choices[index]}.png`;
    computerImage.src = `./images/${choices[index]}.png`;

    index = (index + 1) % choices.length;
    count++;

    if (count >= 12) {
      clearInterval(interval);

      const computerChoice = getComputerChoice();

      playerImage.src = `./images/${playerChoice}.png`;
      computerImage.src = `./images/${computerChoice}.png`;

      evaluateRound(playerChoice, computerChoice);
    }

  }, 100);
}

// ==========================
// AI LOGIC
// ==========================

function getComputerChoice() {

  const choices = ["rock", "paper", "scissors"];

  // EASY MODE
  if (difficultySelect.value === "easy") {
    return choices[Math.floor(Math.random() * 3)];
  }

  // HARD MODE - Pattern Learning
  const mostUsed = Object.keys(playerHistory).reduce((a, b) =>
    playerHistory[a] > playerHistory[b] ? a : b
  );

  if (mostUsed === "rock") return "paper";
  if (mostUsed === "paper") return "scissors";
  if (mostUsed === "scissors") return "rock";

  return choices[Math.floor(Math.random() * 3)];
}

// ==========================
// ROUND EVALUATION
// ==========================

function evaluateRound(playerChoice, computerChoice) {

  const winner = determineWinner(playerChoice, computerChoice);

  if (winner === "Player") {
    resultDiv.textContent = "🔥 YOU WIN!";
    launchConfetti();
  }
  else if (winner === "Computer") {
    resultDiv.textContent = "💀 COMPUTER WINS!";
  }
  else {
    resultDiv.textContent = "⚖️ IT'S A TIE!";
  }

  updateScore(winner);
  learnFromPlayer(playerChoice);
}

// ==========================
// WINNER LOGIC
// ==========================

function determineWinner(player, computer) {
  if (player === computer) return "Tie"
  

  const winningRules = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  const humanWins = winningRules[player] === computer;

  return humanWins
    ? "Player" : "Computer"

}

// ==========================
// SCORE MANAGEMENT
// ==========================

function updateScore(winner) {
  console.log(winner)
  if (winner === "Player") playerScore++;
  if (winner === "Computer") computerScore++;

  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;

  localStorage.setItem("playerScore", playerScore);
  localStorage.setItem("computerScore", computerScore);

  if (playerScore === 5 || computerScore === 5) {
    showWinner();
  }
}

function showWinner() {
  winnerModal.style.display = "flex";
  winnerText.textContent =
    playerScore === 5
      ? "🏆 YOU ARE THE CHAMPION!"
      : "💀 COMPUTER DOMINATES!";
}

restartBtn.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;

  localStorage.setItem("playerScore", 0);
  localStorage.setItem("computerScore", 0);

  playerScoreSpan.textContent = 0;
  computerScoreSpan.textContent = 0;

  winnerModal.style.display = "none";
});

// ==========================
// PLAYER LEARNING SYSTEM
// ==========================

function learnFromPlayer(choice) {
  playerHistory[choice]++;
}

// ==========================
// CONFETTI SYSTEM
// ==========================

function launchConfetti() {

  let pieces = [];

  for (let i = 0; i < 120; i++) {
    pieces.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      size: Math.random() * 6 + 4,
      speed: Math.random() * 3 + 2,
      color: `hsl(${Math.random() * 360},100%,50%)`
    });
  }

  function animate() {

    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    pieces.forEach((p, i) => {
      confettiCtx.fillStyle = p.color;
      confettiCtx.fillRect(p.x, p.y, p.size, p.size);

      p.y += p.speed;

      if (p.y > confettiCanvas.height) {
        pieces.splice(i, 1);
      }
    });

    if (pieces.length > 0) {
      requestAnimationFrame(animate);
    }
  }

  animate();
}

// ==========================
// NEON PARTICLE BACKGROUND
// ==========================

let particles = [];

for (let i = 0; i < 70; i++) {
  particles.push({
    x: Math.random() * particlesCanvas.width,
    y: Math.random() * particlesCanvas.height,
    r: Math.random() * 2 + 1,
    dx: Math.random() - 0.5,
    dy: Math.random() - 0.5
  });
}

function animateParticles() {

  particlesCtx.clearRect(0, 0, particlesCanvas.width, particlesCanvas.height);

  particles.forEach(p => {

    particlesCtx.beginPath();
    particlesCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    particlesCtx.fillStyle = "#00ffff";
    particlesCtx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > particlesCanvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > particlesCanvas.height) p.dy *= -1;
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();






































// let view = {
//   btnHuman : Array.from(document.querySelectorAll(".humanChoice")),
//   display: document.querySelector('.display'),
//   result : document.querySelector('.result'),
//   message : document.querySelector('.message'),
//   displayHumanScore : document.querySelector('#human-score'),
//   displayComputerScore : document.querySelector('#computer-score'),
//   humanScore : 0,
//   computerScore: 0,
//   rounds: 5,
// }




// view.btnHuman.forEach(btn => {
  
//   btn.addEventListener('click', (e) => {
//     const humanSelection = e.target.textContent.toLowerCase()
//     const computerSelection  = getComputerChoice()

//     view.result.textContent = `Result: ${playRound(humanSelection, computerSelection).result}`

//     displayScore(view.humanScore, view.computerScore)
//     if (view.humanScore == view.rounds || view.computerScore == view.rounds) {
//       displayWinner(view.humanScore, view.computerScore)
//     }
    
//   })
// });




// // Playing a single round
// function playRound(humanChoice, computerChoice) {
//   if (humanChoice === computerChoice) {
//     return {
//       result: `It's a draw! You both chose ${humanChoice}.`,
//     };
//   }

//   const winningRules = {
//     rock: "scissors",
//     paper: "rock",
//     scissors: "paper",
//   };

//   const humanWins = winningRules[humanChoice] === computerChoice;

//   return humanWins
//     ? {
//       result: `You win! ${humanChoice} beats ${computerChoice}.`,
//       human: view.humanScore += 1,
//     }
//     : {
//       result: `You lose! ${computerChoice} beats ${humanChoice}.`,
//       computer: view.computerScore += 1
//     };
//   }
  

//   // Getting the winner after the full rounds
//   function displayScore(humanScore, computerScore) {
//     view.displayHumanScore.textContent = `Player Score: ${humanScore}`
//     view.displayComputerScore.textContent = `Computer Score: ${computerScore}`

    
//   }

//   function displayWinner(humanScore, computerScore) {

//     view.message.textContent = humanScore > computerScore ? `Hurray Player are the Winner after ${view.rounds} rounds` : humanScore < computerScore ? `Sorry you lost after ${view.rounds} rounds` : `Draw!!! No Victor, No Vanquish`

//   }



// // Get Computer choice
// function getComputerChoice() {
//   const choices = ["rock", "paper", "scissors"];
//   const randomIndex = Math.floor(Math.random() * choices.length);
//   return choices[randomIndex];
// }
