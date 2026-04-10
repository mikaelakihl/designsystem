import styles from './Input.module.css'

export function Input() {
  return (
    <div className={styles.inputContainer}>
      <span className={styles.icon}>icon</span>
      <input type="text" className={styles.input} />
    </div>
  )
}
