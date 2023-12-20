const os = require('os');
const fs = require('fs');

// Lecture du fichier d'entrée et séparation des règles et des objets
const input = fs.readFileSync('input.txt', 'utf8')
  .split(os.EOL + os.EOL);

// Extraction des règles
const rules = input[0].split(os.EOL).reduce((o, l) => {
  const parts = l.slice(0, -1).split('{');
  o[parts[0]] = parts[1].split(',').map(s => s.split(':'));
  return o;
}, {});

// Initialisation des conditions à vérifier
const toCheck = [['in', { x: 1, m: 1, a: 1, s: 1 }, { x: 4000, m: 4000, a: 4000, s: 4000 }]];

let accepted = 0;

while (toCheck.length > 0) {
  const [current, min, max] = toCheck.pop();

  if (current == 'R') continue;

  if (current == 'A') {
    // Calcul et ajout au total des combinaisons possibles
    accepted += (max.x - min.x + 1) * (max.m - min.m + 1) * (max.a - min.a + 1) * (max.s - min.s + 1);
    continue;
  }

  const ruleList = rules[current];

  for (let r of ruleList) {
    if (r.length == 1) {
      // Ajout de la règle à la pile de vérification
      toCheck.push([r[0], min, max]);
      break;
    }

    const c = r[0];
    const prop = c.charAt(0);
    const cond = c.charAt(1);
    const v = +c.slice(2);

    const newMin = { ...min };
    const newMax = { ...max };

    if (cond == '<') {
      // Mise à jour des bornes et ajout de la règle à la pile
      newMax[prop] = v - 1;
      min[prop] = v;
      toCheck.push([r[1], newMin, newMax]);
      continue;
    }
    if (cond == '>') {
      // Mise à jour des bornes et ajout de la règle à la pile
      newMin[prop] = v + 1;
      max[prop] = v;
      toCheck.push([r[1], newMin, newMax]);
      continue;
    }
  }
}

// Affichage du résultat final
console.log(accepted);
