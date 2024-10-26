// Words for the game
const words = ["apple", "banana", "cherry", "dragonfruit", "elderberry", 
    "fig", "grape", "honeydew", "kiwi", "lemon"];

let displayedWords = [];
let userGuessedWords = [];
let wordIndex = 0;
let timerInterval;
let timeLeft = 60;
let currentLevel = 1;
let highestLevel = parseInt(localStorage.getItem('highestLevel')) || 1;

// DOM Elements
const wordDisplay = document.getElementById('word-display');
const userInput = document.getElementById('user-input');
const resultDisplay = document.getElementById('result');
const startButton = document.getElementById('start-button');
const giveUpButton = document.getElementById('give-up-button');
const timerDisplay = document.getElementById('timer');
const wordCountDisplay = document.getElementById('word-count');
const currentLevelDisplay = document.getElementById('current-level');
const highestLevelDisplay = document.getElementById('highest-level');

// Initialize Game on Page Load
window.addEventListener('load', () => {
updateLevelDisplays();
resetGameState();
});

// Update Level Displays
function updateLevelDisplays() {
currentLevelDisplay.textContent = `Current Level: ${currentLevel}`;
highestLevelDisplay.textContent = `Highest Level: ${highestLevel}`;
}

// Reset Game State
function resetGameState() {
wordDisplay.textContent = '';
userGuessedWords = [];
displayedWords = [];
wordIndex = 0;
timeLeft = 60;
resultDisplay.textContent = '';
wordCountDisplay.textContent = 'Words remembered: 0 / 0';
}

// Start Game
startButton.addEventListener('click', () => {
resetGameState();
startGame(currentLevel);
});

function startGame(level) {
const { wordCount, speed } = getLevelConfig(level);
showWords(wordCount, speed);
giveUpButton.classList.remove('hidden');
updateLevelDisplays();
}

function getLevelConfig(level) {
return {
wordCount: 3 + (level - 1) * 2,
speed: 3000 - (level - 1) * 200
};
}

function showWords(wordCount, speed) {
const selectedWords = words.slice(0, wordCount);
const wordInterval = setInterval(() => {
wordDisplay.textContent = selectedWords[wordIndex];
displayedWords.push(selectedWords[wordIndex]);
wordIndex++;
if (wordIndex >= selectedWords.length) {
clearInterval(wordInterval);
setTimeout(() => {
wordDisplay.textContent = '';
startTimer();
}, 1000);
}
}, speed);
}

function startTimer() {
timerInterval = setInterval(() => {
timeLeft--;
timerDisplay.textContent = `Time left: ${timeLeft}s`;
if (timeLeft <= 0) endGame(false);
}, 1000);
}

userInput.addEventListener('keypress', (event) => {
if (event.key === 'Enter' && userInput.value.trim() !== '') {
const guessedWord = userInput.value.trim().toLowerCase();
if (!userGuessedWords.includes(guessedWord)) {
userGuessedWords.push(guessedWord);
updateWordCount();
checkForCompletion();
}
userInput.value = '';
}
});

function updateWordCount() {
const correctWords = userGuessedWords.filter(word => displayedWords.includes(word));
wordCountDisplay.textContent = `Words remembered: ${correctWords.length} / ${displayedWords.length}`;
}

function checkForCompletion() {
if (userGuessedWords.length === displayedWords.length) endGame(true);
}

function endGame(success) {
clearInterval(timerInterval);
giveUpButton.classList.add('hidden');
if (success) {
resultDisplay.textContent = `Congratulations! You completed Level ${currentLevel}.`;
unlockNextLevel();
} else {
resultDisplay.textContent = `Time's up! Try again.`;
}
}

function unlockNextLevel() {
if (currentLevel >= highestLevel) {
highestLevel = currentLevel + 1;
localStorage.setItem('highestLevel', highestLevel);
updateLevelDisplays();
}
}

giveUpButton.addEventListener('click', () => endGame(false));
