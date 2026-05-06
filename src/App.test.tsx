import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('shows a discreet error message for invalid dates', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.type(screen.getByLabelText('Data de nascimento'), '99999999')
    await user.click(screen.getByRole('button', { name: 'Gerar visualização' }))

    expect(screen.getByRole('alert').textContent).toContain(
      'Essa data não existe.',
    )
  })

  it('renders the complete life grid for a valid birth date', async () => {
    const user = userEvent.setup()

    render(<App />)

    expect(
      screen.queryByRole('heading', { name: 'As 7 idades do homem' }),
    ).toBeNull()

    await user.type(screen.getByLabelText('Data de nascimento'), '20041990')
    await user.click(screen.getByRole('button', { name: 'Gerar visualização' }))

    expect(
      screen.getByRole('heading', { name: 'Uma visualização estoica do tempo.' }),
    ).toBeTruthy()
    expect(screen.getAllByTestId('week-cell')).toHaveLength(4368)
    expect(screen.getByTestId('composition-quote').textContent).toBeTruthy()
    expect(
      screen.getByRole('button', { name: 'Exportar JPG Final' }),
    ).toBeTruthy()
    expect(screen.getByRole('heading', { name: 'Memento Mori' })).toBeTruthy()
    expect(
      screen.getByRole('heading', { name: 'As 7 idades do homem' }),
    ).toBeTruthy()
    expect(screen.getByTestId('side-marker-0')).toBeTruthy()
    expect(screen.getByTestId('side-marker-84')).toBeTruthy()
    expect(screen.getByTestId('calendar-marker-1990')).toBeTruthy()
    expect(screen.getByTestId('calendar-marker-2074')).toBeTruthy()
  })

  it('returns from the generated view to the initial screen', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.type(screen.getByLabelText('Data de nascimento'), '20041990')
    await user.click(screen.getByRole('button', { name: 'Gerar visualização' }))
    await user.click(screen.getByRole('button', { name: 'Voltar' }))

    expect(screen.queryByRole('button', { name: 'Exportar JPG Final' })).toBeNull()
    expect(screen.getByRole('button', { name: 'Gerar visualização' })).toBeTruthy()
    expect((screen.getByLabelText('Data de nascimento') as HTMLInputElement).value).toBe(
      '',
    )
  })
})
