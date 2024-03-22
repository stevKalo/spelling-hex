const fs = require('fs');

const words = fs
  .readFileSync('src/assets/scowl-2020.12.07/final/english-words.95', 'utf-8')
  .split('\n')
  .filter((item) => !item.includes("'"))
  .filter((item) => item.length > 4)
  .map((item) => item.toUpperCase());

fs.writeFileSync(
  'wordsArray.js',
  'module.exports = ' + JSON.stringify(words) + ';'
);
