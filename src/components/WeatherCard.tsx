import { WeatherData } from '../types/weather'
import { formatTime, getWindDirection, mpsToKph, getWeatherEmoji } from '../utils/weather'

interface WeatherCardProps {
  weather: WeatherData
  unit: 'C' | 'F'
  onToggleUnit: () => void
}

const displayTemp = (celsius: number, unit: 'C' | 'F') =>
  unit === 'C' ? celsius : Math.round(celsius * 9/5 + 32)

export default function WeatherCard({ weather, unit, onToggleUnit }: WeatherCardProps) {
  const now = new Date((weather.dt + weather.timezone) * 1000)
  const dateStr = now.toUTCString().slice(0, 16)

  return (
    <div className="animate-fade-up">
      {/* Main temp display */}
      <div className="text-center mb-8">
        <div className="text-8xl mb-3">{getWeatherEmoji(weather.icon)}</div>

        <div className="flex items-start justify-center gap-2">
          <span className="text-white font-sans font-light text-shadow" style={{ fontSize: 'clamp(5rem, 15vw, 9rem)', lineHeight: 1 }}>
            {displayTemp(weather.temp, unit)}
          </span>
          <button
            onClick={onToggleUnit}
            className="text-white/60 hover:text-white transition-colors mt-4 font-sans text-2xl font-light"
          >
            °{unit}
          </button>
        </div>

        <p className="text-white/80 text-xl font-sans font-light capitalize mt-1 text-shadow">
          {weather.description}
        </p>
        <p className="text-white/50 text-sm font-sans mt-2">{dateStr}</p>
      </div>

      {/* City */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          <h2 className="text-white font-sans text-xl font-medium text-shadow">
            {weather.city}, {weather.country}
          </h2>
        </div>
        <p className="text-white/50 font-sans text-sm mt-1">
          Feels like {displayTemp(weather.feelsLike, unit)}°{unit}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
              </svg>
            ),
            label: 'Humidity',
            value: `${weather.humidity}%`,
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
              </svg>
            ),
            label: 'Wind',
            value: `${mpsToKph(weather.windSpeed)} km/h ${getWindDirection(weather.windDirection)}`,
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
            ),
            label: 'Visibility',
            value: `${weather.visibility.toFixed(1)} km`,
          },
          {
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 9a3 3 0 100 6 3 3 0 000-6zM3 12h1m8-8v1m8 7h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m-12.1 12l.7-.7m12.1.7l-.7-.7" />
              </svg>
            ),
            label: 'Pressure',
            value: `${weather.pressure} hPa`,
          },
        ].map(stat => (
          <div key={stat.label} className="glass rounded-2xl p-4 text-center">
            <div className="text-white/60 flex justify-center mb-2">{stat.icon}</div>
            <p className="text-white font-sans text-sm font-medium">{stat.value}</p>
            <p className="text-white/50 font-sans text-xs mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Sunrise / Sunset */}
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl">🌅</span>
          <div>
            <p className="text-white/50 font-sans text-xs">Sunrise</p>
            <p className="text-white font-sans text-sm font-medium font-mono">
              {formatTime(weather.sunrise, weather.timezone)}
            </p>
          </div>
        </div>
        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl">🌇</span>
          <div>
            <p className="text-white/50 font-sans text-xs">Sunset</p>
            <p className="text-white font-sans text-sm font-medium font-mono">
              {formatTime(weather.sunset, weather.timezone)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
