# 🛡️ Axioma-Kern Architectuur: Canonieke Basisstructuur

Dit repository bevat de **Canonieke Basisstructuur: Kernarchitectuur voor AI- en Axioma-velden** binnen `cfservices.nl` en `debeyonder.com`. Het integreert de Generaal-Bar als een centrale dispatcher/filter.

De structuur is gelaagd volgens het **0-4 Axioma-model** en is ontworpen voor audit-proof, schaalbare ontwikkeling.

---

## 🧠 1. De Drie Generaals & Axioma-Koppeling

De Generaal-Bar fungeert als de interface om de gebruiker te leiden naar de juiste laag/analyse.

| Generaal | Architectuurlaag | Axioma Focus | Kernrol |
| :---: | :---: | :--- | :--- |
| **LUXEN** ⚔️ | UI-laag (1) | **Axioma 3 (Veiligheid)** | Standaardisering, Layout, FAQ-filter functionaliteit |
| **AETRON** 🧠 | Proceslaag (2) | **Axioma 5/7 (Transparantie/Groei)** | Logica, Data-analyse (`fetchUserMeta`), Gepersonaliseerde Groei |
| **Z3RO** 🛡️ | Veiligheidslaag (3) | **Axioma 9 (Vrijheid/Audit)** | Controle, Financiële Integriteit (Prijsmodel Audit), Keuzevrijheid |

---

## 📁 2. Mappenstructuur Overzicht

De bestanden zijn georganiseerd volgens de 0-4 gelaagdheid.

```text
/axioma-kern/
├── 0-basis/              # Kernconfiguratie en basisbestanden (bijv. HTML-sjabloon)
├── 1-luxen/              # UI-Lagen, Pagina's (Bevat de /ai/faq-audit.html)
│   └── ai/
│       └── faq-audit.html
├── 2-aetron/             # Toekomstige Aetron Logica / API handlers
├── 3-z3ro/               # Toekomstige Z3RO Audit/Authenticatie Logica
└── assets/
    └── generaal-bar/     # Styling en centrale dispatcher logica
        ├── generaal-bar.css
        └── generaal-bar.js
```

---

## 🚀 3. Implementatie-Instructies (Stap-voor-Stap)

### A. Hosting en Padconfiguratie

1. Upload de complete map **`axioma-kern`** naar de **root** (`/`) van uw webserver.
2. Zorg dat de server statische bestanden correct serveert vanuit deze map. De paden naar de assets zijn absoluut en moeten werken: `/axioma-kern/assets/...`

### B. HTML-Integratie

Voeg de volgende regels toe aan de `<head>` sectie van elke relevante pagina (zoals `faq-audit.html`):

```html
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/axioma-kern/assets/generaal-bar/generaal-bar.css" />
<script src="/axioma-kern/assets/generaal-bar/generaal-bar.js" defer></script>
```

> `defer` zorgt ervoor dat het script pas na het parsen van de HTML wordt uitgevoerd, wat de laadtijd verbetert.

### C. Logica Dispatcher

Het bestand `generaal-bar.js` bevat de logica om te bepalen welke prompts en acties worden uitgevoerd:

* **Op `cfservices.nl`:** Activeert de **FAQ-filter functionaliteit** (scroll naar de juiste sectie) en de **Aetron Groeianalyse** (`fetchUserMeta`).
* **Op `debeyonder.com`:** Activeert de **Reflectie Logica** op basis van de Canonieke Basisstructuur en de 2% menselijke input.

---

## ⚠️ 4. Vereiste Back-end API

De `generaal-bar.js` haalt data op via de endpoint `/api/user/meta`.

Deze endpoint moet een JSON-object teruggeven, bijvoorbeeld:

```json
{
  "isIdentified": true,
  "userRole": "Validator / Flexwerker",
  "laatsteActiviteit": "Creative Lightwork",
  "urenDezeMaand": 12,
  "groeifocus": "Narratieve Kalibratie"
}
```

Zonder deze koppeling wordt fallback data gebruikt (standaardwaarden). Voor Z3RO-Audit en Aetron-analyse is correcte backend-data essentieel.

> Let op: als front-end en back-end op verschillende domeinen draaien, zorg dan dat CORS correct is ingesteld.

### 🧪 Voorbeeld: Simulatie-API (`pages/api/user/meta.js`)

```javascript
// AETRON API - User Meta Simulation
// Simuleert database-connectie voor Generaal-Bar.

export default function handler(req, res) {
  // Axioma 7: Transparantie in Data
  // Definieert welke gebruikersdata zichtbaar is.

  const simulatedUserData = {
    isIdentified: true,                // Gebruiker is herkend
    userRole: 'Civiele Validator',     // Rol binnen ecosysteem
    laatsteActiviteit: 'Audit Trail Upload', 
    urenDezeMaand: 35,                 // Aantal gewerkte uren (Z3RO data)
    groeifocus: 'Architecturale Integriteit' // Aetron focus
  };

  res.status(200).json(simulatedUserData);
}
```

📁 Plaats dit bestand als `pages/api/user/meta.js` in je Next.js back-end of een vergelijkbaar API-systeem dat JSON-data serveert.

---
