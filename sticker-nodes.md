# 🧭 Ma veille n8n — cartographie du workflow
*Brauman and K — repéré un article négatif ? → ligne dans Feuille 1 + mail d'alerte*

---

## 🧪 ① LES DÉCLENCHEURS — *qui c'est qui lance ?*

| 🔶 Brique | 🎯 En clair, ça sert à… |
|---|---|
| **Test Trigger** | Simuler la vie réelle : un seul clic, toute la chaîne se rejoue |
| **Test Data** | Fabriquer un faux article négatif pour l'entraînement |
| **RSS Feed ×5** | Surveiller QVEMA, David Brauman, Brauman… toutes les minutes |

---

## 🧠 ② LE TRI — *qui c'est qui juge ?*

| 🟣 Brique | 🎯 En clair, ça sert à… |
|---|---|
| **No Operation** | La gare de triage : tout le monde passe par là |
| **Remove Duplicates** | Jamais 2 alertes pour le même article |
| **AI Agent** | Le cerveau : « cet article, il est négatif ? » — et la gravité |

---

## 🔀 ③ LE CROISEMENT — *où on l'envoie ?*

| 🔵 Brique | 🎯 En clair, ça sert à… |
|---|---|
| **If** | Le carrefour : négatif 👉 à gauche, neutre 👉 à droite |
| **Alert Router** | Le chef d'alerte : supervise tout ce qui est « mail + Feuille 1 » |
| **Keep Non Alerts** | Le filtre du calme : ne laissent passer que les neutres |

---

## ⚡ ④ LES ACTIONS — *où ça atterrit ?*

| 🟢 Brique | 🎯 En clair, ça sert à… |
|---|---|
| **Append row in sheet** | Écrire la ligne dans « Feuille 1 » = l'historique des alertes |
| **Alert Email** | Envoyer le mail « alerte négative » sur Gmail |
| **Journal Non Alerts** | Ranger les neutres dans l'onglet « Journal » — silencieusement |
| **Sticky Note** | Le brief de départ, cloué au tableau pour la route |

---

## 🏁 Le flux en image
```
📝 Articles (vrais ou faux)
     │
     ▼
🧠 Gare de tri → 🛡️ Anti-doublons → 🧠 IA juge
     │
     ├── NÉGATIF ──▶ 📄 Feuille 1  +  ✉️ Mail d'alerte
     │
     └── NEUTRE  ──▶ 🗒️ Journal (sans mail)
```
