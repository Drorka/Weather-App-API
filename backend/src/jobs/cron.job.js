const cron = require("cron")
const OpenWeatherService = require("../services/openWeather.service")
const WeatherRepository = require("../repository/weather.repository")
const cities = require("../data/city.data")

api_key = process.env.OPEN_WEATHER_API_KEY
const openWeatherService = new OpenWeatherService(api_key)
const weatherRepository = new WeatherRepository()

const cronJob = new cron.CronJob("0 */5 * * *", async () => {
    await updateForecastsData()
})

async function updateForecastsData() {
    try {
        const forecastsPromises = cities.map((city) => openWeatherService.getFiveDayForecastByCity(city.name))
        const forecastsResponses = await Promise.all(forecastsPromises)

        const forecastsData = forecastsResponses.flatMap((forecastsResponse) => {
            return forecastsResponse.map((forecast) => ({
                city_id: forecast.id,
                dt: forecast.dt,
                temp: forecast.temp,
                temp_min: forecast.temp_min,
                temp_max: forecast.temp_max,
                humidity: forecast.humidity,
                icon: forecast.icon,
            }))
        })

        await weatherRepository.upsertBulkForecasts(forecastsData)
        console.info("Forecasts updated successfully")
    } catch (error) {
        console.error("Error occurred while updating forecasts", error)
    }
}

module.exports = cronJob
