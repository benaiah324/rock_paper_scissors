// function getComputerChoice(params) {
//     let randomNum = Math.floor(Math.random()*3) + 1
//     let choice = randomNum == 1 ? "rock": randomNum == 2 ? "paper" : randomNum == 3 ? "scissors" : "Invalid Option!"
//     return choice
// }

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
    return null; // caller decides how to handle invalid input
  }

  return CHOICES[choiceIndex];
}

let humanScore = 0, computerScore = 0 

// function playRound(humanChoice, computerChoice) {
//     if(humanChoice == computerChoice){
//         return `Its a Draw! You both choose ${humanChoice}`
//     }

//     if (humanChoice == 'rock' && computerChoice == 'scissors' || humanChoice == 'paper' && computerChoice == 'rock' || humanChoice == 'scissors' && computerChoice == 'paper') {
//         return `You Win! ${humanChoice} beats ${computerChoice}`
//     } else{
//         return `You Lose! ${computerChoice} beats ${humanChoice}`
//     }
    
// }

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
      }
    : {
        result: "lose",
        message: `You lose! ${computerChoice} beats ${humanChoice}.`,
      };
}


const humanSelection = getHumanChoice()
const computerSelection  = getComputerChoice()

const roundResult = playRound(humanSelection, computerSelection)

console.log(roundResult.message)