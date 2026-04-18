import { useState, type ReactNode } from 'react'
import styles from './App.module.css'
import { paletteHex } from './paletteHex'
import { Button } from './ui/Button/Button'
import { Input } from './ui/Input/Input'
import { SearchIcon } from 'lucide-react'
import { Select } from './ui/Select/Select'
import { DatePicker } from './ui/DatePicker/DatePicker'
import { DateRangePicker } from './ui/DateRangePicker/DateRangePicker'
import { Radio } from './ui/Radio/Radio'
import { Checkbox } from './ui/Checkbox/Checkbox'
import { Textarea } from './ui/Textarea/Textarea'
import { Toggle } from './ui/Toggle/Toggle'

const FONT_FAMILY_KEYS = ['body', 'heading', 'mono'] as const
const FONT_WEIGHT_KEYS = ['regular', 'medium', 'semibold', 'bold'] as const
const LINE_HEIGHT_KEYS = ['tight', 'snug', 'normal', 'relaxed'] as const
const LETTER_SPACING_KEYS = ['tight', 'normal', 'wide'] as const

const FONT_SIZE_ORDER = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'] as const

/** Literal values shown next to each token in the docs (mirror typography-tokens.css). */
const FONT_FAMILY_LITERALS: Record<(typeof FONT_FAMILY_KEYS)[number], string> = {
  body: 'Inter, sans-serif',
  heading: 'Inter, sans-serif',
  mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
}

const FONT_SIZE_LITERALS: Record<(typeof FONT_SIZE_ORDER)[number], string> = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '30px',
  '4xl': '36px',
}

const FONT_WEIGHT_LITERALS: Record<(typeof FONT_WEIGHT_KEYS)[number], string> = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
}

const LINE_HEIGHT_LITERALS: Record<(typeof LINE_HEIGHT_KEYS)[number], string> = {
  tight: '1.2',
  snug: '1.35',
  normal: '1.5',
  relaxed: '1.7',
}

const LETTER_SPACING_LITERALS: Record<(typeof LETTER_SPACING_KEYS)[number], string> = {
  tight: '-0.02em',
  normal: '0',
  wide: '0.02em',
}

const BREAKPOINT_ORDER = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const

const BREAKPOINT_LITERALS: Record<(typeof BREAKPOINT_ORDER)[number], string> = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

const MOTION_DURATION_ORDER = ['fast', 'normal', 'slow'] as const
const MOTION_DURATION_LITERALS: Record<(typeof MOTION_DURATION_ORDER)[number], string> = {
  fast: '100ms',
  normal: '200ms',
  slow: '300ms',
}

const MOTION_EASING_ORDER = ['standard', 'smooth'] as const
const MOTION_EASING_LITERALS: Record<(typeof MOTION_EASING_ORDER)[number], string> = {
  standard: 'ease',
  smooth: 'ease-out',
}

const Z_INDEX_ORDER = [
  'base',
  'dropdown',
  'sticky',
  'overlay',
  'modal',
  'popover',
  'tooltip',
] as const

const Z_INDEX_LITERALS: Record<(typeof Z_INDEX_ORDER)[number], string> = {
  base: '0',
  dropdown: '1000',
  sticky: '1100',
  overlay: '1200',
  modal: '1300',
  popover: '1400',
  tooltip: '1500',
}

const OPACITY_ORDER = ['disabled', 'muted', 'subtle', 'overlay'] as const

const OPACITY_LITERALS: Record<(typeof OPACITY_ORDER)[number], string> = {
  disabled: '0.5',
  muted: '0.7',
  subtle: '0.85',
  overlay: '0.6',
}

const BUTTON_VARIANTS = ['primary', 'secondary', 'tertiary', 'ghost'] as const
const BUTTON_SIZES = ['sm', 'md', 'lg'] as const

/** Simple icons for the Button docs (currentColor follows button text). */
function ButtonDocIcon({ direction }: { direction: 'left' | 'right' }) {
  const d =
    direction === 'left'
      ? 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'
      : 'M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z'
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d={d} />
    </svg>
  )
}

