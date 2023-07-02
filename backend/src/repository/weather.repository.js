const { City, Forecast } = require("../models/models")

class WeatherRepository {
    async upsertBulkCities(cityData) {
        try {
            const cities = await City.bulkCreate(cityData, {
                updateOnDuplicate: ["city_name", "city_timezone", "city_latitude", "city_longitude", "temp"],
            })
            return cities.map((city) => city.toJSON())
        } catch (error) {
            console.error("Error inserting cities:", error)
            throw error
        }
    }

    async getAllCities() {
        try {
            const cities = await City.findAll()
            return cities.map((city) => city.toJSON())
        } catch (error) {
            console.error("Error fetching cities:", error)
            throw error
        }
    }

    async upsertBulkForecasts(forecastsData) {
        try {
            await Forecast.bulkCreate(forecastsData, {
                ignoreDuplicates: true,
            })

            console.info("Forecasts updated successfully")
        } catch (error) {
            console.error("Error occurred while updating forecasts:", error)
        }
    }

    async addForecast(forecastData) {
        try {
            const forecast = await Forecast.bulkCreate(forecastData)
            console.info("Forecast added successfully")
            return forecast
        } catch (error) {
            console.error("Error occurred while adding forecast:", error)
            throw error
        }
    }

    async getForecastByCityName(cityName) {
        try {
            const city = await City.findOne({
                where: { city_name: cityName },
                include: [Forecast],
            })

            if (!city) {
                throw new Error("City not found")
            }

            const latestForecasts = await Forecast.findAll({
                where: { city_id: city.city_id },
                order: [["dt", "DESC"]],
                limit: 5,
            })

            return latestForecasts
        } catch (error) {
            console.error("Error fetching forecasts:", error)
            throw error
        }
    }

    isWeatherDataFresh(weatherData, ageInSeconds = 60 * 60) {
        const freshThreshold = Date.now() - ageInSeconds * 1000
        return weatherData.every((data) => {
            return data.updatedAt >= freshThreshold
        })
    }
}

module.exports = WeatherRepository
