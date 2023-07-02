import { httpService } from "./http.service.js"
import { setDays } from "../utils/setDays.js"

export const weatherService = {
    getCurrentWeather,
    getForecastByCity,
}

async function getCurrentWeather() {
    try {
        return await httpService.get("initial")
    } catch (error) {
        console.error("Failed to get photos")
        throw error
    }
}

async function getForecastByCity(city) {
    try {
        let forecastData = await httpService.get(`forecast/${city}`)
        forecastData = setDays(forecastData)
        return forecastData
    } catch (err) {
        console.error("Failed to get car (service)")
        throw err
    }
}
