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

// Recherche des points de départ se terminant par 'A' dans la carte
let startingPoints = Object.keys(map).filter(p => p.endsWith('A'));

// Initialisation d'un tableau pour stocker les résultats
let results = [];

// Boucle sur les points de départ pour calculer le nombre d'étapes nécessaires
for (let point of startingPoints) {
  let steps = 0;
  let visited = [];
  let current = point;

  // Boucle jusqu'à ce qu'une séquence soit répétée
  while (true) {
    const offset = steps % directions.length;

    // Vérification des séquences répétées
    if (offset === 0) {
      if (visited.find(v => v === offset + current)) break;
      visited.push(offset + current);
    }

    // Mise à jour de la position actuelle en fonction des directions
    current = map[current][directions[steps % directions.length]];
    steps++;
  }

  results.push(steps);
}

// Définition d'une fonction pour calculer le PGCD
const gcd = (a, b) => {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
};

// Définition d'une fonction pour calculer le PPCM
const lcm = (a, b) => (a * b) / gcd(a, b);

// Définition d'une fonction pour calculer le PPCM de plusieurs nombres
const lcmm = args => {
  if (args.length === 2) {
    return lcm(args[0], args[1]);
  } else {
    let arg0 = args[0];
    args.shift();
    return lcm(arg0, lcmm(args));
  }
};

// Affichage du PPCM des résultats ajustés
console.log(lcmm(results.map(x => x - directions.length)));
