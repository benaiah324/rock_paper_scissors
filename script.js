
// Get Computer choice
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

// Get Human choice
function getHumanChoice() {
  const CHOICES = ["rock", "paper", "scissors"];

  const input = prompt(
    "Enter 0 for rock, 1 for paper, or 2 for scissors:",
    "0"
  );

  const choiceIndex = Number(input);

  if (Number.isNaN(choiceIndex) || choiceIndex < 0 || choiceIndex >= CHOICES.length) {
    alert(`Invalid selction: ${choiceIndex}`)
    return ; // caller decides how to handle invalid input
  }

  return CHOICES[choiceIndex];
}

// Playing the game
function playGame() {
    let rounds = 1
    let humanScore = 0, computerScore = 0 

    while (rounds <= 5) {
        const humanSelection = getHumanChoice()
        const computerSelection  = getComputerChoice()

        let roundResult = playRound(humanSelection, computerSelection)
        console.log(`Round ${rounds}:
          ${roundResult.result}: ${roundResult.message}`)
        rounds++
    }
    console.log(getWinner(humanScore, computerScore))

  // Playing a single round
  function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
      return {
        result: "draw",
        message: `It's a draw! You both chose ${humanChoice}.`,
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
        result: "win",
        message: `You win! ${humanChoice} beats ${computerChoice}.`,
        human: humanScore += 1,
      }
      : {
        result: "lose",
        message: `You lose! ${computerChoice} beats ${humanChoice}.`,
        computer: computerScore += 1
      };
  }
  // Getting the winner after the full rounds
  function getWinner(humanScore, computerScore) {
    console.log(`Player Score: ${humanScore}`)
    console.log(`Computer Score: ${computerScore}`)

    let winMessage = humanScore > computerScore ? `Hurray you are the Winner after 5 rounds` : humanScore < computerScore ? `Sorry you lost after 5 rounds` : `Draw!!! No Victor, No Vanquish`

    return winMessage
  }
}

playGame()