const os = require('os');
const fs = require('fs');

// Lire le fichier d'entrée et le diviser par virgules
const input =
  fs.readFileSync('input.txt', 'utf8')
  .split(',');

// Fonction pour calculer le hash d'une chaîne
const hash = s => s.split('').reduce(((sum, c) => ((sum + c.charCodeAt(0)) * 17) & 255), 0);

// Calculer la somme des hashs pour chaque élément dans le tableau d'entrée
const result = input.reduce((sum, s) => sum + hash(s), 0);

// Afficher le résultat
console.log(result);
