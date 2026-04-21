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
  markerColumn: 94,
  markerFontSize: 30,
  markerPaddingRight: 20,
  rowGap: 14,
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
  return {
    width: `${preset.frameWidth}px`,
    height: `${preset.frameHeight}px`,
    boxSizing: 'border-box',
    paddingTop: `${Math.round(preset.frameHeight * preset.topInsetRatio)}px`,
    paddingRight: `${Math.round(preset.frameWidth * preset.sideInsetRatio)}px`,
    paddingBottom: `${Math.round(preset.frameHeight * preset.bottomInsetRatio)}px`,
    paddingLeft: `${Math.round(preset.frameWidth * preset.sideInsetRatio)}px`,
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
