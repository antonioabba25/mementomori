import { startTransition, useState, type FormEvent } from 'react'
import { format } from 'date-fns'
import './App.css'
import { BirthDateForm } from './components/BirthDateForm'
import { ExportButton } from './components/ExportButton'
import { MobileWallpaperFrame } from './components/MobileWallpaperFrame'
import {
  type LifeVisualization,
  createLifeVisualization,
} from './lib/life-weeks'
import { pickStoicQuote } from './lib/stoic-quotes'

function App() {
  const [birthDateInput, setBirthDateInput] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedQuote, setSelectedQuote] = useState(pickStoicQuote)
  const [visualization, setVisualization] = useState<LifeVisualization | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = createLifeVisualization(birthDateInput, new Date())

    if (!result.ok) {
      setErrorMessage(result.error)
      return
    }

    setErrorMessage('')
    startTransition(() => {
      setSelectedQuote(pickStoicQuote())
      setVisualization(result.visualization)
    })
  }

  const handleInputChange = (value: string) => {
    setBirthDateInput(value)

    if (errorMessage) {
      setErrorMessage('')
    }
  }

  const exportFileName = visualization
    ? `memento-mori-${format(visualization.birthDate, 'yyyy-MM-dd')}`
    : 'memento-mori'

  return (
    <main className="page-shell">
      <section className="hero-panel">
        <p className="eyebrow">Memento Mori</p>
        <h1>Uma visualizacao estoica do tempo.</h1>
        <p className="intro">
          Transforme uma data de nascimento em uma arquitetura visivel da vida:
          84 anos, 4.368 semanas e uma leitura mais honesta do presente.
        </p>
        <p className="quote">
          Nao para assustar. Para esclarecer.
        </p>
      </section>

      <section className="workspace">
        <BirthDateForm
          errorMessage={errorMessage}
          inputValue={birthDateInput}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />

        {visualization ? (
          <section className="result-panel" aria-live="polite">
            <div className="result-toolbar">
              <div>
                <p className="result-toolbar__label">Composicao gerada</p>
                <p className="result-toolbar__meta">
                  {visualization.weeksLived} semanas completas vividas ate{' '}
                  {visualization.generatedAtLabel}
                </p>
              </div>
              <ExportButton
                downloadName={exportFileName}
                quote={selectedQuote}
                visualization={visualization}
              />
            </div>

            <div className="wallpaper-preview">
              <div className="wallpaper-preview__viewport">
                <div className="wallpaper-preview__scale">
                  <MobileWallpaperFrame
                    quote={selectedQuote}
                    visualization={visualization}
                  />
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="empty-state" aria-live="polite">
            <p>
              Informe a data de nascimento para gerar o wallpaper final:
              titulo, frase aleatoria e grade de semanas em uma unica
              composicao contemplativa.
            </p>
          </section>
        )}
      </section>
    </main>
  )
}

export default App
