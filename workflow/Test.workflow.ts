const lM_Gemini = languageModel({ type: '@n8n/n8n-nodes-langchain.lmChatGoogleGemini', version: 1.2, config: { name: 'LM Gemini', parameters: { modelName: 'models/gemini-flash-lite-latest', options: {} }, credentials: { googlePalmApi: newCredential('n8n-server (apollinebouquet2@gmail.com', '4BsMtdlrvGO1ogHy') }, position: [864, 576] } });

const rSS_Feed_QVEMA = trigger({
  type: 'n8n-nodes-base.rssFeedReadTrigger',
  version: 1,
  config: { name: 'RSS Feed QVEMA', parameters: { pollTimes: { item: [{ mode: 'everyMinute' }] }, feedUrl: 'https://www.google.com/alerts/feeds/06894639003801793124/6146296911611089176' }, position: [-112, 144] }
});

const no_Operation_do_nothing = node({
  type: 'n8n-nodes-base.noOp',
  version: 1,
  config: { name: 'No Operation, do nothing', position: [112, 336] }
});

const remove_Duplicates = node({
  type: 'n8n-nodes-base.removeDuplicates',
  version: 2,
  config: { name: 'Remove Duplicates', parameters: { operation: 'removeItemsSeenInPreviousExecutions', dedupeValue: expr('{{ $json.id }}'), options: {} }, position: [560, 336] }
});

const aI_Agent = node({
  type: '@n8n/n8n-nodes-langchain.agent',
  version: 3.1,
  config: { name: 'AI Agent', parameters: { promptType: 'define', text: expr('Voici un article détecté par la veille :\nTitre : {{ $json.title }}\nLien : {{ $json.link }}\nDate : {{ $json.isoDate }}\nExtrait : {{ $json.contentSnippet }}\n\nAnalyse cet article pour l\'entreprise Brauman and K, son dirigeant David Brauman et l\'émission QVEMA.\nDis si le contenu est négatif, quelle cible est visée, et quel est le niveau de gravité (faible, moyen, fort).\nSi l\'article est négatif ou ambigu, enregistre-le avec l\'outil Google Sheets.'), options: { systemMessage: 'Tu analyses des articles pour la veille réputation de Brauman and K (immobilier neuf), de son dirigeant David Brauman et de l\'émission QVEMA.\n\nRéponds toujours exactement sur 3 lignes, sans rien ajouter :\nLigne 1 : "ALERTE: OUI" si l\'article est négatif ou ambigu pour l\'une de ces trois cibles, sinon "ALERTE: NON".\nLigne 2 : cible (Entreprise, David ou QVEMA) et gravité (faible, moyen, fort). Écris "Aucune" si ALERTE: NON.\nLigne 3 : résumé en une phrase.\n\nRègles :\n- Si l\'article parle d\'un homonyme (par exemple Rony Brauman, ex-président de MSF), réponds "ALERTE: NON".\n- Si l\'article ne concerne pas directement l\'une des trois cibles, réponds "ALERTE: NON".\n- N\'écris jamais de paragraphe d\'analyse.' } }, position: [784, 336], subnodes: { model: lM_Gemini } }
});

const if_node = node({
  type: 'n8n-nodes-base.if',
  version: 2.4,
  config: { name: 'If', parameters: { conditions: { options: { caseSensitive: false, leftValue: '', typeValidation: 'strict', version: 4 }, conditions: [{ id: '2fec7cff-ef6d-4ac9-84e7-c7bd6d5619fa', leftValue: expr('{{ $json.output }}'), rightValue: 'ALERTE: OUI', operator: { type: 'string', operation: 'contains' } }], combinator: 'and' }, options: { ignoreCase: true } }, position: [1136, 336] }
});

const alert_Router = node({
  type: 'n8n-nodes-base.noOp',
  version: 1,
  config: { name: 'Alert Router', position: [1136, 80] }
});

