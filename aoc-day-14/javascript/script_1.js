const os = require('os');
const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8');

const transpose = a => a[0].split('').map((_, colIndex) => a.map(row => row[colIndex]).join(''));

const lines = transpose(input.split(os.EOL));

const result = lines.map(l => {
  let current = l;

  for (let i = 0; i < l.length; i++) {
    if (l.charAt(i) === 'O') {
      let c = i;

      // Trouver la première position non vide à gauche de 'O'
      while (c > 0 && current.charAt(c - 1) === '.') {
        c--;
      }

      // Si une position non vide à gauche de 'O' est trouvée, effectuer le remplacement
      if (c >= 0 && c < i) {
        current = current.slice(0, c) + 'O' + current.slice(c + 1, i) + '.' + current.slice(i + 1);
      }
    }
  }

  return current;
}).reduce(((s, line) => line.split('').map((c, i) => c === 'O' ? line.length - i : 0).reduce((sum, x) => sum + x, s)), 0);

console.log(result);
