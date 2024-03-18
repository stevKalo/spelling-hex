import './styles.css';

// new game function
// for each hex
// pick a random letter of alphabet, assign letters
//

const inputQueue = document.querySelector('#input-queue');

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

const letterArray = [];
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
  const newList = alphabetArray;
  function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
  }
  for (let hex of hexes) {
    const index = getRandomIntInclusive(0, newList.length - 1);
    const letter = newList[index].letter;
    hex.shape.textContent = letter;
    letterArray.push(letter);
    newList.splice(index, 1);
  }
}

// ** Need to refactor assign letters, should choose letters first to ensure there are at least 2 vowels before assigning to textContent

// function to give on click functionality to hexes
function activateLetters() {
  for (let hex of hexes) {
    hex.shape.addEventListener('click', () => {
      console.log(hex.shape.textContent);
      inputQueue.textContent += hex.shape.textContent;
    });
  }
}

window.onload = () => {
  assignLetters();
  activateLetters();
};
