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

// Extraction des objets
const objects = input[1].split(os.EOL).map(s => s.slice(1, -1).split(',').reduce((o, p) => {
  const [key, value] = p.split('=');
  o[key] = +value;
  return o;
}, {}));

// Fonction pour vérifier une règle
const check = function (rule) {
  return eval(rule);
};

// Calcul de la somme des valeurs d'objets valides
let sum = 0;

for (let object of objects) {
  let current = 'in';

  while (current !== 'A' && current !== 'R') {
    for (let rule of rules[current]) {
      if (rule.length === 1) {
        current = rule[0];
        break;
      }
      if (check.call(object, 'this.' + rule[0])) {
        current = rule[1];
        break;
      }
    }
  }

  if (current === 'A') {
    sum += Object.values(object).reduce((s, c) => s + c, 0);
  }
}

// Affichage du résultat
console.log(sum);
