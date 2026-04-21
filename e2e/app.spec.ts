import { expect, test } from '@playwright/test'

test('generates the life grid from a birth date', async ({ page }) => {
  await page.goto('/')

  await page.getByLabel('Data de nascimento').fill('20/04/1990')
  await page.getByRole('button', { name: 'Gerar visualizacao' }).click()

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
