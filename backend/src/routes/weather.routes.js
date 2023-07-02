const express = require("express")
const { getInitialWeather, getFiveDayForecastByCity } = require("../controllers/weather.controller")
const OpenWeatherService = require("../services/openWeather.service")
const WeatherRepository = require("../repository/weather.repository")

const router = express.Router()

api_key = process.env.OPEN_WEATHER_API_KEY
const openWeatherService = new OpenWeatherService(api_key)
const weatherRepository = new WeatherRepository()

router.get("/initial", (req, res) => {
    getInitialWeather(req, res, openWeatherService, weatherRepository)
})

// router.get("/weather/:city", (req, res) => {
//     getCityCurrentWeather(req, res, openWeatherService, weatherRepository)
// })

router.get("/forecast/:city", (req, res) => {
    getFiveDayForecastByCity(req, res, openWeatherService, weatherRepository)
})

module.exports = router
