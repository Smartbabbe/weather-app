export interface WeatherData {
  city: string
  country: string
  temp: number
  feelsLike: number
  humidity: number
  windSpeed: number
  windDirection: number
  visibility: number
  pressure: number
  description: string
  icon: string
  sunrise: number
  sunset: number
  timezone: number
  dt: number
}

export interface ForecastItem {
  dt: number
  temp: { min: number; max: number }
  description: string
  icon: string
  humidity: number
  windSpeed: number
  pop: number
}

export interface HourlyItem {
  dt: number
  temp: number
  icon: string
  description: string
  pop: number
}
