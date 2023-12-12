const fs = require('fs');

// Fonction pour valider si la configuration du ressort correspond au modèle spécifié
function validerRessort(ressort, config) {
  let detecte = [];
  let crr = 0;

  ressort.forEach((char) => {
    if (char == '#') crr++;
    if ((char == '.' || char == '?') && crr > 0) {
      detecte.push(crr);
      crr = 0;
    }
  });

  if (crr > 0) detecte.push(crr);

  return JSON.stringify(detecte) == JSON.stringify(config);
}

// Fonction pour générer toutes les combinaisons d'éléments dans un tableau
function combinations(array) {
  return new Array(1 << array.length).fill().map(
    (e1, i) => array.filter((e2, j) => i & 1 << j)
  );
}

// Fonction pour trouver toutes les occurrences d'un caractère dans une chaîne
function toutesLesOccurences(str, c) {
  return str.split('').map((s, idx) => s == c ? idx : -1).filter((i) => i >= 0);
}

// Fonction récursive pour trouver le nombre de configurations valides pour un ressort
function recFind(ressorts, casses, i, bi, crr) {
  let key = i + ' ' + bi + ' ' + crr;

  if (key in memory) {
    return memory[key];
  }

  if (i == ressorts.length) {
    if ((bi == casses.length && crr == 0) ||
        (bi == casses.length - 1 && casses[bi] == crr)) {
      return 1;
    } else {
      return 0;
    }
  }

  let sum = 0;

  for (let char of ['.', '#']) {
    if (ressorts[i] == char || ressorts[i] == '?') {
      if (char == '.' && crr == 0) {
        sum += recFind(ressorts, casses, i + 1, bi, 0);
      } else if (char == '.' && crr > 0 && bi < casses.length && casses[bi] == crr) {
        sum += recFind(ressorts, casses, i + 1, bi + 1, 0);
      } else if (char == '#') {
        sum += recFind(ressorts, casses, i + 1, bi, crr + 1);
      }
    }
  }

  memory[key] = sum;
  return sum;
}

// Partie Un : Compter le nombre de configurations valides pour chaque ligne dans le fichier d'entrée
function partieUn(filename) {
  const ressorts = fs.readFileSync(filename, 'utf-8').trim().split('\n').map((line) => line.split(' '));

  let numParLigne = ressorts.map((ligne) => {
    let config = ligne[1].split(',').map((x) => parseInt(x));
    let inconnus = toutesLesOccurences(ligne[0], '?');
    let solsValides = combinations(inconnus).map((c) => {
      let tempRessort = ligne[0].split('');
      c.forEach((idx) => tempRessort[idx] = '#');
      return validerRessort(tempRessort, config);
    });

    return solsValides.reduce((sum, val) => sum + val, 0);
  });

  return numParLigne.reduce((sum, val) => sum + val);
}

// Afficher le résultat de la partie deux
console.log('Partie 1: ', partieUn('./input.txt'));