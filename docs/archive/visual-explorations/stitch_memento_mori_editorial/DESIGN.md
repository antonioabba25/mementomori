---
name: Stoic Editorial
colors:
  surface: '#fff9ee'
  surface-dim: '#dfd9d0'
  surface-bright: '#fff9ee'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f9f3e9'
  surface-container: '#f3ede3'
  surface-container-high: '#ede7de'
  surface-container-highest: '#e8e2d8'
  on-surface: '#1d1b16'
  on-surface-variant: '#4f453b'
  inverse-surface: '#33302a'
  inverse-on-surface: '#f6f0e6'
  outline: '#81756a'
  outline-variant: '#d2c4b7'
  surface-tint: '#785830'
  primary: '#74552d'
  on-primary: '#ffffff'
  primary-container: '#8f6d43'
  on-primary-container: '#fff9f7'
  inverse-primary: '#e9bf8f'
  secondary: '#6b5c4a'
  on-secondary: '#ffffff'
  secondary-container: '#f2dcc6'
  on-secondary-container: '#70604e'
  tertiary: '#67584a'
  on-tertiary: '#ffffff'
  tertiary-container: '#807161'
  on-tertiary-container: '#fffaf8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffddb7'
  primary-fixed-dim: '#e9bf8f'
  on-primary-fixed: '#2a1700'
  on-primary-fixed-variant: '#5e411b'
  secondary-fixed: '#f5dfc9'
  secondary-fixed-dim: '#d8c3ae'
  on-secondary-fixed: '#241a0c'
  on-secondary-fixed-variant: '#534434'
  tertiary-fixed: '#f3dfcc'
  tertiary-fixed-dim: '#d6c3b1'
  on-tertiary-fixed: '#241a0e'
  on-tertiary-fixed-variant: '#524437'
  background: '#fff9ee'
  on-background: '#1d1b16'
  surface-variant: '#e8e2d8'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Newsreader
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Newsreader
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Newsreader
    fontSize: 13px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  label-italic:
    fontFamily: Newsreader
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1'
spacing:
  unit: 8px
  container-max: 1040px
  gutter: 32px
  margin-edge: 64px
  section-gap: 128px
---

## Brand & Style

This design system is rooted in the philosophy of Roman Stoicism, emphasizing clarity, permanence, and intellectual rigor. It is designed for an audience that values deep work, reflection, and focused consumption over ephemeral trends. The aesthetic is strictly minimalist and editorial, mirroring the tactile experience of reading a leather-bound volume or a high-end literary journal.

The style is characterized by a "Quiet Sophistication." It avoids all digital artifices—such as saturated hues, synthetic gradients, or aggressive motion—in favor of a static, grounded presence. The interface should feel less like a software application and more like a carefully curated manuscript. It evokes a sense of calm, timelessness, and authoritative silence.

## Colors

The palette is derived from natural, archival materials: parchment, ink, and weathered metal. 

- **Backgrounds:** The primary surface uses a soft sand (#f6f0e6). For secondary containers or subtle differentiation, a deeper sand (#ebe2d2) is employed. A subtle, non-tiling paper grain texture should be applied to all primary backgrounds to reduce digital glare and add a tactile quality.
- **Typography & Ink:** Text is never pure black. Charcoal (#2f2418) serves as the primary "ink," providing high contrast without the harshness of hex-black. A medium brown (#4f4131) is used for secondary information and metadata.
- **Accents:** Aged bronze (#8f6d43) is used sparingly for emphasis, call-to-action elements, or signifies a "human" touch in the digital space. 
- **Borders:** Lines are fine (1px) and use a low-contrast variant of the secondary ink to suggest structure without creating visual noise.

## Typography

Typography is the cornerstone of this design system. We use **Newsreader** for all levels to maintain a singular, authoritative voice reminiscent of classical typesetting.

- **Headlines:** Use tighter line spacing and slight negative letter-spacing for large displays to give a "carved" appearance. 
- **Body Text:** Prioritize readability with a generous line height (1.6) and comfortable font sizes. Long-form reading is the primary use case.
- **Hierarchy:** Contrast is achieved through scale and style (italics/caps) rather than weight or color changes. Small caps or tracked-out labels are used for navigation and categorizations to evoke the feeling of a scholarly index.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** approach, centered and inspired by book design. The interface relies on massive margins and whitespace to signal importance and allow the user "room to breathe."

- **The Column System:** A classic 12-column grid is used, but content is often constrained to the central 8 columns for optimal reading width.
- **Rhythm:** Spacing follows a strict 8px base unit. However, vertical gaps between major sections are intentionally oversized (e.g., 128px) to separate distinct thoughts or chapters.
- **Padding:** Elements like buttons or input fields utilize generous internal padding to avoid a cramped, "utilitarian" feel.

## Elevation & Depth

This design system eschews shadows and traditional depth metaphors. Hierarchy is instead communicated through:

- **Tonal Layers:** Using the two shades of sand (#f6f0e6 and #ebe2d2) to distinguish the background from "top-level" containers.
- **Low-Contrast Outlines:** Fine, 1px borders in a muted ink tone define boundaries. These are subtle and should almost disappear into the background grain.
- **Negative Space:** Depth is felt through the absence of elements. The most important information is simply given the most space, rather than being "lifted" off the page.

## Shapes

The shape language is strictly **Sharp (0px)**. 

Every element—from buttons to cards to form fields—utilizes right angles. This reinforces the architectural and classical inspiration of the design system, echoing the lines of a stone plinth or a cut sheet of parchment. No rounding or softening of corners is permitted, as sharp edges convey a sense of precision, discipline, and structural integrity.

## Components

Components should feel like artifacts, not digital widgets.

- **Buttons:** Rectangular with a 1px border. The "Primary" state uses a solid bronze fill with sand text. the "Secondary" state uses a fine charcoal border with no fill. Hover states should be a subtle shift in background tone, never a shadow.
- **Inputs:** Simple bottom-border lines or fully enclosed boxes with 1px outlines. Labels sit above in the `label-caps` style.
- **Chips/Tags:** Small, sharp-edged boxes with `label-italic` text, used sparingly for categorization.
- **Lists:** Separated by thin, horizontal rules that do not span the full width of the container, mimicking a table of contents.
- **Cards:** Distinguished only by a 1px border or a change in background color to #ebe2d2. There are no shadows or hover lifts.
- **Dividers:** Use thin rules or a single centered "ornament" (like a simple bronze dot) to break up long-form content.