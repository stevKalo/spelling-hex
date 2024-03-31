import { length } from 'file-loader';
import './styles.css';
const words = require('./wordsArray.js');

// GLOBALS
const inputQueue = document.querySelector('#input-queue');
const deleteBtn = document.querySelector('#delete');
const shuffleBtn = document.querySelector('#shuffle');
const submitBtn = document.querySelector('#submit');
let score = 0;
const scoreDisplay = document.querySelector('#score-value');

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
  const newList = [...alphabetArray]; // Make a copy of alphabetArray
  function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }
  function checkVowels(array) {
    return array.filter((item) => item.vowel === true).length >= 2;
  }
  function chooseLetters() {
    for (let hex of hexes) {
      const index = getRandomIntInclusive(0, newList.length - 1);
      const letter = newList[index];
      hex.shape.textContent = letter.letter;
      letterArray = new Set([...letterArray, letter]);
      newList.splice(index, 1);
    }
  }
  while (!checkVowels([...letterArray])) {
    letterArray = new Set([]);
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
    hex.shape.addEventListener('click', () => {
      inputQueue.textContent += hex.shape.textContent;
    });
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
  forbiddenArray = [];
  letterArray = [];
  wordsArray = [];
}

// function to update score on correct answers
function updateScore() {
  scoreDisplay.textContent = score.toString();
}

// On Load Fucntions
window.onload = () => {
  function buildGame(num) {
    assignLetters();
    assignCenter();
    assignForbidden();
    buildDictionary();
    if (wordsArray.length < num) {
      clearGame();
      buildGame(num);
    } else {
      activateHexes();
    }
  }
  buildGame(80);
  console.log(wordsArray);
};

// BUTTON EVENT LISTENERS
deleteBtn.addEventListener('click', () => {
  inputQueue.textContent = inputQueue.textContent.slice(
    0,
    inputQueue.textContent.length - 1
  );
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
  // check if wordsArray.includes(input)
  if (wordsArray.includes(input)) {
    console.log('Congrats!');
    score++;
    updateScore();
  } else {
    if (!input.length > 3) {
      console.log('Too Short');
    } else if (!input.includes(centerLetter)) {
      console.log(`You forgot ${centerLetter}!`);
    } else {
      console.log('Not on the list');
    }
  }
  inputQueue.textContent = '';
});
