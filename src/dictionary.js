const fs = require('fs');

const words10 = fs
  .readFileSync('src/assets/scowl-2020.12.07/final/english-words.10', 'utf-8')
  .split('\n')
  .filter((item) => !item.includes("'"))
  .filter((item) => item.length > 3)
  .map((item) => item.toUpperCase());

const words20 = fs
  .readFileSync('src/assets/scowl-2020.12.07/final/english-words.20', 'utf-8')
  .split('\n')
  .filter((item) => !item.includes("'"))
  .filter((item) => item.length > 3)
  .map((item) => item.toUpperCase());

const words35 = fs
  .readFileSync('src/assets/scowl-2020.12.07/final/english-words.35', 'utf-8')
  .split('\n')
  .filter((item) => !item.includes("'"))
  .filter((item) => item.length > 3)
  .map((item) => item.toUpperCase());

const words40 = fs
  .readFileSync('src/assets/scowl-2020.12.07/final/english-words.40', 'utf-8')
  .split('\n')
  .filter((item) => !item.includes("'"))
  .filter((item) => item.length > 3)
  .map((item) => item.toUpperCase());

const words50 = fs
  .readFileSync('src/assets/scowl-2020.12.07/final/english-words.50', 'utf-8')
  .split('\n')
  .filter((item) => !item.includes("'"))
  .filter((item) => item.length > 3)
  .map((item) => item.toUpperCase());

const words55 = fs
  .readFileSync('src/assets/scowl-2020.12.07/final/english-words.55', 'utf-8')
  .split('\n')
  .filter((item) => !item.includes("'"))
  .filter((item) => item.length > 3)
  .map((item) => item.toUpperCase());

const finalList = new Set([
  ...words10,
  ...words20,
  ...words35,
  ...words40,
  ...words50,
  ...words55,
]);

try {
  fs.writeFileSync(
    'src/wordsArray.js',
    'module.exports = ' + JSON.stringify(Array.from(finalList)) + ';'
  );
  console.log('File written successfully');
} catch (err) {
  console.error('Error writing file:', err);
}
