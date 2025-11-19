import { useEffect, useState } from 'react'

export default function CutDetail({ cut, onBack }) {
  const [prices, setPrices] = useState([])
  const [recipes, setRecipes] = useState([])
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [pRes, rRes] = await Promise.all([
          fetch(`${base}/api/cuts/${cut.id}/prices`),
          fetch(`${base}/api/cuts/${cut.id}/recipes`),
        ])
        const p = await pRes.json()
        const r = await rRes.json()
        setPrices(p)
        setRecipes(r)
      } catch (e) {
        setPrices([])
        setRecipes([])
      }
    }
    if (cut?.id) fetchAll()
  }, [cut?.id])

  return (
    <div className="p-4">
      <button onClick={onBack} className="mb-4 text-blue-300 hover:text-blue-200">← Volver</button>
      <h2 className="text-2xl font-bold text-white">{cut.name}</h2>
      <p className="text-slate-300 mt-1">{cut.description}</p>

      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-white">Precios por supermercado</h3>
          <ul className="mt-3 divide-y divide-slate-700/60">
            {prices.map((p, i) => (
              <li key={i} className="py-2 flex items-center justify-between text-slate-200">
                <span>{p.supermarket}</span>
                <span className="font-mono">${'{'}p.price_per_kg.toLocaleString('es-CL'){'}'} / kg</span>
              </li>
            ))}
            {prices.length === 0 && <li className="py-2 text-slate-400">Sin datos</li>}
          </ul>
        </div>

        <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
          <h3 className="text-lg font-semibold text-white">Preparaciones sugeridas</h3>
          <div className="mt-3 space-y-4">
            {recipes.map((r, i) => (
              <div key={i} className="border border-slate-700/60 rounded-lg p-3">
                <div className="font-semibold text-slate-100">{r.title}</div>
                {r.prep && <div className="text-slate-300 text-sm mt-1">{r.prep}</div>}
                <div className="text-slate-400 text-xs mt-1">Tiempo aprox: {r.cook_time_min ? `${r.cook_time_min} min` : '—'} • Fuego: {r.grill_temp || '—'}</div>
                {Array.isArray(r.steps) && r.steps.length > 0 && (
                  <ol className="list-decimal list-inside text-slate-300 text-sm mt-2 space-y-1">
                    {r.steps.map((s, k) => <li key={k}>{s}</li>)}
                  </ol>
                )}
              </div>
            ))}
            {recipes.length === 0 && <div className="text-slate-400">Sin recetas</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