const append_row_in_sheet = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: { name: 'Append row in sheet', parameters: { operation: 'append', documentId: { __rl: true, value: '1xPzj2n9xur-obL6umon9isthm5xelHZ1botNFCyDKV4', mode: 'list', cachedResultName: 'Veille Réputation - Brauman and K', cachedResultUrl: 'https://docs.google.com/spreadsheets/d/1xPzj2n9xur-obL6umon9isthm5xelHZ1botNFCyDKV4/edit?usp=drivesdk' }, sheetName: { __rl: true, value: 'gid=0', mode: 'list', cachedResultName: 'Feuille 1', cachedResultUrl: 'https://docs.google.com/spreadsheets/d/1xPzj2n9xur-obL6umon9isthm5xelHZ1botNFCyDKV4/edit#gid=0' }, columns: { mappingMode: 'defineBelow', value: { 'Date de détection': expr('{{ $(\'Remove Duplicates\').item.json.isoDate }}'), title: expr('{{ $(\'Remove Duplicates\').item.json.title }}'), 'Lien (URL)': expr('{{ $(\'Remove Duplicates\').item.json.link }}'), 'Résumé court': expr('{{ $json.output }}') }, matchingColumns: ['id'], schema: [{ id: 'Date de détection', displayName: 'Date de détection', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true, removed: false }, { id: 'Cible visée', displayName: 'Cible visée', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true, removed: true }, { id: 'Source / Plateforme', displayName: 'Source / Plateforme', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true, removed: true }, { id: 'Lien (URL)', displayName: 'Lien (URL)', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true, removed: false }, { id: 'Extrait du passage', displayName: 'Extrait du passage', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true, removed: true }, { id: 'Résumé court', displayName: 'Résumé court', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true, removed: false }, { id: 'Niveau de gravité', displayName: 'Niveau de gravité', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true, removed: true }, { id: 'Statut / Action', displayName: 'Statut / Action', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true, removed: true }, { id: 'title', displayName: 'title', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true, removed: false }, { id: 'link', displayName: 'link', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true, removed: true }, { id: 'pubDate', displayName: 'pubDate', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true, removed: true }, { id: 'author', displayName: 'author', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true, removed: true }, { id: 'content', displayName: 'content', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true, removed: true }, { id: 'contentSnippet', displayName: 'contentSnippet', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true, removed: true }, { id: 'id', displayName: 'id', required: false, defaultMatch: true, display: true, type: 'string', canBeUsedToMatch: true, removed: true }, { id: 'isoDate', displayName: 'isoDate', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true, removed: true }, { id: 'toolCallId', displayName: 'toolCallId', required: false, defaultMatch: false, display: true, type: 'string', canBeUsedToMatch: true, removed: true }], attemptToConvertTypes: false, convertFieldsToString: false }, options: {} }, credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets account', 'uLVMs4cdjmPZShEr') }, position: [1360, 336] }
});

const alert_Email = node({
  type: 'n8n-nodes-base.emailSend',
  version: 2.1,
  config: { name: 'Alert Email', parameters: { operation: 'send', fromEmail: 'TON_ADRESSE_GMAIL@gmail.com', toEmail: 'TON_ADRESSE_GMAIL@gmail.com', subject: 'ALERTE VEILLE: article négatif détecté (Brauman and K)', text: expr('Article négatif détecté par la veille :\nTitre : {{ $(\'Remove Duplicates\').item.json.title }}\nLien : {{ $(\'Remove Duplicates\').item.json.link }}\n\nAnalyse IA :\n{{ $json.output }}\n\nVoir la ligne dans la feuille Google Sheets.'), options: {} }, credentials: { emailOAuth2: newCredential('OAuth Gmail à relier dans l\'UI', 'REPLACE_ME_EMAIL_OAUTH_CRED_ID') }, position: [1560, 480] }
});

const keep_Non_Alerts = node({
  type: 'n8n-nodes-base.filter',
  version: 2.4,
  config: { name: 'Keep Non Alerts', parameters: { conditions: { options: { caseSensitive: false, leftValue: '', typeValidation: 'strict', version: 4 }, conditions: [{ id: 'd3fb8aa2-70e6-4c63-a5a3-3e3372575e1f', leftValue: expr('{{ $json.output }}'), rightValue: 'ALERTE: OUI', operator: { type: 'string', operation: 'does not contain' } }], combinator: 'and' }, options: {} }, position: [784, 600] }
});

const journal_Non_Alerts = node({
  type: 'n8n-nodes-base.googleSheets',
  version: 4.7,
  config: { name: 'Journal Non Alerts', parameters: { operation: 'append', documentId: { __rl: true, value: '1xPzj2n9xur-obL6umon9isthm5xelHZ1botNFCyDKV4', mode: 'list', cachedResultName: 'Veille Réputation - Brauman and K', cachedResultUrl: 'https://docs.google.com/spreadsheets/d/1xPzj2n9xur-obL6umon9isthm5xelHZ1botNFCyDKV4/edit?usp=drivesdk' }, sheetName: { __rl: true, value: 'Journal', mode: 'value', cachedResultName: 'Journal', cachedResultUrl: 'https://docs.google.com/spreadsheets/d/1xPzj2n9xur-obL6umon9isthm5xelHZ1botNFCyDKV4/edit' }, columns: { mappingMode: 'defineBelow', value: { 'Date de détection': expr('{{ $(\'Remove Duplicates\').item.json.isoDate }}'), 'Article title': expr('{{ $(\'Remove Duplicates\').item.json.title }}'), 'Article URL': expr('{{ $(\'Remove Duplicates\').item.json.link }}'), 'AI output': expr('{{ $json.output }}') } }, options: {} }, credentials: { googleSheetsOAuth2Api: newCredential('Google Sheets account', 'uLVMs4cdjmPZShEr') }, position: [1136, 480] }
});