const TEXT_STYLES_DOC = [
  { className: 'text-body-sm', preview: 'The quick brown fox jumps over the lazy dog.' },
  { className: 'text-body-md', preview: 'The quick brown fox jumps over the lazy dog.' },
  { className: 'text-label-sm', preview: 'Label' },
  { className: 'text-heading-sm', preview: 'Section title' },
  { className: 'text-heading-md', preview: 'Page title' },
  { className: 'text-heading-lg', preview: 'Display heading' },
] as const

function TypeTokenRow({
  label,
  literal,
  copyText,
  children,
}: {
  label: string
  /** Human-readable value for the docs column (e.g. 12px, 400, font stack). */
  literal: string
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
        <span className={styles.typeRowLiteral}>{literal}</span>
      </div>
      <span className={styles.typeRowVar}>{copied ? 'Copied!' : copyText}</span>
    </button>
  )
}

function TextStyleCard({ className, preview }: { className: string; preview: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(className)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      className={styles.typeStyleCard}
      onClick={handleCopy}
      aria-label={`Copy class ${className}`}
    >
      <p className={`${styles.typeStylePreview} ${className}`} style={{ margin: 0 }}>
        {preview}
      </p>
      <p className={styles.typeStyleName}>{copied ? 'Copied!' : className}</p>
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

const SHADOW_TOKENS = [
  { label: 'none', token: 'none', blurb: 'none' },
  { label: 'xs', token: 'xs', blurb: '0 1px 2px · 5%' },
  { label: 'sm', token: 'sm', blurb: '0 2px 4px · 6%' },
  { label: 'md', token: 'md', blurb: '0 4px 8px · 8%' },
  { label: 'lg', token: 'lg', blurb: '0 10px 24px · 12%' },
  { label: 'xl', token: 'xl', blurb: '0 20px 40px · 16%' },
] as const

function ShadowSwatch({ label, token, blurb }: { label: string; token: string; blurb: string }) {
  const cssVar = `var(--shadow-${token})`
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(cssVar)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      className={styles.shadowItem}
      onClick={handleCopy}
      aria-label={`Kopiera ${cssVar}`}
    >
      <div className={styles.shadowTileWrap}>
        <div className={styles.shadowTile} style={{ boxShadow: cssVar }} aria-hidden />
      </div>
      <span className={styles.shadowItemLabel}>{label}</span>
      <span className={styles.shadowItemBlurb}>{copied ? 'Copied!' : blurb}</span>
    </button>
  )
}

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
      <div className={styles.radiusShape} style={{ borderRadius: cssVar }} aria-hidden />
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
  const [selectedRadio, setSelectedRadio] = useState('')
  const [selectedRadioStates, setSelectedRadioStates] = useState('')
  const [checkbox1, setCheckbox1] = useState(false)
  const [checkbox2, setCheckbox2] = useState(true)
  const [toggle1, setToggle1] = useState(false)
  const [toggle2, setToggle2] = useState(true)
  const anchorlinks = [
    { id: 'colors', label: 'Color' },
    { id: 'semantic-colors', label: 'Semantic color' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'radius', label: 'Radius' },
    { id: 'shadow', label: 'Shadow' },
    { id: 'breakpoints', label: 'Breakpoints' },
    { id: 'motion', label: 'Motion' },
    { id: 'z-index', label: 'Z-index' },
    { id: 'opacity', label: 'Opacity' },
    { id: 'typography', label: 'Typography' },
    { id: 'button', label: 'Button' },
    { id: 'input', label: 'Input' },
    { id: 'select', label: 'Select' },
    { id: 'date-pickers', label: 'Date Pickers' },
    { id: 'radio', label: 'Radio' },
    { id: 'checkbox', label: 'Checkbox' },
    { id: 'textarea', label: 'Textarea' },
    { id: 'toggle', label: 'Toggle' },
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
            <h2 id="shadow">Shadow</h2>
            <div className={styles.shadowGrid}>
              {SHADOW_TOKENS.map(({ label, token, blurb }) => (
                <ShadowSwatch key={token} label={label} token={token} blurb={blurb} />
              ))}
            </div>
          </section>
          <section className={styles.section}>
            <h2 id="breakpoints">Breakpoints</h2>

            <div className={styles.typeBlock}>
              {BREAKPOINT_ORDER.map((key) => (
                <TypeTokenRow
                  key={key}
                  label={key}
                  literal={BREAKPOINT_LITERALS[key]}
                  copyText={`var(--breakpoint-${key})`}
                >
                  <span>Viewport ≥ {BREAKPOINT_LITERALS[key]} — typisk min-width-gräns</span>
                </TypeTokenRow>
              ))}
            </div>
          </section>
          <section className={styles.section}>
            <h2 id="motion">Motion</h2>
            <p className={styles.typeBlockIntro}>
              Tokens in <code>motion-tokens.css</code>. Use in <code>transition</code> /{' '}
              <code>animation</code>, e.g.{' '}
              <code>
                {'transition: opacity var(--motion-duration-normal) var(--motion-easing-smooth);'}
              </code>
            </p>
            <div className={styles.typeBlock}>
              <h3 className={styles.subHeading}>Duration</h3>
              {MOTION_DURATION_ORDER.map((key) => (
                <TypeTokenRow
                  key={key}
                  label={key}
                  literal={MOTION_DURATION_LITERALS[key]}
                  copyText={`var(--motion-duration-${key})`}
                >
                  <span>transition-duration</span>
                </TypeTokenRow>
              ))}
            </div>
            <div className={styles.typeBlock}>
              <h3 className={styles.subHeading}>Easing</h3>
              {MOTION_EASING_ORDER.map((key) => (
                <TypeTokenRow
                  key={key}
                  label={key}
                  literal={MOTION_EASING_LITERALS[key]}
                  copyText={`var(--motion-easing-${key})`}
                >
                  <span>transition-timing-function</span>
                </TypeTokenRow>
              ))}
            </div>
          </section>
          <section className={styles.section}>
            <h2 id="z-index">Z-index</h2>
            <p className={styles.typeBlockIntro}>
              Tokens in <code>z-index-tokens.css</code>. Use{' '}
              <code>z-index: var(--z-index-modal);</code> (or{' '}
              <code>calc(var(--z-index-modal) + 1)</code> for a child layer).
            </p>
            <div className={styles.typeBlock}>
              {Z_INDEX_ORDER.map((key) => (
                <TypeTokenRow
                  key={key}
                  label={key}
                  literal={Z_INDEX_LITERALS[key]}
                  copyText={`var(--z-index-${key})`}
                >
                  <span>stacking layer</span>
                </TypeTokenRow>
              ))}
            </div>
          </section>
          <section className={styles.section}>
            <h2 id="opacity">Opacity</h2>
            <p className={styles.typeBlockIntro}>
              Tokens in <code>opacity-tokens.css</code>. Use{' '}
              <code>opacity: var(--opacity-disabled);</code> or in{' '}
              <code>color: rgb(0 0 0 / var(--opacity-overlay))</code> for overlays.
            </p>
            <div className={styles.typeBlock}>
              {OPACITY_ORDER.map((key) => (
                <TypeTokenRow
                  key={key}
                  label={key}
                  literal={OPACITY_LITERALS[key]}
                  copyText={`var(--opacity-${key})`}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      minWidth: '4rem',
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: 'var(--color-teal-600)',
                      opacity: `var(--opacity-${key})`,
                    }}
                  >
                    sample
                  </span>
                </TypeTokenRow>
              ))}
            </div>
          </section>
          <section className={styles.section}>
            <h2 id="typography">Typography</h2>

            <div className={styles.typeBlock}>
              <h3 className={styles.subHeading}>Font family</h3>
              {FONT_FAMILY_KEYS.map((key) => (
                <TypeTokenRow
                  key={key}
                  label={key}
                  literal={FONT_FAMILY_LITERALS[key]}
                  copyText={`var(--font-family-${key})`}
                >
                  <span style={{ fontFamily: `var(--font-family-${key})` }}>
                    The quick brown fox jumps over the lazy dog.
                  </span>
                </TypeTokenRow>
              ))}
            </div>

            <div className={styles.typeBlock}>
              <h3 className={styles.subHeading}>Font size</h3>
              {FONT_SIZE_ORDER.map((key) => (
                <TypeTokenRow
                  key={key}
                  label={key}
                  literal={FONT_SIZE_LITERALS[key]}
                  copyText={`var(--font-size-${key})`}
                >
                  <span style={{ fontSize: `var(--font-size-${key})` }}>The quick brown fox</span>
                </TypeTokenRow>
              ))}
            </div>

            <div className={styles.typeBlock}>
              <h3 className={styles.subHeading}>Font weight</h3>
              {FONT_WEIGHT_KEYS.map((key) => (
                <TypeTokenRow
                  key={key}
                  label={key}
                  literal={FONT_WEIGHT_LITERALS[key]}
                  copyText={`var(--font-weight-${key})`}
                >
                  <span
                    style={{
                      fontWeight: `var(--font-weight-${key})`,
                      fontSize: 'var(--font-size-xl)',
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
                  literal={LINE_HEIGHT_LITERALS[key]}
                  copyText={`var(--line-height-${key})`}
                >
                  <span
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      lineHeight: `var(--line-height-${key})`,
                      display: 'block',
                      maxWidth: '22rem',
                    }}
                  >
                    Line one. Line two. Line three so you can see how the rhythm feels in a short
                    paragraph.
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
                  literal={LETTER_SPACING_LITERALS[key]}
                  copyText={`var(--letter-spacing-${key})`}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-family-heading)',
                      fontSize: 'var(--font-size-2xl)',
                      fontWeight: 'var(--font-weight-semibold)',
                      letterSpacing: `var(--letter-spacing-${key})`,
                    }}
                  >
                    Heading sample
                  </span>
                </TypeTokenRow>
              ))}
            </div>

            <div className={styles.typeBlock}>
              <h3 className={styles.subHeading}>Text styles</h3>

              {TEXT_STYLES_DOC.map(({ className, preview }) => (
                <TextStyleCard key={className} className={className} preview={preview} />
              ))}
            </div>
          </section>
          <section className={styles.section}>
            <h2 id="button">Button</h2>
            <div className={styles.buttonShowcase}>
              <p className={styles.typeBlockIntro}>
                Component: <code>ui/Button/Button</code>. Rows are variants, columns are sizes.
                Labels in the grid are only for the docs.
              </p>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>Variants and sizes</h3>
                <div
                  className={styles.buttonMatrix}
                  role="grid"
                  aria-label="Button variants (rows) and sizes (columns)"
                >
                  <div className={styles.buttonMatrixRow} role="row">
                    <div className={styles.buttonMatrixCorner} aria-hidden />
                    {BUTTON_SIZES.map((size) => (
                      <div key={size} className={styles.buttonMatrixColHead} role="columnheader">
                        {size}
                      </div>
                    ))}
                  </div>
                  {BUTTON_VARIANTS.map((variant) => (
                    <div key={variant} className={styles.buttonMatrixRow} role="row">
                      <div className={styles.buttonMatrixRowLabel} role="rowheader">
                        {variant}
                      </div>
                      {BUTTON_SIZES.map((size) => (
                        <div key={size} className={styles.buttonMatrixCell} role="gridcell">
                          <Button variant={variant} size={size}>
                            Click here
                          </Button>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>With icons</h3>
                <p className={styles.buttonDocHint}>
                  Use <code>iconLeft</code> and <code>iconRight</code> with any{' '}
                  <code>ReactNode</code> (here: inline SVG).
                </p>
                <div className={styles.buttonStateRow}>
                  <Button variant="primary" size="md" iconLeft={<ButtonDocIcon direction="left" />}>
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    iconRight={<ButtonDocIcon direction="right" />}
                  >
                    Next
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    iconLeft={<ButtonDocIcon direction="left" />}
                    iconRight={<ButtonDocIcon direction="right" />}
                  >
                    Both
                  </Button>
                  <Button variant="ghost" size="sm" iconRight={<ButtonDocIcon direction="right" />}>
                    Small + icon
                  </Button>
                </div>
              </div>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>States</h3>
                <p className={styles.buttonDocHint}>Disabled, loading, and a full-width example.</p>
                <div className={styles.buttonStateRow}>
                  <Button variant="primary" size="md" disabled>
                    Disabled
                  </Button>
                  <Button variant="primary" size="md" loading>
                    Loading
                  </Button>
                  <Button variant="secondary" size="md" disabled>
                    Disabled
                  </Button>
                </div>
              </div>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>Full width</h3>
                <p className={styles.buttonDocHint}>Narrow container so stretch is visible.</p>
                <div className={styles.buttonFullWidthShell}>
                  <Button variant="primary" size="md" fullWidth>
                    Full width
                  </Button>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.section}>
            <h2 id="input">Input</h2>
            <div className={styles.buttonShowcase}>
              <p className={styles.typeBlockIntro}>
                Component: <code>ui/Input/Input</code>. Supports label, placeholder, icon, invalid
                state, disabled, and full width.
              </p>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>Default</h3>
                <p className={styles.buttonDocHint}>With label and icon, and without icon.</p>
                <div className={styles.buttonStateRow}>
                  <Input
                    id="input-default"
                    label="Search"
                    placeholder="Search…"
                    icon={<SearchIcon />}
                  />
                  <Input id="input-no-icon" label="Name" placeholder="Enter your name" />
                </div>
              </div>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>States</h3>
                <p className={styles.buttonDocHint}>Disabled, invalid, and invalid + disabled.</p>
                <div className={styles.buttonStateRow}>
                  <Input
                    id="input-disabled"
                    label="Email"
                    placeholder="Enter your email"
                    icon={<SearchIcon />}
                    disabled
                  />
                  <Input
                    id="input-invalid"
                    label="Email"
                    placeholder="Enter your email"
                    icon={<SearchIcon />}
                    invalid
                    errorMessage="This field is required"
                  />
                  <Input
                    id="input-invalid-disabled"
                    label="Email"
                    placeholder="Enter your email"
                    icon={<SearchIcon />}
                    invalid
                    disabled
                    errorMessage="This field is required"
                  />
                </div>
              </div>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>Full width</h3>
                <p className={styles.buttonDocHint}>Narrow container so stretch is visible.</p>
                <div className={styles.buttonFullWidthShell}>
                  <Input
                    id="input-fullwidth"
                    label="Search"
                    placeholder="Search…"
                    icon={<SearchIcon />}
                    fullWidth
                  />
                </div>
              </div>
            </div>
          </section>
          <section className={styles.section}>
            <h2 id="select">Select</h2>
            <div className={styles.buttonShowcase}>
              <p className={styles.typeBlockIntro}>
                Component: <code>ui/Select/Select</code>. Supports label, placeholder, options,
                invalid state, disabled, and full width.
              </p>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>Default</h3>
                <p className={styles.buttonDocHint}>With label and placeholder.</p>
                <div className={styles.buttonStateRow}>
                  <Select
                    id="select-default"
                    label="Country"
                    options={[
                      { label: 'Sweden', value: 'se' },
                      { label: 'Norway', value: 'no' },
                      { label: 'Denmark', value: 'dk' },
                    ]}
                  />
                  <Select
                    id="select-default-2"
                    label="Language"
                    options={[
                      { label: 'Swedish', value: 'sv' },
                      { label: 'English', value: 'en' },
                      { label: 'Norwegian', value: 'nb' },
                    ]}
                  />
                </div>
              </div>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>States</h3>
                <p className={styles.buttonDocHint}>Disabled, invalid, and invalid + disabled.</p>
                <div className={styles.buttonStateRow}>
                  <Select
                    id="select-disabled"
                    label="Country"
                    disabled
                    options={[
                      { label: 'Sweden', value: 'se' },
                      { label: 'Norway', value: 'no' },
                    ]}
                  />
                  <Select
                    id="select-invalid"
                    label="Country"
                    invalid
                    errorMessage="This field is required"
                    options={[
                      { label: 'Sweden', value: 'se' },
                      { label: 'Norway', value: 'no' },
                    ]}
                  />
                  <Select
                    id="select-invalid-disabled"
                    label="Country"
                    invalid
                    disabled
                    errorMessage="This field is required"
                    options={[
                      { label: 'Sweden', value: 'se' },
                      { label: 'Norway', value: 'no' },
                    ]}
                  />
                </div>
              </div>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>Full width</h3>
                <p className={styles.buttonDocHint}>Narrow container so stretch is visible.</p>
                <div className={styles.buttonFullWidthShell}>
                  <Select
                    id="select-fullwidth"
                    label="Country"
                    fullWidth
                    options={[
                      { label: 'Sweden', value: 'se' },
                      { label: 'Norway', value: 'no' },
                      { label: 'Denmark', value: 'dk' },
                    ]}
                  />
                </div>
              </div>
            </div>
          </section>
          <section className={styles.section}>
            <h2 id="date-pickers">Date Pickers</h2>
            <div className={styles.buttonShowcase}>
              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>Single date picker</h3>
                <p className={styles.buttonDocHint}>Default, disabled, and invalid states.</p>
                <div className={styles.buttonStateRow}>
                  <DatePicker id="date-picker-default" label="Date" />
                  <DatePicker id="date-picker-disabled" label="Date" disabled />
                  <DatePicker
                    id="date-picker-invalid"
                    label="Date"
                    invalid
                    errorMessage="This field is required"
                  />
                </div>
              </div>
              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>Date range picker</h3>
                <p className={styles.buttonDocHint}>Default, disabled, and invalid states.</p>
                <div className={styles.buttonDocBlock}>
                  <DateRangePicker
                    idFrom="range-from"
                    idTo="range-to"
                    labelFrom="From"
                    labelTo="To"
                  />
                </div>
                <div className={styles.buttonDocBlock}>
                  <DateRangePicker
                    idFrom="range-from-disabled"
                    idTo="range-to-disabled"
                    labelFrom="From"
                    labelTo="To"
                    disabled
                  />
                </div>
                <div className={styles.buttonDocBlock}>
                  <DateRangePicker
                    idFrom="range-from-invalid"
                    idTo="range-to-invalid"
                    labelFrom="From"
                    labelTo="To"
                    invalid
                    errorMessage="This field is required"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className={styles.section}>
            <h2 id="radio">Radio</h2>
            <div className={styles.buttonShowcase}>
              <p className={styles.typeBlockIntro}>
                Component: <code>ui/Radio/Radio</code>. Supports label, invalid state and disabled.
              </p>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>Default</h3>
                <p className={styles.buttonDocHint}>A group of radio buttons sharing the same name.</p>
                <div className={styles.buttonStateRow}>
                  <div>
                    <Radio
                      id="radio-1"
                      name="radio-default"
                      value="1"
                      label="Option one"
                      checked={selectedRadio === '1'}
                      onChange={setSelectedRadio}
                    />
                    <Radio
                      id="radio-2"
                      name="radio-default"
                      value="2"
                      label="Option two"
                      checked={selectedRadio === '2'}
                      onChange={setSelectedRadio}
                    />
                    <Radio
                      id="radio-3"
                      name="radio-default"
                      value="3"
                      label="Option three"
                      checked={selectedRadio === '3'}
                      onChange={setSelectedRadio}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>States</h3>
                <p className={styles.buttonDocHint}>Disabled and invalid.</p>
                <div className={styles.buttonStateRow}>
                  <div>
                    <Radio
                      id="radio-disabled-1"
                      name="radio-disabled"
                      value="1"
                      label="Disabled unchecked"
                      onChange={setSelectedRadioStates}
                      disabled
                    />
                    <Radio
                      id="radio-disabled-2"
                      name="radio-disabled"
                      value="2"
                      label="Disabled checked"
                      checked
                      onChange={setSelectedRadioStates}
                      disabled
                    />
                  </div>
                  <div>
                    <Radio
                      id="radio-invalid-1"
                      name="radio-invalid"
                      value="invalid-1"
                      label="Invalid option"
                      checked={selectedRadioStates === 'invalid-1'}
                      onChange={setSelectedRadioStates}
                      invalid
                    />
                    <Radio
                      id="radio-invalid-2"
                      name="radio-invalid"
                      value="invalid-2"
                      label="Another option"
                      checked={selectedRadioStates === 'invalid-2'}
                      onChange={setSelectedRadioStates}
                      invalid
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={styles.section}>
            <h2 id="checkbox">Checkbox</h2>
            <div className={styles.buttonShowcase}>
              <p className={styles.typeBlockIntro}>
                Component: <code>ui/Checkbox/Checkbox</code>. Supports label, invalid state and disabled.
              </p>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>Default</h3>
                <p className={styles.buttonDocHint}>Unchecked and checked.</p>
                <div className={styles.buttonStateRow}>
                  <Checkbox
                    id="checkbox-1"
                    label="Option one"
                    checked={checkbox1}
                    onChange={setCheckbox1}
                  />
                  <Checkbox
                    id="checkbox-2"
                    label="Option two"
                    checked={checkbox2}
                    onChange={setCheckbox2}
                  />
                </div>
              </div>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>States</h3>
                <p className={styles.buttonDocHint}>Disabled and invalid.</p>
                <div className={styles.buttonStateRow}>
                  <Checkbox id="checkbox-disabled" label="Disabled unchecked" disabled />
                  <Checkbox id="checkbox-disabled-checked" label="Disabled checked" checked disabled />
                  <Checkbox id="checkbox-invalid" label="Invalid" invalid />
                </div>
              </div>
            </div>
          </section>
          <section className={styles.section}>
            <h2 id="textarea">Textarea</h2>
            <div className={styles.buttonShowcase}>
              <p className={styles.typeBlockIntro}>
                Component: <code>ui/Textarea/Textarea</code>. Supports label, placeholder, invalid
                state, disabled, and full width.
              </p>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>Default</h3>
                <p className={styles.buttonDocHint}>With label.</p>
                <div className={styles.buttonStateRow}>
                  <Textarea id="textarea-default" label="Message" placeholder="Write your message…" />
                  <Textarea id="textarea-default-2" label="Description" placeholder="Write a description…" />
                </div>
              </div>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>Without label</h3>
                <p className={styles.buttonDocHint}>Label omitted, placeholder only.</p>
                <div className={styles.buttonStateRow}>
                  <Textarea id="textarea-no-label" placeholder="Write your message…" />
                </div>
              </div>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>States</h3>
                <p className={styles.buttonDocHint}>Disabled and invalid.</p>
                <div className={styles.buttonStateRow}>
                  <Textarea id="textarea-disabled" label="Message" placeholder="Write your message…" disabled />
                  <Textarea
                    id="textarea-invalid"
                    label="Message"
                    placeholder="Write your message…"
                    invalid
                    errorMessage="This field is required"
                  />
                </div>
              </div>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>Full width</h3>
                <p className={styles.buttonDocHint}>Narrow container so stretch is visible.</p>
                <div className={styles.buttonFullWidthShell}>
                  <Textarea id="textarea-fullwidth" label="Message" placeholder="Write your message…" fullWidth />
                </div>
              </div>
            </div>
          </section>
          <section className={styles.section}>
            <h2 id="toggle">Toggle</h2>
            <div className={styles.buttonShowcase}>
              <p className={styles.typeBlockIntro}>
                Component: <code>ui/Toggle/Toggle</code>. Supports label, disabled state.
              </p>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>Default</h3>
                <p className={styles.buttonDocHint}>Off and on.</p>
                <div className={styles.buttonStateRow}>
                  <Toggle id="toggle-1" label="Notifications" checked={toggle1} onChange={setToggle1} />
                  <Toggle id="toggle-2" label="Dark mode" checked={toggle2} onChange={setToggle2} />
                </div>
              </div>

              <div className={styles.buttonDocBlock}>
                <h3 className={styles.subHeading}>States</h3>
                <p className={styles.buttonDocHint}>Disabled off and disabled on.</p>
                <div className={styles.buttonStateRow}>
                  <Toggle id="toggle-disabled-off" label="Notifications" disabled />
                  <Toggle id="toggle-disabled-on" label="Dark mode" checked disabled />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default App
