const words = require('../wordsArray');

// LETTER ARRAYS & CENTER LETTER
export const alphabetArray = [
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
export let letterArray = [];
export function resetLetterArray() {
  letterArray = [];
}

export function setLetterArray(newArray) {
  letterArray = newArray;
}
export let forbiddenArray = [];
export function resetForbiddenArray() {
  forbiddenArray = [];
}

// WORD ARRAY
export let wordsArray = [];
export function resetWordsArray() {
  wordsArray = [];
}
export let foundArray = [];
export function resetFoundArray() {
  foundArray = [];
}

export function toCapitalCase(word) {
  return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();
}

// Score Variable
export function addScore(num) {
  score += num;
}
export function resetScore() {
  score = 0;
}
export let score = 0;

// function to collect unused letters
export function assignForbidden() {
  const newList = [...alphabetArray];
  const forbiddenList = newList
    .filter((letter) => {
      return ![...letterArray].includes(letter);
    })
    .map((item) => item.letter);
  forbiddenArray.push(...forbiddenList);
}
