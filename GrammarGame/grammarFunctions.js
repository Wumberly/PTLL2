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

