import { forwardRef } from 'react'
import type { LifeVisualization } from '../lib/life-weeks'
import { SideMarkers } from './SideMarkers'
import { YearRow } from './YearRow'

interface LifeWeeksGridProps {
  variant?: 'export' | 'screen'
  visualization: LifeVisualization
}

export const LifeWeeksGrid = forwardRef<HTMLElement, LifeWeeksGridProps>(
  function LifeWeeksGrid({ variant = 'screen', visualization }, ref) {
    return (
      <article
        className={`life-composition life-composition--${variant}`}
        ref={ref}
      >
        <header className="composition-header">
          <h2>MEMENTO MORI</h2>
        </header>

        <section
          className="life-grid"
          role="img"
          aria-label={`Grade com ${visualization.totalWeeks} semanas e marcacoes de 7 em 7 anos.`}
        >
          {visualization.rows.map((row) => (
            <YearRow key={row.yearIndex} row={row} />
          ))}

          <div className="life-grid__footer">
            <SideMarkers value={84} visible />
            <div className="life-grid__footer-line" />
          </div>
        </section>
      </article>
    )
  },
)
