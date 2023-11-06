
// Create a function to update the word display with a new random word pair
export function updateWordDisplay(wordPairs, wordDisplay) {
    const randomIndex = Math.floor(Math.random() * wordPairs.length);
    const randomWordPair = wordPairs[randomIndex];
    wordDisplay.textContent = randomWordPair.portuguese;
    const correctTranslation = randomWordPair.english;
  }

