import styles from './Radio.module.css'

interface RadioProps {
  id: string
  label?: string
  name: string
  value: string
  checked?: boolean
  onChange: (value: string) => void
  disabled?: boolean
  invalid?: boolean
}

export function Radio({
  id,
  label,
  name,
  value,
  checked,
  onChange,
  disabled,
  invalid,
}: RadioProps) {
  return (
    <div className={styles.radioContainer}>
      <input
        className={styles.radio}
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-invalid={invalid}
      />
      {label && <label htmlFor={id}>{label}</label>}
    </div>
  )
}
