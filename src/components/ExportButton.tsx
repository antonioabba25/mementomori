import { useRef, useState, type CSSProperties, type RefObject } from 'react'
import { toJpeg } from 'html-to-image'
import type { LifeVisualization } from '../lib/life-weeks'
import { LifeWeeksGrid } from './LifeWeeksGrid'

interface ExportPreset {
  bottomInsetRatio: number
  description: string
  frameHeight: number
  frameWidth: number
  id: string
  label: string
  markerColumn: number
  rowGap: number
  cellGap: number
  pixelRatio: number
  sideInsetRatio: number
  topInsetRatio: number
  weekCellAspectRatio: number
}

interface ExportButtonProps {
  downloadName: string
  visualization: LifeVisualization
}

const EXPORT_PRESETS: ExportPreset[] = [
  {
    id: 'mobile',
    label: 'Celular',
    description:
      'Preset em retrato com area segura reduzida, inspirado nas dimensoes atuais de iPhone em tela cheia.',
    frameWidth: 1320,
    frameHeight: 2868,
    pixelRatio: 2,
    sideInsetRatio: 0.025,
    topInsetRatio: 0.055,
    bottomInsetRatio: 0.06,
    markerColumn: 34,
    rowGap: 8,
    cellGap: 2,
    weekCellAspectRatio: 1,
  },
  {
    id: 'tablet',
    label: 'Tablet',
    description:
      'Preset em retrato com margens curtas, alinhado a proporcoes correntes de iPad.',
    frameWidth: 1668,
    frameHeight: 2388,
    pixelRatio: 2,
    sideInsetRatio: 0.03,
    topInsetRatio: 0.04,
    bottomInsetRatio: 0.04,
    markerColumn: 36,
    rowGap: 8,
    cellGap: 2,
    weekCellAspectRatio: 1.22,
  },
  {
    id: 'laptop',
    label: 'Notebook',
    description:
      'Preset 16:10 com pequenas margens para caber quase por inteiro na area de trabalho.',
    frameWidth: 1600,
    frameHeight: 1000,
    pixelRatio: 2.5,
    sideInsetRatio: 0.025,
    topInsetRatio: 0.03,
    bottomInsetRatio: 0.035,
    markerColumn: 34,
    rowGap: 7,
    cellGap: 2,
    weekCellAspectRatio: 2.8,
  },
  {
    id: 'desktop',
    label: 'Desktop',
    description:
      'Preset 16:9 com composicao expandida e apenas pequenas margens periféricas.',
    frameWidth: 2560,
    frameHeight: 1440,
    pixelRatio: 3,
    sideInsetRatio: 0.022,
    topInsetRatio: 0.028,
    bottomInsetRatio: 0.03,
    markerColumn: 38,
    rowGap: 8,
    cellGap: 2,
    weekCellAspectRatio: 3.1,
  },
]

function getDefaultPresetId() {
  if (typeof window === 'undefined') {
    return 'laptop'
  }

  if (window.innerWidth < 640) {
    return 'mobile'
  }

  if (window.innerWidth < 1024) {
    return 'tablet'
  }

  if (window.innerWidth < 1600) {
    return 'laptop'
  }

  return 'desktop'
}

function ExportFrame({
  frameRef,
  preset,
  visualization,
}: {
  frameRef?: RefObject<HTMLDivElement | null>
  preset: ExportPreset
  visualization: LifeVisualization
}) {
  const frameStyle: CSSProperties = {
    width: `${preset.frameWidth}px`,
    height: `${preset.frameHeight}px`,
    boxSizing: 'border-box',
    paddingTop: `${Math.round(preset.frameHeight * preset.topInsetRatio)}px`,
    paddingRight: `${Math.round(preset.frameWidth * preset.sideInsetRatio)}px`,
    paddingBottom: `${Math.round(preset.frameHeight * preset.bottomInsetRatio)}px`,
    paddingLeft: `${Math.round(preset.frameWidth * preset.sideInsetRatio)}px`,
    ['--export-marker-column' as string]: `${preset.markerColumn}px`,
    ['--export-row-gap' as string]: `${preset.rowGap}px`,
    ['--export-cell-gap' as string]: `${preset.cellGap}px`,
    ['--export-week-cell-aspect' as string]: `${preset.weekCellAspectRatio}`,
  }

  return (
    <div
      ref={frameRef}
      className="export-stage"
      data-export-stage={preset.id}
      style={frameStyle}
    >
      <div className="export-stage__safe-area">
        <LifeWeeksGrid variant="export" visualization={visualization} />
      </div>
    </div>
  )
}

