// Importation des modules nécessaires
const { EOL } = require('os');
const { readFileSync } = require('fs');

// Lecture du fichier d'entrée
const input = readFileSync('input.txt', 'utf8');

// Séparation des lignes du fichier en une grille
const grid = input.split(EOL);

// Expression régulière pour extraire les nombres de chaque ligne
const re = /[0-9]+/g;

// Initialisation de la somme
let sum = 0;

// Liste des caractères autorisés
const allowed = Array.from({ length: 10 }, (_, i) => `${i}`).concat(['.']);

// Parcours de chaque ligne de la grille
grid.forEach((line, y) => {
    let match;
    
    // Recherche de tous les nombres dans la ligne
    while ((match = re.exec(line)) !== null) {
        const positions = [];

        // Vérification des positions autour du nombre trouvé
        if (match.index > 0) {
            positions.push([-1, 0]);
            if (y > 0) positions.push([-1, -1]);
            if (y < grid.length - 1) positions.push([-1, 1]);
        }

        if (y > 0) positions.push(...Array(match[0].length).fill().map((_, i) => [i, -1]));
        if (y < grid.length - 1) positions.push(...Array(match[0].length).fill().map((_, i) => [i, 1]));

        if (match.index < line.length - 2) {
            positions.push([match[0].length, 0]);
            if (y > 0) positions.push([match[0].length, -1]);
            if (y < grid.length - 1) positions.push([match[0].length, 1]);
        }

        // Vérification des caractères autour du nombre et ajout à la somme si nécessaire
        if (positions.some(([xO, yO]) => !allowed.includes(grid[y + yO][match.index + xO]))) {
            sum += +match[0];
        }
    }
});

// Affichage du résultat final
console.log(sum);