const rSS_Feed_David_Brauman = trigger({
  type: 'n8n-nodes-base.rssFeedReadTrigger',
  version: 1,
  config: { name: 'RSS Feed David Brauman', parameters: { pollTimes: { item: [{}] }, feedUrl: 'https://www.google.com/alerts/feeds/06894639003801793124/5553460418903722260' }, position: [-112, -48] }
});

const rSS_Feed_Brauman = trigger({
  type: 'n8n-nodes-base.rssFeedReadTrigger',
  version: 1,
  config: { name: 'RSS Feed Brauman', parameters: { pollTimes: { item: [{ mode: 'everyMinute' }] }, feedUrl: 'https://www.google.com/alerts/feeds/06894639003801793124/1859564949030406890' }, position: [-112, 336] }
});

const rSS_Feed_Brauman_and_K = trigger({
  type: 'n8n-nodes-base.rssFeedReadTrigger',
  version: 1,
  config: { name: 'RSS Feed Brauman and K', parameters: { pollTimes: { item: [{ mode: 'everyMinute' }] }, feedUrl: 'https://www.google.fr/alerts/feeds/06894639003801793124/5553460418903722260' }, position: [-112, 528] }
});

const rSS_Feed_QVEMA_FR = trigger({
  type: 'n8n-nodes-base.rssFeedReadTrigger',
  version: 1,
  config: { name: 'RSS Feed QVEMA (FR)', parameters: { pollTimes: { item: [{}] }, feedUrl: 'https://www.google.fr/alerts/feeds/06894639003801793124/10206287803002026739' }, position: [-112, 720] }
});

const test_Trigger = trigger({
  type: 'n8n-nodes-base.manualTrigger',
  version: 1,
  config: { name: 'Test Trigger', position: [-112, 952] }
});

const test_Data = node({
  type: 'n8n-nodes-base.set',
  version: 3.5,
  config: { name: 'Test Data', parameters: { mode: 'manual', duplicateItem: false, duplicateCount: 0, assignments: { assignments: [{ id: 'f960b4c7-224c-45d7-8e2f-df6d40c36cbb', name: 'id', value: 'test-{{ $run().id }}', type: 'string' }, { id: '35bc5fe4-14a8-4918-a9d5-4ec57ef546b6', name: 'title', value: 'TEST DÉMO — Selon un client, Brauman and K livrerait des appartements en retard', type: 'string' }, { id: '8425d6d4-210e-4f16-85c6-77e145569ed4', name: 'link', value: 'https://www.exemple-de-avis-client-fake.example/brauman-and-k', type: 'string' }, { id: '8a24f223-2f19-4bf6-a84a-e5d9667653d0', name: 'isoDate', value: expr('{{ $now }}'), type: 'string' }, { id: 'db55150f-4fab-4bd2-a0bd-ef388059fcbd', name: 'contentSnippet', value: 'TEST DÉMO (faux article). Un client de Brauman and K dénonce des retards de livraison répétés et des clauses de paiement modifiées sans accord écrit. Source : fausse info de démonstration.', type: 'string' }], options: {} }, includeOtherFields: false, options: {} }, position: [112, 952] }
});

const wf = workflow('', 'Test', { executionOrder: 'v1', binaryMode: 'separate', description: 'Sandbox test copy of the First reputation watch: Google Alerts ingestion, AI triage, alert mailing, and non-alert journal logging.' });

