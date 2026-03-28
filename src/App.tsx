import { useState, type ReactNode } from 'react'
import styles from './App.module.css'
import { paletteHex } from './paletteHex'
import { typography, fontSizeScaleOrder, textStyles, type TextStyleName } from './typography'

const FONT_FAMILY_KEYS = ['body', 'heading', 'mono'] as const
const FONT_WEIGHT_KEYS = ['regular', 'medium', 'semibold', 'bold'] as const
const LINE_HEIGHT_KEYS = ['tight', 'snug', 'normal', 'relaxed'] as const
const LETTER_SPACING_KEYS = ['tight', 'normal', 'wide'] as const

const TEXT_STYLE_ORDER: TextStyleName[] = [
  'bodySm',
  'bodyMd',
  'labelSm',
  'headingSm',
  'headingMd',
  'headingLg',
]

const TEXT_STYLE_PREVIEW: Record<TextStyleName, string> = {
  bodySm: 'The quick brown fox jumps over the lazy dog.',
  bodyMd: 'The quick brown fox jumps over the lazy dog.',
  labelSm: 'Label',
  headingSm: 'Section title',
  headingMd: 'Page title',
  headingLg: 'Display heading',
}

function TypeTokenRow({
  label,
  meta,
  copyText,
  children,
}: {
  label: string
  meta: string
  copyText: string
  children: ReactNode
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      className={styles.typeRow}
      onClick={handleCopy}
      aria-label={`Copy ${copyText}`}
    >
      <div className={styles.typeRowMain}>
        <span className={styles.typeRowLabel}>{label}</span>
        <span className={styles.typeRowSample}>{children}</span>
        <span className={styles.typeRowMeta}>{meta}</span>
      </div>
      <span className={styles.typeRowVar}>{copied ? 'Copied!' : copyText}</span>
    </button>
  )
}

function TextStyleCard({ name }: { name: TextStyleName }) {
  const [copied, setCopied] = useState(false)
  const snippet = `textStyles.${name}`

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      className={styles.typeStyleCard}
      onClick={handleCopy}
      aria-label={`Copy ${snippet}`}
    >
      <p className={styles.typeStylePreview} style={{ ...textStyles[name], margin: 0 }}>
        {TEXT_STYLE_PREVIEW[name]}
      </p>
      <p className={styles.typeStyleName}>{copied ? 'Copied!' : snippet}</p>
    </button>
  )
}

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

/** Hex labels mirror semantic-tokens.css → keep in sync when tokens change. */
const SEMANTIC_TOKEN_GROUPS = [
  {
    label: 'Background',
    tokens: [
      { name: 'page', token: 'background-page', hex: paletteHex.neutral[100] },
      { name: 'surface', token: 'background-surface', hex: paletteHex.neutral[0] },
      { name: 'elevated', token: 'background-elevated', hex: paletteHex.neutral[0] },
      { name: 'inverse', token: 'background-inverse', hex: paletteHex.neutral[900] },
    ],
  },
  {
    label: 'Text',
    tokens: [
      { name: 'primary', token: 'text-primary', hex: paletteHex.neutral[900] },
      { name: 'secondary', token: 'text-secondary', hex: paletteHex.neutral[600] },
      { name: 'muted', token: 'text-muted', hex: paletteHex.neutral[500] },
      { name: 'inverse', token: 'text-inverse', hex: paletteHex.neutral[0] },
      { name: 'danger', token: 'text-danger', hex: paletteHex.red[600] },
    ],
  },
  {
    label: 'Border',
    tokens: [
      { name: 'subtle', token: 'border-subtle', hex: paletteHex.neutral[100] },
      { name: 'default', token: 'border-default', hex: paletteHex.neutral[300] },
      { name: 'strong', token: 'border-strong', hex: paletteHex.neutral[500] },
      { name: 'focus', token: 'border-focus', hex: paletteHex.blue[500] },
    ],
  },
  {
    label: 'Action',
    tokens: [
      { name: 'primary', token: 'action-primary', hex: paletteHex.blue[600] },
      { name: 'primary hover', token: 'action-primary-hover', hex: paletteHex.blue[500] },
      { name: 'primary active', token: 'action-primary-active', hex: paletteHex.blue[700] },
      { name: 'primary disabled', token: 'action-primary-disabled', hex: paletteHex.neutral[300] },
    ],
  },
  {
    label: 'Feedback',
    tokens: [
      { name: 'success', token: 'feedback-success', hex: paletteHex.green[500] },
      { name: 'warning', token: 'feedback-warning', hex: paletteHex.yellow[500] },
      { name: 'danger', token: 'feedback-danger', hex: paletteHex.red[500] },
      { name: 'info', token: 'feedback-info', hex: paletteHex.blue[500] },
    ],
  },
  {
    label: 'Focus',
    tokens: [{ name: 'ring', token: 'focus-ring', hex: paletteHex.blue[500] }],
  },
] as const

