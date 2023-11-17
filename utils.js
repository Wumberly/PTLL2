let timerInterval;

const startButton = document.getElementById('start-game');
const mainContainer = document.getElementById('main-container');

// Start the game timer
export function startTimer(time,callback) {
    // Clear any previous intervals to avoid multiple timers running simultaneously
    clearInterval(timerInterval);

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

    }
}, 1000); // Update the timer every second (1000 milliseconds)
}

function updateTimeDisplay(time) {
    const timerDisplay = document.getElementById('time-remaining');
    timerDisplay.textContent = `${time}`;
}


export function togglePopup(show,score,wordCount,wordAttempts ) {
    // Get the reference to the popup container
    const popupContainer = document.getElementById('popup-container');

    // Get the reference to the popup content
    const popupContent = document.getElementById('popup-content');

    // If the popup is set to show, update its content
    if (show) {
        // Update the content of the popup
        const tableRows = generateTableRows(wordAttempts);
        popupContent.innerHTML = `
            ${tableRows}
            <p>Game Over!</p>
            <p>Score: ${score}</p>
            <p>wordCount: ${wordCount}</p>
            <button onclick="startNewGame()">Retry</button>
            <button onclick="redirectToHomepage()">Leave</button>
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

// Function to redirect to the homepage
window.redirectToHomepage = function () {
    // Add logic to redirect to the homepage
    window.location.href = 'index.html';
};

// Function to generate table rows based on word attempt information
function generateTableRows(wordAttempts) {
    return `
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Word</th>
                    <th>Attempt</th>
                    <th>Correct</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                ${wordAttempts.map((wordData, index) => `
                    <tr>
                        <td>${wordData.wordNumber}</td>
                        <td>${wordData.portugueseWord}</td>
                        <td>${wordData.userTranslation}</td>
                        <td>${wordData.correctTranslation}</td>
                        <td>${wordData.result}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}