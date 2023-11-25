function fetchCSVData(csvFilePath) {

  return fetch(csvFilePath)
    .then(response => response.text())
    .then(csvData => {
      const rows = csvData.split('\n');
      const headers = rows[0].split(',');

      const dataArray = rows.slice(1).map(row => {
        const values = row.split(',');
        return headers.reduce((obj, header, index) => {
          obj[header.trim()] = values[index].trim();
          return obj;
        }, {});
      });

      return dataArray;
    })
    .catch(error => {
      console.error('Error fetching CSV file:', error);
      return null;
    });
}

// Export the function for use in other files
export { fetchCSVData };
//............................................................................

let timerInterval;
// Start the game timer
export function startTimer(time,callback) {
  // Clear any previous intervals to avoid multiple timers running simultaneously
  clearInterval(timerInterval);

  updateTimeDisplay(time); // Update the timer display initially

  const checkButton = document.getElementById('check-button');

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

      //mainContainer.style.display = 'none'
      
      //callback()

  }
}, 1000); // Update the timer every second (1000 milliseconds)
}

function updateTimeDisplay(time) {
  const timeDisplay = document.getElementById('item2');
  timeDisplay.textContent = `${time}`;
}
