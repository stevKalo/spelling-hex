import { length } from 'file-loader';
import './styles.css';
const words = require('./wordsArray.js');

// GLOBALS
const newGameBtn = document.querySelector('.new-game');
const themeToggle = document.querySelector('#theme-toggle');
const inputQueue = document.querySelector('#input-queue');
const deleteBtn = document.querySelector('#delete');
const shuffleBtn = document.querySelector('#shuffle');
const submitBtn = document.querySelector('#submit');
const scoreDisplay = document.querySelector('#score-value');
const messageBox = document.querySelector('.message-box');
const foundWords = document.querySelector('#found-words');

// LETTER ARRAYS & CENTER LETTER
const alphabetArray = [
  { letter: 'A', vowel: true },
  { letter: 'B', vowel: false },
  { letter: 'C', vowel: false },
  { letter: 'D', vowel: false },
  { letter: 'E', vowel: true },
  { letter: 'F', vowel: false },
  { letter: 'G', vowel: false },
  { letter: 'H', vowel: false },
  { letter: 'I', vowel: true },
  { letter: 'J', vowel: false },
  { letter: 'K', vowel: false },
  { letter: 'L', vowel: false },
  { letter: 'M', vowel: false },
  { letter: 'N', vowel: false },
  { letter: 'O', vowel: true },
  { letter: 'P', vowel: false },
  { letter: 'Q', vowel: false },
  { letter: 'R', vowel: false },
  { letter: 'S', vowel: false },
  { letter: 'T', vowel: false },
  { letter: 'U', vowel: true },
  { letter: 'V', vowel: false },
  { letter: 'W', vowel: false },
  { letter: 'X', vowel: false },
  { letter: 'Y', vowel: true },
  { letter: 'Z', vowel: false },
];
let letterArray = [];
let forbiddenArray = [];
let centerLetter;

// WORD ARRAY
let wordsArray = [];
let foundArray = [];

function updateFoundWords() {
  foundWords.textContent = foundArray.join(', ');
}

function toCapitalCase(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
}

// Score Variable
let score = 0;

// function to update score on correct answers
function updateScore() {
  scoreDisplay.textContent = score.toString();
}

// HEX ARRAY
const hexes = [
  {
    name: 'Hex1',
    shape: document.querySelector('#hex1'),
    center: false,
  },
  {
    name: 'Hex2',
    shape: document.querySelector('#hex2'),
    center: false,
  },
  {
    name: 'Hex3',
    shape: document.querySelector('#hex3'),
    center: false,
  },
  {
    name: 'Hex4',
    shape: document.querySelector('#hex4'),
    center: true,
  },
  {
    name: 'Hex5',
    shape: document.querySelector('#hex5'),
    center: false,
  },
  {
    name: 'Hex6',
    shape: document.querySelector('#hex6'),
    center: false,
  },
  {
    name: 'Hex7',
    shape: document.querySelector('#hex7'),
    center: false,
  },
];

// function to assign random letters to each hex
function assignLetters() {
  function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }
  function checkVowels(array) {
    return array.filter((item) => item.vowel === true).length >= 2;
  }
  function chooseLetters() {
    const newList = [...alphabetArray];
    for (let hex of hexes) {
      const index = getRandomIntInclusive(0, newList.length - 1);
      const letter = newList[index];
      hex.shape.textContent = letter.letter;
      letterArray = new Set([...letterArray, letter]);
      newList.splice(index, 1);
    }
  }
  while (!checkVowels([...letterArray])) {
    letterArray = new Set();
    chooseLetters();
  }
}

// function to assign center letter
function assignCenter() {
  centerLetter = hexes[3].shape.textContent;
}

// function to collect unused letters
function assignForbidden() {
  const newList = [...alphabetArray];
  const forbiddenList = newList
    .filter((letter) => {
      return ![...letterArray].includes(letter);
    })
    .map((item) => item.letter);
  forbiddenArray.push(...forbiddenList);
}

