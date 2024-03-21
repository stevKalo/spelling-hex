import './styles.css';
const words = require('./wordsArray.js');

// new game function
// for each hex
// pick a random letter of alphabet, assign letters
//

const inputQueue = document.querySelector('#input-queue');
const deleteBtn = document.querySelector('#delete');
const shuffleBtn = document.querySelector('#shuffle');
const submitBtn = document.querySelector('#submit');

// Button Event Listeners
deleteBtn.addEventListener('click', () => {
  inputQueue.textContent = inputQueue.textContent.slice(
    0,
    inputQueue.textContent.length - 1
  );
});

shuffleBtn.addEventListener('click', () => {
  // clear text content of all hexes except for hex4
  // shuffle letterArray
  // reassign letters to hexes
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

// LETTER ARRAY
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

// HEX OBJECT ARRAY
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
      letterArray.push(letter);
      newList.splice(index, 1);
    }
  }
  while (!checkVowels(letterArray)) {
    letterArray = [];
    chooseLetters();
  }
}

// ** Need to refactor assign letters, should choose letters first to ensure there are at least 2 vowels before assigning to textContent

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
  activateHexes();
  console.log(words);
};
