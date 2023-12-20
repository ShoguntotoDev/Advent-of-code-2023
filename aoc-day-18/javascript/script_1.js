const os = require('os');
const fs = require('fs');

// Lecture du fichier d'entrée et transformation en tableau d'instructions
const input = fs.readFileSync('input.txt', 'utf8')
  .split(os.EOL)
  .map(l => l.split(' '))
  .map(n => [n[0], +n[1], n[2]]);

// Définition des déplacements possibles
const n = { L: [-1, 0], R: [1, 0], U: [0, -1], D: [0, 1] };

// Initialisation de la carte et position actuelle
const coordinates = new Set(); // Renommage de 'map' à 'coordinates'
let current = [0, 0];
coordinates.add(`${0}/${0}`);

// Traitement des instructions pour construire la carte
for (let [dir, steps] of input) {
  const path = Array(steps).fill().map((_, i) => [n[dir][0] * (i + 1) + current[0], n[dir][1] * (i + 1) + current[1]]);
  path.forEach(p => coordinates.add(`${p[0]}/${p[1]}`));
  current = path[path.length - 1];
}

// Détermination des limites de la carte étendue
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
[...coordinates.values()].forEach(p => {
  const [x, y] = p.split('/').map(n => +n);
  minX = Math.min(minX, x);
  maxX = Math.max(maxX, x);
  minY = Math.min(minY, y);
  maxY = Math.max(maxY, y);
});

// Ajustement des limites pour inclure l'extérieur de la carte
minX -= 1;
maxX += 1;
minY -= 1;
maxY += 1;

// Initialisation de la carte extérieure
const outside = new Set();
const toExplore = [[minX, minY]];

// Exploration des coordonnées extérieures
while (toExplore.length > 0) {
  const [x, y] = toExplore.pop();
  const s = `${x}/${y}`;

  if (outside.has(s) || coordinates.has(s) || x < minX || x > maxX || y < minY || y > maxY) continue;

  outside.add(s);
  toExplore.push([x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]);
}

// Calcul et affichage de la superficie hors de la carte
console.log((maxX - minX + 1) * (maxY - minY + 1) - outside.size);
