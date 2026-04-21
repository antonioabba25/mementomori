import { type RefObject } from 'react'
import type { LifeVisualization } from '../lib/life-weeks'
import {
  MOBILE_WIDGET_PRESET,
  getMobileWallpaperFrameStyle,
} from '../lib/mobile-wallpaper'
import { LifeWeeksGrid } from './LifeWeeksGrid'

interface MobileWallpaperFrameProps {
  frameRef?: RefObject<HTMLDivElement | null>
  quote: string
  visualization: LifeVisualization
}

export function MobileWallpaperFrame({
  frameRef,
  quote,
  visualization,
}: MobileWallpaperFrameProps) {
  return (
    <div
      ref={frameRef}
      className="wallpaper-frame"
      data-export-stage={MOBILE_WIDGET_PRESET.id}
      style={getMobileWallpaperFrameStyle()}
    >
      <div className="wallpaper-frame__safe-area">
        <div className="wallpaper-frame__content-frame">
          <LifeWeeksGrid
            quote={quote}
            variant="widget"
            visualization={visualization}
          />
        </div>
      </div>
    </div>
  )
}
