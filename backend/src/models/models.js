const { DataTypes } = require("sequelize")
const sequelize = require("./sequelizer")

const City = sequelize.define("City", {
    city_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
    },
    city_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city_timezone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city_latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    city_longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    temp: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
    },
})

const Forecast = sequelize.define("Forecast", {
    forecast_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    dt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    temp: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    temp_min: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    temp_max: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    humidity: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
    },
})

City.hasMany(Forecast, { foreignKey: "city_id" })
Forecast.belongsTo(City, { foreignKey: "city_id" })

module.exports = { City, Forecast }
