# Lire les données d'entrée et les formater
data = [ligne.split() for ligne in open("input.txt").read().splitlines()]
data = [(item[0], list(map(int, item[1].split(",")))) for item in data]

def compter_arrangements(pos_actuelle, g, cartes_restantes, ligne, groupe):
    # Cas de base : vérifier si la fin de la ligne est atteinte
    if pos_actuelle == len(ligne):
        # Vérifier si l'arrangement correspond au groupe cible
        if g[-1] == 0:
            g = g[:-1]
        return 1 if g == groupe else 0

    total_count = 0

    # Vérifier le caractère à la position actuelle
    match ligne[pos_actuelle]:
        case "#":
            # Vérifier si ajouter 1 à la taille du groupe actuel est valide
            if g[-1] + 1 <= groupe[len(g) - 1]:
                total_count += compter_arrangements(
                    pos_actuelle + 1, g[:-1] + (g[-1] + 1,), cartes_restantes, ligne, groupe
                )
        case ".":
            # Vérifier si réduire la taille du groupe actuel à 0 est valide
            if g[-1] > 0:
                if g[-1] == groupe[len(g) - 1]:
                    total_count += compter_arrangements(
                        pos_actuelle + 1, g + (0,), cartes_restantes, ligne, groupe
                    )
            else:
                total_count += compter_arrangements(
                    pos_actuelle + 1, g, cartes_restantes, ligne, groupe
                )
        case "?":
            # Vérifier les possibilités pour ajouter 1 et réduire à 0
            if cartes_restantes > 0 and g[-1] + 1 <= groupe[len(g) - 1]:
                total_count += compter_arrangements(
                    pos_actuelle + 1, g[:-1] + (g[-1] + 1,), cartes_restantes - 1, ligne, groupe
                )
            if g[-1] > 0:
                if g[-1] == groupe[len(g) - 1]:
                    total_count += compter_arrangements(
                        pos_actuelle + 1, g + (0,), cartes_restantes, ligne, groupe
                    )
            else:
                total_count += compter_arrangements(
                    pos_actuelle + 1, g, cartes_restantes, ligne, groupe
                )

    return total_count

# Calculer part1
part1 = sum(compter_arrangements(0, (0,), sum(groupe) - ligne.count("#"), ligne, tuple(groupe)) for ligne, groupe in data)

# Afficher le résultat de la première partie
print("Partie 1 :", part1)
