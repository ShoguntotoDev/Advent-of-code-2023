const os = require('os');
const fs = require('fs');


// Lecture du fichier d'entrée et extraction des données
const input = fs.readFileSync('input.txt', 'utf8')
  .split(os.EOL)
  .map(l => l.split(' ').slice(2)[0].slice(2, -1))
  .map(h => [parseInt(h.slice(0, -1), 16), +h.slice(-1)]);

// Définition des déplacements possibles
const n = {
  0: [1, 0],
  1: [0, 1],
  2: [-1, 0],
  3: [0, -1],
};

// Initialisation des bords avec le point d'origine
const edges = [[0, 0]];

// Construction des bords en suivant les instructions
for (let [steps, dir] of input) {
  const o = n[dir];
  const current = edges[edges.length - 1];
  const next = [current[0] + steps * o[0], current[1] + steps * o[1]];
  edges.push(next);
}

// Calcul des aires entre les bords
const areas = [];

for (let i = 0; i < edges.length - 2; i++) {
  areas.push(edges[i][0] * edges[i + 1][1] - edges[i][1] * edges[i + 1][0]);
}

// Calcul et affichage de la surface totale
console.log((areas.reduce((s, a) => s + a, 0) + input.reduce((s, [d]) => s + d, 0)) / 2 + 1);
