import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { spawn } from 'node:child_process'
import { chromium } from '@playwright/test'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const outputDirectory = path.join(projectRoot, 'exploracaomementomori')
const serverUrl = 'http://127.0.0.1:4173'
const birthDate = process.argv[2] ?? '20/03/1989'

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function waitForServer(url) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(url)

      if (response.ok) {
        return
      }
    } catch {
      // Keep polling until Vite is ready.
    }

    await sleep(500)
  }

  throw new Error(`Servidor indisponivel em ${url}`)
}

function startDevServer() {
  return spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], {
    cwd: projectRoot,
    stdio: 'inherit',
  })
}

async function main() {
  await mkdir(outputDirectory, { recursive: true })

  const server = startDevServer()
  const browser = await chromium.launch()

  try {
    await waitForServer(serverUrl)

    const page = await browser.newPage({
      viewport: { width: 430, height: 932 },
      deviceScaleFactor: 2,
    })

    await page.addInitScript(() => {
      window.__codexExports = []

      const originalClick = HTMLAnchorElement.prototype.click

      HTMLAnchorElement.prototype.click = function clickOverride() {
        if (this.download && this.href.startsWith('data:image/jpeg')) {
          window.__codexExports.push({
            download: this.download,
            href: this.href,
          })
          return
        }

        return originalClick.call(this)
      }
    })

    await page.goto(serverUrl, { waitUntil: 'networkidle' })
    await page.getByLabel('Data de nascimento').fill(birthDate)
    await page.getByRole('button', { name: 'Gerar visualização' }).click()

    const previousCount = await page.evaluate(() => window.__codexExports.length)

    await page.getByRole('button', { name: 'Exportar JPG Final' }).click()
    await page.waitForFunction(
      (count) => window.__codexExports.length > count,
      previousCount,
    )

    const latestExport = await page.evaluate(() => {
      return window.__codexExports.at(-1)
    })

    if (!latestExport) {
      throw new Error('Falha ao capturar a exportacao final')
    }

    const base64Payload = latestExport.href.replace(
      /^data:image\/jpeg;base64,/,
      '',
    )
    const filePath = path.join(outputDirectory, latestExport.download)

    await writeFile(filePath, Buffer.from(base64Payload, 'base64'))
    console.log(`[1/1] salvo ${path.relative(projectRoot, filePath)}`)
  } finally {
    await browser.close()

    if (!server.killed) {
      server.kill('SIGTERM')
    }
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
