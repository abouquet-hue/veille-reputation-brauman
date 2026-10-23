<p align="center">
  <img src="https://img.shields.io/badge/n8n-Workflow%20Automation-%237C3AED?style=for-the-badge&logo=n8n&link=https%3A%2F%2Fn8n.io" alt="n8n"/>
  <img src="https://img.shields.io/badge/Budget-%E2%82%AC0%20-%2322c55e?style=for-the-badge" alt="100% gratuit"/>
</p>

<h1 align="center">🧭 Veille d'e-réputation — Brauman and K</h1>

<p align="center">
  <em>Projet d'apprentissage — CM digital & automation</em><br/>
  Détecter un article négatif → une ligne Google Sheet + un mail d'alerte Gmail
</p>

---

## 🗺️ Architecture

![Schéma du workflow](assets/architecture.svg)

> Un même flux, deux chemins : **négatif → Feuille 1 + mail** | **neutre → Journal silencieux**.

---

## ⚡ Démonstration

▶️ **Regarder la démo** : [`video/`](video/README.md) (s'y ajoute sous peu)

**À faire en live** : Workflow `Test` → **▶ Execute Workflow** → une ligne apparaît dans « Feuille 1 » de la sheet, le mail part.

---

## 🔧 Comment ça fonctionne

| Étape | Où | Action |
|---|---|---|
| 1. Lanceurs | Test Trigger · Test Data · RSS ×5 | Test manuel (bouton ▶) ou surveillance toutes les minutes |
| 2. Tri | No Operation → Remove Duplicates → AI Agent | Gare de tri, anti-doublons, cerveau IA (« négatif ? » + gravité) |
| 3. Croisement | If → Alert Router / Keep Non Alerts | Négatif 👉 à gauche, neutre 👉 à droite |
| 4. Résultats | Feuille 1 + Alert Email **ou** Journal Non Alerts | Ligne d'historique + mail **ou** trace silencieuse |

**Stack** : [n8n cloud](https://n8n.io) + [Google Sheet](https://www.google.com/sheets) + [Gmail OAuth](https://gmail.com) + [Gemini](https://gemini.google.com) (modelo tri IA). Tout est **gratuit** (Sfir).

---

## 🛠️ Réplication

1. Ouvrir **n8n cloud** → New Workflow → nommer `Test`
2. Menu logo → **Import from File** → glisser `workflow/Test.workflow.ts`
3. Connecter ses **credentials** (Sheets, Gmail — l'écran « Allow » Google est à valider soi-même)
4. Clic **▶ Execute Workflow** — et ça boucle à l'infini (chaque run = un nouvel article)

---

## 🧠 Les skills du projet

| Competencia | Fiche | À quoi elle sert |
|---|---|---|
| 🎤 Interview | [`skills/interview/`](skills/interview/interview.md) | Questionner pour clarifier avant de décider |
| 🧪 Doubt-driven dev | [`skills/doubt-driven-dev/`](skills/doubt-driven-dev/doubt-driven-dev.md) | Demander « comment ça peut être faux » avant de valider |
| 🔍 Hostile review | [`skills/hostile-review/`](skills/hostile-review/hostile-review.md) | Passer un livrable au crible avant de s'en servir |

---

## 📌 Cartographie des nœuds

💡 Pour réviser : [`sticker-nodes.md`](sticker-nodes.md) + la version couleur [`sticker-cartographie.html`](sticker-cartographie.html).

---

_Created with ❤ by **Abouquet-Hue Apollin** for a school demo — Oct 2026._
