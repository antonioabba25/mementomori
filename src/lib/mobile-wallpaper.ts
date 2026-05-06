import type { CSSProperties } from 'react'

export interface MobileWallpaperPreset {
  bottomInsetRatio: number
  cellGap: number
  contentOffsetY: number
  contentScale: number
  fileSuffix: string
  frameHeight: number
  frameWidth: number
  id: string
  markerColumn: number
  markerFontSize: number
  markerPaddingRight: number
  pixelRatio: number
  quoteFontSize: number
  quoteMarginBottom: number
  quoteMarginTop: number
  quoteMaxWidth: number
  rowGap: number
  safeBottomRatio: number
  safeTopRatio: number
  sideInsetRatio: number
  titleFontSize: number
  titleLetterSpacing: number
  topInsetRatio: number
  weekCellAspectRatio: number
}

export const MOBILE_WIDGET_PRESET: MobileWallpaperPreset = {
  id: 'iphone16-widget-90',
  fileSuffix: 'widget-90',
  frameWidth: 1320,
  frameHeight: 2868,
  pixelRatio: 2,
  sideInsetRatio: 0.06,
  topInsetRatio: 0.05,
  bottomInsetRatio: 0.055,
  safeTopRatio: 0.104,
  safeBottomRatio: 0.176,
  contentScale: 0.885,
  contentOffsetY: -108,
  markerColumn: 78,
  markerFontSize: 16,
  markerPaddingRight: 12,
  rowGap: 12,
  cellGap: 2,
  titleFontSize: 46,
  titleLetterSpacing: 12,
  quoteFontSize: 29,
  quoteMaxWidth: 760,
  quoteMarginTop: 18,
  quoteMarginBottom: 26,
  weekCellAspectRatio: 1,
}

export function getMobileWallpaperFrameStyle(
  preset: MobileWallpaperPreset = MOBILE_WIDGET_PRESET,
): CSSProperties {
  const framePaddingTop = Math.round(preset.frameHeight * preset.topInsetRatio)
  const framePaddingRight = Math.round(preset.frameWidth * preset.sideInsetRatio)
  const framePaddingBottom = Math.round(
    preset.frameHeight * preset.bottomInsetRatio,
  )
  const framePaddingLeft = Math.round(preset.frameWidth * preset.sideInsetRatio)
  const layoutRowHeight = preset.frameHeight / 28

  return {
    width: `${preset.frameWidth}px`,
    height: `${preset.frameHeight}px`,
    boxSizing: 'border-box',
    paddingTop: `${framePaddingTop}px`,
    paddingRight: `${framePaddingRight}px`,
    paddingBottom: `${framePaddingBottom}px`,
    paddingLeft: `${framePaddingLeft}px`,
    ['--widget-frame-height' as string]: `${preset.frameHeight}px`,
    ['--widget-frame-width' as string]: `${preset.frameWidth}px`,
    ['--widget-grid-top' as string]: `${Math.round(
      layoutRowHeight * 4 - framePaddingTop,
    )}px`,
    ['--widget-grid-width' as string]: `${
      preset.frameWidth - framePaddingLeft - framePaddingRight
    }px`,
    ['--widget-header-center-y' as string]: `${Math.round(
      layoutRowHeight * 2.5 - framePaddingTop,
    )}px`,
    ['--widget-marker-column' as string]: `${preset.markerColumn}px`,
    ['--widget-row-gap' as string]: `${preset.rowGap}px`,
    ['--widget-cell-gap' as string]: `${preset.cellGap}px`,
    ['--widget-content-scale' as string]: `${preset.contentScale}`,
    ['--widget-content-offset-y' as string]: `${preset.contentOffsetY}px`,
    ['--widget-marker-font-size' as string]: `${preset.markerFontSize}px`,
    ['--widget-marker-padding-right' as string]: `${preset.markerPaddingRight}px`,
    ['--widget-safe-bottom' as string]: `${Math.round(preset.frameHeight * preset.safeBottomRatio)}px`,
    ['--widget-safe-top' as string]: `${Math.round(preset.frameHeight * preset.safeTopRatio)}px`,
    ['--widget-title-font-size' as string]: `${preset.titleFontSize}px`,
    ['--widget-title-letter-spacing' as string]: `${preset.titleLetterSpacing}px`,
    ['--widget-quote-font-size' as string]: `${preset.quoteFontSize}px`,
    ['--widget-quote-max-width' as string]: `${preset.quoteMaxWidth}px`,
    ['--widget-quote-margin-top' as string]: `${preset.quoteMarginTop}px`,
    ['--widget-quote-margin-bottom' as string]: `${preset.quoteMarginBottom}px`,
    ['--widget-week-cell-aspect' as string]: `${preset.weekCellAspectRatio}`,
  }
}
