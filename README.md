<h1 align="center">Veille d'e-réputation — Brauman and K</h1>
<p align="center"><em>Automatisation n8n — version de démonstration fonctionnelle (workflow « Test »).<br/>Formation communication digitale, octobre 2026.</em></p>

---

## <p align="left">Objectif</p>

Repérer rapidement un article négatif concernant **Brauman and K**, **David Brauman** ou l'émission **QVEMA** — afin d'anticiper les réactions et de déclencher à temps les protections de l'entreprise.

## <p align="left">Résultat de la démonstration</p>

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

## <p align="left">Architecture</p>

![Architecture du workflow](assets/architecture.svg)

Trois familles de sources sont surveillées : QVEMA (FR et EN), David Brauman, Brauman (FR et EN) — actualisation toutes les minutes en mode réel.

## <p align="left">Comment ça marche — les 4 étapes</p>

| Étape | Composantes n8n | Ce qui se passe |
|---|---|---|
| 1. Déclenchement | Test Trigger / Test Data, RSS Feed ×5 | Soit un clic manuel (démo), soit la surveillance RSS toutes les minutes |
| 2. Tri initial | No Operation → Remove Duplicates | Rassemblement des flux, élimination des doublons (jamais deux alertes pour un même article) |
| 3. Tri par IA | AI Agent (modèle Gemini) | Analyse : caractère négatif, gravité (faible / moyen / fort), cible visée |
| 4. Décision & action | If → Feuille 1 + mail, ou Journal | Négatif : historisation + alerte · Neutre : journal silencieux |

## <p align="left">Stack et coûts</p>

| Outil | Rôle | Coût |
|---|---|---|
| n8n cloud | Orchestration du workflow | Gratuit |
| Google Sheets | Historique des alertes et journal | Gratuit |
| Gmail (OAuth) | Envoi du mail d'alerte | Gratuit |
| Gemini (Google AI) | Triage IA des articles | Gratuit |

Budget : **0 €** — les accès payants évoqués dans le brief initial ont été écartés pour la V1.

## <p align="left">Réplication chez soi</p>

1. Créer un compte sur la plateforme n8n cloud et ouvrir un workflow.
2. Ajouter les credentials : connexion Google Sheets (lecture/écriture de la feuille) et OAuth Gmail (consentement à valider une fois soi-même).
3. Importer la structure du projet.
4. Associer le modèle IA (compte API Gemini).
5. Lancer le workflow en mode Simulation (bouton ▶) autant de fois que voulu : chaque exécution simule un nouvel article.

Note sur les données : l'exemple fourni utilise des sources publiques et un article factice de démonstration — aucune donnée réelle n'est collectée dans le dépôt. Dans la vraie vie, le périmètre reste limité aux mentions publiques (comptes privés et groupes fermés hors scope).

## <p align="left">Compétences mobilisées</p>

| Compétence | Fiche |
|---|---|
| Interview structurée (clarifier une demande avant de la transformer en projet) | [skills/interview/interview.md](skills/interview/interview.md) |
| Doubt-driven dev (mettre une hypothèse technique à l'épreuve avant de la valider) | [skills/doubt-driven-dev/doubt-driven-dev.md](skills/doubt-driven-dev/doubt-driven-dev.md) |
| Hostile review (relire un livrable avant de l'utiliser : erreurs, omissions, silences) | [skills/hostile-review/hostile-review.md](skills/hostile-review/hostile-review.md) |

## <p align="left">Contenu du dépôt</p>

```
veille-reputation-brauman/
├── README.md                       ← cette page
├── assets/
│   └── architecture.svg            ← schéma du workflow
├── workflow/
│   └── Test.workflow.ts            ← implémentation du workflow de test
├── skills/                         ← fiches de méthode (3)
└── video/
    └── README.md                   ← démonstration enregistrée (à venir)
```

---

*<p align="center">Apolline · apprentie community management, Brauman and K — projet de démo n8n, octobre 2026.</p>*
