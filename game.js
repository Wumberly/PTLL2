
// Create a function to update the word display with a new random word pair
export function updateWordDisplay(wordPairs, wordDisplay) {
    let newWordPair;

    // Ensure the new word is not in the capturedTranslations array
    do {
        const randomIndex = Math.floor(Math.random() * wordPairs.length);
        newWordPair = wordPairs[randomIndex];
    } while (capturedTranslations.some(pair => pair.portuguese === newWordPair.portuguese));

    // Display the new word
    wordDisplay.textContent = newWordPair.portuguese;

    // Append the newWordPair to the capturedTranslations array
    capturedTranslations.push(newWordPair);
}

