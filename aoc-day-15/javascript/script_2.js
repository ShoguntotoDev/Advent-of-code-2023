const os = require('os');
const fs = require('fs');

// Lire le fichier d'entrée et le diviser par virgules
const input =
  fs.readFileSync('input.txt', 'utf8')
  .split(',');

// Fonction pour calculer le hash d'une chaîne
const hash = s => s.split('').reduce(((sum, c) => ((sum + c.charCodeAt(0)) * 17) & 255), 0);

// Créer une map pour stocker les valeurs associées aux hashs
const m = new Map();

// Parcourir chaque élément dans le tableau d'entrée
for (let s of input) {
  // Récupérer le dernier caractère comme entier
  const p = parseInt(s.charAt(s.length - 1));

  // Vérifier si l'opération est une addition ou une soustraction
  const isAdd = s.indexOf('=') > -1;

  let n;

  // Extraire le nom de la variable
  if (isAdd) {
    n = s.split('=')[0];
  } else {
    n = s.slice(0, -1);
  }

  // Calculer le hash pour le nom de la variable
  const b = hash(n);
  const v = m.get(b);

  if (!v) {
    // Si aucune valeur n'est associée au hash, créer une nouvelle entrée
    if (isAdd) m.set(b, [[n, p]]);
  } else {
    // Si une valeur est déjà associée au hash
    const i = v.findIndex(([oN]) => oN === n);

    if (i > -1) {
      // Si la variable existe déjà dans la liste, mettre à jour ou supprimer
      if (isAdd) {
        v[i] = [n, p];
      } else {
        v.splice(i, 1);
        m.set(b, v);
      }
    } else {
      // Si la variable n'existe pas dans la liste, l'ajouter
      if (isAdd) v.push([n, p]);
    }
  }
}

// Calculer la somme pondérée des valeurs associées aux hashs
const result = [...m.entries()].reduce((sum, [idx, vals]) => 
  vals.reduce((s, [n, v], i) => s + (idx + 1) * v * (i + 1), sum), 0);

// Afficher le résultat
console.log(result);
