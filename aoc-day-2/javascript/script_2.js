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

// Calcul de la somme des produits maximaux de chaque couleur pour chaque jeu
const totalProduct = games
    .map(([id, game]) =>
        game.reduce((counts, draws) => {
            draws.reduce((colorCounts, [count, color]) => {
                colorCounts[color] = Math.max(colorCounts[color], count);
                return colorCounts;
            }, counts);
            return counts;
        }, { red: 0, green: 0, blue: 0 })
    )
    .map(counts => Object.values(counts).reduce((s, c) => s * c, 1))
    .reduce((sum, product) => sum + product, 0);

// Affichage du résultat final
console.log(totalProduct);
