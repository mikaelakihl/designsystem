import styles from './Input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  icon?: React.ReactNode
  invalid?: boolean
  errorMessage?: string
  id: string
  fullWidth?: boolean
  label?: string
}

export function Input({
  placeholder,
  icon,
  disabled,
  invalid,
  errorMessage,
  id,
  fullWidth = false,
  label,
  ...props
}: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      {label && <label htmlFor={id}>{label}</label>}
      <div
        className={[styles.inputContainer, fullWidth && styles.fullWidth].filter(Boolean).join(' ')}
        data-disabled={disabled ? '' : undefined}
      >
        {icon && (
          <span
            className={styles.icon}
            aria-hidden="true"
            data-disabled={disabled ? '' : undefined}
          >
            {icon}
          </span>
        )}
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          {...props}
          disabled={disabled}
          aria-invalid={invalid}
          aria-describedby={invalid && errorMessage ? `${id}-error` : undefined}
        />
      </div>
      {invalid && errorMessage && (
        <p id={`${id}-error`} className={styles.errorMessage}>
          {errorMessage}
        </p>
      )}
    </div>
  )
}
