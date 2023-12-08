// Importation des modules nécessaires de Node.js
const os = require('os');
const fs = require('fs');

// Lecture du contenu du fichier 'input.txt'
const input = fs.readFileSync('input.txt', 'utf8');

// Séparation de l'entrée en deux parties en fonction des sauts de ligne doubles
const parts = input.split(os.EOL + os.EOL);

// Extraction des caractères individuels de la première partie comme directions
const directions = parts[0].split('');

// Création d'un objet de carte à partir de la deuxième partie de l'entrée
const map = parts[1].split(os.EOL).reduce((m, l) => {
  // Extraction des sous-chaînes pour les directions 'L' et 'R' et stockage dans la carte
  m[l.slice(0, 3)] = {"L": l.slice(7, 10), "R": l.slice(12, 15)};
  return m;
}, {});

// Initialisation des variables pour compter les étapes et la position actuelle
let steps = 0;
let current = 'AAA';

// Boucle jusqu'à ce que la position actuelle devienne 'ZZZ'
while (current !== 'ZZZ') {
  // Mise à jour de la position actuelle en fonction des directions
  current = map[current][directions[steps % directions.length]];
  steps++;
}

// Affichage du nombre total d'étapes effectuées
console.log(steps);
