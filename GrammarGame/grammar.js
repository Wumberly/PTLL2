
import { fetchCSVData } from './grammarFunctions.js';
import { getRandomRow } from './fibonacci.js';

// Get references to DOM elements
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

let dataRows = [];

// Fetch CSV data and print a random row
fetchCSVData("grammar.csv")
  .then(dataArray => {
    if (dataArray) {
      dataRows = dataArray;
      const randomRow = getRandomRow(dataRows, 3);
      console.log('Random Row:', randomRow);
    } else {
      console.error('Failed to fetch CSV data.');
    }
  });


homeLink.addEventListener('click', function () {
  window.location.href = '../Homepage/index.html';
});


let levelsArray = [];
startButton.addEventListener('click', function () {
    console.log('Start button clicked');

    // Get a random row
    const currentRow = getRandomRow(dataRows, 5);

    // Check if a valid row is returned
    if (currentRow !== null) {
        // Extract the level from the current row
        const level = parseInt(currentRow.Level);

        // Push the level to the array
        levelsArray.push(level);


        // Display the count of each level
        const levelCounts = Array.from({ length: 5 }, (_, i) =>
            levelsArray.filter(l => l === i + 1).length
        );

        console.log('Level Counts:', levelCounts);
    } else {
        console.error('No valid row returned.');
    }
});

checkButton.addEventListener('click', function () {
  console.log('Check button clicked');
});





  

