# Zephyr — Real-Time Weather App

> Search any city or use your location to get current 
> conditions, hourly forecasts, and a 5-day outlook — 
> with dynamic backgrounds that change with the weather.

🔗 **Live demo:** [https://weather-app-kappa-ebon-71.vercel.app/]

---

## Overview

Zephyr is a real-time weather application powered by the 
OpenWeatherMap API. The dynamic background system — which 
changes visually depending on current weather conditions — 
was the main design challenge and the feature I'm most 
proud of.

---

## Features

- **City search** — search any city worldwide instantly
- **Geolocation** — use your current location with 
  one click
- **Current conditions** — temperature, feels like, 
  humidity, wind speed, visibility
- **Hourly forecast** — next 24 hours in a scrollable 
  horizontal strip
- **5-day forecast** — daily high/low with weather icons
- **Dynamic backgrounds** — background changes based on 
  weather (sunny, cloudy, rainy, stormy, snow)
- **Unit toggle** — switch between Celsius and Fahrenheit
- **Fully responsive**

---

## Tech Stack

![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind-38BDF8?style=flat&logo=tailwind-css&logoColor=white)
![OpenWeatherMap](https://img.shields.io/badge/-OpenWeatherMap%20API-orange?style=flat)

---

## Getting Started

```bash
git clone https://github.com/Smartbabbe/weather-app
cd weather-app
npm install
```

Create a `.env` file in the root:

VITE_WEATHER_API_KEY=your_openweathermap_api_key

Get your free API key at [openweathermap.org](https://openweathermap.org/api)

```bash
npm run dev
```

---

## Key Implementation Details

- Geolocation via the browser's native navigator.geolocation API
- All API responses typed with TypeScript interfaces
- Weather condition codes mapped to background themes
- useEffect for API calls with proper dependency management and cleanup

---

## Contact

Built by **Esther Israel**
🌐 [Portfolio](https://personal-portfolio-site-ten-rouge.vercel.app) 
· 📩 estherisrael036@gmail.com 
· 🐦 [@thesmarrtDev](https://twitter.com/thesmarrtDev)
