import type { WeekCellData } from '../lib/life-weeks'

interface WeekCellProps {
  cell: WeekCellData
}

export function WeekCell({ cell }: WeekCellProps) {
  return (
    <span
      className="week-cell"
      data-current-week={cell.isCurrentWeek ? 'true' : 'false'}
      data-state={cell.state}
      data-testid="week-cell"
      aria-hidden="true"
    />
  )
}
