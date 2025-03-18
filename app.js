const weatherApikey = '28f170314220dcaab8bb4ef0fa0b6c9d';

async function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) return alert('Please enter a city name');

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApikey}`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod !== 200) {
            alert('City not found!');
            return;
        }

        const temp = weatherData.main.temp;
        const condition = weatherData.weather[0].description;
        document.getElementById('weatherInfo').innerHTML = `
            <h3>${weatherData.name}</h3>
            <p>Temperature: ${temp}°C</p>
            <p>Condition: ${condition}</p>
        `;
        document.getElementById('weatherInfo').style.display = 'block';

        getOutfitRecommendation(temp, condition);


    } catch (error) {
        console.error('Error fetching weather:', error);
    }
    
}

function getOutfitRecommendation(temp, condition) {
    let outfit = "Casual wear";

    if (temp < 10) {
        outfit = "Warm Jacket, Sweater, and Boots";
    } else if (temp >= 10 && temp < 20) {
        outfit = "Light Jacket, Jeans, and Sneakers";
    } else if (temp >= 20 && temp < 30) {
        outfit = "T-shirt and jeans or a summer dress";
    } else {
        outfit = "Shorts and a tank top";
    }

    if (condition.includes('rain')) {
        outfit += ' with a raincoat and waterproof shoes.';
    } else if (condition.includes('snow')) {
        outfit += ' with gloves, a scarf, and a warm hat.';
    }

    document.getElementById('outfitRecommendation').innerHTML = `<h3>Outfit Recommendation</h3><p>${outfit}</p>`;
    document.getElementById('outfitRecommendation').style.display = 'block';

}

document.getElementById('city').addEventListener('keypress', function(event) {
    if (event.key === 'Enter'){
        getWeather();
    }
});