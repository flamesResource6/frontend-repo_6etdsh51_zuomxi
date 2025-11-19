import { useEffect, useState } from 'react'

export default function CutsList({ query, onSelect }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      setLoading(true)
      try {
        const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const url = query ? `${base}/api/cuts?q=${encodeURIComponent(query)}` : `${base}/api/cuts`
        const res = await fetch(url)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        setItems([])
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [query])

  if (loading) {
    return <div className="p-6 text-slate-300">Cargando cortes...</div>
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {items.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect?.(c)}
          className="text-left bg-slate-800/60 border border-slate-700 hover:border-blue-500/40 rounded-xl p-4 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-slate-100 font-semibold group-hover:text-white">{c.name}</h3>
          </div>
          <p className="text-slate-400 text-sm mt-1 line-clamp-3">{c.description}</p>
          {c.tags && (
            <div className="mt-3 flex flex-wrap gap-1">
              {c.tags.map((t, i) => (
                <span key={i} className="text-xs text-blue-300/80 bg-blue-500/10 px-2 py-0.5 rounded-full">{t}</span>
              ))}
            </div>
          )}
        </button>
      ))}
      {items.length === 0 && (
        <div className="text-slate-300 p-6">No se encontraron cortes.</div>
      )}
    </div>
  )
}
