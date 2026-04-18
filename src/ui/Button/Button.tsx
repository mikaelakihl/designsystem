import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './Button.module.css'

type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  iconOnly?: boolean
  children?: ReactNode
  iconRight?: ReactNode
  iconLeft?: ReactNode
  loading?: boolean
}

export function Button({
  variant = 'primary',
  size = 'sm',
  fullWidth = false,
  iconOnly = false,
  children,
  iconLeft,
  iconRight,
  loading = false,
  type = 'button',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      disabled={loading || disabled}
      className={[styles.button, styles[size], styles[variant], fullWidth && styles.fullWidth, iconOnly && styles.iconOnly]
        .filter(Boolean)
        .join(' ')}
    >
      {!loading && iconLeft && (
        <span className={styles.iconLeft}>
          <span className={styles.icon}>{iconLeft}</span>
        </span>
      )}

      {loading ? 'Loading...' : children}

      {!loading && iconRight && (
        <span className={styles.iconRight}>
          <span className={styles.icon}>{iconRight}</span>
        </span>
      )}
    </button>
  )
}
