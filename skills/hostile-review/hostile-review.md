# Skill hostile-review

## Ce que c'est

Passe un compte rendu, un rapport, une analyse, du code, des résultats ou une conversation au crible pour y débusquer les erreurs, les affirmations non vérifiées, les omissions et les zones que personne n'a pensé à. Attaque l'IA et l'utilisateur à parts égales, sans distinction d'auteur. À utiliser dès que l'utilisateur demande de relire, challenger, vérifier, auditer, contrôler ou passer au crible un livrable avant de l'envoyer, de le publier ou de s'appuyer dessus — et même sans ces mots : dès qu'un compte rendu doit être validé, qu'une décision va être prise sur la base d'un document, ou qu'il faut savoir ce qui n'a pas été vu.

## Méthode (extraits de la fiche source)

# Revue hostile

La question n'est pas « est-ce que c'est plausible ». C'est : **qu'est-ce qui, dans ce
document, est faux, incomplet ou trompeur — et que personne n'a vu ?**

Un compte rendu est une surface de contact avec des décisions. Les erreurs qui s'y
logent ne sont pas des fautes de frappe : ce sont des affirmations non vérifiées, des
options jamais examinées, des contraintes jamais croisées, et des silences qui font
croire à une certitude qui n'existe pas.

## Posture : l'équité

Le commanditaire n'est pas intouchable. Une prémisse fausse posée par l'utilisateur est
le constat le plus grave possible, souvent plus grave qu'une erreur de l'IA, parce
qu'elle contamine tout ce qui a été construit dessus.

On ne distingue donc pas « l'IA a tort » et « l'utilisateur a tort ». Chaque affirmation
inventoriée porte un auteur : **IA**, **utilisateur**, ou **inconnu** (le document avance
quelque chose que personne n'a formulé). Le rapport ne ménage personne.

Si une précision est nécessaire et qu'une seule question est utile, la poser. Jamais plus :
une revue qui interrompt pour demander n'est pas une revue, c'est une interview.

## Périmètre

Tout ce qui est produit : rapport, compte rendu de réunion, brief, analyse, plan, code,
diff, configuration, jeu de résultats, synthèse d'e-mail — ou une simple conversation dont
on veut extraire ce qui a été décidé, supposé, et oublié.

## Le protocole, en six passes

### Passe 0 — Inventorier

Extraire la liste des **affirmations** : chaque phrase qui asserts quelque chose de
vérifiable. Format de travail :

```
[A-01] auteur | affirmation | source invoquée | vérifiable (oui/non)
```

C'est le socle de la revue. On n'atteint que ce qui est inventorié, et le rapport final
indique ce qui n'a pas pu être inventorié (un document flou a des zones non couvertes ;
c'est en soi un constat).

### Passe 1 — Balayer la taxonomie

Parcourir les huit familles d'erreur, classe par classe, sur l'ensemble des affirmations.
Chaque classe a une
