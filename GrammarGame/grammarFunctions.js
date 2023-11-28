export function fetchCSVData(csvFilePath) {

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

//............................................................................

export function updateTimeDisplay(time) {
  const timeDisplay = document.getElementById('item2');
  timeDisplay.textContent = `${time}`;
}

//............................................................................

window.startNewGame = function () {
  const startButton = document.getElementById('start-button');
  startButton.click();
};

window.redirectToHomepage = function () {
  window.location.href = '../index.html';
};

//............................................................................

function generateTableRows(wordAttempts) {
  return `
      <table class="attempts-table">
          <thead>
              <tr>
                  <th>#</th>
                  <th>Verb</th>
                  <th>Tense</th>
                  <th>Subject</th>
                  <th>Attempt</th>
                  <th>Correct</th>
                  <th>Result</th>
              </tr>
          </thead>
          <tbody>
              ${wordAttempts.map((wordData, index) => `
                <tr class="${wordData.result === 'Incorrect' ? 'incorrect-row' : ''}">
                  <td>${wordData.wordNumber}</td>
                  <td>${wordData.subject}</td>
                  <td>${wordData.verb}</td>
                  <td>${wordData.tense}</td>
                  <td>${wordData.attempt}</td>
                  <td>${wordData.correct}</td>
                  <td>${wordData.result}</td>
                </tr>
              `).join('')}
          </tbody>
      </table>
  `;
}

//............................................................................

function generateSummary(count, score, percentage) {
  return `
    <table class="summary-table">
        <thead>
            <tr>
                <th>Count</th>
                <th>Correct</th>
                <th>Percent</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>${count}</td>
                <td>${score}</td>
                <td>${percentage}%</td>
            </tr>
        </tbody>
    </table>
`;
}

//............................................................................

export function togglePopup(show, score, count, wordAttempts) {
  const popupContainer = document.getElementById('popup-container');
  const attemptContainer = document.getElementById('attempts-table');
  const summaryContainer = document.getElementById('summary-table');
  const popupButtons = document.getElementById('popup-buttons');
  if (show) {
    // Calculate the percentage
    const percentage = ((score / count) * 100).toFixed(0);
    // Update the content of the popup
    const tableRows = generateTableRows(wordAttempts);
    const tableSummary = generateSummary(count, score, percentage);
    attemptContainer.innerHTML = `${tableRows}`;
    summaryContainer.innerHTML = `${tableSummary}`;
    popupButtons.innerHTML = `
        <button class="button" id="retry-button" onclick="startNewGame()">Retry</button>
        <button class="button" id="leave-button" onclick="redirectToHomepage()">Leave</button>
    `;
  }
  popupContainer.style.display = show ? 'grid' : 'none';
}
