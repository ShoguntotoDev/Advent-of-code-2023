const fs = require('fs');

// Lecture du contenu du fichier 'input.txt'
const input = fs.readFileSync('input.txt', 'utf8');

// Fonction pour calculer la différence entre les éléments consécutifs d'une séquence
function calculateDifference(sequence) {
    const difference = [];
    for (let i = 1; i < sequence.length; i++) {
      difference.push(sequence[i] - sequence[i - 1]);
    }
    return difference;
  }
  
  // Fonction pour extrapoler les valeurs d'un historique
  function extrapolateValues(history) {
    let currentSequence = history.slice();
    let nextSequence = calculateDifference(currentSequence);
  
    // Continuez à calculer les différences jusqu'à ce que toutes les valeurs soient zéro
    while (!nextSequence.every(value => value === 0)) {
      currentSequence = nextSequence.slice();
      nextSequence = calculateDifference(currentSequence);
    }
  
    // Extrapoler la prochaine valeur de l'historique d'origine
    const nextValue = currentSequence[currentSequence.length - 1] + nextSequence[nextSequence.length - 1];
    return nextValue;
  }
  
  // Fonction pour résoudre l'énigme avec les données d'entrée
  function solveOasisPuzzle(input) {
    const oasisReport = input.split('\n').map(line => line.split(' ').map(Number));
  
    // Extrapoler les valeurs pour chaque historique et les ajouter
    const sumOfExtrapolatedValues = oasisReport.reduce((sum, history) => {
      const nextValue = extrapolateValues(history);
      return sum + nextValue;
    }, 0);
  
    return sumOfExtrapolatedValues;
  }
  
  // Exemple d'utilisation avec vos données d'entrée
  const result = solveOasisPuzzle(input);
  console.log(result); // Affiche la somme des valeurs extrapolées
  