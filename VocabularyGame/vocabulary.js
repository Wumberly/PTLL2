
//Import functions...........................................................

import { fetchCSVData, updateTimeDisplay, togglePopup } from './vocabularyFunctions.js';
import { getRandomRow } from './fibonacciVoc.js';

// Get references to DOM elements............................................

// Navbar elements
const homeLink = document.getElementById('home');

// Time container elements
const startButton = document.getElementById('start-button');
const timeDisplay = document.getElementById('item2');

// Gameplay container elements
const toTranslateItem = document.getElementById('item3');
const inputBox = document.getElementById('input-box');
const checkButton = document.getElementById('check-button');

// Correction container elements
const verdict = document.getElementById('item8');
const correction = document.getElementById('item9');

// Scorebox container elements
const countItem = document.getElementById('item13');
const scoreItem = document.getElementById('item14');
const percentageItem = document.getElementById('item15');

// Level container elements
const levelButtons = document.querySelectorAll('.level-container .node');

// game container elements
const gameContainer = document.getElementById('game-container');

// popup container elements
const popupContainer = document.getElementById('popup-container');

//Define constants and variables................................................

let dataRows = [];
let wordAttempts = [];
let indexArray = []
let currentLevel = 1;
let startTime = 30
let currentRow
let previousRow
let count
let score
let timerInterval

//Import data...................................................................

// Load and parse the csv data
fetchCSVData("verbs.csv")
  .then(dataArray => {
    if (dataArray) {
      dataRows = dataArray;
    } else {
      console.error('Failed to fetch CSV data.');
    }
  });
//Event Listeners...............................................................

//Home Button
homeLink.addEventListener('click', function () {
  window.location.href = '../index.html';
});

//Start Button
startButton.addEventListener('click', function () {
    console.log('Start button clicked');
    gameContainer.style.display = 'grid'
    startButton.style.display = 'none';

    currentRow = getRandomRow(dataRows, currentLevel, indexArray);
    console.log(currentRow)

    //reset conditions
    indexArray.length = 0;
    wordAttempts.length = 0;
    togglePopup(false);
    checkButton.disabled = false;
    correction.textContent = '...';
    inputBox.textContent = '';
    scoreItem.textContent = "0";
    countItem.textContent = "0";
    percentageItem.textContent = "n/a"
    count = 0
    score = 0

    //update first conjugation prompt
    toTranslateItem.textContent = currentRow.verbPT
    
    startTimer(startTime)
});

//Check Button
checkButton.addEventListener('click', function () {
    //collecting answer, storing old row, generating new row
    const conjAttempt = inputBox.value.trim().toLowerCase();
    previousRow = currentRow
    indexArray.push(previousRow.Index);
    currentRow = getRandomRow(dataRows, currentLevel, indexArray);

    const translations = previousRow.translation.trim().toLowerCase().split(',').map(t => t.trim());

    //Filling translation promt
    toTranslateItem.textContent = currentRow.verbPT

    //Checking result and updating scores and correction
    if (currentRow && translations.some(translation =>
        translation === conjAttempt || translation === `to ${conjAttempt}`
    )) {
        // 5. If correct, increase the score by 1
        scoreItem.textContent = ++score;
        verdict.textContent = "Correct";
    } else {
        // Incorrect answer
        verdict.textContent = "Incorrect";
    }
    correction.textContent = previousRow.translation
    countItem.textContent = ++count;
    percentageItem.textContent = (score*100/count).toFixed(0) + "%"

    // Store the information for the word attempt
    const wordNumber = count;
    const wordData = {
        wordNumber,
        word: previousRow.verbPT,
        attempt: conjAttempt,
        correct: previousRow.translation,
        result: verdict.textContent === "Correct" ? "Correct" : "Incorrect",
    };
    wordAttempts.push(wordData);

    //resetting conditions
    inputBox.value = '';

});

//Enter = Check
inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkButton.click();
    }
});

//Level select
levelButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove the "active" class from all buttons
        levelButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.backgroundColor = '#426C94';
            btn.style.color = '#ffffff';
        });

        // Add the "active" class to the clicked button
        button.classList.add('active');

        // Update styles for the clicked button
        button.style.backgroundColor = '#ffffff';
        button.style.color = '#426C94';

        // Update the currentLevel variable
        currentLevel = parseInt(button.textContent);
        console.log(currentLevel);
    });
});

//Timer Function...............................................................

function startTimer(time) {
    clearInterval(timerInterval);
    updateTimeDisplay(time); 
  
  // Start the timer interval
  timerInterval = setInterval(() => {
    if (time > 0) {
        time--;
        updateTimeDisplay(time);
    } else {
        console.log("Timer has ended");
        clearInterval(timerInterval);
        gameContainer.style.display = 'none';
        console.log(count, score);
        togglePopup(true, score, count, wordAttempts); 
    }
  }, 1000);
  }
