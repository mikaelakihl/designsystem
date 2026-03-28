export const typography = {
  fontFamily: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, monospace',
  },

  fontSize: {
    xs: '12px',
    sm: '14px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    '2xl': '24px',
    '3xl': '30px',
    '4xl': '36px',
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeight: {
    tight: 1.2,
    snug: 1.35,
    normal: 1.5,
    relaxed: 1.7,
  },

  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
  },
} as const

/** Stable order for docs / CSS (Object.keys order is not guaranteed for all tooling). */
export const fontSizeScaleOrder = [
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
] as const satisfies readonly (keyof typeof typography.fontSize)[]