export function ExportButton({
  downloadName,
  visualization,
}: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const [selectedPresetId, setSelectedPresetId] = useState(getDefaultPresetId)
  const exportFrameRef = useRef<HTMLDivElement | null>(null)

  const selectedPreset =
    EXPORT_PRESETS.find((preset) => preset.id === selectedPresetId) ??
    EXPORT_PRESETS[2]
  const previewScale = Math.min(
    320 / selectedPreset.frameWidth,
    132 / selectedPreset.frameHeight,
  )

  const openPicker = () => {
    setErrorMessage('')
    setIsPickerOpen(true)
  }

  const handleExport = async () => {
    if (!exportFrameRef.current) {
      setErrorMessage('Nao foi possivel montar a previa de exportacao.')
      return
    }

    setIsExporting(true)
    setErrorMessage('')

    try {
      const dataUrl = await toJpeg(exportFrameRef.current, {
        backgroundColor: '#ede2d2',
        cacheBust: true,
        canvasHeight: selectedPreset.frameHeight,
        canvasWidth: selectedPreset.frameWidth,
        height: selectedPreset.frameHeight,
        width: selectedPreset.frameWidth,
        pixelRatio: selectedPreset.pixelRatio,
        preferredFontFormat: 'woff2',
        quality: 0.98,
      })

      const link = document.createElement('a')
      link.download = `${downloadName}.jpg`
      link.href = dataUrl
      link.click()
      setIsPickerOpen(false)
    } catch {
      setErrorMessage('Nao foi possivel exportar a imagem agora.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="export-button">
      <button
        className="button-secondary"
        type="button"
        onClick={openPicker}
        disabled={isExporting}
      >
        {isExporting ? 'Exportando...' : 'Exportar JPG'}
      </button>
      <p
        className="export-button__hint"
        data-error={errorMessage ? 'true' : 'false'}
      >
        {errorMessage ||
          'Escolha o dispositivo de destino. A sugestao inicial usa a tela atual.'}
      </p>

      {isPickerOpen ? (
        <div
          className="export-picker"
          role="dialog"
          aria-modal="true"
          aria-labelledby="export-picker-title"
        >
          <div className="export-picker__card">
            <div className="export-picker__header">
              <div>
                <p className="export-picker__eyebrow">Exportacao</p>
                <h3 id="export-picker-title">Qual e o dispositivo de destino?</h3>
              </div>
              <button
                className="export-picker__close"
                type="button"
                onClick={() => setIsPickerOpen(false)}
                aria-label="Fechar escolha de dispositivo"
              >
                Fechar
              </button>
            </div>

            <p className="export-picker__intro">
              A previa abaixo mostra o preenchimento quase total da area util,
              preservando apenas margens pequenas e zonas seguras.
            </p>

            <div className="export-picker__options">
              {EXPORT_PRESETS.map((preset) => (
                <label
                  key={preset.id}
                  className="export-picker__option"
                  data-selected={preset.id === selectedPresetId ? 'true' : 'false'}
                >
                  <input
                    aria-label={preset.label}
                    type="radio"
                    name="export-device"
                    value={preset.id}
                    checked={preset.id === selectedPresetId}
                    onChange={() => setSelectedPresetId(preset.id)}
                  />
                  <span className="export-picker__option-title">{preset.label}</span>
                  <span className="export-picker__option-description">
                    {preset.description}
                  </span>
                </label>
              ))}
            </div>

            <div className="export-preview">
              <p className="export-preview__label">Previa do enquadramento</p>
              <div className="export-preview__surface">
                <div
                  className="export-preview__scale"
                  style={
                    {
                      '--export-preview-scale': `${previewScale}`,
                    } as CSSProperties
                  }
                >
                  <ExportFrame
                    frameRef={exportFrameRef}
                    preset={selectedPreset}
                    visualization={visualization}
                  />
                </div>
              </div>
            </div>

            <div className="export-picker__actions">
              <button
                className="button-secondary"
                type="button"
                onClick={() => setIsPickerOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="button-primary"
                type="button"
                onClick={handleExport}
                disabled={isExporting}
              >
                {isExporting ? 'Exportando...' : 'Confirmar exportacao'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
