import styles from './App.module.css'

function App() {
  const anchorlinks = [{ id: 'colors', label: 'Color' }]
  return (
    <>
      <header>
        <h1>Design System</h1>
      </header>
      <main className={styles.main}>
        <div className={styles.sidebar}>
          <nav>
            <ul>
              {anchorlinks.map((anchorlink) => (
                <li key={anchorlink.id}>
                  <a href={`#${anchorlink.id}`}>{anchorlink.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={styles.content}>
          <section>
            <h2 id="colors">Color</h2>
          </section>
        </div>
      </main>
    </>
  )
}

export default App
