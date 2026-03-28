import { useState } from 'react'
import styles from './App.module.css'
import { paletteHex } from './paletteHex'

function ColorSwatch({ name, hex, cssVar }: { name: string; hex: string; cssVar: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(cssVar)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className={styles.colorSwatch} style={{ cursor: 'pointer' }} onClick={handleCopy}>
      <div className={styles.colorPreview} style={{ backgroundColor: cssVar }}>
        <span className={styles.hexWindow}>{hex}</span>
      </div>
      <div className={styles.colorInfo}>
        <div className={styles.colorName}>{name}</div>
        <div className={styles.colorValue}>{copied ? 'Copied!' : cssVar}</div>
      </div>
    </div>
  )
}

const SHADES = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000] as const

const NEUTRAL_SHADES = [0, ...SHADES] as const

const COLOR_CATEGORIES = [
  { label: 'Neutral', prefix: 'neutral' },
  { label: 'Red', prefix: 'red' },
  { label: 'Orange', prefix: 'orange' },
  { label: 'Yellow', prefix: 'yellow' },
  { label: 'Green', prefix: 'green' },
  { label: 'Teal', prefix: 'teal' },
  { label: 'Blue', prefix: 'blue' },
  { label: 'Purple', prefix: 'purple' },
  { label: 'Pink', prefix: 'pink' },
] as const

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
            {COLOR_CATEGORIES.map(({ label, prefix }) => (
              <div key={prefix}>
                <h3>{label}</h3>
                <div className={styles.colorGrid}>
                  {(prefix === 'neutral' ? NEUTRAL_SHADES : SHADES).map((shade) => {
                    const cssVar = `var(--color-${prefix}-${shade})`
                    return (
                      <ColorSwatch
                        key={shade}
                        name={String(shade)}
                        hex={(paletteHex[prefix] as Record<number, string>)[shade]}
                        cssVar={cssVar}
                      />
                    )
                  })}
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  )
}

export default App
