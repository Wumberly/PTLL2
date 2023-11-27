
//Import functions...........................................................

import { fetchCSVData, updateTimeDisplay, togglePopup } from './grammarFunctions.js';
import { getRandomRow } from './fibonacci.js';

// Get references to DOM elements............................................

// Navbar elements
const homeLink = document.getElementById('home');
const aboutLink = document.getElementById('about');
const profileLink = document.getElementById('profile');
const settingsLink = document.getElementById('settings');

// Time container elements
const startButton = document.getElementById('start-button');
const timeDisplay = document.getElementById('item2');

// Gameplay container elements
const subjectItem = document.getElementById('item3');
const verbItem = document.getElementById('item4');
const tenseItem = document.getElementById('item5');
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
let currentLevel = 1;
let startTime = 60
let currentRow
let previousRow
let count
let score
let timerInterval

//Import data...................................................................

// Fetch CSV data and print a random row
fetchCSVData("grammar.csv")
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

    currentRow = getRandomRow(dataRows, currentLevel);
    console.log(currentRow)

    //reset conditions
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
    verbItem.textContent = currentRow.Verb
    tenseItem.textContent = currentRow.Tense
    subjectItem.textContent = currentRow.Subject


    startTimer(startTime)
});

//Check Button
checkButton.addEventListener('click', function () {
    //collecting answer, storing old row, generating new row
    const conjAttempt = inputBox.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    previousRow = currentRow
    currentRow = getRandomRow(dataRows, currentLevel);

    //Filling conjugation promts
    verbItem.textContent = currentRow.Verb
    tenseItem.textContent = currentRow.Tense
    subjectItem.textContent = currentRow.Subject

    //Checking result and updating scores and correction
    if (conjAttempt === previousRow.Conjugation.normalize("NFD").replace(/[\u0300-\u036f]/g, "")) {
        const isCorrect = true
        scoreItem.textContent = ++score;
        verdict.textContent = "Correct"
    } else {
        const isCorrect = false
        verdict.textContent = "Incorrect"
    }
    correction.textContent = previousRow.Conjugation
    countItem.textContent = ++count;
    percentageItem.textContent = (score*100/count).toFixed(0) + "%"

    // Store the information for the word attempt
    const wordNumber = count;
    const wordData = {
        wordNumber,
        subject: previousRow.Subject,
        verb: previousRow.Verb,
        tense: previousRow.Tense,
        attempt: conjAttempt,
        correct: previousRow.Conjugation,
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






  

