// Import the game logic and utility functions
import { updateWordDisplay } from './game.js';
import { startTimer, togglePopup } from './utils.js';

// Get references to DOM elements
const startButton = document.getElementById('start-game');
const timerDisplay = document.getElementById('time-remaining');
const wordDisplay = document.getElementById('word-text');
const translationInput = document.getElementById('translation');
const checkButton = document.getElementById('check-translation');
const wordCountDisplay = document.getElementById('word-count');
const scoreDisplay = document.getElementById('correct-count');
const correctTranslationText = document.getElementById('correct-translation-text');
const translatedText = document.getElementById('translated-text')
const result = document.getElementById('result')
const mainContainer = document.getElementById('main-container');

// Add an event listener to the element with id "home"
document.getElementById('home').addEventListener('click', function () {
  window.location.href = '../Homepage/index.html';
});

// Define a variable to hold the word pairs
let wordPairs = [];
let gameResults
let time = 30
let wordAttempts = [];

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

    // Clear the word attempts array
    wordAttempts.length = 0;

    gameResults = {
      score: 0,
      wordCount: 0
    }

    mainContainer.style.display = 'grid'
    // Reset the score and word count to zero
    scoreDisplay.textContent = "0";
    wordCountDisplay.textContent = "0";

    togglePopup(false)

    // Enable the "check" button initially
    checkButton.disabled = false;
  
    // Clear the translation field and correct answer field
    translationInput.value = '';
    correctTranslationText.textContent = '...';
  
    // Generate a new word
    updateWordDisplay(wordPairs, wordDisplay);

    // Hide the start button
    startButton.style.display = 'none';
  
    // Start the timer
    startTimer(time,()=>{
      togglePopup(true, gameResults.score, gameResults.wordCount, wordAttempts)});
});

checkButton.addEventListener('click', function () {
    // 1. Increase the word count by 1
    wordCountDisplay.textContent = ++gameResults.wordCount;

    // 3. Display the correct English translation
    const portugueseWord = wordDisplay.textContent.toLowerCase();
    const currentWordPair = wordPairs.find(wordPair => wordPair.portuguese.toLowerCase() === portugueseWord);
    if (currentWordPair) {
        correctTranslationText.textContent = currentWordPair.english;
        translatedText.textContent = currentWordPair.portuguese;
    }

    // 4. Check if the translation provided by the user is correct
    const userTranslation = translationInput.value.trim().toLowerCase();
    if (currentWordPair && currentWordPair.english.split(',').some(translation =>
        translation.trim().toLowerCase() === userTranslation || translation.trim().toLowerCase() === `to ${userTranslation}`)) {
        // 5. If correct, increase the score by 1
        scoreDisplay.textContent = ++gameResults.score;
        result.textContent = "Correct";
        result.style.color = "green";
    } else {
      // Incorrect answer
      result.textContent = "Incorrect";
      result.style.color = "red";
    }

    // Store the information for the word attempt
    const wordNumber = gameResults.wordCount;
    const wordData = {
        wordNumber,
        portugueseWord: currentWordPair.portuguese,
        userTranslation,
        correctTranslation: currentWordPair.english,
        result: result.textContent === "Correct" ? "Correct" : "Incorrect",
    };
    wordAttempts.push(wordData);

    // 6. Clear the translation field
    translationInput.value = '';

    // 7. Generate and display a new word to be translated
    updateWordDisplay(wordPairs, wordDisplay);
});

// Add an event listener to the text input
translationInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        // Prevent the default Enter key behavior (e.g., adding newlines)
        event.preventDefault();

        // Simulate a click on the "check" button
        checkButton.click();
    }
});