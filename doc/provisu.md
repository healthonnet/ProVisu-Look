Lunette Provisu
===============

La fondation Provisu propose un outil de visualisation de pages web adapté aux
personnes souffrant de défiences visuelles. L'outil modifie l'apparence du site
de la fondation et propose aussi de modifier l'apparence d'autres sites.

Limitations
-----------

Ce service se repose sur le téléchargement du site externe à visualiser sur les
serveurs de la fondation Provisu (en l'état: Amazon EC2). Une forte affluence
peut nuire aux performances des autres prestations de la fondation.

La visualisation n'est pas parfaite. La plupart des sites proposent des menus
contenant beaucoup d'éléments pouvant gêner la lecture.

Propositions
------------

Afin de remettre ce service au goût du jour, plusieurs propositions sont à voir:

* Utiliser des outils existants: firefox lib, safari lib
* Créer une extension Chrome/Opera/Firefox d'aide à la navigation
* Créer un service ad-hoc basé sur l'actuel (+ bookmarklet)

### Outils existants

Ces outils sont intéressants, mais sont soit non entretenus, soit en dehors de
que l'on veut faire.

### Extension

Le service par excellence. Il permet à l'utilisateur d'activer ou désactiver à
souhait, la lunette sur le site qu'il visite.

Il demande un navigateur Firefox à jour et ceci est problématique. De plus, on
ne peut pas avoir d'extension pour IE/Edge ni Safari.

### Service ad-hoc

Le service est éprouvé, et peut encore être utilisé. On peut aussi faire un
lifting et avoir un service fonctionnel.

Conclusion
----------

Ce qui semble être le plus utile est à mon sens, l'extension de navigateur.
L'utilisateur peut à souhait lire les sites qu'il souhaite sans à passer par le
site de la fondation Provisu.

Couplé au service actuel remis à jour pour les gens n'ayant pas de navigateur
compatible permet de couvrir l'ensemble des utilisateurs.

Quand à la technologie, toutes peuvent être mises en place.
Perl, PHP ou node font l'affaire.

Une petite préférence pour node qui permet de lier l'extension et le service
actuel permettrait de potentiellement gagner du temps.
