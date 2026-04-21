import { startTransition, useRef, useState, type FormEvent } from 'react'
import { format } from 'date-fns'
import './App.css'
import { BirthDateForm } from './components/BirthDateForm'
import { ExportButton } from './components/ExportButton'
import { LifeWeeksGrid } from './components/LifeWeeksGrid'
import {
  type LifeVisualization,
  createLifeVisualization,
} from './lib/life-weeks'

function App() {
  const [birthDateInput, setBirthDateInput] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [visualization, setVisualization] = useState<LifeVisualization | null>(null)
  const exportTargetRef = useRef<HTMLElement | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const result = createLifeVisualization(birthDateInput, new Date())

    if (!result.ok) {
      setErrorMessage(result.error)
      return
    }

    setErrorMessage('')
    startTransition(() => {
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
        <h1>Semanas de uma Vida</h1>
        <p className="intro">
          Uma visualizacao silenciosa do tempo vivido, organizada em semanas ate
          o horizonte dos 84 anos.
        </p>
        <p className="quote">
          A vida e composta de semanas; a virtude esta em como se vive cada
          uma.
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
                visualization={visualization}
              />
            </div>

            <div className="preview-scroll">
              <LifeWeeksGrid ref={exportTargetRef} visualization={visualization} />
            </div>
          </section>
        ) : (
          <section className="empty-state" aria-live="polite">
            <p>
              Informe a data de nascimento e gere a composicao para revelar a
              extensao visual das semanas.
            </p>
          </section>
        )}
      </section>
    </main>
  )
}

export default App