const SPACE_TOKENS = [
  { label: 'xs', token: 'xs', px: '4px' },
  { label: 'sm', token: 'sm', px: '8px' },
  { label: 'md', token: 'md', px: '12px' },
  { label: 'lg', token: 'lg', px: '16px' },
  { label: 'xl', token: 'xl', px: '24px' },
  { label: '2xl', token: '2xl', px: '32px' },
  { label: '3xl', token: '3xl', px: '40px' },
  { label: '4xl', token: '4xl', px: '48px' },
] as const

const RADIUS_TOKENS = [
  { label: 'none', token: 'none', value: '0px' },
  { label: 'xs', token: 'xs', value: '2px' },
  { label: 'sm', token: 'sm', value: '4px' },
  { label: 'md', token: 'md', value: '8px' },
  { label: 'lg', token: 'lg', value: '12px' },
  { label: 'xl', token: 'xl', value: '16px' },
  { label: 'full', token: 'full', value: '9999px' },
] as const

function RadiusSwatch({ label, token, value }: { label: string; token: string; value: string }) {
  const cssVar = `var(--radius-${token})`
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(cssVar)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      className={styles.radiusItem}
      onClick={handleCopy}
      aria-label={`Kopiera ${cssVar} (${value})`}
    >
      <div
        className={styles.radiusShape}
        style={{ borderRadius: cssVar }}
        aria-hidden
      />
      <span className={styles.radiusItemLabel}>{label}</span>
      <span className={styles.radiusItemValue}>{copied ? 'Copied!' : value}</span>
    </button>
  )
}

function SpaceSwatch({ label, token, px }: { label: string; token: string; px: string }) {
  const cssVar = `var(--space-${token})`
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(cssVar)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      className={styles.spaceItem}
      onClick={handleCopy}
      aria-label={`Kopiera ${cssVar} (${px})`}
    >
      <div className={styles.spaceSquare} style={{ width: cssVar, height: cssVar }} aria-hidden />
      <span className={styles.spaceItemLabel}>{label}</span>
      <span className={styles.spaceItemPx}>{copied ? 'Copied!' : px}</span>
    </button>
  )
}

