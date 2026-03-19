import { HourlyItem } from '../types/weather'
import { formatHour, getWeatherEmoji } from '../utils/weather'

interface HourlyForecastProps {
  hourly: HourlyItem[]
  timezone: number
  unit: 'C' | 'F'
}

const displayTemp = (celsius: number, unit: 'C' | 'F') =>
  unit === 'C' ? celsius : Math.round(celsius * 9/5 + 32)

export default function HourlyForecast({ hourly, timezone, unit }: HourlyForecastProps) {
  return (
    <div className="glass rounded-2xl p-4 animate-fade-up">
      <p className="text-white/60 font-sans text-xs uppercase tracking-widest mb-4 px-2">
        Hourly Forecast
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {hourly.map((item, i) => (
          <div
            key={item.dt}
            className={`flex-shrink-0 flex flex-col items-center gap-2 px-4 py-3 rounded-xl transition-all ${
              i === 0 ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <p className="text-white/60 font-sans text-xs">
              {i === 0 ? 'Now' : formatHour(item.dt, timezone)}
            </p>
            <span className="text-xl">{getWeatherEmoji(item.icon)}</span>
            <p className="text-white font-sans text-sm font-medium">
              {displayTemp(item.temp, unit)}°
            </p>
            {item.pop > 0 && (
              <p className="text-blue-300 font-sans text-xs">
                {item.pop}%
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
