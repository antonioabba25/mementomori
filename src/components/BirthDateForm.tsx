import type { FormEvent } from 'react'

interface BirthDateFormProps {
  errorMessage: string
  inputValue: string
  onInputChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function BirthDateForm({
  errorMessage,
  inputValue,
  onInputChange,
  onSubmit,
}: BirthDateFormProps) {
  return (
    <form className="birth-form" onSubmit={onSubmit} noValidate>
      <div className="birth-form__header">
        <h2>Data de nascimento</h2>
        <p>Uma única entrada basta para compor toda a grade da vida.</p>
      </div>

      <div className="birth-form__fields">
        <div className="field-group">
          <label htmlFor="birth-date-input">Data de nascimento</label>
          <input
            id="birth-date-input"
            name="birthDate"
            type="text"
            inputMode="numeric"
            autoComplete="bday"
            maxLength={8}
            placeholder="DDMMAAAA"
            value={inputValue}
            onChange={(event) => onInputChange(event.target.value)}
            aria-invalid={errorMessage ? 'true' : 'false'}
            aria-describedby="birth-date-error"
          />
        </div>

        <button className="button-primary" type="submit">
          Gerar visualização
        </button>
      </div>

      <p className="field-error" id="birth-date-error" role="alert">
        {errorMessage}
      </p>
    </form>
  )
}
