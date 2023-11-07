let timerInterval;
let timeRemaining = 0;

// Start the game timer
export function startTimer() {
    // Clear any previous intervals to avoid multiple timers running simultaneously
    clearInterval(timerInterval);

    timeRemaining = 15; // Set the desired time in seconds
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
      if (typeof callback === 'function') {
        callback();
        console.log("Timer has ended");
        checkButton.disabled = true; // Disable the "check" button when the timer ends
        console.log("Check button is disabled");
      }
    }
  }, 1000); // Update the timer every second (1000 milliseconds)
}

function updateTimeDisplay(time) {
    const timerDisplay = document.getElementById('time-remaining');
    timerDisplay.textContent = `Timer: ${time} seconds`;
}