export const kelvinToCelsius = (k: number) => Math.round(k - 273.15)
export const kelvinToFahrenheit = (k: number) => Math.round((k - 273.15) * 9/5 + 32)
export const mpsToKph = (mps: number) => Math.round(mps * 3.6)
export const mpsToMph = (mps: number) => Math.round(mps * 2.237)

export const formatTime = (unix: number, timezone: number) => {
  const date = new Date((unix + timezone) * 1000)
  return date.toUTCString().slice(17, 22)
}

export const formatDay = (unix: number) => {
  const date = new Date(unix * 1000)
  return date.toLocaleDateString('en-US', { weekday: 'short' })
}

export const formatHour = (unix: number, timezone: number) => {
  const date = new Date((unix + timezone) * 1000)
  const hours = date.getUTCHours()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const h = hours % 12 || 12
  return `${h}${ampm}`
}

export const getWindDirection = (deg: number) => {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  return dirs[Math.round(deg / 45) % 8]
}

export const getWeatherGradient = (icon: string, isDark: boolean) => {
  const code = icon.slice(0, 2)
  const isNight = icon.endsWith('n')

  if (isNight) return isDark
    ? 'from-slate-900 via-indigo-950 to-slate-900'
    : 'from-indigo-900 via-slate-800 to-indigo-900'

  switch (code) {
    case '01': return isDark // Clear sky
      ? 'from-sky-400 via-blue-500 to-indigo-600'
      : 'from-sky-300 via-blue-400 to-indigo-500'
    case '02': return isDark // Few clouds
      ? 'from-sky-500 via-blue-600 to-slate-700'
      : 'from-sky-400 via-blue-500 to-slate-600'
    case '03': // Scattered clouds
    case '04': return isDark // Broken clouds
      ? 'from-slate-600 via-slate-700 to-slate-800'
      : 'from-slate-400 via-slate-500 to-slate-600'
    case '09': // Shower rain
    case '10': return isDark // Rain
      ? 'from-slate-700 via-blue-900 to-slate-900'
      : 'from-slate-500 via-blue-700 to-slate-800'
    case '11': return isDark // Thunderstorm
      ? 'from-slate-900 via-purple-900 to-slate-900'
      : 'from-slate-700 via-purple-800 to-slate-900'
    case '13': return isDark // Snow
      ? 'from-slate-300 via-blue-200 to-slate-300'
      : 'from-slate-200 via-blue-100 to-slate-200'
    case '50': return isDark // Mist
      ? 'from-slate-500 via-slate-600 to-slate-700'
      : 'from-slate-300 via-slate-400 to-slate-500'
    default: return isDark
      ? 'from-sky-500 via-blue-600 to-indigo-700'
      : 'from-sky-400 via-blue-500 to-indigo-600'
  }
}

export const getWeatherEmoji = (icon: string) => {
  const code = icon.slice(0, 2)
  const isNight = icon.endsWith('n')
  switch (code) {
    case '01': return isNight ? '🌙' : '☀️'
    case '02': return isNight ? '🌤️' : '🌤️'
    case '03': return '🌥️'
    case '04': return '☁️'
    case '09': return '🌧️'
    case '10': return isNight ? '🌧️' : '🌦️'
    case '11': return '⛈️'
    case '13': return '❄️'
    case '50': return '🌫️'
    default: return '🌡️'
  }
}
