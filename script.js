let view = {
  btnHuman : Array.from(document.querySelectorAll(".humanChoice")),
  display: document.querySelector('.display'),
  result : document.querySelector('.result'),
  message : document.querySelector('.message'),
  displayHumanScore : document.querySelector('#human-score'),
  displayComputerScore : document.querySelector('#computer-score'),
  humanScore : 0,
  computerScore: 0,
  rounds: 5,
}




view.btnHuman.forEach(btn => {
  
  btn.addEventListener('click', (e) => {
    const humanSelection = e.target.textContent.toLowerCase()
    const computerSelection  = getComputerChoice()

    view.result.textContent = `Result: ${playRound(humanSelection, computerSelection).result}`

    displayScore(view.humanScore, view.computerScore)
    if (view.humanScore == view.rounds || view.computerScore == view.rounds) {
      displayWinner(view.humanScore, view.computerScore)
    }
    
  })
});




// Playing a single round
function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return {
      result: `It's a draw! You both chose ${humanChoice}.`,
    };
  }

  const winningRules = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  const humanWins = winningRules[humanChoice] === computerChoice;

  return humanWins
    ? {
      result: `You win! ${humanChoice} beats ${computerChoice}.`,
      human: view.humanScore += 1,
    }
    : {
      result: `You lose! ${computerChoice} beats ${humanChoice}.`,
      computer: view.computerScore += 1
    };
  }
  

  // Getting the winner after the full rounds
  function displayScore(humanScore, computerScore) {
    view.displayHumanScore.textContent = `Player Score: ${humanScore}`
    view.displayComputerScore.textContent = `Computer Score: ${computerScore}`

    
  }

  function displayWinner(humanScore, computerScore) {

    view.message.textContent = humanScore > computerScore ? `Hurray Player are the Winner after ${view.rounds} rounds` : humanScore < computerScore ? `Sorry you lost after ${view.rounds} rounds` : `Draw!!! No Victor, No Vanquish`

  }



// Get Computer choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}
