// Import the game logic and utility functions
//import { startGame, endGame, updateWord, updateScore, updateTime, checkTranslation } from './game.js';
import { startTimer, stopTimer } from './utils.js';

// Get references to DOM elements
const startButton = document.getElementById('start-game');
const endButton = document.getElementById('end-game');
const timerDisplay = document.getElementById('time-remaining');
const wordDisplay = document.getElementById('word-text');
const translationInput = document.getElementById('translation');
const checkButton = document.getElementById('check-translation');
const wordCountDisplay = document.getElementById('word-count');
const scoreDisplay = document.getElementById('correct-count');

// Define a variable to hold the word pairs
let wordPairs = [];

// Load and parse the JSON data
fetch('verbs.json')
  .then(response => response.json())
  .then(data => {
    wordPairs = data;
  })
  .catch(error => {
    console.error('Error loading JSON data:', error);
  });

// Add event listeners
startButton.addEventListener('click', () => {
    // Start the game
    // Get a random word pair from the wordPairs array
  const randomIndex = Math.floor(Math.random() * wordPairs.length);
  const randomWordPair = wordPairs[randomIndex];

  // Display the Portuguese word in the "word-text" span
  const wordTextSpan = wordDisplay;
  wordTextSpan.textContent = randomWordPair.portuguese;
    startTimer();
    // Add other game start logic here
});

endButton.addEventListener('click', () => {
    // End the game
    stopTimer();
    // Add other game end logic here
});

checkButton.addEventListener('click', () => {
    // Check the user's translation
    checkTranslation();
});

// You can add more event listeners for other game interactions
