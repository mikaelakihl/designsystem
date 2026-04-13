import styles from './Input.module.css'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
  icon: React.ReactNode
  invalid?: boolean
  errorMessage?: string
  id: string
}

export function Input({
  placeholder,
  icon,
  disabled,
  invalid,
  errorMessage,
  id,
  ...props
}: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={id}>{placeholder}</label>
      <div
        className={styles.inputContainer}
        data-disabled={disabled ? '' : undefined}
        data-invalid={invalid || undefined}
      >
        <span className={styles.icon} data-disabled={disabled ? '' : undefined}>
          {icon}
        </span>
        <input
          type="text"
          className={styles.input}
          placeholder={placeholder}
          data-invalid={invalid || undefined}
          {...props}
          disabled={disabled}
        />
      </div>
      {invalid && errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  )
}
