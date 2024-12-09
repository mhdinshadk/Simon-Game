const colors = ["red", "blue", "green", "yellow"];
let gameSequence = [];
let playerSequence = [];
let level = 0;
let score = 0;
let highScore = localStorage.getItem("simonHighScore") || 0;

// DOM Elements
const statusText = document.getElementById("status");
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
const startButton = document.getElementById("startButton");
const buttons = colors.map((color) => document.getElementById(color));

// Initialize high score display
highScoreText.textContent = `High Score: ${highScore}`;

// Add click event listeners to buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const color = button.id;
    playerSequence.push(color);
    playSound(color);
    animatePress(color);
    checkPlayerInput(playerSequence.length - 1);
  });
});

// Start the game
startButton.addEventListener("click", startGame);

function startGame() {
  gameSequence = [];
  playerSequence = [];
  level = 0;
  score = 0;
  updateScore();
  statusText.textContent = "Follow the pattern!";
  nextSequence();
}

// Generate the next sequence
function nextSequence() {
  playerSequence = [];
  level++;
  score += 10;
  updateScore();
  statusText.textContent = `Level ${level}`;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  gameSequence.push(randomColor);
  playSequence();
}

// Play the sequence
function playSequence() {
  gameSequence.forEach((color, index) => {
    setTimeout(() => {
      playSound(color);
      animatePress(color);
    }, (index + 1) * 800);
  });
}

// Check the player's input
function checkPlayerInput(currentIndex) {
  if (playerSequence[currentIndex] !== gameSequence[currentIndex]) {
    gameOver();
    return;
  }
  if (playerSequence.length === gameSequence.length) {
    setTimeout(nextSequence, 1000);
  }
}

// Play sound for buttons
function playSound(color) {
  const audio = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${colors.indexOf(color) + 1}.mp3`);
  audio.play();
}

// Animate button press
function animatePress(color) {
  const button = document.getElementById(color);
  button.classList.add("active");
  setTimeout(() => button.classList.remove("active"), 300);
}

// Update the score display
function updateScore() {
  scoreText.textContent = `Score: ${score}`;
}

// Handle game over
function gameOver() {
  statusText.textContent = "Game Over! Press 'Start Game' to try again.";
  playSound("red");

  // Update high score
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("simonHighScore", highScore);
    highScoreText.textContent = `High Score: ${highScore}`;
  }
}
