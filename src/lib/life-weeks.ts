import {
  differenceInCalendarDays,
  format,
  getDayOfYear,
  isValid,
  parse,
  startOfDay,
} from 'date-fns'

export const VISUAL_YEARS = 84
export const VISUAL_WEEKS_PER_YEAR = 52
export const VISUAL_TOTAL_WEEKS = VISUAL_YEARS * VISUAL_WEEKS_PER_YEAR

const BIRTH_DATE_PATTERN = /^\d{2}\/\d{2}\/\d{4}$/

export type WeekState = 'empty' | 'lived'

export interface WeekCellData {
  absoluteIndex: number
  isCurrentWeek: boolean
  state: WeekState
  weekOfYear: number
}

export interface LifeYearRow {
  isCurrentYear: boolean
  isMilestone: boolean
  weeks: WeekCellData[]
  yearIndex: number
}

export interface LifeVisualization {
  birthDate: Date
  birthDateLabel: string
  currentWeekIndex: number | null
  currentYearIndex: number
  generatedAtLabel: string
  remainingWeeks: number
  rows: LifeYearRow[]
  totalWeeks: number
  weeksLived: number
  yearsLived: number
}

type ValidationSuccess = {
  date: Date
  ok: true
}

type ValidationFailure = {
  error: string
  ok: false
}

export type ValidationResult = ValidationSuccess | ValidationFailure

type VisualizationSuccess = {
  ok: true
  visualization: LifeVisualization
}

type VisualizationFailure = ValidationFailure

export type VisualizationResult = VisualizationSuccess | VisualizationFailure

function clampWeeksLived(weeksLived: number) {
  return Math.max(0, Math.min(weeksLived, VISUAL_TOTAL_WEEKS))
}

function clampBirthWeekOffset(birthWeekOffset: number) {
  return Math.max(0, Math.min(birthWeekOffset, VISUAL_WEEKS_PER_YEAR - 1))
}

export function formatBirthDate(date: Date) {
  return format(date, 'dd/MM/yyyy')
}

export function validateBirthDateInput(
  input: string,
  now: Date = new Date(),
): ValidationResult {
  const normalizedInput = input.trim()

  if (!BIRTH_DATE_PATTERN.test(normalizedInput)) {
    return {
      ok: false,
      error: 'Informe a data no formato DD/MM/AAAA.',
    }
  }

  const parsedDate = parse(normalizedInput, 'dd/MM/yyyy', new Date())

  if (!isValid(parsedDate) || formatBirthDate(parsedDate) !== normalizedInput) {
    return {
      ok: false,
      error: 'Essa data nao existe.',
    }
  }

  const birthDate = startOfDay(parsedDate)
  const currentDate = startOfDay(now)

  if (birthDate.getTime() > currentDate.getTime()) {
    return {
      ok: false,
      error: 'A data de nascimento nao pode estar no futuro.',
    }
  }

  return {
    ok: true,
    date: birthDate,
  }
}

export function calculateWeeksLived(
  birthDate: Date,
  now: Date = new Date(),
) {
  const daysLived = differenceInCalendarDays(
    startOfDay(now),
    startOfDay(birthDate),
  )

  return clampWeeksLived(Math.floor(daysLived / 7))
}

export function calculateBirthWeekOffset(birthDate: Date) {
  return clampBirthWeekOffset(Math.floor((getDayOfYear(birthDate) - 1) / 7))
}

export function buildLifeGrid(
  weeksLived: number,
  birthWeekOffset: number = 0,
): LifeYearRow[] {
  const safeBirthWeekOffset = clampBirthWeekOffset(birthWeekOffset)
  const availableVisualWeeks = VISUAL_TOTAL_WEEKS - safeBirthWeekOffset
  const safeWeeksLived = Math.max(0, Math.min(weeksLived, availableVisualWeeks))
  const currentWeekIndex =
    safeWeeksLived >= availableVisualWeeks
      ? null
      : safeBirthWeekOffset + safeWeeksLived
  const currentYearIndex =
    currentWeekIndex === null
      ? VISUAL_YEARS - 1
      : Math.floor(currentWeekIndex / VISUAL_WEEKS_PER_YEAR)

  return Array.from({ length: VISUAL_YEARS }, (_, yearIndex) => ({
    yearIndex,
    isMilestone: yearIndex % 7 === 0,
    isCurrentYear: yearIndex === currentYearIndex,
    weeks: Array.from({ length: VISUAL_WEEKS_PER_YEAR }, (_, weekOfYear) => {
      const absoluteIndex = yearIndex * VISUAL_WEEKS_PER_YEAR + weekOfYear
      const isReachableWeek = absoluteIndex >= safeBirthWeekOffset
      const livedEndExclusive = safeBirthWeekOffset + safeWeeksLived

      return {
        absoluteIndex,
        weekOfYear,
        state:
          isReachableWeek && absoluteIndex < livedEndExclusive ? 'lived' : 'empty',
        isCurrentWeek: currentWeekIndex === absoluteIndex,
      }
    }),
  }))
}

export function createLifeVisualization(
  input: string,
  now: Date = new Date(),
): VisualizationResult {
  const validation = validateBirthDateInput(input, now)

  if (!validation.ok) {
    return validation
  }

  const weeksLived = calculateWeeksLived(validation.date, now)
  const birthWeekOffset = calculateBirthWeekOffset(validation.date)
  const rows = buildLifeGrid(weeksLived, birthWeekOffset)
  const availableVisualWeeks = VISUAL_TOTAL_WEEKS - birthWeekOffset
  const currentWeekIndex =
    weeksLived >= availableVisualWeeks ? null : birthWeekOffset + weeksLived
  const currentYearIndex =
    currentWeekIndex === null
      ? VISUAL_YEARS - 1
      : Math.floor(currentWeekIndex / VISUAL_WEEKS_PER_YEAR)

  return {
    ok: true,
    visualization: {
      birthDate: validation.date,
      birthDateLabel: formatBirthDate(validation.date),
      currentWeekIndex,
      currentYearIndex,
      generatedAtLabel: format(startOfDay(now), 'dd/MM/yyyy'),
      remainingWeeks: availableVisualWeeks - weeksLived,
      rows,
      totalWeeks: VISUAL_TOTAL_WEEKS,
      weeksLived,
      yearsLived: Math.min(
        VISUAL_YEARS,
        Math.floor(weeksLived / VISUAL_WEEKS_PER_YEAR),
      ),
    },
  }
}
