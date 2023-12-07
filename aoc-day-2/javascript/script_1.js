// Importation des modules nécessaires
const { EOL } = require('os');
const { readFileSync } = require('fs');

// Lecture du fichier d'entrée
const input = readFileSync('./aoc-day-2/javascript/input.txt', 'utf8');

// Analyse du fichier d'entrée pour extraire les jeux
const games = input.split(EOL).map(line => {
    // Séparation de l'identifiant du jeu et des tirages
    const [id, draws] = line.split(': ');

    // Conversion de l'identifiant en nombre
    const gameId = +id.slice(5);

    // Séparation des tirages en utilisant '; ' comme séparateur
    const gameDraws = draws.split('; ').map(draw =>
        // Séparation des éléments de chaque tirage
        draw.split(', ').map(move =>
            // Conversion des quantités en nombre
            move.split(' ').map((x, i) => (i === 0 ? +x : x))
        )
    );

    return [gameId, gameDraws];
});

// Définition des cibles pour chaque couleur
const target = {
    red: 12,
    green: 13,
    blue: 14,
};

// Filtrage des jeux valides en fonction des cibles
const validGames = games.filter(([id, game]) =>
    game.every(draw =>
        draw.every(([count, color]) => target[color] >= count)
    )
);

// Calcul de la somme des identifiants des jeux valides
const sumOfIds = validGames.map(([id]) => id).reduce((sum, x) => sum + x, 0);

// Affichage du résultat final
console.log(sumOfIds);
