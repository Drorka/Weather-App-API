export function getCitiesTime(citiesCurrent, date) {
    let citiesTimeData = {}

    const currentUTCTime = date
    const currentUTCHours = currentUTCTime.getUTCHours()
    const currentUTCMinutes = currentUTCTime.getUTCMinutes()

    citiesCurrent.forEach((city) => {
        const cityOffset = city.city_timezone
        const cityHours = (currentUTCHours + Math.floor(cityOffset / 3600) + 24) % 24
        const cityMinutes = (currentUTCMinutes + Math.floor((cityOffset % 3600) / 60) + 60) % 60
        const cityTime = `${String(cityHours).padStart(2, '0')}:${String(cityMinutes).padStart(2, '0')}`
        citiesTimeData[city.city_name] = cityTime
    })

    return citiesTimeData
}
