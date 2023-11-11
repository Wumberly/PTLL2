let timerInterval;
let timeRemaining = 0;

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

        // Reappear the start button
        startButton.style.display = '';
    }
}, 1000); // Update the timer every second (1000 milliseconds)
}

function updateTimeDisplay(time) {
    const timerDisplay = document.getElementById('time-remaining');
    timerDisplay.textContent = `: ${time} seconds`;
}