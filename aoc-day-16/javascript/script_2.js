// Importation des modules nécessaires
const os = require('os');
const fs = require('fs');

// Lecture du fichier d'entrée et séparation des lignes
const input = fs.readFileSync('input.txt', 'utf8').split(os.EOL);

// Création d'une carte à partir des caractères du fichier d'entrée
const map = input.reduce((m, l, y) =>
  l.split('').reduce((map, c, x) => {
    if (c !== '.') map[`${x}/${y}`] = c;
    return map;
  }, m), {});

// Définition des directions possibles en fonction de la direction actuelle et du caractère sur la carte
const dirs = {
  'E': { '|': ['N', 'S'], '/': ['N'], '\\': ['S'] },
  'W': { '|': ['N', 'S'], '/': ['S'], '\\': ['N'] },
  'N': { '-': ['E', 'W'], '/': ['E'], '\\': ['W'] },
  'S': { '-': ['E', 'W'], '/': ['W'], '\\': ['E'] }
};

let max = 0;

// Fonction pour explorer les chemins possibles depuis une position donnée
const check = (sx, sy, d) => {
  const visited = new Set();
  const toCheck = [[sx, sy, d]];

  while (toCheck.length > 0) {
    const [x, y, dir] = toCheck.pop();

    if (x < 0 || x >= input[0].length || y < 0 || y >= input.length) continue;

    if (visited.has(`${x}/${y}/${dir}`)) continue;

    visited.add(`${x}/${y}/${dir}`);

    const newDirs = dirs[dir][map[`${x}/${y}`] || '.'];

    if (!newDirs) {
      toCheck.push([x + (dir == 'E' ? 1 : dir == 'W' ? -1 : 0), y + (dir == 'S' ? 1 : dir == 'N' ? -1 : 0), dir]);
      continue;
    }

    for (let d of newDirs) {
      toCheck.push([x + (d == 'E' ? 1 : d == 'W' ? -1 : 0), y + (d == 'S' ? 1 : d == 'N' ? -1 : 0), d]);
    }
  }

  return new Set([...visited].map(s => s.slice(0, -2))).size;
};

// Exploration des bords de la carte pour trouver le maximum
for (let sx = 0; sx < input[0].length; sx++) {
  max = Math.max(max, check(sx, 0, 'S'), check(sx, input.length - 1, 'N'));
}

for (let sy = 0; sy < input.length; sy++) {
  max = Math.max(max, check(0, sy, 'E'), check(input[0].length - 1, sy, 'W'));
}

console.log(max);
