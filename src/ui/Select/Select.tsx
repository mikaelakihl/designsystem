import styles from './Select.module.css'
type Options = {
  label: string
  value: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Options[]
  label?: string
  id: string
  fullWidth?: boolean
  invalid?: boolean
  errorMessage?: string
}
export function Select({
  options,
  label,
  id,
  fullWidth,
  invalid,
  disabled,
  errorMessage,
  ...props
}: SelectProps) {
  return (
    <div className={styles.selectContainer}>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        aria-invalid={invalid}
        disabled={disabled}
        className={[styles.select, fullWidth && styles.fullWidth].filter(Boolean).join(' ')}
        aria-describedby={invalid && errorMessage ? `${id}-error` : undefined}
        {...props}
      >
        <option value="" disabled hidden>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {invalid && errorMessage && (
        <p id={`${id}-error`} className={styles.errorMessage}>
          {errorMessage}
        </p>
      )}
    </div>
  )
}
