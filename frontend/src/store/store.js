import { createStore } from "redux"
import { weatherReducer } from "./weather.reducer.js"

const store = createStore(weatherReducer)

store.subscribe(() => {
    console.log("**** Store state changed: ****")
    console.log("storeState:\n", store.getState())
    console.log("*******************************")
})

export default store
