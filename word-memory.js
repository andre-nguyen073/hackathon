var seenWords = [];
var currentWord = "";
var counter = 0;

const words = [
  "apple", "banana", "cherry", "mango", "orange", 
  "dog", "cat", "elephant", "lion", "penguin",   
  "red", "blue", "green", "yellow", "purple",    
  "chair", "table", "computer", "phone", "lamp", 
  "walk", "run", "jump", "talk", "fly",           
  "octopus", "dolphin", "shark", "zebra", "wolf", 
  "notebook", "keyboard", "monitor", "backpack", "pen", 
  "swim", "drive", "draw", "write", "build"     
];

function displayWord() {
  generateRandomWord();
  document.getElementById("word-display").textContent = currentWord;
}

function newDisplay() {
  if (!seenWords.includes(currentWord)) {
    seenWords.push(currentWord);
    counter += 1;
    document.getElementById("counter").textContent = `Counter: ${counter}`;
    displayWord(); 
  } else {
    document.getElementById("word-display").textContent = "You Lose: Try Again??";
    counter = 0;
  }
}

function checkIfSeen() {
  if (seenWords.includes(currentWord)) {
    counter += 1;
    document.getElementById("counter").textContent = `Counter: ${counter}`;
    displayWord();
  } else {
    document.getElementById("word-display").textContent = "You Lose: Try Again";
    counter = 0;
  }
}

function generateRandomWord() {
  var randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex]; 
}
