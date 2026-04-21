import { type CSSProperties, type RefObject } from 'react'
import type { LifeVisualization } from '../lib/life-weeks'
import { MOBILE_WIDGET_PRESET } from '../lib/mobile-wallpaper'
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
  const frameStyle: CSSProperties = {
    width: `${MOBILE_WIDGET_PRESET.frameWidth}px`,
    height: `${MOBILE_WIDGET_PRESET.frameHeight}px`,
    boxSizing: 'border-box',
    paddingTop: `${Math.round(MOBILE_WIDGET_PRESET.frameHeight * MOBILE_WIDGET_PRESET.topInsetRatio)}px`,
    paddingRight: `${Math.round(MOBILE_WIDGET_PRESET.frameWidth * MOBILE_WIDGET_PRESET.sideInsetRatio)}px`,
    paddingBottom: `${Math.round(MOBILE_WIDGET_PRESET.frameHeight * MOBILE_WIDGET_PRESET.bottomInsetRatio)}px`,
    paddingLeft: `${Math.round(MOBILE_WIDGET_PRESET.frameWidth * MOBILE_WIDGET_PRESET.sideInsetRatio)}px`,
    ['--widget-marker-column' as string]: `${MOBILE_WIDGET_PRESET.markerColumn}px`,
    ['--widget-row-gap' as string]: `${MOBILE_WIDGET_PRESET.rowGap}px`,
    ['--widget-cell-gap' as string]: `${MOBILE_WIDGET_PRESET.cellGap}px`,
    ['--widget-content-scale' as string]: `${MOBILE_WIDGET_PRESET.contentScale}`,
    ['--widget-content-offset-y' as string]: `${MOBILE_WIDGET_PRESET.contentOffsetY}px`,
    ['--widget-marker-font-size' as string]: `${MOBILE_WIDGET_PRESET.markerFontSize}px`,
    ['--widget-marker-padding-right' as string]: `${MOBILE_WIDGET_PRESET.markerPaddingRight}px`,
    ['--widget-safe-bottom' as string]: `${Math.round(MOBILE_WIDGET_PRESET.frameHeight * MOBILE_WIDGET_PRESET.safeBottomRatio)}px`,
    ['--widget-safe-top' as string]: `${Math.round(MOBILE_WIDGET_PRESET.frameHeight * MOBILE_WIDGET_PRESET.safeTopRatio)}px`,
    ['--widget-title-font-size' as string]: `${MOBILE_WIDGET_PRESET.titleFontSize}px`,
    ['--widget-title-letter-spacing' as string]: `${MOBILE_WIDGET_PRESET.titleLetterSpacing}px`,
    ['--widget-quote-font-size' as string]: `${MOBILE_WIDGET_PRESET.quoteFontSize}px`,
    ['--widget-quote-max-width' as string]: `${MOBILE_WIDGET_PRESET.quoteMaxWidth}px`,
    ['--widget-quote-margin-top' as string]: `${MOBILE_WIDGET_PRESET.quoteMarginTop}px`,
    ['--widget-quote-margin-bottom' as string]: `${MOBILE_WIDGET_PRESET.quoteMarginBottom}px`,
    ['--widget-week-cell-aspect' as string]: `${MOBILE_WIDGET_PRESET.weekCellAspectRatio}`,
  }

  return (
    <div
      ref={frameRef}
      className="wallpaper-frame"
      data-export-stage={MOBILE_WIDGET_PRESET.id}
      style={frameStyle}
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
