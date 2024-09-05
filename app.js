console.log("JavaScript file loaded");

// Dati dei comuni con altitudini realistiche
const comuni = [
    { name: 'Modena', altitude: 34 },
    { name: 'Reggio Emilia', altitude: 58 },
    { name: 'Carpi', altitude: 26 },
    { name: 'Sassuolo', altitude: 121 },
    { name: 'Formigine', altitude: 82 },
    { name: 'Casalgrande', altitude: 95 },
    { name: 'Maranello', altitude: 150 },
    { name: 'Villa Minozzo', altitude: 691 },
    { name: 'Pievepelago', altitude: 781 },
    { name: 'Frassinoro', altitude: 1131 },
    { name: 'Fanano', altitude: 640 },
    { name: 'Sestola', altitude: 1020 },
    { name: 'Montefiorino', altitude: 797 },
    { name: 'Carpineti', altitude: 568 },
    { name: 'Castelnovo ne' Monti', altitude: 700 },
    { name: 'Toano', altitude: 842 },
    { name: 'Ligonchio', altitude: 927 },
    { name: 'Ramiseto', altitude: 815 },
];

// Popola il menu a discesa dei comuni
function populateComuneSelect() {
    console.log("Populating comune select");
    const select = document.getElementById('comune-select');
    comuni.forEach(comune => {
        const option = document.createElement('option');
        option.value = comune.name;
        option.textContent = comune.name;
        select.appendChild(option);
    });
    console.log("Comune select populated");
}

// Funzione per generare dati meteo realistici basati sull'altitudine
function getRealisticWeatherData(altitude) {
    console.log("Generating weather data for altitude:", altitude);
    const baseTemperature = 25 - (altitude / 100) * 0.6; // Temperatura diminuisce con l'altitudine
    const temperature = Math.round((baseTemperature + (Math.random() * 4 - 2)) * 10) / 10;
    const humidity = Math.round(60 + (Math.random() * 20));
    const rainfall = Math.round(Math.random() * 20) / 10;
    const mushroomLikelihood = calculateMushroomLikelihood(altitude, humidity, rainfall);
    
    return {
        temperature,
        humidity,
        rainfall,
        altitude,
        mushroomLikelihood
    };
}

// Calcola la probabilità di trovare funghi basata su altitudine, umidità e pioggia
function calculateMushroomLikelihood(altitude, humidity, rainfall) {
    let likelihood = 0;
    if (altitude > 500) likelihood += 30;
    if (altitude > 800) likelihood += 20;
    if (humidity > 70) likelihood += 20;
    if (rainfall > 1) likelihood += 30;
    
    return Math.min(Math.max(likelihood, 0), 100);
}

// Aggiorna i dati meteo visualizzati
function updateWeatherData(comune) {
    console.log("Updating weather data for comune:", comune);
    const selectedComune = comuni.find(c => c.name === comune);
    if (!selectedComune) {
        console.log("Comune not found:", comune);
        return;
    }
    const weatherData = getRealisticWeatherData(selectedComune.altitude);
    const weatherDisplay = document.getElementById('weather-data');
    weatherDisplay.innerHTML = `
        <h3>${comune}</h3>
        <p>Altitudine: ${weatherData.altitude} m</p>
        <p>Temperatura: ${weatherData.temperature}°C</p>
        <p>Umidità: ${weatherData.humidity}%</p>
        <p>Pioggia nelle ultime 24 ore: ${weatherData.rainfall} mm</p>
        <p>Probabilità di trovare funghi: ${weatherData.mushroomLikelihood}%</p>
    `;
    console.log("Weather data updated");
}

// Event listener per il cambio di comune selezionato
document.getElementById('comune-select').addEventListener('change', (e) => {
    console.log("Comune select changed:", e.target.value);
    if (e.target.value) {
        updateWeatherData(e.target.value);
    }
});

// Inizializza l'app
function init() {
    console.log("Initializing app");
    populateComuneSelect();
}

// Carica l'app quando la pagina è pronta
window.onload = init;

console.log("JavaScript file fully loaded");