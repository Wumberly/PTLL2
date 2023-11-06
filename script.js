// Import the game logic and utility functions
import { updateWordDisplay } from './game.js';
import { startTimer } from './utils.js';

// Get references to DOM elements
const startButton = document.getElementById('start-game');
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

startButton.addEventListener('click', () => {

  // Get a random word pair from the wordPairs array
  const randomIndex = Math.floor(Math.random() * wordPairs.length);
  const randomWordPair = wordPairs[randomIndex];

  // Display the Portuguese word in the "word-text" span
  const wordTextSpan = wordDisplay;
  wordTextSpan.textContent = randomWordPair.portuguese;
    startTimer();

  // reset word count and score
  wordCountDisplay.textContent = "0";
  scoreDisplay.textContent = "0";
});

checkButton.addEventListener('click', function () {
    // Get the user's input from the text box
    const userTranslation = translationInput.value.trim().toLowerCase();
  
    // Get the Portuguese word displayed
    const portugueseWord = wordDisplay.textContent.toLowerCase();
  
    // Get the current score and word count
    const score = parseInt(scoreDisplay.textContent);
    const wordCount = parseInt(wordCountDisplay.textContent);
  
    // Check if the user's translation matches any of the possible English translations
    const currentWordPair = wordPairs.find(wordPair =>
      wordPair.portuguese.toLowerCase() === portugueseWord && (
        wordPair.english.split(',').some(translation =>
          translation.trim().toLowerCase() === userTranslation ||
          translation.trim().toLowerCase() === `to ${userTranslation}`
        )
      )
    );
  
    if (currentWordPair) {
        // Correct translation
        scoreDisplay.textContent = score + 1;
      }
      // Increase the word count regardless of the result
      wordCountDisplay.textContent = wordCount + 1;

      // Clear the input field
      translationInput.value = '';
    
      // add new word
      updateWordDisplay(wordPairs, wordDisplay);
    });

