import styles from './Textarea.module.css'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label?: string
  placeholder: string
  invalid?: boolean
  errorMessage?: string
  fullWidth?: boolean
}

export function Textarea({
  id,
  label,
  placeholder,
  disabled,
  invalid,
  errorMessage,
  fullWidth = false,
  ...props
}: TextareaProps) {
  return (
    <div className={styles.textareaContainer}>
      {label && <label htmlFor={id}>{label}</label>}
      <textarea
        id={id}
        className={[styles.textarea, fullWidth && styles.fullWidth].filter(Boolean).join(' ')}
        placeholder={placeholder}
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
