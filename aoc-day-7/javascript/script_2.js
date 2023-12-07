// Importation des modules nécessaires
const { EOL } = require('os');
const { readFileSync } = require('fs');

// Lecture du fichier d'entrée et stockage du contenu dans la variable 'input'
const input = readFileSync('./aoc-day-7/javascript/input.txt', 'utf8');

// Définition des différentes combinaisons de cartes et de leurs rangs
const ranks = [
  c => c[0] == 5,
  c => c[0] == 4,
  c => c[0] == 3 && c[1] == 2,
  c => c[0] == 3 && c[1] == 1,
  c => c[0] == 2 && c[1] == 2,
  c => c[0] == 2 && c[1] == 1,
  c => c[0] == 1,
];

// Séparation des mains du joueur en cartes individuelles
const hands = input.split(EOL).map(l => l.split(' '));

// Fonction pour calculer le rang d'une main
const getRank = h => {
  // Compter les occurrences de chaque carte
  const counts = h[0].split('').reduce((o, c) => {
    if (o[c] == undefined) o[c] = 0;
    o[c] += 1;
    return o;
  }, {});

  // Gérer les jokers (J) s'il y en a
  const jokerCount = counts['J'] || 0;
  delete counts['J'];
  const sorted = Object.values(counts).sort((a, b) => b - a);
  sorted[0] = (sorted[0] || 0) + jokerCount;

  // Trouver le rang de la main en utilisant les combinaisons prédéfinies
  return ranks.findIndex(fn => fn(sorted));
};

// Définition de l'ordre des cartes
const cardRanks = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J'];

// Fonction de comparaison de deux chaînes de caractères représentant des mains
const strcomp = (s1, s2) => {
  for (let i = 0; i < 5; i++) {
    if (cardRanks.indexOf(s1[i]) > cardRanks.indexOf(s2[i])) return -1;
    if (cardRanks.indexOf(s1[i]) < cardRanks.indexOf(s2[i])) return 1;
  }
};

// Tri des mains en fonction de leur rang et de leur contenu
hands.sort((h1, h2) => {
  const r1 = getRank(h1);
  const r2 = getRank(h2);

  if (r1 === r2) return strcomp(h1[0], h2[0]);

  return r2 - r1;
});

// Affichage du résultat final en additionnant les scores pondérés de chaque main
console.log(hands.reduce((a, h, i) => a + (+h[1]) * (i + 1), 0));