export default wf
  .add(rSS_Feed_QVEMA)
  .to(no_Operation_do_nothing)
  .to(remove_Duplicates)
  .to(aI_Agent
  .to([
    if_node.onTrue(alert_Router
      .to([
        append_row_in_sheet,
        alert_Email])),
    keep_Non_Alerts
    .to(journal_Non_Alerts)]))
  .add(rSS_Feed_David_Brauman)
  .to(no_Operation_do_nothing)
  .add(rSS_Feed_Brauman)
  .to(no_Operation_do_nothing)
  .add(rSS_Feed_Brauman_and_K)
  .to(no_Operation_do_nothing)
  .add(rSS_Feed_QVEMA_FR)
  .to(no_Operation_do_nothing)
  .add(sticky('Specs | Veille réputation Brauman and K\n1. Objectif\nÊtre prévenue le plus vite possible dès qu\u2019un contenu négatif circule sur Brauman and K, David Brauman ou l\u2019émission QVEMA, afin d\u2019anticiper les réactions et de déclencher à temps les protections de l\u2019entreprise.\n2. Périmètre\nÉlément	Décision\nCibles surveillées	Brauman and K, David Brauman, émission QVEMA\nSources	Tous les réseaux sociaux à égalité, médias et web (presse, blogs, forums, sites d\u2019avis), documents officiels (décisions de justice, publications des autorités)\nLangues	Français, anglais, hébreu (à confirmer : l\u2019arabe est-il nécessaire ?)\nContenus éphémères	Les stories et contenus qui disparaissent sont captés\nDisponibilité	24 h/24, 7 j/7\n3. Déclencheur\nÉvénement déclencheur : détection d\u2019un contenu négatif concernant l\u2019une des trois cibles.\nDélai attendu : le plus rapide possible.\nPoints fixes : un point le matin, un à midi et un le soir, dans le groupe WhatsApp.\nVolume attendu : une dizaine à quelques dizaines de mentions par jour en temps normal, avec des pics à prévoir autour de QVEMA.\n4. Résultat attendu\nContenu de chaque alerte\nlien vers le contenu\nextrait du passage négatif\nsource et date\nrésumé en une phrase de ce qui est négatif\nniveau de gravité (faible, moyen, fort)\ncible visée (entreprise, David ou QVEMA)\nOrdre d\u2019affichage (visibilité) : trois critères combinés, taille de la source, ampleur de la diffusion et rapidité de la diffusion. En cas de contradiction, la rapidité l\u2019emporte.\nCas graves (grosse ampleur) : en plus du message dans le groupe, un appel et un SMS.\nPendant un pic de volume : seuls les contenus les plus graves ou les plus rapides sont envoyés individuellement, le reste est regroupé, et un résumé chiffré (nombre de mentions négatives, tendance, sources principales) est envoyé à intervalle régulier.\nArchivage : capture, date et lien de chaque contenu détecté, pour pouvoir les produire en cas de réclamation ou de plainte.\n5. Destinataires et canaux\nSituation	Qui	Comment\nAlertes courantes et points matin, midi et soir	Toi et le community manager	Groupe WhatsApp\nCas grave	Toi d\u2019abord	Appel et SMS\nCas grave sans confirmation de ta part	Le community manager	Appel, après 10 à 15 minutes (15 minutes retenues, à ajuster après les premiers tests)\nPanne de la veille	Toi seule	Message\nAucune information n\u2019est restreinte dans le groupe WhatsApp (extraits complets, noms des personnes visées).\n6. Outils et écosystème\nMessagerie : WhatsApp (groupe existant de deux personnes).\nOutils de veille : aucun n\u2019existe aujourd\u2019hui, tu pars de zéro.\nAccès et abonnements : certains accès payants seront probablement nécessaires, non validés pour l\u2019instant.\nLimite connue : les comptes privés, groupes fermés et messages privés ne sont pas visibles. Ils restent hors périmètre, sauf contenus éphémères publics (stories).\n7. Contraintes opérationnelles\nBudget : quasi gratuit. Aucun budget n\u2019est attendu à court terme, et une demande à David est possible si besoin.\nVersion 1 (sans budget) : tout le périmètre (cibles, sources, langues), à un rythme réduit. Concrètement, trois points par jour dans WhatsApp, sans appel ni SMS, sans archivage automatique.\nVersion complète (à financer) : alertes immédiates, appel et SMS, suivi 24 h/24, archivage, relais vers le community manager, résumés en pic.\nPassage de la V1 à la version complète : quand David valide un budget, après une présentation de la V1 (ce qu\u2019elle a détecté, ce qu\u2019elle a manqué faute de moyens).\n8. Pannes et reprise\nLe système réessaie automatiquement plusieurs fois avant de lancer une alerte de panne, pour éviter les fausses alarmes.\nSi la panne persiste, tu es prévenue (toi seule).\nChaque point (matin, midi, soir) indique l\u2019état des sources : toutes vérifiées, ou lesquelles ont échoué.\n9. Données personnelles et sécurité\nRespect du RGPD : seul ce qui est utile est collecté.\nDurée de conservation : 30 jours, puis suppression.\nLe contenu est visible par toi et le community manager (statut à confirmer, voir section 10).\n10. Points à valider\nDurée de conservation : 30 jours est court pour des preuves. Si une réclamation démarre plus tard, les contenus auront disparu. À valider avec David.\nStatut du community manager : salarié de Brauman and K ou prestataire externe ? Cela change les obligations de confidentialité, car il voit tous les contenus et les noms.\nArabe : faut-il ajouter cette langue aux trois autres ?\nBudget : montant à définir pour la version complète, à présenter à David avec la V1.\nWhatsApp : aucune restriction de contenu n\u2019est prévue, alors que le groupe peut contenir des noms de personnes visées. À revalider quand le statut du community manager sera connu.\nDéfinition de « négatif » et de la gravité : quels critères distinguent faible, moyen et fort ? Je te propose d\u2019en discuter avant de lancer la V1.', [], { name: 'Sticky Note', position: [-1552, 272] }))
  .add(test_Trigger)
  .to(test_Data)
  .to(no_Operation_do_nothing)