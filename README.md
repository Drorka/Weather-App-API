# Weather App

This web app allows users to browse and search current weather for cities around the globe, as well as get their five-day forecasts.

The app uses OpeanWeather API.

The app is built with **Node.js, Express.js, REST API, PostgreSQL, React.js, Tailwind CSS**.

![cities-weather](https://github.com/Drorka/Weather-App/assets/116891360/7672144f-7816-47d3-818e-a44d7df20018)

![city-forecast](https://github.com/Drorka/Weather-App/assets/116891360/f6701985-d716-46ab-a5dc-d8d4dfcd7960)

## Installation

1. Clone the repository

```
git clone https://github.com/Drorka/Weather-App
```

2. Access the backend, install dependencies and start the server

```
cd backend
npm i
npm run dev
```

3. Create an `.env` file in the root directory of the backend folder and insert your API key as follows:

```
API_KEY=your_api_key_here
```

4. Build and start the Docker container

```
docker-compose up
```

5. Access the frontend and repeat the process

```
cd frontend
npm i
npm start
```

6. Access the application at http://localhost:3000.
