let timerInterval;
let timeRemaining = 0;

const startButton = document.getElementById('start-game');
const wordCountDisplay = document.getElementById('word-count');
const scoreDisplay = document.getElementById('correct-count');

// Start the game timer
export function startTimer() {
    // Clear any previous intervals to avoid multiple timers running simultaneously
    clearInterval(timerInterval);

    timeRemaining = 30; // Set the desired time in seconds
    updateTimeDisplay(timeRemaining); // Update the timer display initially

    const checkButton = document.getElementById('check-translation');

  // Start the timer interval
  timerInterval = setInterval(() => {
    if (timeRemaining > 0) {
        timeRemaining--;
        updateTimeDisplay(timeRemaining);
    } else {
        // Time is up - handle game over or other actions
        console.log("Timer has ended");
        clearInterval(timerInterval);

        // Disable the "check" button when the timer ends
        checkButton.disabled = true;

        Container.style.display = 'none'

        togglePopup(true)

        
    }
}, 1000); // Update the timer every second (1000 milliseconds)
}

function updateTimeDisplay(time) {
    const timerDisplay = document.getElementById('time-remaining');
    timerDisplay.textContent = `${time}`;
}


export function togglePopup(show) {
    // Get the reference to the popup container
    const popupContainer = document.getElementById('popup-container');

    // Get the reference to the popup content
    const popupContent = document.getElementById('popup-content');

    // If the popup is set to show, update its content
    if (show) {
        // Update the content of the popup
        popupContent.innerHTML = `
            <p>Game Over!</p>
            <button onclick="startNewGame()">Retry</button>
        `;
    }

    // Toggle the display based on the boolean value
    popupContainer.style.display = show ? 'flex' : 'none';
}

// Function to start a new game
window.startNewGame = function () {
    // Trigger the click event on the Start button
    startButton.click();
};