# Skill doubt-driven-dev

## Ce que c'est

Cherche activement à réfuter une décision technique avant de la prendre, pendant son implémentation et après, puis produit un rapport de risque exploitable. À utiliser dès qu'une décision technique structurante se profile — architecture, choix de librairie, modèle de données, migration, refonte, API publique, suppression, mise en production — même si l'utilisateur ne parle ni de doute ni de risque. À déclencher aussi quand l'agent s'apprête à affirmer « c'est la bonne approche » ou « ça marche » sans preuve exécutée.

## Méthode (extraits de la fiche source)

# Doubt-driven dev

Une décision technique se prend en cherchant d'abord **comment elle pourrait être fausse**.
L'ennemi n'est pas l'erreur : c'est la confiance non vérifiée. Un agent qui a « l'impression
que ça marche » n'a rien prouvé ; il a seulement cessé de chercher.

## Quand ce skill s'applique

Il s'applique quand une décision technique est sur la table et qu'elle coûte quelque chose
à défaire : choix d'architecture, de dépendance, de modèle de données, de découpage de
module, migration, changement d'API, suppression de code, passage en production.

Il ne s'applique pas quand l'utilisateur cherche à clarifier un projet, un besoin ou une
intention : c'est un travail d'interview, pas de réfutation. Ici, la question posée est
déjà technique ; on ne l'explore pas, on la met à l'épreuve. En cas de doute sur le mode,
une seule question à l'utilisateur suffit — jamais un questionnaire. Si le besoin lui-même
est flou (on ne sait pas encore ce qu'on construit), le dire et proposer l'interview : ce
skill ne remplace pas la clarification d'intention, il la suppose faite.

## Le principe

**Un doute qui ne change rien n'est pas un doute, c'est une politesse.**

Chaque doute doit donc produire l'un de ces trois résultats :

1. une **vérification exécutée** (commande, test, expérience) qui donne un résultat ;
2. une **hypothèse déclarée** avec ce qui la rendrait fausse ;
3. un **risque accepté** avec son coût estimé si ça arrive.

Un doute qui ne finit dans aucune de ces cases est un doute rituel : le supprimer.

## Proportionner le doute

Le doute coûte du temps. Le doser selon ce qu'il protège :

- **Réversible en moins d'une heure** (renommage, structure locale) : une ligne, pas de rapport.
- **Coûteuse** (choix de librairie, schéma interne, découpage de module) : rapport court,
  3 à 5 hypothèses, au moins une vérification exécutée.
- **Irréversible ou publique** (migration de données, API exposée, suppression, prod) :
  rapport complet, vérifications exécutées, plan 
