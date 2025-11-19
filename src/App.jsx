import { useState } from 'react'
import Header from './components/Header'
import CutsList from './components/CutsList'
import CutDetail from './components/CutDetail'
import Calculators from './components/Calculators'

function App() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />
      <Header onSearch={(q) => { setQuery(q); setSelected(null) }} />
      <main className="relative max-w-5xl mx-auto px-4 py-6">
        {!selected ? (
          <>
            <h2 className="text-xl font-semibold mb-2">Cortes de carne en Chile</h2>
            <p className="text-slate-300 mb-4">Busca un corte y compara precios entre supermercados.</p>
            <CutsList query={query} onSelect={setSelected} />
          </>
        ) : (
          <CutDetail cut={selected} onBack={() => setSelected(null)} />
        )}

        <section className="mt-10">
          <h2 className="text-xl font-semibold mb-2">Herramientas para tu asado</h2>
          <p className="text-slate-300 mb-4">Calculadoras útiles para planificar.</p>
          <Calculators />
        </section>
      </main>
    </div>
  )
}

export default App
