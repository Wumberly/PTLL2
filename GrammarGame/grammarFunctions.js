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

export function togglePopup(show) {
  const popupContainer = document.getElementById('popup-container');
  popupContainer.style.display = show ? 'grid' : 'none';
}

//............................................................................

window.startNewGame = function () {
  const startButton = document.getElementById('start-button');
  startButton.click();
};

window.redirectToHomepage = function () {
  window.location.href = '../index.html';
};