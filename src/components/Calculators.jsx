import { useState } from 'react'

function Quantities() {
  const [people, setPeople] = useState(8)
  const [result, setResult] = useState(null)

  const calc = async () => {
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const res = await fetch(`${base}/api/calc/quantities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ people }),
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
      <h3 className="text-lg font-semibold text-white">Cuánta carne, carbón y bebestible</h3>
      <div className="mt-3 flex items-end gap-3">
        <div>
          <label className="block text-sm text-slate-300">Personas</label>
          <input type="number" min={1} value={people} onChange={(e) => setPeople(parseInt(e.target.value || '0'))} className="mt-1 w-32 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100" />
        </div>
        <button onClick={calc} className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500">Calcular</button>
      </div>
      {result && (
        <div className="mt-3 text-slate-200 space-y-1">
          <div>Total carne: <span className="font-semibold">{result.total_meat_kg} kg</span></div>
          <div>Carbón sugerido: <span className="font-semibold">{result.suggested_charcoal_kg} kg</span></div>
          <div>Bebestible sugerido: <span className="font-semibold">{result.suggested_drinks_l} L</span></div>
        </div>
      )}
    </div>
  )
}

function Splitter() {
  const [people, setPeople] = useState(4)
  const [amounts, setAmounts] = useState([''])
  const [result, setResult] = useState(null)

  const addRow = () => setAmounts((a) => [...a, ''])
  const update = (i, val) => setAmounts((a) => a.map((x, idx) => (idx === i ? val : x)))

  const calc = async () => {
    const nums = amounts.map((a) => parseFloat(a || '0')).filter((n) => !Number.isNaN(n))
    const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
    const res = await fetch(`${base}/api/calc/split`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ people, amounts: nums, rounding: 0 }),
    })
    const data = await res.json()
    setResult(data)
  }

  return (
    <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-4">
      <h3 className="text-lg font-semibold text-white">Dividir costos</h3>
      <div className="mt-3 grid gap-3">
        <div>
          <label className="block text-sm text-slate-300">Personas</label>
          <input type="number" min={1} value={people} onChange={(e) => setPeople(parseInt(e.target.value || '0'))} className="mt-1 w-32 rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100" />
        </div>
        <div>
          <label className="block text-sm text-slate-300">Montos a dividir (puedes agregar varios)</label>
          <div className="space-y-2">
            {amounts.map((v, i) => (
              <input key={i} value={v} onChange={(e) => update(i, e.target.value)} placeholder={`Monto ${i + 1}`} className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100" />
            ))}
          </div>
          <button onClick={addRow} className="mt-2 text-blue-300 hover:text-blue-200">+ Agregar monto</button>
        </div>
        <button onClick={calc} className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 w-max">Calcular división</button>
        {result && (
          <div className="text-slate-200 space-y-1">
            <div>Total: <span className="font-semibold">${'{'}result.total.toLocaleString('es-CL', { minimumFractionDigits: 0 }){'}'}</span></div>
            <div>Por persona: <span className="font-semibold">${'{'}result.per_person.toLocaleString('es-CL', { minimumFractionDigits: 0 }){'}'}</span></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Calculators() {
  return (
    <div className="grid md:grid-cols-2 gap-6 p-4">
      <Quantities />
      <Splitter />
    </div>
  )
}
