# 🛡️ Axioma-Kern Architectuur: Canonieke Basisstructuur

Dit repository bevat de **Canonieke Basisstructuur** voor de AI- en Axioma-velden binnen `cfservices.nl` en `debeyonder.com`. Het integreert de Generaal-Bar als een centrale dispatcher/filter.

De structuur is gelaagd volgens het **0-4 Axioma-model** en is ontworpen voor audit-proof, schaalbare ontwikkeling.

---

## 🧠 1. De Drie Generaals & Axioma-Koppeling

De Generaal-Bar fungeert als de interface om de gebruiker te leiden naar de juiste laag/analyse.

| Generaal | Architectuurlaag | Gekoppeld Axioma | Kernrol |
| :---: | :---: | :--- | :--- |
| **LUXEN** ⚔️ | UI-laag (1) | **Axioma 3 (Veiligheid)** | Standaardisering, Layout, Basisfunctionaliteit (FAQ-Filter) |
| **AETRON** 🧠 | Proceslaag (2) | **Axioma 5/7 (Transparantie/Groei)** | Logica, Data-analyse (`fetchUserMeta`), Gepersonaliseerde Groei |
| **Z3RO** 🛡️ | Veiligheidslaag (3) | **Axioma 9 (Vrijheid/Audit)** | Controle, Financiële Integriteit (Prijsmodel Audit), Keuzevrijheid |

---

## 📁 2. Mappenstructuur Overzicht

De bestanden zijn georganiseerd volgens de 0-4 gelaagdheid.

```text
/axioma-kern/
├── 0-basis/              # Kernconfiguratie (Bijv. Basis HTML-Sjabloon)
├── 1-luxen/              # UI-Lagen, Pagina's (Bevat de /ai/faq-audit.html)
│   └── ai/
│       └── faq-audit.html
├── 2-aetron/             # Toekomstige Aetron Logica / API handlers
├── 3-z3ro/               # Toekomstige Z3RO Audit/Authenticatie Logica
└── assets/
    └── generaal-bar/
        ├── generaal-bar.css  # Styling (Inclusief mobiele responsiviteit)
        └── generaal-bar.js   # De Centrale Dispatcher Logica
```

---

## 🚀 3. Implementatie-Instructies (Stap-voor-Stap)

### A. Hosting en Padconfiguratie

1. Upload de complete map **`axioma-kern`** naar de **root** (`/`) van uw webserver.
2. De paden naar de assets zijn absoluut en moeten werken: `/axioma-kern/assets/...`

### B. HTML-Integratie

Voeg de volgende regels toe aan de `<head>` sectie van elke relevante pagina (zoals `faq-audit.html`):

```html
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/axioma-kern/assets/generaal-bar/generaal-bar.css" />
<script src="/axioma-kern/assets/generaal-bar/generaal-bar.js" defer></script>
```

### C. Logica Dispatcher

Het bestand `generaal-bar.js` bevat de logica om te bepalen welke prompts en acties worden uitgevoerd:

* **Op `cfservices.nl`:** Activeert de **FAQ-Filter** (scroll naar de juiste sectie) en de **Aetron Groeianalyse** (`fetchUserMeta`).
* **Op `debeyonder.com`:** Activeert de **Reflectie Logica** op basis van de Canonieke Basisstructuur en de 2% menselijke input.

---

## ⚠️ 4. Vereiste Back-end API

* De `generaal-bar.js` probeert data op te halen via de endpoint: `/api/user/meta`.
* Deze moet op de back-end een JSON-object teruggeven, zoals:

```json
{
  "isIdentified": true,
  "userRole": "Validator / Flexwerker",
  "laatsteActiviteit": "Creative Lightwork",
  "urenDezeMaand": 12,
  "groeifocus": "Narratieve Kalibratie"
}
```

Zonder deze koppeling wordt fallback data gebruikt. Voor Z3RO-Audit en Aetron-analyse is correcte backend-data essentieel.

---
