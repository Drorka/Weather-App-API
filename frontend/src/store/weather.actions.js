import { weatherService } from "../services/weather.service.js"
import store from "./store.js"
import { SET_CITIES } from "./weather.reducer.js"

export async function loadCitiesCurrent() {
    try {
        const citiesCurrent = await weatherService.getCurrentWeather()
        store.dispatch({
            type: SET_CITIES,
            citiesCurrent,
        })
    } catch (err) {
        console.error("Something went wrong, please try again later")
    }
}
