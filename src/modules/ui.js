// UI Elements
export const newGameBtn = document.querySelector('.new-game');
export const themeToggle = document.querySelector('#theme-toggle');
export const inputQueue = document.querySelector('#input-queue');
export const deleteBtn = document.querySelector('#delete');
export const shuffleBtn = document.querySelector('#shuffle');
export const submitBtn = document.querySelector('#submit');
export const scoreDisplay = document.querySelector('#score-value');
export const messageBox = document.querySelector('.message-box');
export const foundWords = document.querySelector('#found-words');

// HEX ARRAY
export const hexes = [
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

// function to give on click functionality to hexes
export function activateHexes() {
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

export function printMessage(message) {
  messageBox.textContent = message;
  messageBox.classList.add('active');
  setTimeout(() => {
    messageBox.classList.remove('active');
  }, 1000);
  setTimeout(() => {
    messageBox.textContent = '';
  }, 1500);
}
