const os = require('os');
const fs = require('fs');

// Lecture du fichier d'entrée
const input = fs.readFileSync('input.txt', 'utf8').split(os.EOL);

let start;
const walls = input.reduce((m, l, y) => l.split('').reduce((mm, c, x) => {
  // Remplissage de l'ensemble des murs et enregistrement de la position de départ
  if (c === '#') mm.add(`${x}/${y}`);
  if (c === 'S') start = [x, y];
  return mm;
}, m), new Set());

const maxSteps = 64;

const visited = new Map();
const toExplore = [[0, ...start]]; // [distance, positionX, positionY]

const neighbors = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // Déplacements possibles (gauche, droite, haut, bas)

while (toExplore.length > 0) {
  const [d, x, y] = toExplore.shift();

  // Si la distance dépasse la limite, passer à la prochaine itération
  if (d > maxSteps) continue;

  const s = `${x}/${y}`;

  // Si la position contient un mur ou a déjà été visitée, passer à la prochaine itération
  if (walls.has(s) || visited.get(s) !== undefined) continue;

  // Enregistrer la distance dans la carte des visites
  visited.set(s, d);

  // Ajouter les voisins à la liste des positions à explorer
  toExplore.push(...neighbors.map(([nx, ny]) => [d + 1, x + nx, y + ny]));
}

// Filtrer les positions visitées à une distance paire et afficher le nombre
console.log([...visited].filter(([_, d]) => d % 2 === 0).length);
