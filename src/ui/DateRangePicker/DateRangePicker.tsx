import styles from './DateRangePicker.module.css'

interface DateRangePickerProps {
  idFrom: string
  idTo: string
  labelFrom?: string
  labelTo?: string
  fullWidth?: boolean
  invalid?: boolean
  errorMessage?: string
  disabled?: boolean
  fromProps?: React.InputHTMLAttributes<HTMLInputElement>
  toProps?: React.InputHTMLAttributes<HTMLInputElement>
}

export function DateRangePicker({
  idFrom,
  idTo,
  labelFrom,
  labelTo,
  fullWidth,
  invalid,
  errorMessage,
  disabled,
  fromProps,
  toProps,
}: DateRangePickerProps) {
  return (
    <div className={styles.dateRangePickerContainer}>
      <div className={styles.dateRangePickerInputs}>
        <div className={styles.dateRangePickerField}>
          {labelFrom && <label htmlFor={idFrom}>{labelFrom}</label>}
          <input
            id={idFrom}
            type="date"
            className={[styles.datePicker, fullWidth && styles.fullWidth].filter(Boolean).join(' ')}
            disabled={disabled}
            aria-invalid={invalid}
            aria-describedby={invalid && errorMessage ? `${idFrom}-error` : undefined}
            {...fromProps}
          />
        </div>
        <div className={styles.dateRangePickerField}>
          {labelTo && <label htmlFor={idTo}>{labelTo}</label>}
          <input
            id={idTo}
            type="date"
            className={[styles.datePicker, fullWidth && styles.fullWidth].filter(Boolean).join(' ')}
            disabled={disabled}
            aria-invalid={invalid}
            aria-describedby={invalid && errorMessage ? `${idTo}-error` : undefined}
            {...toProps}
          />
        </div>
      </div>
      {invalid && errorMessage && (
        <p id={`${idFrom}-error`} className={styles.errorMessage}>
          {errorMessage}
        </p>
      )}
    </div>
  )
}
