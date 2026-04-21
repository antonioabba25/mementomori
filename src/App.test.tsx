import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('shows a discreet error message for invalid dates', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.type(screen.getByLabelText('Data de nascimento'), '99/99/9999')
    await user.click(screen.getByRole('button', { name: 'Gerar visualizacao' }))

    expect(screen.getByRole('alert').textContent).toContain(
      'Essa data nao existe.',
    )
  })

  it('renders the complete life grid for a valid birth date', async () => {
    const user = userEvent.setup()

    render(<App />)

    await user.type(screen.getByLabelText('Data de nascimento'), '20/04/1990')
    await user.click(screen.getByRole('button', { name: 'Gerar visualizacao' }))

    expect(
      screen.getByRole('heading', { name: 'Uma visualizacao estoica do tempo.' }),
    ).toBeTruthy()
    expect(screen.getAllByTestId('week-cell')).toHaveLength(4368)
    expect(screen.getByTestId('composition-quote').textContent).toBeTruthy()
    expect(
      screen.getByRole('button', { name: 'Exportar JPG Final' }),
    ).toBeTruthy()
    expect(screen.getByTestId('side-marker-0')).toBeTruthy()
    expect(screen.getByTestId('side-marker-84')).toBeTruthy()
  })
})
