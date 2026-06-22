import { forwardRef } from 'react'
import type { LifeVisualization } from '../lib/life-weeks'
import { SideMarkers } from './SideMarkers'
import { YearRow } from './YearRow'

interface LifeWeeksGridProps {
  quote: string
  variant?: 'screen' | 'widget'
  visualization: LifeVisualization
}

export const LifeWeeksGrid = forwardRef<HTMLElement, LifeWeeksGridProps>(
  function LifeWeeksGrid({ quote, variant = 'screen', visualization }, ref) {
    const birthYear = visualization.birthDate.getFullYear()
    const quoteLength = quote.length
    const quoteScale =
      quoteLength > 58 ? 'long' : quoteLength > 44 ? 'medium' : 'short'
    const shouldAnchorQuote = variant === 'widget'

    return (
      <article
        className={`life-composition life-composition--${variant}`}
        ref={ref}
      >
        <header className="composition-header">
          <h2>MEMENTO MORI</h2>
          {shouldAnchorQuote ? null : (
            <p className="composition-quote" data-testid="composition-quote">
              {quote}
            </p>
          )}
        </header>

        <section
          className="life-grid"
          role="img"
          aria-label={`Grade com ${visualization.totalWeeks} semanas e marcações de 7 em 7 anos.`}
        >
          {visualization.rows.map((row) => (
            <YearRow
              key={row.yearIndex}
              calendarYear={birthYear + row.yearIndex}
              row={row}
            />
          ))}

          <div className="life-grid__footer">
            <SideMarkers side="left" value={84} visible />
            <div className="life-grid__footer-line" />
            <SideMarkers
              side="right"
              testIdPrefix="calendar-marker"
              value={birthYear + 84}
              visible
            />
          </div>
        </section>

        {shouldAnchorQuote ? (
          <p
            className="composition-quote composition-quote--lockscreen"
            data-quote-scale={quoteScale}
            data-testid="composition-quote"
          >
            {quote}
          </p>
        ) : null}
      </article>
    )
  },
)
