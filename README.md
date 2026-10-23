# Veille d'e-réputation — Brauman and K

Automatisation n8n — version de démonstration fonctionnelle (workflow « Test »).
Réalisé dans le cadre d'une formation en communication digitale, octobre 2026.

## Objectif

Repérer rapidement un article négatif concernant **Brauman and K**, **David Brauman** ou l'émission **QVEMA** — afin d'anticiper les réactions et de déclencher à temps les protections de l'entreprise.

## Résultat de la démonstration

Un article « négatif » détecté produit les deux effets suivants :

1. **une ligne** est ajoutée dans l'onglet « Feuille 1 » de la Google Sheet (historique des alertes) ;
2. **un mail d'alerte** part sur la boîte Gmail (sujet : *ALERTE VEILLE — article négatif détecté*).

Un article « neutre » est, lui, rangé dans l'onglet « Journal » — sans alerte, pour garder une trace silencieuse.

Flux simplifié :

```
Flux (vrai ou simulé)
  → Gare de tri → Anti-doublons → IA (négatif ? + gravité)
    ├── Négatif → Feuille 1 + mail d'alerte
    └── Neutre  → Journal (sans mail)
```

## Architecture

![Architecture du workflow](assets/architecture.svg)

Trois familles de sources sont surveillées : QVEMA, David Brauman, Brauman (formats français et internationaux, actualisation toutes les minutes côté démo).

## Comment ça marche — les 4 étapes

| Étape | Composantes n8n | Ce qui se passe |
|---|---|---|
| 1. Déclenchement | Test Trigger / Test Data, RSS Feed ×5 | Soit un clic manuel (démo), soit la surveillance RSS toutes les minutes |
| 2. Tri initial | No Operation → Remove Duplicates | Rassemblement des flux, élimination des doublons (jamais deux alertes pour un même article) |
| 3. Tri par IA | AI Agent (modèle Gemini) | Analyse : caractère négatif, gravité (faible / moyen / fort), cible visée |
| 4. Décision & action | If → Feuille 1 + mail, ou Journal | Négatif : historisation + alerte ; Neutre : journal silencieux |

## Stack et coûts

| Outil | Rôle | Coût |
|---|---|---|
| [n8n cloud](https://n8n.io) | Orchestration du workflow | Gratuit |
| [Google Sheets](https://www.google.com/sheets/about/) | Historique des alertes et journal | Gratuit |
| Gmail (OAuth) | Envoi du mail d'alerte | Gratuit |
| [Gemini](https://gemini.google.com) (Google AI) | Triage IA des articles | Gratuit |

Budget : **0 €** — les seuls accès payants évoqués dans le brief initial ont été écartés pour la V1.

## Réplication chez soi

1. Créer un compte sur [n8n cloud](https://n8n.io) et ouvrir un workflow.
2. Ajouter les credentials : connexion Google Sheets (lecture/écriture de la feuille) et OAuth Gmail (consentement à valider une fois soi-même).
3. Importer la structure du projet.
4. Associer le modèle IA (compte API Gemini).
5. Lancer le workflow en mode Simulation (bouton ▶) autant de fois que voulu : chaque exécution simule un nouvel article.

Note sur les données : l'exemple fourni utilise des sources publiques et un article factice de démonstration — aucune donnée réelle n'est collectée dans le dépôt. Dans la vraie vie, le périmètre reste limité aux mentions publiques (comptes privés et groupes fermés hors scope).

## Compétences mobilisées

| Compétence | Fiche |
|---|---|
| Interview structurée (clarifier une demande avant de la transformer en projet) | [skills/interview/interview.md](skills/interview/interview.md) |
| Doubt-driven dev (mettre une hypothèse technique à l'épreuve avant de la valider) | [skills/doubt-driven-dev/doubt-driven-dev.md](skills/doubt-driven-dev/doubt-driven-dev.md) |
| Hostile review (relire un livrable avant de l'utiliser : erreurs, omissions, silences) | [skills/hostile-review/hostile-review.md](skills/hostile-review/hostile-review.md) |

## Contenu du dépôt

```
veille-reputation-brauman/
├── README.md                       ← cette page
├── assets/
│   └── architecture.svg            ← schéma du workflow
├── workflow/
│   └── Test.workflow.ts            ← implémentation du workflow de test
├── skills/                         ← fiches de méthode (3)
├── sticker-nodes.md                ← aide-mémoire des nœuds (textuelle)
├── sticker-cartographie.html       ← aide-mémoire des nœuds (visuel, ouvrable dans un navigateur)
└── video/
    └── README.md                   ← démonstration enregistrée (à venir)
```

---

*Apolline • apprentie community management, Brauman and K — projet de démo n8n, octobre 2026.*
