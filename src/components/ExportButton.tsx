import { useEffect, useRef, useState } from 'react'
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

interface GeneratedDownload {
  canShare: boolean
  fileName: string
  url: string
}

const dataUrlToBlob = (dataUrl: string) => {
  const [metadata, data = ''] = dataUrl.split(',')
  const mimeType = metadata.match(/data:([^;]+)/)?.[1] ?? 'image/jpeg'
  const content = metadata.includes(';base64') ? atob(data) : decodeURIComponent(data)
  const bytes = new Uint8Array(content.length)

  for (let index = 0; index < content.length; index += 1) {
    bytes[index] = content.charCodeAt(index)
  }

  return new Blob([bytes], { type: mimeType })
}

export function ExportButton({
  downloadName,
  quote,
  visualization,
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [shouldRenderExportFrame, setShouldRenderExportFrame] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [generatedDownload, setGeneratedDownload] =
    useState<GeneratedDownload | null>(null)
  const exportFrameRef = useRef<HTMLDivElement | null>(null)
  const generatedFileRef = useRef<File | null>(null)
  const generatedUrlRef = useRef<string | null>(null)

  useEffect(() => {
    return () => {
      if (generatedUrlRef.current) {
        URL.revokeObjectURL(generatedUrlRef.current)
      }
    }
  }, [])

  const replaceGeneratedDownload = (file: File) => {
    if (generatedUrlRef.current) {
      URL.revokeObjectURL(generatedUrlRef.current)
    }

    const url = URL.createObjectURL(file)
    generatedFileRef.current = file
    generatedUrlRef.current = url
    setGeneratedDownload({
      canShare: canShareGeneratedFile(),
      fileName: file.name,
      url,
    })

    return url
  }

  const triggerDownload = (url: string, fileName: string) => {
    const link = document.createElement('a')
    link.download = fileName
    link.href = url
    link.rel = 'noopener'
    document.body.append(link)
    link.click()
    link.remove()
  }

  const canShareGeneratedFile = () => {
    const file = generatedFileRef.current

    return Boolean(
      file &&
        typeof navigator.share === 'function' &&
        typeof navigator.canShare === 'function' &&
        navigator.canShare({ files: [file] }),
    )
  }

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

      const fileName = `${downloadName}-${MOBILE_WIDGET_PRESET.fileSuffix}.jpg`
      const blob = dataUrlToBlob(dataUrl)
      const file = new File([blob], fileName, { type: 'image/jpeg' })
      const url = replaceGeneratedDownload(file)

      triggerDownload(url, fileName)
    } catch {
      setErrorMessage('Não foi possível exportar o JPG agora.')
    } finally {
      setIsExporting(false)
      setShouldRenderExportFrame(false)
    }
  }

  const handleShare = async () => {
    const file = generatedFileRef.current

    if (!file || !canShareGeneratedFile()) {
      setErrorMessage('Compartilhamento nativo indisponível neste navegador.')
      return
    }

    try {
      await navigator.share({
        files: [file],
        title: 'Memento Mori',
      })
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        setErrorMessage('Não foi possível compartilhar o JPG agora.')
      }
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
      {generatedDownload ? (
        <div className="export-button__fallback" aria-label="JPG gerado">
          <a
            className="export-button__download-link"
            href={generatedDownload.url}
            download={generatedDownload.fileName}
            target="_blank"
            rel="noreferrer"
          >
            Abrir JPG gerado
          </a>
          {generatedDownload.canShare ? (
            <button
              className="export-button__share"
              type="button"
              onClick={handleShare}
            >
              Compartilhar JPG
            </button>
          ) : null}
        </div>
      ) : null}
      <p
        className="export-button__hint"
        data-error={errorMessage ? 'true' : 'false'}
      >
        {errorMessage ||
          (generatedDownload
            ? 'JPG gerado. Caso o download não abra automaticamente, use o link acima.'
            : 'Saída única em widget 90%, alinhada ao enquadramento final para iPhone.')}
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
