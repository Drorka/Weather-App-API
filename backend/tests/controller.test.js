const request = require("supertest")
const express = require("express")
const { mockWeatherData, mockWeatherResponses } = require("./mock.data")
const cities = require("../src/data/city.data")

const { getInitialWeather } = require("../src/controllers/weather.controller")
const OpenWeatherService = require("../src/services/openWeather.service")
const WeatherRepository = require("../src/repository/weather.repository")

jest.mock("../src/services/openWeather.service")
jest.mock("../src/repository/weather.repository")

describe("Weather Controller - getInitialWeather", () => {
    let app
    let openWeatherService
    let weatherRepository

    beforeAll(() => {
        app = express()
        openWeatherService = new OpenWeatherService()
        weatherRepository = new WeatherRepository()
        app.get("/initial", (req, res) => getInitialWeather(req, res, openWeatherService, weatherRepository))
    })

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it("should return fresh weather data from weatherRepository", async () => {
        const isWeatherDataFreshMock = jest.spyOn(weatherRepository, "isWeatherDataFresh").mockReturnValue(true)
        const getAllCitiesMock = jest.spyOn(weatherRepository, "getAllCities").mockResolvedValue(mockWeatherData)

        const response = await request(app).get("/initial")

        expect(getAllCitiesMock).toHaveBeenCalled()
        expect(isWeatherDataFreshMock).toHaveBeenCalledWith(mockWeatherData)
        expect(response.status).toBe(200)
        expect(response.body).toEqual(mockWeatherData)
    })

    it("should update weather data and return it when weatherData is not fresh", async () => {
        const isWeatherDataFreshMock = jest.spyOn(weatherRepository, "isWeatherDataFresh").mockReturnValue(false)
        const getAllCitiesMock = jest.spyOn(weatherRepository, "getAllCities").mockResolvedValue(mockWeatherData)
        const getCurrentWeatherByCityMock = jest.spyOn(openWeatherService, "getCurrentWeatherByCity")
        for (let i = 0; i < cities.length; i++) {
            getCurrentWeatherByCityMock.mockResolvedValueOnce(mockWeatherResponses[i])
        }
        const upsertBulkCitiesMock = jest.spyOn(weatherRepository, "upsertBulkCities")

        const response = await request(app).get("/initial")

        expect(getAllCitiesMock).toHaveBeenCalled()
        expect(isWeatherDataFreshMock).toHaveBeenCalledWith(mockWeatherData)
        expect(getCurrentWeatherByCityMock).toHaveBeenCalledTimes(cities.length)
        expect(upsertBulkCitiesMock).toHaveBeenCalledWith(mockWeatherResponses)
        expect(response.status).toBe(200)
        expect(response.body).toEqual(mockWeatherResponses)
    })

    it("should handle errors while fetching weather data", async () => {
        const errorMessage = "Some error occurred"
        const mockError = new Error(errorMessage)
        const getAllCitiesMock = jest.spyOn(weatherRepository, "getAllCities").mockRejectedValue(mockError)
        const consoleErrorMock = jest.spyOn(console, "error").mockImplementation()

        const response = await request(app).get("/initial")

        expect(getAllCitiesMock).toHaveBeenCalled()
        expect(consoleErrorMock).toHaveBeenCalledWith("Error occurred while fetching weather:", mockError)
        expect(response.status).toBe(500)
        expect(response.body).toEqual({
            error: "An error occurred while fetching weather data",
        })
    })
})
