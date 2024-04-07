import './styles.css';
const words = require('./wordsArray.js');
import * as ui from './modules/ui.js';
import * as game from './modules/game.js';

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
    const newList = [...game.alphabetArray];
    for (let hex of ui.hexes) {
      const index = getRandomIntInclusive(0, newList.length - 1);
      const letter = newList[index];
      hex.shape.textContent = letter.letter;
      game.setLetterArray(new Set([...game.letterArray, letter]));
      newList.splice(index, 1);
    }
  }
  while (!checkVowels([...game.letterArray])) {
    game.setLetterArray(new Set());
    chooseLetters();
  }
}

// function to assign center letter
let centerLetter;
function assignCenter() {
  centerLetter = ui.hexes[3].shape.textContent;
}

//function to build array of accepted words
function buildDictionary() {
  const forbiddenSet = new Set(game.forbiddenArray);
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
  game.wordsArray.push(...letterFiltered);
}

// function to update score on correct answers
function updateScore() {
  ui.scoreDisplay.textContent = game.score.toString();
}

function updateFoundWords() {
  ui.foundWords.textContent = game.foundArray.join(', ');
}

// functino to clear game objs for rebuild
function clearGame() {
  game.resetScore();
  updateScore();
  game.resetForbiddenArray();
  updateFoundWords();
  game.resetLetterArray();
  game.resetWordsArray();
  game.resetFoundArray();
  while (ui.inputQueue.firstChild) {
    ui.inputQueue.removeChild(ui.inputQueue.firstChild);
  }
}

// New Game Function
function buildGame(num) {
  assignLetters();
  assignCenter();
  game.assignForbidden();
  buildDictionary();
  if (game.wordsArray.length < num) {
    clearGame();
    buildGame(num);
  }
}

// On Load Fucntions
window.onload = () => {
  ui.activateHexes();
  buildGame(80);
  console.log('Words:', game.wordsArray);
};

// BUTTON EVENT LISTENERS
ui.newGameBtn.addEventListener('click', () => {
  clearGame();
  buildGame(80);
  console.log('Words:', game.wordsArray);
});

ui.deleteBtn.addEventListener('click', () => {
  if (ui.inputQueue.firstChild) {
    ui.inputQueue.removeChild(ui.inputQueue.lastChild);
  }
});

ui.shuffleBtn.addEventListener('click', () => {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  let shuffledLetters = [];
  const outerHexes = ui.hexes.filter((item) => !item.center);
  for (let hex of outerHexes) {
    shuffledLetters.push(hex.shape.textContent);
    hex.shape.textContent = '';
  }
  shuffledLetters = shuffleArray(shuffledLetters);
  for (let i = 0; i < outerHexes.length; i++) {
    outerHexes[i].shape.textContent = shuffledLetters[i];
  }
});

ui.submitBtn.addEventListener('click', () => {
  const input = ui.inputQueue.textContent;
  if (input.length === 0) {
    return;
  }
  if (game.wordsArray.includes(input) && !game.foundArray.includes(input)) {
    ui.printMessage('Correct!');
    if (input.length === 4) {
      game.addScore(1);
    } else {
      game.addScore(input.length);
    }
    game.foundArray.unshift(game.toCapitalCase(input));

    updateFoundWords();
    updateScore();
  } else if (foundArray.includes(input)) {
    ui.printMessage('Already Found!');
  } else {
    if (input.length < 4) {
      ui.printMessage('Too Short!');
    } else if (!input.includes(centerLetter)) {
      ui.printMessage(`You forgot ${centerLetter}!`);
    } else {
      ui.printMessage('Not on the List!');
    }
  }
  ui.inputQueue.textContent = '';
});

ui.themeToggle.addEventListener('click', () => {
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
