import React from "react"
import { Routes, Route } from "react-router-dom"

import { WeatherIndex } from "./pages/WeatherIndex"
import { CityForecast } from "./pages/CityForecast"

export function RootCmp() {
    return (
        <main className="mx-auto max-w-screen w-screen py-5 px-20 bg-orange-200 max-h-screen h-screen">
            <Routes>
                <Route key="/" exact={true} element={<WeatherIndex />} path="/" />
                <Route key="/cityForecast" exact={true} element={<CityForecast />} path="/:city" />
            </Routes>
        </main>
    )
}