function App() {
  const anchorlinks = [
    { id: 'colors', label: 'Color' },
    { id: 'semantic-colors', label: 'Semantic color' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'radius', label: 'Radius' },
    { id: 'typography', label: 'Typography' },
  ]
  return (
    <>
      <header className={styles.header}>
        <img src="assets/rtsByKihl.png" height={50} alt="" />
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
          <section className={styles.section}>
            <h2 id="colors">Color</h2>
            {COLOR_CATEGORIES.map(({ label, prefix }) => (
              <div key={prefix}>
                <h3 className={styles.subHeading}>{label}</h3>
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
          <section className={styles.section}>
            <h2 id="semantic-colors">Semantic color</h2>

            {SEMANTIC_TOKEN_GROUPS.map(({ label, tokens }) => (
              <div key={label}>
                <h3 className={styles.subHeading}>{label}</h3>
                <div className={styles.colorGrid}>
                  {tokens.map(({ name, token, hex }) => {
                    const cssVar = `var(--color-${token})`
                    return <ColorSwatch key={token} name={name} hex={hex} cssVar={cssVar} />
                  })}
                </div>
              </div>
            ))}
          </section>
          <section className={styles.section}>
            <h2 id="spacing">Spacing</h2>
            <div className={styles.spaceGrid}>
              {SPACE_TOKENS.map(({ label, token, px }) => (
                <SpaceSwatch key={token} label={label} token={token} px={px} />
              ))}
            </div>
          </section>
          <section className={styles.section}>
            <h2 id="radius">Radius</h2>
            <div className={styles.radiusGrid}>
              {RADIUS_TOKENS.map(({ label, token, value }) => (
                <RadiusSwatch key={token} label={label} token={token} value={value} />
              ))}
            </div>
          </section>
          <section className={styles.section}>
            <h2 id="typography">Typography</h2>
            <p className={styles.typeBlockIntro}>
              Primitives match <code>typography-tokens.css</code> and <code>tokens/typography.ts</code>. Click a row
              to copy a CSS variable; text style cards copy the <code>textStyles.*</code> key for use in React.
            </p>

            <div className={styles.typeBlock}>
              <h3 className={styles.subHeading}>Font family</h3>
              {FONT_FAMILY_KEYS.map((key) => (
                <TypeTokenRow
                  key={key}
                  label={key}
                  meta={typography.fontFamily[key]}
                  copyText={`var(--font-family-${key})`}
                >
                  <span style={{ fontFamily: typography.fontFamily[key] }}>
                    The quick brown fox jumps over the lazy dog.
                  </span>
                </TypeTokenRow>
              ))}
            </div>

            <div className={styles.typeBlock}>
              <h3 className={styles.subHeading}>Font size</h3>
              {fontSizeScaleOrder.map((key) => (
                <TypeTokenRow
                  key={key}
                  label={key}
                  meta={typography.fontSize[key]}
                  copyText={`var(--font-size-${key})`}
                >
                  <span style={{ fontSize: typography.fontSize[key] }}>The quick brown fox</span>
                </TypeTokenRow>
              ))}
            </div>

            <div className={styles.typeBlock}>
              <h3 className={styles.subHeading}>Font weight</h3>
              {FONT_WEIGHT_KEYS.map((key) => (
                <TypeTokenRow
                  key={key}
                  label={key}
                  meta={String(typography.fontWeight[key])}
                  copyText={`var(--font-weight-${key})`}
                >
                  <span
                    style={{
                      fontWeight: typography.fontWeight[key],
                      fontSize: typography.fontSize.xl,
                    }}
                  >
                    Aa Bb Cc 012
                  </span>
                </TypeTokenRow>
              ))}
            </div>

            <div className={styles.typeBlock}>
              <h3 className={styles.subHeading}>Line height</h3>
              {LINE_HEIGHT_KEYS.map((key) => (
                <TypeTokenRow
                  key={key}
                  label={key}
                  meta={String(typography.lineHeight[key])}
                  copyText={`var(--line-height-${key})`}
                >
                  <span
                    style={{
                      fontSize: typography.fontSize.sm,
                      lineHeight: typography.lineHeight[key],
                      display: 'block',
                      maxWidth: '22rem',
                    }}
                  >
                    Line one. Line two. Line three so you can see how the rhythm feels in a short paragraph.
                  </span>
                </TypeTokenRow>
              ))}
            </div>

            <div className={styles.typeBlock}>
              <h3 className={styles.subHeading}>Letter spacing</h3>
              {LETTER_SPACING_KEYS.map((key) => (
                <TypeTokenRow
                  key={key}
                  label={key}
                  meta={typography.letterSpacing[key]}
                  copyText={`var(--letter-spacing-${key})`}
                >
                  <span
                    style={{
                      fontFamily: typography.fontFamily.heading,
                      fontSize: typography.fontSize['2xl'],
                      fontWeight: typography.fontWeight.semibold,
                      letterSpacing: typography.letterSpacing[key],
                    }}
                  >
                    Heading sample
                  </span>
                </TypeTokenRow>
              ))}
            </div>

            <div className={styles.typeBlock}>
              <h3 className={styles.subHeading}>Text styles</h3>
              <p className={styles.typeBlockIntro}>
                Composed presets from <code>tokens/text-styles.ts</code>. In React:{' '}
                <code>{'{ ...textStyles.bodyMd }'}</code> on <code>style</code>, or map to CSS classes later.
              </p>
              {TEXT_STYLE_ORDER.map((name) => (
                <TextStyleCard key={name} name={name} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default App
