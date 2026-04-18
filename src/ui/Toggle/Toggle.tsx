import styles from './Toggle.module.css'

interface ToggleProps {
  id: string
  label?: string
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
}

export function Toggle({ id, label, checked, onChange, disabled }: ToggleProps) {
  return (
    <div className={styles.toggleContainer}>
      {label && (
        <label
          htmlFor={id}
          className={styles.toggleLabel}
          data-disabled={disabled ? '' : undefined}
        >
          <input
            type="checkbox"
            id={id}
            className={styles.toggleInput}
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange?.(e.target.checked)}
          />
          <span className={styles.track} aria-hidden="true">
            <span className={styles.thumb} />
          </span>
          {label}
        </label>
      )}
    </div>
  )
}
