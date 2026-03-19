import { useState, useCallback } from 'react'
import { WeatherData, ForecastItem, HourlyItem } from '../types/weather'
import { kelvinToCelsius } from '../utils/weather';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastItem[]>([])
  const [hourly, setHourly] = useState<HourlyItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = useCallback(async (city: string) => {
    if (!city.trim()) return
    setLoading(true)
    setError(null)

    try {
      // Current weather
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}`
      )
      if (!currentRes.ok) {
        if (currentRes.status === 404) throw new Error('City not found. Please check the spelling.')
        throw new Error('Failed to fetch weather data.')
      }
      const currentData = await currentRes.json()

      setWeather({
        city: currentData.name,
        country: currentData.sys.country,
        temp: kelvinToCelsius(currentData.main.temp),
        feelsLike: kelvinToCelsius(currentData.main.feels_like),
        humidity: currentData.main.humidity,
        windSpeed: currentData.wind.speed,
        windDirection: currentData.wind.deg || 0,
        visibility: currentData.visibility / 1000,
        pressure: currentData.main.pressure,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        sunrise: currentData.sys.sunrise,
        sunset: currentData.sys.sunset,
        timezone: currentData.timezone,
        dt: currentData.dt,
      })

      // Forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}`
      )
      const forecastData = await forecastRes.json()

      // Group by day for daily forecast
      const dailyMap: { [key: string]: any[] } = {}
      forecastData.list.forEach((item: any) => {
        const day = new Date(item.dt * 1000).toDateString()
        if (!dailyMap[day]) dailyMap[day] = []
        dailyMap[day].push(item)
      })

      const daily: ForecastItem[] = Object.entries(dailyMap)
        .slice(1, 6)
        .map(([, items]) => {
          const temps = items.map((i: any) => kelvinToCelsius(i.main.temp))
          const midday = items[Math.floor(items.length / 2)]
          return {
            dt: midday.dt,
            temp: { min: Math.min(...temps), max: Math.max(...temps) },
            description: midday.weather[0].description,
            icon: midday.weather[0].icon,
            humidity: midday.main.humidity,
            windSpeed: midday.wind.speed,
            pop: Math.round(Math.max(...items.map((i: any) => i.pop || 0)) * 100),
          }
        })
      setForecast(daily)

      // Hourly (next 8 — every 3 hours)
      const hourlyData: HourlyItem[] = forecastData.list.slice(0, 8).map((item: any) => ({
        dt: item.dt,
        temp: kelvinToCelsius(item.main.temp),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
        pop: Math.round((item.pop || 0) * 100),
      }))
      setHourly(hourlyData)

    } catch (err: any) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }, [])

const fetchByCoords = useCallback(async (lat: number, lon: number) => {
  setLoading(true)
  setError(null)
  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`),
      fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`)
    ])

    if (!currentRes.ok) throw new Error('Failed to fetch weather for your location.')

    const currentData = await currentRes.json()
    const forecastData = await forecastRes.json()

    setWeather({
      city: currentData.name,
      country: currentData.sys.country,
      temp: kelvinToCelsius(currentData.main.temp),
      feelsLike: kelvinToCelsius(currentData.main.feels_like),
      humidity: currentData.main.humidity,
      windSpeed: currentData.wind.speed,
      windDirection: currentData.wind.deg || 0,
      visibility: currentData.visibility / 1000,
      pressure: currentData.main.pressure,
      description: currentData.weather[0].description,
      icon: currentData.weather[0].icon,
      sunrise: currentData.sys.sunrise,
      sunset: currentData.sys.sunset,
      timezone: currentData.timezone,
      dt: currentData.dt,
    })

    // Daily forecast
    const dailyMap: { [key: string]: any[] } = {}
    forecastData.list.forEach((item: any) => {
      const day = new Date(item.dt * 1000).toDateString()
      if (!dailyMap[day]) dailyMap[day] = []
      dailyMap[day].push(item)
    })

    const daily: ForecastItem[] = Object.entries(dailyMap)
      .slice(1, 6)
      .map(([, items]) => {
        const temps = items.map((i: any) => kelvinToCelsius(i.main.temp))
        const midday = items[Math.floor(items.length / 2)]
        return {
          dt: midday.dt,
          temp: { min: Math.min(...temps), max: Math.max(...temps) },
          description: midday.weather[0].description,
          icon: midday.weather[0].icon,
          humidity: midday.main.humidity,
          windSpeed: midday.wind.speed,
          pop: Math.round(Math.max(...items.map((i: any) => i.pop || 0)) * 100),
        }
      })
    setForecast(daily)

    // Hourly
    const hourlyData: HourlyItem[] = forecastData.list.slice(0, 8).map((item: any) => ({
      dt: item.dt,
      temp: kelvinToCelsius(item.main.temp),
      icon: item.weather[0].icon,
      description: item.weather[0].description,
      pop: Math.round((item.pop || 0) * 100),
    }))
    setHourly(hourlyData)

} catch (err: any) {
  console.error('Location fetch error:', err)
  setError(`Error: ${err.message}`)
} finally {
  setLoading(false)
}
}, [])

  return { weather, forecast, hourly, loading, error, fetchWeather, fetchByCoords }
}
