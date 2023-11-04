
export function updateWordDisplay(wordPairs, wordDisplay, timerActive) {
    if (timerActive) {
      const randomIndex = Math.floor(Math.random() * wordPairs.length);
      const randomWordPair = wordPairs[randomIndex];
      wordDisplay.textContent = randomWordPair.portuguese;
    }
  }

