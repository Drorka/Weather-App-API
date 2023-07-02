const express = require("express")
const cors = require("cors")
const weatherRoutes = require("./routes/weather.routes")
const sequelize = require("./models/sequelizer")
const cronJob = require("./utils/cron.job")

const app = express()

app.use(express.json())

const corsOptions = {
    origin: ["http://localhost:8080", "http://localhost:3000"],
}

app.use(cors(corsOptions))

app.use("/api", weatherRoutes)

async function syncDatabase() {
    try {
        await sequelize.sync()
        console.info("Database synced successfully")
    } catch (error) {
        console.error("An error occurred while syncing the database:", error)
    }
}

let server
async function startServer() {
    try {
        await syncDatabase()
        server = app.listen(3030, () => {
            console.info("Server started on port 3030")
        })
        cronJob.start()
    } catch (error) {
        console.error("An error occurred while starting the server:", error)
        process.exit(1)
    }
}

startServer()

process.on("SIGINT", () => {
    app.close(() => {
        console.info("Server stopped")
        cronJob.stop()
        process.exit(0)
    })
})

module.exports = { app, server }
