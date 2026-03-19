import { useState, useEffect } from "react";
import { useWeather } from "./hooks/useWeather";
import { getWeatherGradient } from "./utils/weather";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";

export default function App() {
  const {
    weather,
    forecast,
    hourly,
    loading,
    error,
    fetchWeather,
    fetchByCoords,
  } = useWeather();
  const [unit, setUnit] = useState<"C" | "F">("C");
  const [darkMode] = useState(true);

  // Load default city on mount
  useEffect(() => {
    fetchWeather("Lagos");
  }, []);

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => fetchByCoords(pos.coords.latitude, pos.coords.longitude),
      (err) => {
        if (err.code === 1) {
          alert(
            "Location access denied. Please allow location access in your browser settings.",
          );
        } else {
          fetchWeather("Lagos");
        }
      },
    );
  };

  const gradient = weather
    ? getWeatherGradient(weather.icon, darkMode)
    : "from-sky-500 via-blue-600 to-indigo-700";

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${gradient} transition-all duration-1000`}
    >
      {/* Ambient orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-white/5 blur-3xl animate-pulse-slow"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌤️</span>
              <h1 className="text-white font-sans font-semibold text-lg tracking-tight">
                Zephyr
              </h1>
            </div>
            <button
              onClick={() => setUnit((u) => (u === "C" ? "F" : "C"))}
              className="glass px-4 py-2 rounded-xl text-white font-sans text-sm font-medium hover:bg-white/20 transition-all"
            >
              °{unit === "C" ? "F" : "C"}
            </button>
          </div>

          {/* Search */}
          <div className="mb-8">
            <SearchBar
              onSearch={fetchWeather}
              onLocate={handleLocate}
              loading={loading}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="glass rounded-2xl p-4 mb-6 border border-red-400/30 bg-red-500/10">
              <div className="flex items-center gap-3">
                <span className="text-xl">⚠️</span>
                <p className="text-white font-sans text-sm">{error}</p>
              </div>
            </div>
          )}

          {/* Loading skeleton */}
          {loading && !weather && (
            <div className="space-y-4 animate-pulse">
              <div className="glass rounded-2xl h-64 opacity-50" />
              <div className="glass rounded-2xl h-32 opacity-40" />
              <div className="glass rounded-2xl h-48 opacity-30" />
            </div>
          )}

          {/* Weather content */}
          {weather && !loading && (
            <div className="space-y-4">
              <WeatherCard
                weather={weather}
                unit={unit}
                onToggleUnit={() => setUnit((u) => (u === "C" ? "F" : "C"))}
              />
              {hourly.length > 0 && (
                <HourlyForecast
                  hourly={hourly}
                  timezone={weather.timezone}
                  unit={unit}
                />
              )}
              {forecast.length > 0 && (
                <DailyForecast forecast={forecast} unit={unit} />
              )}
            </div>
          )}

          {/* Empty state */}
          {!weather && !loading && !error && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🌍</div>
              <p className="text-white/70 font-sans text-lg">
                Search for a city to get started
              </p>
              <p className="text-white/40 font-sans text-sm mt-2">
                or use your current location
              </p>
            </div>
          )}

          {/* Footer */}
          <p className="text-center text-white/30 font-sans text-xs mt-8">
            Powered by OpenWeatherMap
          </p>
        </div>
      </div>
    </div>
  );
}