// function to give on click functionality to hexes
function activateHexes() {
  for (let hex of hexes) {
    if (hex.center === true) {
      hex.shape.addEventListener('click', () => {
        const cLetter = document.createElement('span');
        cLetter.classList.add('center-letter');
        cLetter.textContent = hex.shape.textContent;
        inputQueue.appendChild(cLetter);
      });
    } else {
      hex.shape.addEventListener('click', () => {
        const letter = document.createElement('span');
        letter.textContent = hex.shape.textContent;
        inputQueue.appendChild(letter);
      });
    }
  }
}

//function to build array of accepted words
function buildDictionary() {
  const forbiddenSet = new Set(forbiddenArray);
  const letterFiltered = words.filter((word) => {
    if (!word.includes(centerLetter)) {
      return false;
    }
    for (let letter of word) {
      if (forbiddenSet.has(letter)) {
        return false;
      }
    }
    return true;
  });
  wordsArray.push(...letterFiltered);
}

// functino to clear game objs for rebuild
function clearGame() {
  score = 0;
  updateScore();
  forbiddenArray = [];
  updateFoundWords();
  letterArray = [];
  wordsArray = [];
  foundArray = [];
}

function printMessage(message) {
  messageBox.textContent = message;
  messageBox.classList.add('active');
  setTimeout(() => {
    messageBox.classList.remove('active');
  }, 1000);
  setTimeout(() => {
    messageBox.textContent = '';
  }, 1500);
}

// New Game Function
function buildGame(num) {
  assignLetters();
  assignCenter();
  assignForbidden();
  buildDictionary();
  if (wordsArray.length < num) {
    clearGame();
    buildGame(num);
  }
}

// On Load Fucntions
window.onload = () => {
  activateHexes();
  buildGame(80);
  console.log('Words:', wordsArray);
};

// BUTTON EVENT LISTENERS
newGameBtn.addEventListener('click', () => {
  clearGame();
  buildGame(80);
  console.log('Words:', wordsArray);
});

deleteBtn.addEventListener('click', () => {
  if (inputQueue.firstChild) {
    inputQueue.removeChild(inputQueue.lastChild);
  }
});

shuffleBtn.addEventListener('click', () => {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  let shuffledLetters = [];
  const outerHexes = hexes.filter((item) => !item.center);
  for (let hex of outerHexes) {
    shuffledLetters.push(hex.shape.textContent);
    hex.shape.textContent = '';
  }
  shuffledLetters = shuffleArray(shuffledLetters);
  for (let i = 0; i < outerHexes.length; i++) {
    outerHexes[i].shape.textContent = shuffledLetters[i];
  }
});

submitBtn.addEventListener('click', () => {
  const input = inputQueue.textContent;
  if (input.length === 0) {
    return;
  }
  if (wordsArray.includes(input) && !foundArray.includes(input)) {
    printMessage('Correct!');
    if (input.length === 4) {
      score += 1;
    } else {
      score += input.length;
    }
    foundArray.unshift(toCapitalCase(input));

    updateFoundWords();
    updateScore();
  } else if (foundArray.includes(input)) {
    printMessage('Already Found!');
  } else {
    if (input.length < 4) {
      printMessage('Too Short!');
    } else if (!input.includes(centerLetter)) {
      printMessage(`You forgot ${centerLetter}!`);
    } else {
      printMessage('Not on the List!');
    }
  }
  inputQueue.textContent = '';
});

themeToggle.addEventListener('click', () => {
  const orange = '#fea635';
  const light = '#fffbff';
  const dark = '#1b1612';
  const root = document.querySelector(':root');
  const rootStyles = getComputedStyle(root);

  if (rootStyles.getPropertyValue('--background') === light) {
    root.style.setProperty('--background', dark);
    root.style.setProperty('--accent', light);
  } else {
    root.style.setProperty('--background', light);
    root.style.setProperty('--accent', dark);
  }
});
