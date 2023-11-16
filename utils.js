let timerInterval;
// let timeRemaining = 0;

const startButton = document.getElementById('start-game');
const mainContainer = document.getElementById('main-container');

// Start the game timer
export function startTimer(time,callback) {
    // Clear any previous intervals to avoid multiple timers running simultaneously
    clearInterval(timerInterval);

    // timeRemaining = time; // Set the desired time in seconds
    updateTimeDisplay(time); // Update the timer display initially

    const checkButton = document.getElementById('check-translation');

  // Start the timer interval
  timerInterval = setInterval(() => {
    if (time > 0) {
        time--;
        updateTimeDisplay(time);
    } else {
        // Time is up - handle game over or other actions
        console.log("Timer has ended");
        clearInterval(timerInterval);

        // Disable the "check" button when the timer ends
        checkButton.disabled = true;

        mainContainer.style.display = 'none'
        
        callback()

        // togglePopup(true);

        
    }
}, 1000); // Update the timer every second (1000 milliseconds)
}

function updateTimeDisplay(time) {
    const timerDisplay = document.getElementById('time-remaining');
    timerDisplay.textContent = `${time}`;
}


export function togglePopup(show,score,wordCount) {
    // Get the reference to the popup container
    const popupContainer = document.getElementById('popup-container');

    // Get the reference to the popup content
    const popupContent = document.getElementById('popup-content');

    // If the popup is set to show, update its content
    if (show) {
        // Update the content of the popup
        popupContent.innerHTML = `
            <p>Game Over!</p>
            <p>Hello!</p>
            <p>Score: ${score}</p>
            <p>wordCount: ${wordCount}</p>
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