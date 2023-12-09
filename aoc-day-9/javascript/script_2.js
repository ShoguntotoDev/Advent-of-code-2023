const os = require('os');
const fs = require('fs');

// Lecture du fichier d'entrée et traitement des lignes
const input = fs.readFileSync('input.txt', 'utf8')
  .split(os.EOL)
  .map(l => l.split(' ').map(x => +x));  // Conversion des nombres dans chaque ligne en nombres

// Fonction pour trouver le prochain élément d'une séquence
const findNext = seq => {
  const sequences = [seq];
  let current = seq;

  // Tant que la séquence n'est pas constituée de zéros, continuez à générer la séquence suivante
  while (!current.every(x => x == 0)) {
    const next = current.slice(1).map((x, idx) => x - current[idx]);
    sequences.push(next);
    current = next;
  }

  // Calcul de la somme des premiers éléments de chaque séquence générée
  let sum = 0;
  for (let i = sequences.length - 1; i >= 0; i--) {
    sum = sequences[i].at(0) - sum;
  }

  return sum;
};

// Calcul de la somme des résultats pour chaque ligne du fichier d'entrée
const result = input.reduce((sum, currentLine) => sum + findNext(currentLine), 0);

// Affichage du résultat final
console.log(result);
