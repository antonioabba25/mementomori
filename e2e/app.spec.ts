import { expect, test, devices } from '@playwright/test'
import fs from 'node:fs/promises'

function readJpegSize(buffer: Buffer) {
  let offset = 2

  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) {
      break
    }

    const marker = buffer[offset + 1]
    const length = buffer.readUInt16BE(offset + 2)

    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      }
    }

    offset += 2 + length
  }

  return null
}

test('generates the life grid from a birth date', async ({ page }) => {
  await page.goto('/')

  await page.getByLabel('Data de nascimento').fill('20041990')
  await page.getByRole('button', { name: 'Gerar visualização' }).click()

  await expect(
    page.locator('.life-composition').getByRole('heading', {
      name: 'MEMENTO MORI',
    }),
  ).toBeVisible()
  await expect(page.getByTestId('composition-quote')).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Exportar JPG Final' }),
  ).toBeVisible()
  await expect(page.locator('[data-testid="week-cell"]')).toHaveCount(4368)
})

test.describe('mobile export', () => {
  test.use({
    acceptDownloads: true,
    deviceScaleFactor: devices['iPhone 13'].deviceScaleFactor,
    hasTouch: devices['iPhone 13'].hasTouch,
    isMobile: devices['iPhone 13'].isMobile,
    userAgent: devices['iPhone 13'].userAgent,
    viewport: devices['iPhone 13'].viewport,
  })

  test('downloads the generated JPG on a mobile viewport', async ({
    page,
  }, testInfo) => {
    await page.goto('/')

    await page.getByLabel('Data de nascimento').fill('20041990')
    await page.getByRole('button', { name: 'Gerar visualização' }).click()
    await page
      .getByRole('button', { name: 'Exportar JPG Final' })
      .scrollIntoViewIfNeeded()

    await page.screenshot({
      fullPage: true,
      path: testInfo.outputPath('mobile-generated.png'),
    })

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.getByRole('button', { name: 'Exportar JPG Final' }).click(),
    ])

    expect(download.suggestedFilename()).toBe(
      'memento-mori-1990-04-20-widget-90.jpg',
    )

    const downloadPath = testInfo.outputPath(download.suggestedFilename())
    await download.saveAs(downloadPath)

    const bytes = await fs.readFile(downloadPath)
    expect(bytes.subarray(0, 3).toString('hex')).toBe('ffd8ff')
    expect(readJpegSize(bytes)).toEqual({ height: 5736, width: 2640 })
    await expect(
      page.getByRole('link', { name: 'Abrir JPG gerado' }),
    ).toBeVisible()
  })
})
