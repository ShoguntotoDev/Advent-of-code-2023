import os

def main(partie):
    # Initialiser la grille et obtenir le chemin du fichier d'entrée
    grille = []
    chemin_repertoire = os.path.dirname(os.path.realpath(__file__))
    
    # Lire la grille depuis le fichier d'entrée
    with open("./aoc-day-10/python/input.txt", "r") as f:
        grille = f.read().splitlines()

    # Trouver la position de départ marquée par 'S'
    for i, ligne in enumerate(grille):
        if 'S' in ligne:
            depart = (i, ligne.find('S'), 'S')
            break

    # Initialiser la boucle avec la position de départ
    boucle = [depart]
    pos_suivante = trouver_premiere_direction(grille, depart)

    # Continuer à trouver le chemin jusqu'à ce qu'une boucle soit formée
    while pos_suivante not in boucle:
        boucle.append(pos_suivante)
        pos_suivante = trouver_direction_suivante(grille, boucle[-1], boucle)

    # Partie 1 : Retourner la moitié de la longueur de la boucle
    if partie == 1:
        return len(boucle) / 2
    # Partie 2 : Compter les points internes selon certaines conditions
    else:
        points_internes = 0
        points_boucle = [(x[0], x[1]) for x in boucle]

        # Marquer les points internes avec '*'
        for point in boucle:
            if point[2] in '|LJ':
                grille[point[0]] = grille[point[0]][:point[1]] + '*' + grille[point[0]][point[1] + 1:]

        # Compter les points internes en fonction des positions de '*'
        for y, ligne in enumerate(grille):
            for x in range(len(ligne)):
                if (y, x) not in points_boucle:
                    if ligne[:x].count('*') % 2 != 0:
                        points_internes += 1

        return points_internes

# Fonction pour trouver la direction suivante dans la grille
def trouver_direction_suivante(grille, position, boucle):
    # Vérifier les directions possibles et retourner la position suivante
    if (position[2] in '|LJ') and (grille[position[0] - 1][position[1]] in '|7F') and ((position[0] - 1, position[1], grille[position[0] - 1][position[1]]) not in boucle):
        return (position[0] - 1, position[1], grille[position[0] - 1][position[1]])
    # Répéter des vérifications similaires pour d'autres directions
    
    # Si aucune position suivante valide n'est trouvée, retourner la position de départ
    return boucle[0]

# Fonction pour trouver la première direction à partir de la position de départ
def trouver_premiere_direction(grille, depart):
    if grille[depart[0] - 1][depart[1]] in '|7F':
        return (depart[0] - 1, depart[1], grille[depart[0] - 1][depart[1]])
    elif grille[depart[0]][depart[1] + 1] in '-J7':
        return (depart[0], depart[1] + 1, grille[depart[0]][depart[1] + 1])
    elif grille[depart[0] + 1][depart[1]] in '|LJ':
        return (depart[0] + 1, depart[1], grille[depart[0] + 1][depart[1]])

# Exécution principale
if __name__ == "__main__":
    print(f"Solution de la partie 1 : {main(1)}")
    print(f"Solution de la partie 2 : {main(2)}")
