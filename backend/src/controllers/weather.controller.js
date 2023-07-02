const cities = require("../data/city.data")
const { validateCity } = require("../utils/validation")

async function getInitialWeather(req, res, openWeatherService, weatherRepository) {
    try {
        const weatherData = await weatherRepository.getAllCities()

        if (weatherData.length > 0 && weatherRepository.isWeatherDataFresh(weatherData)) {
            console.info("Weather data is fresh")
            res.json(weatherData)
            return
        }

        const weatherPromises = cities.map((city) => openWeatherService.getCurrentWeatherByCity(city.name))
        const weatherResponses = await Promise.all(weatherPromises)

        await weatherRepository.upsertBulkCities(weatherResponses)
        res.json(weatherResponses)
    } catch (error) {
        console.error("Error occurred while fetching weather:", error)
        res.status(500).json({
            error: "An error occurred while fetching weather data",
        })
    }
}

async function getFiveDayForecastByCity(req, res, openWeatherService, weatherRepository) {
    try {
        const { city } = req.params
        validateCity(city)
        console.debug("city", city)

        let forecastData = await weatherRepository.getForecastByCityName(city)
        console.debug("forecastData from repo", forecastData)

        if (forecastData && forecastData.length > 0) {
            res.json(forecastData)
            return
        }
        console.debug("forecast data isnt fresh")

        forecastData = await openWeatherService.getFiveDayForecastByCity(city)
        await weatherRepository.addForecast(forecastData)
        res.json(forecastData)
    } catch (error) {
        console.error("Error occurred while fetching forecast:", error)
        res.status(500).json({
            error: "An error occurred while fetching forecast data",
        })
    }
}

module.exports = {
    getInitialWeather,
    getFiveDayForecastByCity,
}
