/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify Player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game Value

let min = 15,
    max = 20,
    winningNum = getRandomNumber(min,max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector("#guess-input"),
      message = document.querySelector('.message')

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;  

//Play Again event listener
game.addEventListener('mousedown',function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
  console.log(1);
})

// Listen for guess
guessBtn.addEventListener('click',function(){
 let guess = parseInt(guessInput.value);

 // validate
  if(isNaN(guess) || guess < min || guess > max){
    setMessage(`Please enter a number between ${min} and ${max}`,'red')
  }

  //Check if won
  if(guess === winningNum){
    // Game Over - won
    gameOver(true,`${winningNum} is correct, YOU WIN!`)
  } else {
    // Wrong Number
    guessesLeft -=1;

    if(guessesLeft === 0){
      //Game over - lost
      gameOver(false,`Game Over, you lost. The Correct number was ${winningNum}`)
      
    } else {
      //Game continues - answer wrong;
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`);

      // Change border color
      guessInput.style.borderColor = 'red';

      // Clear Input
      guessInput.value = '';

      // Tell User its the wrong number
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`,'red');
    }
  }

});

// Set mnessage
function setMessage(msg,color){
  message.style.color = color;
  message.textContent = msg;
}

// Get Winning Number
function getRandomNumber(min,max){
  return (Math.floor(Math.random()*(max-min+1)+min)); // between 1 and 10
}

function gameOver(won,msg){
  let color;
  //ternary operator to set color
  won === true ? color = 'green' : color = 'red';
   // Disable Input
   guessInput.disabled = true;
   // Change Border color
   guessInput.style.borderColor = color;
   // Set text color
   message.style.color =color;
   // Set Message
   setMessage(msg,color);
  // Play Again?
  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';

}

