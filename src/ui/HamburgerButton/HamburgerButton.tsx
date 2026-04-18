import styles from './HamburgerButton.module.css'

interface HamburgerButtonProps {
  open: boolean
  onClick: () => void
  disabled?: boolean
  label?: string
}

export function HamburgerButton({
  open,
  onClick,
  disabled,
  label = 'Toggle menu',
}: HamburgerButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-expanded={open}
    >
      <span className={styles.bar} data-open={open ? '' : undefined} />
      <span className={styles.bar} data-open={open ? '' : undefined} />
      <span className={styles.bar} data-open={open ? '' : undefined} />
    </button>
  )
}
