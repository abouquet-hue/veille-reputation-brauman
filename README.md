# Veille d'e-réputation — Brauman and K (n8n)

**Projet d'apprentissage — workflow n8n « First » et sa version de test « Test ».**
L'objectif : détecter les articles négatifs sur Google, les trier par IA, écrire une alerte dans une Google Sheet et envoyer un mail d'alerte Gmail.

## Contenu

- `workflow/` — le code du workflow de test (`Test.workflow.ts`)
- `skills/` — trois compétences utilisées tout au long du projet (fiches méthode)
  - `interview/` — fiche `interview.md`
  - `doubt-driven-dev/` — fiche `doubt-driven-dev.md`
  - `hostile-review/` — fiche `hostile-review.md`
- `video/` — la démonstration enregistrée de la chaîne complète (alerte → ligne Sheets → mail)

## Comment l'utiliser

1. Ouvrir n8n cloud → New Workflow → nom `Test`
2. Brancher ses credentials (Sheets, Gmail) — l'écran « Allow » Google est à valider manuellement
3. Clic sur **> Execute Workflow** autant de fois que voulu : chaque run simule un article négatif

## Contexte métier

Veille sur les mentions « David Brauman », « Brauman and K » et l'émission « QVEMA » via flux RSS et alertes Google, tri IA (négatif / neutre) et deux destinations :
- article négatif → onglet « Feuille 1 » + mail d'alerte
- article neutre → onglet « Journal » (tracé sans alerte)

*Projet réalisé dans le cadre d'une formation (communication digitale).*
