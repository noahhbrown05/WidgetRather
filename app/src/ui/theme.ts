import type { TextStyle } from 'react-native';

/**
 * Widget Rather design tokens (ROADMAP 5.1, D-023: "design in code").
 *
 * Source of truth for colours: the palette Greg sampled from Noah's concept
 * mockups in prototype/index.html (lines 26-48), which reproduces
 * design/mockups/01 and 02. Change a colour here and every screen follows.
 *
 * The one rule the whole system hangs on (from the mockups, see Greg's
 * 2026-09-10 session): PINK always means option A, BLUE always means option B.
 * The colour names the option, never "your choice". Critter bandanas tint to
 * the same two colours after you vote (design/critters.md).
 */

export const colors = {
  // Text — near-black plum, never pure black, never white on pills.
  plum: '#1C1030',
  plum2: '#3B2E52',
  plum3: '#6B5F82',

  // Option A (pink).
  pink1: '#F9C2E6',
  pink2: '#F09BD2',
  pink3: '#EC85C8',
  barPink1: '#F58ACB',
  barPink2: '#EB6DB8',

  // Option B (blue).
  blue1: '#D5E4FB',
  blue2: '#BBD2F5',
  barBlue1: '#93B8F0',
  barBlue2: '#7BA3E8',

  // "Picked" marker — the magenta check disc.
  magenta: '#D6299B',

  // Surfaces.
  card: '#FCFAFE',
  cardTranslucent: 'rgba(255,255,255,0.82)',
  track: '#EDE7F7',
  lavChip: '#EDE6F8',
  divider: '#E4DCF2',
  white: '#FFFFFF',
} as const;

/** The two answer options. Every option-coloured thing keys off this. */
export type Option = 'a' | 'b';

export const optionColors: Record<Option, { light: string; deep: string; bar: [string, string] }> = {
  a: { light: colors.pink1, deep: colors.pink2, bar: [colors.barPink1, colors.barPink2] },
  b: { light: colors.blue1, deep: colors.blue2, bar: [colors.barBlue1, colors.barBlue2] },
};

/**
 * Critter body colours (design/critters.md: "8 pastels"). The roster left the
 * hex values as a design task; these are first picks, chosen to stay clearly
 * apart from the option pink and blue so the bandana tint always reads.
 */
export const critterBodies = {
  butter: '#FBEFC4',
  mint: '#CDEFDD',
  lilac: '#E3D7F5',
  peach: '#FBDCC8',
  skyGrey: '#D9E0EA',
  sage: '#DCE5CF',
  blushSand: '#EEDDD3',
  cloudWhite: '#E9E5EF', // a soft cloud grey; pure near-white had no silhouette on light backgrounds
} as const;
export type CritterBody = keyof typeof critterBodies;

/** Bandana before you vote is neutral lavender; after, it takes your option's colour. */
export const bandana = { neutral: colors.lavChip, a: colors.pink2, b: colors.blue2 } as const;

/**
 * Nunito, loaded at runtime with useFonts (works on web, no native rebuild —
 * https://docs.expo.dev/develop/user-interface/fonts/). Greg's prototype found
 * Nunito 900 is the closest free match to the mockup wordmark.
 */
export const fonts = {
  regular: 'Nunito_400Regular',
  semibold: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
  extrabold: 'Nunito_800ExtraBold',
  black: 'Nunito_900Black',
} as const;

export const type = {
  wordmark: { fontFamily: fonts.black, fontSize: 24, letterSpacing: -0.8, color: colors.plum },
  title: { fontFamily: fonts.black, fontSize: 22, letterSpacing: -0.6, color: colors.plum },
  heading: { fontFamily: fonts.black, fontSize: 17, letterSpacing: -0.4, color: colors.plum },
  question: { fontFamily: fonts.bold, fontSize: 15, color: colors.plum },
  body: { fontFamily: fonts.semibold, fontSize: 14, lineHeight: 20, color: colors.plum2 },
  label: { fontFamily: fonts.bold, fontSize: 12.5, color: colors.plum2 },
  caption: { fontFamily: fonts.semibold, fontSize: 11.5, color: colors.plum3 },
  number: { fontFamily: fonts.extrabold, fontSize: 12.5, color: colors.plum, fontVariant: ['tabular-nums'] },
} satisfies Record<string, TextStyle>;
export type TypeVariant = keyof typeof type;

export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 } as const;
export const radius = { sm: 10, md: 14, lg: 16, card: 22, pill: 999 } as const;

/** Background washes as CSS gradient strings (rendered via ./gradient). */
export const washes = {
  app: 'linear-gradient(170deg, #F8EDFA 0%, #F2ECFA 52%, #EBEDFA 100%)',
  card: 'linear-gradient(168deg, rgba(255,255,255,0.92), rgba(252,244,252,0.8))',
} as const;

export const shadow = {
  card: '0px 3px 14px rgba(60,40,84,0.08)',
  pill: '0px 2px 6px rgba(60,40,84,0.08)',
  check: '0px 1px 4px rgba(214,41,155,0.4)',
} as const;
