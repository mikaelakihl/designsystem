import styles from './Checkbox.module.css'

interface CheckboxProps {
  id: string
  label: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  invalid?: boolean
}

export function Checkbox({
  id,
  label,
  checked,
  onChange,
  disabled,
  invalid,
}: CheckboxProps) {
  return (
    <div className={styles.checkboxContainer}>
      <input
        className={styles.checkbox}
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        aria-invalid={invalid}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  )
}
