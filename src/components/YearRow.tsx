import type { LifeYearRow } from '../lib/life-weeks'
import { SideMarkers } from './SideMarkers'
import { WeekCell } from './WeekCell'

interface YearRowProps {
  row: LifeYearRow
}

export function YearRow({ row }: YearRowProps) {
  return (
    <div
      className="year-row"
      data-current-year={row.isCurrentYear ? 'true' : 'false'}
    >
      <SideMarkers value={row.yearIndex} visible={row.isMilestone} />

      <div className="year-row__track">
        <div className="year-row__weeks">
          {row.weeks.map((cell) => (
            <WeekCell key={cell.absoluteIndex} cell={cell} />
          ))}
        </div>
      </div>
    </div>
  )
}
