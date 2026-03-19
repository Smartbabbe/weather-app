import { ForecastItem } from '../types/weather'
import { formatDay, getWeatherEmoji, mpsToKph } from '../utils/weather'

interface DailyForecastProps {
  forecast: ForecastItem[]
  unit: 'C' | 'F'
}

const displayTemp = (celsius: number, unit: 'C' | 'F') =>
  unit === 'C' ? celsius : Math.round(celsius * 9/5 + 32)

export default function DailyForecast({ forecast, unit }: DailyForecastProps) {
  return (
    <div className="glass rounded-2xl p-4 animate-fade-up">
      <p className="text-white/60 font-sans text-xs uppercase tracking-widest mb-4 px-2">
        5-Day Forecast
      </p>
      <div className="space-y-1">
        {forecast.map((item, i) => (
          <div
            key={item.dt}
            className="flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/10 transition-colors"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <p className="text-white font-sans text-sm w-10">
              {formatDay(item.dt)}
            </p>
            <div className="flex items-center gap-2 flex-1 justify-center">
              <span className="text-lg">{getWeatherEmoji(item.icon)}</span>
              {item.pop > 0 && (
                <span className="text-blue-300 font-sans text-xs">{item.pop}%</span>
              )}
            </div>
            <div className="flex items-center gap-2 font-mono text-sm">
              <span className="text-white/50">{displayTemp(item.temp.min, unit)}°</span>
              <div className="w-16 h-1 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-blue-400 to-orange-400" style={{ width: '70%' }} />
              </div>
              <span className="text-white">{displayTemp(item.temp.max, unit)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
