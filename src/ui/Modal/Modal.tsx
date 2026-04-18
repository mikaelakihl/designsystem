import { useEffect } from 'react'
import { XIcon } from 'lucide-react'
import styles from './Modal.module.css'
import { Button } from '../Button/Button'

interface ModalProps {
  open: boolean
  title?: string
  children?: React.ReactNode
  onClose?: () => void
  leftActions?: React.ReactNode
  actions?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  closeOnBackdropClick?: boolean
}

export function Modal({ open, title, children, onClose, leftActions, actions, size = 'md', closeOnBackdropClick = true }: ModalProps) {
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.() }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={styles.overlay} onClick={closeOnBackdropClick ? onClose : undefined}>
      <div
        className={[styles.modal, styles[size]].filter(Boolean).join(' ')}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h2 id="modal-title" className={styles.title}>{title}</h2>
          <Button variant="ghost" size="sm" iconOnly aria-label="Close" onClick={onClose}>
            <XIcon size={18} />
          </Button>
        </div>

        <div className={styles.content}>{children}</div>

        <div className={styles.footer}>
          <div className={styles.leftActions}>{leftActions}</div>
          <div className={styles.actions}>{actions}</div>
        </div>
      </div>
    </div>
  )
}
