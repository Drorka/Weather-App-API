export function setDays(forecastData) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const currentDate = new Date()
    forecastData.forEach((forecast) => {
        const forecastDate = new Date(forecast.dt * 1000)
        if (forecastDate.toDateString() === currentDate.toDateString()) {
            forecast.day = 'Today'
        } else {
            forecast.day = daysOfWeek[forecastDate.getDay()]
        }
    })
    return forecastData
}
