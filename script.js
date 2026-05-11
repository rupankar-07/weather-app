let apiKey = "Your API Key";

function getWeather(cityFromLocation = null) {

    let city = cityFromLocation || document.getElementById("cityInput").value.trim();
    let result = document.getElementById("result");

    if (!city) {
        result.innerHTML = "<p>Please enter a city ⚠️</p>";
        return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    result.innerHTML = "<p>Loading weather...</p>";

    fetch(url)
        .then(res => res.json())
        .then(data => {

            if (data.cod != 200) {
                result.innerHTML = "<p>City not found ❌</p>";
                return;
            }

            let icon = data.weather[0].icon;
            let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

            result.innerHTML = `
                <div class="weather-box">
                    <h2>📍 ${data.name}</h2>
                    <img src="${iconUrl}">
                    <h3>🌡️ ${data.main.temp} °C</h3>
                    <p>🌥️ ${data.weather[0].description}</p>
                    <p>💧 Humidity: ${data.main.humidity}%</p>
                </div>
            `;
        })
        .catch(() => {
            result.innerHTML = "<p>Error fetching data ❌</p>";
        });
}


function getLocationWeather() {
    if (!navigator.geolocation) {
        alert("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(position => {

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        document.getElementById("result").innerHTML = "<p>Getting location weather...</p>";

        fetch(url)
            .then(res => res.json())
            .then(data => {

                let icon = data.weather[0].icon;
                let iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

                document.getElementById("result").innerHTML = `
                    <div class="weather-box">
                        <h2>📍 ${data.name}</h2>
                        <img src="${iconUrl}">
                        <h3>🌡️ ${data.main.temp} °C</h3>
                        <p>🌥️ ${data.weather[0].description}</p>
                    </div>
                `;
            });

    });
}


function toggleMode() {
    document.body.classList.toggle("dark");
}
