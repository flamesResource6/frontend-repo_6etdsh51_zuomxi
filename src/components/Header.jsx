import { useState } from 'react'

export default function Header({ onSearch }) {
  const [term, setTerm] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch?.(term.trim())
  }

  return (
    <header className="sticky top-0 z-10 backdrop-blur bg-slate-900/70 border-b border-blue-500/20">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
        <span className="text-xl font-bold text-white">Parrilla Chile</span>
        <form onSubmit={submit} className="ml-auto flex items-center gap-2 w-full max-w-md">
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Buscar corte (ej: lomo, tira, picanha)"
            className="flex-1 rounded-lg bg-slate-800/80 border border-slate-700 px-3 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-colors">Buscar</button>
        </form>
      </div>
    </header>
  )
}
