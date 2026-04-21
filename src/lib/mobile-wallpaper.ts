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
  safeTopRatio: 0.12,
  safeBottomRatio: 0.214,
  contentScale: 0.9,
  contentOffsetY: -54,
  markerColumn: 94,
  markerFontSize: 30,
  markerPaddingRight: 20,
  rowGap: 14,
  cellGap: 2,
  titleFontSize: 46,
  titleLetterSpacing: 12,
  quoteFontSize: 31,
  quoteMaxWidth: 760,
  quoteMarginTop: 22,
  quoteMarginBottom: 38,
  weekCellAspectRatio: 1,
}

