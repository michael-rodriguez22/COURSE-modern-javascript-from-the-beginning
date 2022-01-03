/*
GAME RULES
- Player must guess a number between a min and a max
- Player gets a finite amount of guesses
- Notify the player of guesses remaining
- Notify the player of the correct answer if they lose
- Let player choose to play again
*/

// Get winning number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Game Values
let min = 1,
  max = 10,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message")

// Assign UI min and max
minNum.textContent = min
maxNum.textContent = max

// Play again event listener
game.addEventListener("mousedown", e => {
  if (e.target.className === "play-again") location.reload()
})

// Listen for guess
guessBtn.addEventListener("click", guessHandler)

function guessHandler() {
  let guess = parseInt(guessInput.value)
  if (isNaN(guess) || guess < min || guess > max) {
    return setMessage(
      `Please enter a number between ${min} and ${max}.`,
      "grey"
    )
  }

  // check if won
  if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, you win!`)
  } else {
    guessesLeft--
    if (guessesLeft === 0) {
      gameOver(false, `You have lost... The winning number was ${winningNum}.`)
    } else {
      guessInput.style.borderColor = "red"
      setMessage(
        `${guessInput.value} was incorrect. You have ${guessesLeft} guesses remaining.`,
        "red"
      )
    }
    guessInput.value = ""
  }
}

function gameOver(won, msg) {
  guessInput.disabled = true
  let color = won ? "green" : "red"
  guessInput.style.borderColor = color
  setMessage(msg, color)

  // play again?
  guessBtn.value = "Play again?"
  guessBtn.className += "play-again"
}

// Set message
function setMessage(msg, color) {
  message.style.color = color
  message.textContent = msg
}
