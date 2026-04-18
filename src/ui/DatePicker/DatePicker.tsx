import styles from './DatePicker.module.css'

interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label?: string
  placeholder?: string
  fullWidth?: boolean
  invalid?: boolean
  errorMessage?: string
  disabled?: boolean
}

export function DatePicker({
  id,
  label,
  placeholder,
  fullWidth,
  invalid,
  errorMessage,
  disabled,
  ...props
}: DatePickerProps) {
  return (
    <div className={styles.datePickerContainer}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        placeholder={placeholder}
        type="date"
        className={[styles.datePicker, fullWidth && styles.fullWidth].filter(Boolean).join(' ')}
        disabled={disabled}
        aria-invalid={invalid}
        aria-describedby={invalid && errorMessage ? `${id}-error` : undefined}
        {...props}
      />
      {invalid && errorMessage && (
        <p id={`${id}-error`} className={styles.errorMessage}>
          {errorMessage}
        </p>
      )}
    </div>
  )
}
