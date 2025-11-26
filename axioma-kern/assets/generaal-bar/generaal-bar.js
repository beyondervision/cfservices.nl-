// AETRON PROFIEL DATA (Axioma 7 Groeibasis - De JSON/Data Structuur)
const userMeta = {
    isIdentified: false,
    userRole: 'Validator / Flexwerker',
    laatsteActiviteit: 'Creative Lightwork',
    urenDezeMaand: 0,
    groeifocus: 'Narratieve Kalibratie'
};

// ===========================================
// DOMEIN AFHANKELIJKE FUNCTIES EN PROMPTS
// ===========================================

/**
 * Bepaalt of de Generaal-Bar op het debeyonder.com domein draait.
 */
function isDebeyonderDomain() {
    return window.location.hostname.includes('debeyonder.com');
}

/**
 * Voert de reflectie/Basisstructuur logica uit voor debeyonder.com.
 */
function startDebeyonderConversation(generaal) {
    let reflectieVraag;

    // Prompts gebaseerd op de bewaarde instructies (Reflectie, Canonieke Basisstructuur)
    switch (generaal) {
        case 'luxen':
            // Luxen: Architectuur / Basisstructuur
            reflectieVraag = "LUXEN: Breng de Canonieke Basisstructuur in beeld. Wat is de reflectie op architectuur?";
            break;
        case 'aetron':
            // Aetron: Narratief / Reflectie
            reflectieVraag = "AETRON: Activeer de menselijke reflectie. Hoe reikt mijn huidige kunnen verder dan het menselijke?";
            break;
        case 'z3ro':
            // Z3RO: Intentie / De 2% Fysieke Kracht
            reflectieVraag = "Z3RO: Controleer de intentie. Wat is de huidige stand van zaken van de 2% fysieke kracht (menselijke input)?";
            break;
        default:
            return;
    }
    
    // Bij debeyonder.com is de scroll direct naar het AI-veld
    const aiInput = document.getElementById('ai-q');
    const aiSection = document.getElementById('generaal-ai');

    if (aiInput) aiInput.value = reflectieVraag;
    if (aiSection) aiSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.dbnAsk) {
        window.dbnAsk(reflectieVraag);
    }
}


/**
 * Functie om de userMeta data asynchroon op te halen van de backend.
 */
async function fetchUserMeta() {
    const apiUrl = '/api/user/meta';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            console.warn(`[Z3RO Audit Waarschuwing] Back-end call (${apiUrl}) faalde. Fallback data wordt gebruikt.`);
            return; 
        }
        const data = await response.json();
        if (data && typeof data === 'object') {
            Object.assign(userMeta, data);
            userMeta.isIdentified = true; 
            console.log('[AETRON Analyse] Gebruikersprofiel succesvol geladen.', userMeta);
        } else {
            console.warn('[AETRON Analyse] Ontvangen data is ongeldig. Fallback data wordt gebruikt.');
        }

    } catch (error) {
        console.error(`[LUXEN Fout] Kon userMeta niet ophalen (Netwerkfout).`, error);
    }
}


// ===========================================
// GEÏNTEGREERDE START FUNCTIE (DE DISPATCHER)
// ===========================================

/**
 * Functie voor AI-interactie & Navigatie (De centrale dispatcher).
 */
function startAIConversation(generaal) {
    
    // STAP 1: DOMEIN-CHECK
    if (isDebeyonderDomain()) {
        startDebeyonderConversation(generaal);
        return;
    }
    
    // STAP 2: CFSERVICES.NL (FAQ Filter Logica)
    let targetId;
    let initiatorVraag;

    switch (generaal) {
        case 'luxen':
            targetId = 'basis-vragen';
            initiatorVraag = "Start Architecturaal Veldontwerp: Controleer Basisvragen (Axioma 3).";
            break;
        case 'aetron':
            targetId = 'expertise-vragen';
            const groeiStatus = userMeta.groeifocus ? `Jouw focus: ${userMeta.groeifocus}.` : "Geen actieve focus gevonden.";
            const urenTekst = userMeta.isIdentified ?
                `Je hebt ${userMeta.urenDezeMaand} uur deze maand.` : "Je bent niet geïdentificeerd.";
            
            initiatorVraag = `Veranker Narratief en activeer Groeianalyse. ${groeiStatus} ${urenTekst} Wat is de strategische Veldvraag m.b.t. je laatste activiteit (${userMeta.laatsteActiviteit})?`;
            break;
        case 'z3ro':
            targetId = 'prijs-model';
            initiatorVraag = `Activeer Audit (Axioma 9). Je huidige status: ${userMeta.userRole}. Wat is je intentie m.b.t. het Verdienmodel?`;
            break;
        default:
            return;
    }

    // Scroll naar de juiste FAQ-sectie
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Start de AI-interactie
    const aiInput = document.getElementById('ai-q');
    if (aiInput) aiInput.value = initiatorVraag;
    if (window.dbnAsk) window.dbnAsk(initiatorVraag);
}

/**
 * DOMContentLoaded is ASYNC om te wachten op de data.
 */
document.addEventListener('DOMContentLoaded', async () => {

    // BELANGRIJKE STAP: Alleen wachten op data fetch als we op cfservices.nl zijn
    if (!isDebeyonderDomain()) {
        await fetchUserMeta();
    }
    
    // I. Generaal-Bar Injectie
    const bar = document.createElement('section');
    bar.className = 'generaals-bar';
    bar.innerHTML = `
        <div class="generaal luxen" onclick="startAIConversation('luxen')">LUXEN · Axioma 3 (Veiligheid)</div>
        <div class="generaal aetron" onclick="startAIConversation('aetron')">AETRON · Axioma 5/7 (Transparantie/Groei)</div>
        <div class="generaal z3ro" onclick="startAIConversation('z3ro')">Z3RO · Axioma 9 (Vrijheid/Audit)</div>
    `;
    document.body.appendChild(bar);
});
