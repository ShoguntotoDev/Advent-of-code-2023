const os = require('os');
const fs = require('fs');

// Lire le fichier d'entrée et le diviser en lignes
const input = fs.readFileSync('input.txt', 'utf8').split(os.EOL);

// Initialiser la position de départ et les murs
let start;
const walls = input.reduce((m, l, y) => l.split('').reduce((mm, c, x) => {
  if (c === '#') mm.add(`${x}/${y}`);
  if (c === 'S') start = [x, y];
  return mm;
}, m), new Set());

// Longueur de la grille
const l = input.length;

// Déplacements possibles (haut, bas, gauche, droite)
const n = [[-1, 0], [1, 0], [0, -1], [0, 1]];

// Fonction pour explorer un carré dans la grille
const exploreSquare = (ss, sx, sy, maxSteps) => {
  const visited = new Map();
  const toExplore = [[ss, sx, sy]];

  while (toExplore.length > 0) {
    const [d, x, y] = toExplore.shift();

    if (d > maxSteps) continue;

    const s = `${x}/${y}`;

    // Normaliser les coordonnées pour gérer les bords de la grille
    const sNorm = `${(l + (x % l)) % l}/${(l + (y % l)) % l}`;

    // Ignorer les murs et les cases déjà visitées
    if (walls.has(sNorm) || visited.get(s) !== undefined) continue;

    // Enregistrer la distance depuis le départ
    visited.set(s, d);

    // Ajouter les voisins à explorer
    toExplore.push(...n.map(([nx, ny]) => [d + 1, x + nx, y + ny]));
  }

  return visited;
};

// Nombre total d'étapes à atteindre
const steps = 26501365;

// Positions relatives des trois carrés successifs
const x1 = steps % l;
const x2 = x1 + l;
const x3 = x2 + l;

// Explorer les trois carrés successifs
const r1 = exploreSquare(x1 % 2, start[0], start[1], x1 + 1);
const r2 = exploreSquare(x2 % 2, start[0], start[1], x2 + 1);
const r3 = exploreSquare(x3 % 2, start[0], start[1], x3 + 1);

// Compter le nombre de cases visitées à une distance paire pour chaque carré
const [y1, y2, y3] = [r1, r2, r3].map(r => [...r].filter(([_, d]) => d % 2 === 0).length);

// Utiliser une formule mathématique pour calculer le nombre total de cases visitées jusqu'à une certaine étape
const a = y1;
const b = y2 - y1;
const c = y3 - y2;

// Calculer le résultat final
const x = (steps - 65) / l;
const result = a + b * x + ((x * (x - 1)) / 2) * (c - b);

// Afficher le résultat
console.log(result);
