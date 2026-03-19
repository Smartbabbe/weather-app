import { useState, useRef } from 'react'

interface SearchBarProps {
  onSearch: (city: string) => void
  onLocate: () => void
  loading: boolean
}

const popularCities = ['Lagos', 'London', 'New York', 'Tokyo', 'Paris', 'Dubai', 'Sydney', 'Toronto']

export default function SearchBar({ onSearch, onLocate, loading }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = popularCities.filter(c =>
    c.toLowerCase().startsWith(query.toLowerCase()) && query.length > 0
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
      setShowSuggestions(false)
    }
  }

  const handleSelect = (city: string) => {
    setQuery(city)
    onSearch(city)
    setShowSuggestions(false)
  }

  return (
    <div className="relative w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            {/* Search icon */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setShowSuggestions(true) }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
              placeholder="Search city..."
              className="w-full pl-11 pr-4 py-3.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl text-white placeholder-white/50 font-sans text-sm focus:outline-none focus:border-white/50 focus:bg-white/20 transition-all"
            />
          </div>

          {/* Locate button */}
          <button
            type="button"
            onClick={onLocate}
            disabled={loading}
            title="Use my location"
            className="px-4 py-3.5 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl text-white hover:bg-white/25 transition-all disabled:opacity-50"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
              <circle cx="12" cy="12" r="10" strokeOpacity="0.3" />
            </svg>
          </button>

          {/* Search button */}
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="px-5 py-3.5 bg-white/90 text-slate-800 rounded-2xl font-sans text-sm font-semibold hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
              </svg>
            ) : 'Search'}
          </button>
        </div>
      </form>

      {/* Suggestions */}
      {showSuggestions && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/20 backdrop-blur-xl border border-white/25 rounded-2xl overflow-hidden z-50">
          {filtered.map(city => (
            <button
              key={city}
              onClick={() => handleSelect(city)}
              className="w-full text-left px-4 py-3 text-white text-sm font-sans hover:bg-white/20 transition-colors flex items-center gap-3"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
