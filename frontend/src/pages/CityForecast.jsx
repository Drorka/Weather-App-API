import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { weatherService } from "../services/weather.service"
import Loading from "../components/Loading"

export function CityForecast() {
    const { city } = useParams()
    const [forecastData, setForecastData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                const data = await weatherService.getForecastByCity(city)
                setForecastData(data)
            } catch (error) {
                console.error("Error fetching forecast data:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    if (isLoading) return <Loading />

    return (
        <section className="container mx-auto py-8">
            <div className="flex flex-row justify-between">
                <h1 className="text-3xl font-bold mb-4">{city}</h1>
                <Link to="/" className="text-blue-800 mt-4 inline-block hover:text-blue-800">
                    Back
                </Link>
            </div>
            <div className="grid grid-cols-5 gap-4">
                {forecastData.map((forecast, index) => (
                    <article key={index} className="bg-slate-300 shadow-md p-4 text-center min-h-fit">
                        <p className="font-semibold mb-2">{forecast.day}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${forecast.icon}@2x.png`}
                            alt="weather icon"
                            className="mx-auto"
                        />
                        <div className="grid grid-cols-1 gap-4">
                            <div className="grid grid-cols-2">
                                <p className="font-medium justify-self-start">Max</p>
                                <p className="justify-self-end">{forecast.temp_max}°C</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p className="font-medium justify-self-start">Min</p>
                                <p className="justify-self-end">{forecast.temp_min}°C</p>
                            </div>
                            <div className="grid grid-cols-2">
                                <p className="font-medium justify-self-start">Humidity</p>
                                <p className="justify-self-end">{forecast.humidity}%</p>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
