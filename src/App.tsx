import { startTransition, useState, type FormEvent } from 'react'
import { format } from 'date-fns'
import './App.css'
import { BirthDateForm } from './components/BirthDateForm'
import { ExportButton } from './components/ExportButton'
import { MobileWallpaperFrame } from './components/MobileWallpaperFrame'
import { CONCEPT_SECTIONS } from './lib/concepts'
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

  const handleReturnHome = () => {
    setVisualization(null)
    setBirthDateInput('')
    setErrorMessage('')

    const scrollToTop = () => {
      document
        .querySelector('.site-masthead')
        ?.scrollIntoView?.({ behavior: 'smooth', block: 'start' })
    }

    if (typeof requestAnimationFrame === 'function') {
      requestAnimationFrame(scrollToTop)
      return
    }

    scrollToTop()
  }

  const exportFileName = visualization
    ? `memento-mori-${format(visualization.birthDate, 'yyyy-MM-dd')}`
    : 'memento-mori'

  return (
    <>
      <header className="site-masthead" aria-label="Identidade do projeto">
        <svg
          className="brand-mark"
          aria-hidden="true"
          viewBox="0 0 24 32"
          focusable="false"
        >
          <path d="M5 3h14M5 29h14M7 3c0 6 10 7 10 13S7 23 7 29M17 3c0 6-10 7-10 13s10 7 10 13" />
        </svg>
        <span className="brand-wordmark">Memento Mori</span>
      </header>

      <main
        className={`page-shell ${visualization ? 'page-shell--result' : 'page-shell--initial'}`}
      >
        <section className="hero-panel">
          <h1>Uma visualização estoica do tempo.</h1>
          <p className="intro">
            Insira sua data de nascimento para confrontar a finitude de seus
            dias em uma grade tangível.
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
                  <p className="result-toolbar__label">Composição gerada</p>
                  <p className="result-toolbar__meta">
                    {visualization.weeksLived} semanas completas vividas até{' '}
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

              <div className="result-return">
                <button
                  className="button-secondary"
                  type="button"
                  onClick={handleReturnHome}
                >
                  Voltar
                </button>
              </div>

              <section
                className="concept-sections"
                aria-label="Leituras conceituais"
              >
                {CONCEPT_SECTIONS.map((section) => (
                  <article
                    key={section.id}
                    className="concept-card"
                    id={section.id}
                  >
                    <h2>{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </article>
                ))}
              </section>
            </section>
          ) : (
            <section className="empty-state" aria-live="polite">
              <div className="editorial-rule" aria-hidden="true">
                <span />
              </div>
            </section>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <p>
          "Você poderia deixar a vida agora mesmo. Deixe que isso determine o
          que você faz, diz e pensa." — Marco Aurélio
        </p>
        <small>Memento Mori. Reflexões estoicas sobre permanência.</small>
      </footer>
    </>
  )
}

export default App
