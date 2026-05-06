interface SideMarkersProps {
  side?: 'left' | 'right'
  testIdPrefix?: string
  value: number
  visible: boolean
}

export function SideMarkers({
  side = 'left',
  testIdPrefix = 'side-marker',
  value,
  visible,
}: SideMarkersProps) {
  return (
    <div
      className={`year-row__marker year-row__marker--${side}`}
      data-milestone={visible ? 'true' : 'false'}
      data-testid={visible ? `${testIdPrefix}-${value}` : undefined}
      aria-hidden={visible ? undefined : 'true'}
    >
      <span>{visible ? value : ''}</span>
    </div>
  )
}
