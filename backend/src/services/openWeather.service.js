const axios = require("axios")

class OpenWeatherService {
    constructor(apiKey) {
        this.apiKey = apiKey
        this.baseUrl = "https://api.openweathermap.org/data/2.5"
    }

    async getCurrentWeatherByCity(city) {
        try {
            const url = `${this.baseUrl}/weather`
            const { data } = await axios.get(url, {
                params: {
                    q: city,
                    appid: this.apiKey,
                    units: "metric",
                },
            })

            const cityWeather = {
                city_id: data.id,
                city_name: data.name,
                city_timezone: data.timezone,
                city_latitude: data.coord.lat,
                city_longitude: data.coord.lon,
                temp: data.main.temp,
                icon: data.weather[0].icon,
            }

            return cityWeather
        } catch (error) {
            throw new Error("Failed to fetch current weather data.", error)
        }
    }

    async getFiveDayForecastByCity(city) {
        try {
            const url = `${this.baseUrl}/forecast`
            const { data } = await axios.get(url, {
                params: {
                    q: city,
                    appid: this.apiKey,
                    units: "metric",
                },
            })

            let rawForecastData = []
            for (let i = 0; i < 5; i++) {
                const dailyForecasts = data.list[i * 8]
                rawForecastData.push(dailyForecasts)
            }

            const forecastData = rawForecastData.map((forecast) => ({
                city_id: data.city.id,
                dt: forecast.dt,
                temp: forecast.main.temp,
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                icon: forecast.weather[0].icon,
            }))

            return forecastData
        } catch (error) {
            throw new Error("Failed to fetch five-day forecast data.", error)
        }
    }
}

module.exports = OpenWeatherService
