import { length } from 'file-loader';
import './styles.css';
const words = require('./wordsArray.js');

// GLOBALS
const inputQueue = document.querySelector('#input-queue');
const deleteBtn = document.querySelector('#delete');
const shuffleBtn = document.querySelector('#shuffle');
const submitBtn = document.querySelector('#submit');

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
  if (inputQueue.textContent.length <= 3) {
    // tell user not big enough
  } else if (inputQueue.textContent.includes(centerLetter)) {
    console.log(inputQueue.textContent);
    // make API call to dictionary API
    // if resolved
    // add points equal to length to the score
    // if error
    // flash "Not a Word"
  } else {
    // flash "Missing Center Letter"
  }
  inputQueue.textContent = '';
});

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

// WORD ARRAYS
const wordsArray = [];

//function to build array of accepted words
function buildDictionary() {
  // filter words to have center letter
  console.log('Master Words', words);
  const centerFiltered = words.filter((word) => {
    return word.includes(centerLetter);
  });
  console.log('Filtered by Center', centerFiltered);
  // filter centerFiltered to not have any of the forbidden letters
  const letterFiltered = centerFiltered.filter((word) => {
    for (let letter of word) {
      if (forbiddenArray.includes(letter.toUpperCase())) {
        // Convert letter to uppercase for comparison
        return false;
      }
    }
    return true;
  });
  console.log('Filtered by Letters', letterFiltered);
  console.log('Words Array', wordsArray);
  wordsArray.push(...letterFiltered);
}

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
      letterArray.push(letter);
      newList.splice(index, 1);
    }
  }
  while (!checkVowels(letterArray)) {
    letterArray = [];
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
  const forbiddenList = newList.filter((letter) => {
    return !letterArray.includes(letter);
  });
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

window.onload = () => {
  assignLetters();
  assignCenter();
  activateHexes();
  assignForbidden();
  buildDictionary();
};
