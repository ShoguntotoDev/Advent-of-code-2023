const { EOL } = require('os');
const { readFileSync } = require('fs');

// Lire le fichier d'entrée
const input = readFileSync('input.txt', 'utf8');

// Fonction pour transposer une matrice
const transpose = a => a[0].split('').map((_, colIndex) => a.map(row => row[colIndex]).join(''));

// Fonction pour faire pivoter une matrice à 90 degrés dans le sens horaire
const rotate = a => a[0].split('').map((_, index, arr) => a.map(row => row[row.length - 1 - index]).join(''));

let lines = transpose(input.split(EOL));
const seen = [];
let i = 0;
let weights = [];

while (!seen.includes(lines.join(''))) {
  if (i % 4 === 0) seen.push(lines.join(''));

  lines = lines.map(l => {
    let current = l;
    for (let i = 0; i < l.length; i++) {
      if (l.charAt(i) === 'O') {
        let c = i;
        while (c > 0 && current.charAt(c - 1) === '.') {
          c--;
        }
        if (c >= 0 && c < i) current = current.slice(0, c) + 'O' + current.slice(c + 1, i) + '.' + current.slice(i + 1);
      }
    }
    return current;
  });

  i++;
  lines = rotate(lines);

  if (i % 4 === 0) {
    weights.push(lines.reduce(((s, line) => line.split('').map((c, i) => c === 'O' ? line.length - i : 0).reduce((sum, x) => sum + x, s)), 0));
  }
}

const cLength = weights.length - seen.indexOf(lines.join(''));
const stepsBeforeCycle = i / 4 - cLength;

console.log(weights.slice(stepsBeforeCycle - 1)[(1000000000 - stepsBeforeCycle) % cLength]);
