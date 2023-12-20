const os = require('os');
const fs = require('fs');

// Lecture du fichier d'entrée et création d'une structure de données
const input = fs.readFileSync('input.txt', 'utf8')
  .split(os.EOL)
  .reduce((o, l) => {
    const [source, destination] = l.split(' -> ');
    const isBroadcaster = source === 'broadcaster';
    const key = isBroadcaster ? source : source.slice(1);

    o[key] = {
      type: isBroadcaster ? source : source.charAt(0),
      connections: destination.split(', '),
      state: isBroadcaster ? 0 : {},
    };

    return o;
  }, {});

// Établissement des connexions entre les composants
Object.entries(input).forEach(([source, { connections, type, state }]) => {
  connections.forEach(destination => {
    if (destination === 'output' || !input[destination]) return;
    if (!input[destination].inputs) input[destination].inputs = [];
    input[destination].inputs.push(source);
    if (type === '&') input[destination].state[source] = 0;
  });
});

// Simulation de l'opération du circuit
const output = {
  0: 0,
  1: 0,
};

let iteration = 0;
const toProcess = [['broadcaster', 0, 'button']];

while (iteration < 1001) {
  if (toProcess.length === 0) {
    iteration++;
    toProcess.push(['broadcaster', 0, 'button']);
    continue;
  }

  const [current, frequency, from] = toProcess.shift();
  output[frequency]++;

  if (current === 'output' || !input[current]) continue;

  const module = input[current];

  if (module.type === 'broadcaster') {
    toProcess.push(...module.connections.map(connection => [connection, frequency, current]));
    continue;
  }

  if (module.type === '%' && frequency === 0) {
    module.state = 1 - module.state;
    toProcess.push(...module.connections.map(connection => [connection, module.state, current]));
    continue;
  }

  if (module.type === '&') {
    module.state[from] = frequency;
    const allHigh = module.inputs.every(connection => module.state[connection] === 1);
    toProcess.push(...module.connections.map(connection => [connection, allHigh ? 0 : 1, current]));
  }
}

// Affichage du résultat final
console.log(output[0] * output[1]);
