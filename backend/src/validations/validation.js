function validateCity(city) {
    if (city.length === 0) {
        throw new Error("City is required")
    }
}

module.exports = {
    validateCity,
}
