// Importation des modules nécessaires
const os = require('os');
const fs = require('fs');

// Fonction pour obtenir la structure de données à partir du fichier d'entrée
const getInput = () => {
  // Lecture du fichier d'entrée et création de la structure de données
  const input = fs.readFileSync('input.txt', 'utf8')
    .split(os.EOL)
    .reduce((o, l) => {
      // Séparation du composant source et de ses connexions
      const p = l.split(' -> ');
      const isBC = p[0] === 'broadcaster';
      
      // Création de l'objet représentant le composant
      o[isBC ? p[0] : p[0].slice(1)] = {
        type: isBC ? p[0] : p[0].at(0),
        connections: p[1].split(', '),
      };

      // Initialisation de l'état du composant en fonction de son type
      o[isBC ? p[0] : p[0].slice(1)].state = o[isBC ? p[0] : p[0].slice(1)].type === '%' ? 0 : {};

      return o;
    }, {});

  // Ajout d'un nœud 'rx' avec des connexions vides
  input.rx = { connections: [] };

  // Établissement des connexions entre les composants
  Object.entries(input).forEach(([k, { connections }]) => {
    connections.forEach(dest => {
      if (dest === 'output' || !input[dest]) return;

      // Initialisation de la propriété 'inputs' si elle n'existe pas
      if (!input[dest].inputs) input[dest].inputs = [];

      // Ajout du composant source à la liste des inputs du composant destination
      input[dest].inputs.push(k);

      // Initialisation de l'état du composant source s'il est de type '&'
      if (input[dest].type === '&') input[dest].state[k] = 0;
    });
  });

  return input;
};

// Fonction principale pour calculer le plus petit commun multiple (lcm)
console.log(getInput().broadcaster.connections.reduce((p, sNode) => {
  let input = getInput();

  let i = 0;
  let toProcess = [];
  const eNode = input['rx'].inputs[0];

  // Boucle principale de traitement des composants jusqu'à atteindre le nœud 'rx'
  while (true) {
    // Si la liste de traitement est vide, incrémenter le temps et ajouter le composant initial
    if (toProcess.length === 0) {
      i++;
      toProcess.push(['broadcaster', 0, 'button']);
      continue;
    }

    // Récupération du prochain composant à traiter
    const [m, freq, from] = toProcess.shift();

    // Si le composant à traiter est le nœud de sortie, terminer la boucle
    if (m === eNode && freq === 1) break;

    // Récupération du composant actuel
    const mod = input[m];

    // Traitement spécifique en fonction du type du composant
    if (mod.type === 'broadcaster') {
      // Ajouter le composant source du nœud 'rx' avec la fréquence actuelle
      toProcess.push([sNode, freq, m]);
    } else if (mod.type === '%' && freq === 0) {
      // Inversion de l'état du composant '%'
      mod.state = 1 - mod.state;

      // Ajouter les composants connectés à la liste de traitement
      toProcess.push(...mod.connections.map(c => [c, mod.state, m]));
    } else if (mod.type === '&') {
      // Mettre à jour l'état du composant '&'
      mod.state[from] = freq;

      // Vérifier si tous les composants connectés ont un état élevé (1)
      const allHigh = mod.inputs.every(c => mod.state[c] === 1);

      // Ajouter les composants connectés à la liste de traitement
      toProcess.push(...mod.connections.map(c => [c, allHigh ? 0 : 1, m]));
    }
  }

  // Techniquement, le résultat est le plus petit commun multiple (lcm)
  return p * i;
}, 1));
