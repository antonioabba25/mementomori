import { describe, expect, it } from 'vitest'
import {
  VISUAL_TOTAL_WEEKS,
  VISUAL_WEEKS_PER_YEAR,
  buildLifeGrid,
  calculateBirthWeekOffset,
  calculateWeeksLived,
  createLifeVisualization,
  validateBirthDateInput,
} from './life-weeks'

describe('validateBirthDateInput', () => {
  it('accepts a valid birth date in DD/MM/AAAA', () => {
    const result = validateBirthDateInput('20/04/1990', new Date(2026, 3, 20))

    expect(result.ok).toBe(true)
  })

  it('rejects dates that do not exist', () => {
    const result = validateBirthDateInput('31/02/1990', new Date(2026, 3, 20))

    expect(result).toEqual({
      ok: false,
      error: 'Essa data nao existe.',
    })
  })

  it('rejects future birth dates', () => {
    const result = validateBirthDateInput('21/04/2026', new Date(2026, 3, 20))

    expect(result).toEqual({
      ok: false,
      error: 'A data de nascimento nao pode estar no futuro.',
    })
  })
})

describe('calculateWeeksLived', () => {
  it('counts only complete weeks', () => {
    const birthDate = new Date(2026, 0, 1)
    const now = new Date(2026, 0, 20)

    expect(calculateWeeksLived(birthDate, now)).toBe(2)
  })

  it('clamps the result to the visual horizon', () => {
    const birthDate = new Date(1900, 0, 1)
    const now = new Date(2026, 3, 20)

    expect(calculateWeeksLived(birthDate, now)).toBe(VISUAL_TOTAL_WEEKS)
  })
})

describe('buildLifeGrid', () => {
  it('creates the complete 84 x 52 matrix and marks the current week', () => {
    const rows = buildLifeGrid(60)

    expect(rows).toHaveLength(84)
    expect(rows[0].weeks).toHaveLength(VISUAL_WEEKS_PER_YEAR)
    expect(rows[0].isMilestone).toBe(true)
    expect(rows[1].isCurrentYear).toBe(true)
    expect(rows[1].weeks[8].isCurrentWeek).toBe(true)
    expect(rows[0].weeks[0].state).toBe('lived')
    expect(rows[1].weeks[8].state).toBe('empty')
  })

  it('keeps the weeks before the birth week empty in year zero', () => {
    const rows = buildLifeGrid(3, 10)

    expect(rows[0].weeks.slice(0, 10).every((week) => week.state === 'empty')).toBe(
      true,
    )
    expect(rows[0].weeks[10].state).toBe('lived')
    expect(rows[0].weeks[12].state).toBe('lived')
    expect(rows[0].weeks[13].state).toBe('empty')
  })
})

describe('createLifeVisualization', () => {
  it('builds the full visualization payload for the interface', () => {
    const result = createLifeVisualization('20/04/1990', new Date(2026, 3, 20))

    expect(result.ok).toBe(true)

    if (!result.ok) {
      throw new Error('Visualization should have been created')
    }

    expect(result.visualization.rows).toHaveLength(84)
    expect(result.visualization.totalWeeks).toBe(VISUAL_TOTAL_WEEKS)
  })

  it('places a march birth inside the first row instead of filling from january', () => {
    const birthDate = new Date(1989, 2, 15)
    const birthWeekOffset = calculateBirthWeekOffset(birthDate)
    const result = createLifeVisualization('15/03/1989', new Date(1989, 3, 5))

    expect(result.ok).toBe(true)

    if (!result.ok) {
      throw new Error('Visualization should have been created')
    }

    expect(birthWeekOffset).toBeGreaterThan(0)
    expect(
      result.visualization.rows[0].weeks
        .slice(0, birthWeekOffset)
        .every((week) => week.state === 'empty'),
    ).toBe(true)
    expect(result.visualization.rows[0].weeks[birthWeekOffset].state).toBe('lived')
  })
})
