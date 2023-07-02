import React from "react"
import { Link } from "react-router-dom"
import { getCitiesTime } from "../utils/getCitiesTime"

export function CityList({ filteredCities, date }) {
    let citiesTimeData = getCitiesTime(filteredCities, date)

    return (
        <section className="container">
            <ul className="grid grid-cols-4 gap-2.5">
                {filteredCities.map((city) => (
                    <li
                        key={city.city_id}
                        className="p-2 shadow-md bg-slate-300 hover:bg-slate-50 hover:cursor-pointer hover:text-yellow-500"
                    >
                        <Link to={`/${city.city_name}`}>
                            <article className="flex flex-col justify-between h-24 min-h-24 text-xl">
                                <p className="flex flex-row justify-between">
                                    <span>{city.city_name}</span>
                                    <span>{citiesTimeData[city.city_name]}</span>
                                </p>
                                <p className="flex flex-row justify-between items-end">
                                    <span>{city.temp} °C</span>
                                    <img src={`https://openweathermap.org/img/wn/${city.icon}.png`} alt="weather icon" />
                                </p>
                            </article>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
}
