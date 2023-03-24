// Selects all the holes on the page
const holes = document.querySelectorAll('.hole');

// Selects the score element on the page
const scoreBoard = document.querySelector('#score');

// Initializes the score and lastHole variables
let score = 0;
let lastHole;

// Sets the timeUp variable to false, indicating that the game is not over yet
let timeUp = false;

// Generates a random time between a minimum and maximum value
function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

// selects a random hole from the list of holes, without selecting the same hole twice in a row
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

// Make a mole appear from a random hole for a random amount of time
function peep() {
  const time = randomTime(200, 1000);
  const hole = randomHole(holes);
  const moles = document.querySelectorAll('.mole');
  const mole = hole.querySelector('.mole');
  hole.classList.add('up');
  mole.classList.remove('hide');
  moles.forEach(mole => {
    if (mole !== hole.querySelector('.mole')) {
      mole.classList.add('hide');
    }
  });

  setTimeout(() => {
    hole.classList.remove('up');
    mole.classList.add('hide');
    if (!timeUp) peep();
  }, time);
}

// Increments the score when a mole is clicked
function bonk(e) {
  if (!e.isTrusted) return; // Prevent cheating
  if (!e.target.classList.contains('mole')) return; // Don't increment score if no mole is clicked
  score++;
  this.classList.remove('up');
  const mole = this.querySelector('.mole');
  mole.classList.add('hide'); // hides the mole when the hole is clicked
  scoreBoard.textContent = score;
}

// Adds event listener to each hole to listen for clicks and increment the score if a mole is clicked
holes.forEach(hole => hole.addEventListener('click', bonk));

// start the game
function startGame() {
  scoreBoard.textContent = 0;
  score = 0;
  timeUp = false;
  peep();

  let timeoutId;
  
  // After 30 seconds, end the game and display the final score
  timoutId = setTimeout(() => {
    timeUp = true;
    alert(`Game over! Your score is ${score}.`);
  }, 30000);
}

// Adds event listener to the start button to start the game when clicked
const startButton = document.getElementById('start-btn');
startButton.addEventListener('click', startGame);

// Adds event listener to the reset button to reset the score when clicked
const resetButton = document.getElementById('reset-btn');
resetButton.addEventListener('click', () => {
  scoreBoard.textContent = 0;
  score = 0;
  timeUp=true;
  clearTimeout(timeoutId);
});

