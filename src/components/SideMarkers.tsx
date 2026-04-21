interface SideMarkersProps {
  value: number
  visible: boolean
}

export function SideMarkers({ value, visible }: SideMarkersProps) {
  return (
    <div
      className="year-row__marker"
      data-milestone={visible ? 'true' : 'false'}
      data-testid={visible ? `side-marker-${value}` : undefined}
      aria-hidden={visible ? undefined : 'true'}
    >
      <span>{visible ? value : ''}</span>
    </div>
  )
}
