let timerInterval;
let timeRemaining = 0; // Set the initial time in seconds (e.g., 60 seconds)

// Start the game timer
export function startTimer() {
    // Clear any previous intervals to avoid multiple timers running simultaneously
    clearInterval(timerInterval);

    timeRemaining = 60; // Set the desired time in seconds
    updateTimeDisplay(timeRemaining); // Update the timer display initially

    // Start the timer interval
    timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimeDisplay(timeRemaining);
        } else {
            // Time is up - handle game over or other actions
            clearInterval(timerInterval);
            alert("Time's up!");
            // You can add code here to handle what happens when time is up
        }
    }, 1000); // Update the timer every second (1000 milliseconds)
}

// Stop the game timer
export function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimeDisplay(time) {
    const timerDisplay = document.getElementById('time-remaining');
    timerDisplay.textContent = `Timer: ${time} seconds`;
}