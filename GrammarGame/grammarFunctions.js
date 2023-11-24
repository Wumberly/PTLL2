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

function getRandomRow(dataRows, targetLevel) {
    // Filter rows based on the specified level
    const validRows = dataRows.filter(row => parseInt(row.Level) <= targetLevel);

    // Check if there are valid rows
    if (validRows.length > 0) {
        // Get a random index within the valid rows
        const randomIndex = Math.floor(Math.random() * validRows.length);

        // Return the randomly selected row
        return validRows[randomIndex];
    } else {
        console.log("gibbeldy googldy gop")
        // If no valid rows, return null or handle the case accordingly
        return null;
    }
}

// Export the function for use in other files
export { getRandomRow };