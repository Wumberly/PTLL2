
//Import functions...........................................................
import { fetchCSVData } from './grammarFunctions.js';
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
const verbItem = document.getElementById('item3');
const tenseItem = document.getElementById('item4');
const subjectItem = document.getElementById('item5');
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

//Define constants and variables................................................
let dataRows = [];
let currentLevel = 1;



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

homeLink.addEventListener('click', function () {
  window.location.href = '../Homepage/index.html';
});

startButton.addEventListener('click', function () {
    console.log('Start button clicked');
    const currentRow = getRandomRow(dataRows, currentLevel);
});

checkButton.addEventListener('click', function () {
  console.log('Check button clicked');
});

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






  

