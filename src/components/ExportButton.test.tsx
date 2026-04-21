import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createLifeVisualization } from '../lib/life-weeks'
import { ExportButton } from './ExportButton'

const { toJpegMock } = vi.hoisted(() => ({
  toJpegMock: vi.fn(async () => 'data:image/jpeg;base64,fake'),
}))

vi.mock('html-to-image', () => ({
  toJpeg: toJpegMock,
}))

describe('ExportButton', () => {
  beforeEach(() => {
    toJpegMock.mockClear()
  })

  it('exports the single final mobile wallpaper preset', async () => {
    const user = userEvent.setup()
    const visualizationResult = createLifeVisualization(
      '20/03/1989',
      new Date(2026, 3, 20),
    )

    if (!visualizationResult.ok) {
      throw new Error('Visualization should exist for export test')
    }

    toJpegMock.mockImplementationOnce(async (...args: unknown[]) => {
      const stage = args[0] as HTMLElement

      expect(stage.getAttribute('data-export-stage')).toBe('iphone16-widget-90')
      expect(stage.querySelector('.life-composition--widget')).toBeTruthy()
      expect(stage.textContent).toContain('MEMENTO MORI')
      expect(stage.textContent).toContain('O tempo não negocia com distrações.')

      return 'data:image/jpeg;base64,fake'
    })

    const anchorClickMock = vi
      .spyOn(HTMLAnchorElement.prototype, 'click')
      .mockImplementation(() => {})

    render(
      <ExportButton
        downloadName="memento-mori"
        quote="O tempo não negocia com distrações."
        visualization={visualizationResult.visualization}
      />,
    )

    await user.click(screen.getByRole('button', { name: 'Exportar JPG Final' }))

    expect(toJpegMock).toHaveBeenCalledTimes(1)
    expect(toJpegMock).toHaveBeenCalledWith(
      expect.any(HTMLDivElement),
      expect.objectContaining({
        canvasWidth: 1320,
        canvasHeight: 2868,
        pixelRatio: 2,
      }),
    )

    anchorClickMock.mockRestore()
  })
})
