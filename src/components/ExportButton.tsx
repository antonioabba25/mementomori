import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { toJpeg } from 'html-to-image'
import type { LifeVisualization } from '../lib/life-weeks'
import { MOBILE_WIDGET_PRESET } from '../lib/mobile-wallpaper'
import { MobileWallpaperFrame } from './MobileWallpaperFrame'

interface ExportButtonProps {
  downloadName: string
  quote: string
  visualization: LifeVisualization
}

export function ExportButton({
  downloadName,
  quote,
  visualization,
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [shouldRenderExportFrame, setShouldRenderExportFrame] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const exportFrameRef = useRef<HTMLDivElement | null>(null)

  const handleExport = async () => {
    setIsExporting(true)
    setErrorMessage('')

    try {
      // The export frame stays out of the normal DOM until the user asks for a
      // JPG, which keeps the on-screen grid count predictable for the app/tests.
      if (!exportFrameRef.current) {
        flushSync(() => {
          setShouldRenderExportFrame(true)
        })
      }

      if (!exportFrameRef.current) {
        throw new Error('Export frame unavailable')
      }

      const dataUrl = await toJpeg(exportFrameRef.current, {
        backgroundColor: '#ede2d2',
        cacheBust: true,
        canvasHeight: MOBILE_WIDGET_PRESET.frameHeight,
        canvasWidth: MOBILE_WIDGET_PRESET.frameWidth,
        height: MOBILE_WIDGET_PRESET.frameHeight,
        width: MOBILE_WIDGET_PRESET.frameWidth,
        pixelRatio: MOBILE_WIDGET_PRESET.pixelRatio,
        preferredFontFormat: 'woff2',
        quality: 0.98,
      })

      const link = document.createElement('a')
      link.download = `${downloadName}-${MOBILE_WIDGET_PRESET.fileSuffix}.jpg`
      link.href = dataUrl
      link.click()
    } catch {
      setErrorMessage('Não foi possível exportar o JPG agora.')
    } finally {
      setIsExporting(false)
      setShouldRenderExportFrame(false)
    }
  }

  return (
    <div className="export-button">
      <button
        className="button-secondary"
        type="button"
        onClick={handleExport}
        disabled={isExporting}
      >
        {isExporting ? 'Exportando...' : 'Exportar JPG Final'}
      </button>
      <p
        className="export-button__hint"
        data-error={errorMessage ? 'true' : 'false'}
      >
        {errorMessage ||
          'Saída única em widget 90%, alinhada ao enquadramento final para iPhone.'}
      </p>

      {shouldRenderExportFrame ? (
        <div className="export-render-surface" aria-hidden="true">
          <MobileWallpaperFrame
            frameRef={exportFrameRef}
            quote={quote}
            visualization={visualization}
          />
        </div>
      ) : null}
    </div>
  )
}
