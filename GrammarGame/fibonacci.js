function getRandomRow(dataRows, targetLevel) {
    // Function to generate Fibonacci sequence up to a given term
    function generateFibonacci(n) {
        const sequence = [1, 1];
        for (let i = 2; i < n; i++) {
            sequence[i] = sequence[i - 1] + sequence[i - 2];
        }
        console.log(sequence);
        return sequence;
    }

    // Function to assign probabilities to each level based on the Fibonacci sequence
    function assignProbabilities(levels, fibonacciSequence) {
        const sum = fibonacciSequence.reduce((accumulator, currentValue) => accumulator + currentValue, 0) - 1;
        console.log("sum", sum);
        const probabilities = {};

        levels.forEach((level, index) => {
            probabilities[level] = fibonacciSequence[index + 1] / sum;
        });
        console.log(probabilities);
        return probabilities;
    }


    // Generate Fibonacci sequence for the target level
    const fibonacciSequence = generateFibonacci(targetLevel + 1);

    // Assign probabilities to each level
    let levelProbabilities = assignProbabilities(Array.from({ length: targetLevel }, (_, i) => i + 1), fibonacciSequence);

    // Select a level based on probabilities
    const randomValue = Math.random();
    let cumulativeProbability = 0;
    let selectedIndex;
    let selectedLevel;

    // Find the index of the selected level based on cumulative probabilities
    for (let i = 0; i < targetLevel; i++) {
        cumulativeProbability += levelProbabilities[i + 1];
        if (randomValue <= cumulativeProbability) {
            selectedIndex = i + 1;
            break;
        }
    }

    // If selectedIndex is still undefined, set it to targetLevel
    selectedLevel = selectedIndex !== undefined ? selectedIndex : targetLevel;


    console.log("Selected Level:", selectedLevel);

    // Filter rows based on the selected level and targetLevel
    let validRows = dataRows.filter(row => parseInt(row.Level) <= targetLevel && parseInt(row.Level) == selectedLevel);


    // If there are no rows for the selected level, recursively call the function with the next level
    if (validRows.length === 0) {
        console.log("No valid rows for the selected level. Trying the next level.");
        return getRandomRow(dataRows, targetLevel);
    }

    // Get a random index within the valid rows
    const randomIndex = Math.floor(Math.random() * validRows.length);

    // Return the randomly selected row
    return validRows[randomIndex];
}

export { getRandomRow };
  