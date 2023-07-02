import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { loadCitiesCurrent } from "../store/weather.actions"

import { CityList } from "../components/CityList"
import { DateTime } from "../components/DateTime"
import Loading from "../components/Loading"

export function WeatherIndex() {
    const citiesCurrent = useSelector((storeState) => storeState.citiesCurrent)
    let [date, setDate] = useState(new Date())
    const [isLoading, setIsLoading] = useState(false)
    const [searchCriteria, setSearchCriteria] = useState("")
    const filteredCities = citiesCurrent.filter((city) => city.city_name.toLowerCase().includes(searchCriteria.toLowerCase()))

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            try {
                await loadCitiesCurrent()
            } catch (error) {
                console.error("Error loading cities current:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    if (isLoading) return <Loading />

    return (
        <div>
            <h1 className="text-2xl font-semibold mt-2 mb-2">Weather App</h1>
            <div className="flex flex-row justify-between mb-2">
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Search cities..."
                        value={searchCriteria}
                        onChange={(e) => setSearchCriteria(e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded-md"
                    />
                </div>
                <DateTime date={date} setDate={setDate} />
            </div>
            <CityList filteredCities={filteredCities} date={date} />
        </div>
    )
}
