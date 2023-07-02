export const SET_CITIES = "SET_CITIES"

const initialState = {
    citiesCurrent: [],
}

export function weatherReducer(state = initialState, action) {
    var newState = state
    switch (action.type) {
        case SET_CITIES:
            newState = {
                ...state,
                citiesCurrent: action.citiesCurrent,
            }
            break
        default:
    }
    return newState
}
