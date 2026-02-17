# Frank Jamison — SimpleFolio Portfolio (2026)

This is my personal, single-page developer portfolio site.

It’s built as a fast, static site with a clean SCSS architecture, a small amount of JavaScript for interaction/animation, and a design that emphasizes clarity, readability, and a focused presentation of projects.

## For employers & recruiters

What this site demonstrates:

- A production-style static web project (build pipeline + organized source structure)
- Responsive layout and typography tuned for desktop/tablet/mobile
- Design consistency via SCSS tokens (colors, sizes) and reusable components
- Lightweight UX enhancements (reveal animations + subtle tilt) without a framework

Where to look:

- Content + messaging: `src/index.html`
- Design system + layout: `src/sass/` (imported by `src/styles.scss`)
- JS behavior: `src/index.js` + `src/scripts/`

## Tech stack

- Parcel 2 (dev server + production bundling)
- Bootstrap 5 (grid + base utilities) with custom SCSS
- ScrollReveal (section/element reveal animations)
- Vanilla Tilt (tilt effect on project thumbnails)
- Font Awesome (icon font via CDN)

## Semantic HTML & accessibility

This site is implemented with semantic landmarks and accessibility-first defaults so it works well with keyboards, screen readers, and reduced-motion preferences.

Key improvements and where they live:

- Skip navigation: a “Skip to main content” link is the first focusable element in `src/index.html`.
- Landmarks: the page is structured with `header`, `main`, and `footer`.
- Clear section labeling: each major `section` uses `aria-labelledby` pointing at its heading (`h1`/`h2`).
- Project markup: each project uses an `article` element and is labeled via `aria-labelledby`.
- Icon-only links: back-to-top + social links include accessible names (screen-reader-only text and/or `aria-label`).
- Link safety: external links that open a new tab use `rel="noopener noreferrer"`.
- Descriptive media: meaningful images use specific `alt` text (not generic “Project Image”).

Motion and focus behavior:

- Reduced motion: if the user has `prefers-reduced-motion: reduce`, ScrollReveal + tilt are not initialized.
- Progressive enhancement: `.load-hidden` elements are only hidden when the `sr` class is present on the root element; `src/index.js` adds that class only when animations will run.
- Keyboard focus: a global `:focus-visible` outline and skip-link styling are defined in `src/sass/base/_base.scss`.

## Local development (developers)

### Prerequisites

- Node.js + npm

### Install

```bash
npm install
```

### Run (dev server)

```bash
npm start
```

Open:

- http://localhost:1234/

### Build (production)

```bash
npm run build
```

Parcel outputs a static build to the `dist/` folder.

## Project structure

```text
src/
	index.html              # Page content + section structure
	index.js                # JS entry: initializes animations
	styles.scss             # SCSS entry: imports all partials
	assets/                 # Images, favicon, resume PDF
	data/scrollRevealConfig.js
	scripts/
		scrollReveal.js
		tiltAnimation.js
	sass/
		abstracts/            # tokens, mixins, helpers
		base/                 # base styles + typography
		components/           # buttons
		layout/               # section/footer layout
		sections/             # hero/about/projects/contact styling
		vendors/              # Bootstrap import
examples/                 # template preview assets (optional)
```

## Design & UI implementation details

### Visual theme (tokens)

Core design tokens live in `src/sass/abstracts/_variables.scss`:

- `$accent-color` drives the site’s primary look (links, gradients, highlights)
- `$dark-grey` / `$light-grey` define the overall dark theme base
- `$default-font-size`, `$big-font-size`, `$mid-font-size` standardize type scale

### Typography

Typography is defined in `src/sass/base/_typography.scss`:

- Montserrat (Google Fonts) for body text and links
- Uppercased section titles with responsive sizing
- Accent text style via `.text-color-main` (gradient-capable where supported)

### Layout and section composition

The page is intentionally a single, scrollable document with clear sections:

- Hero: full-viewport, dark overlay, background image
	- Styling: `src/sass/sections/_hero.scss`
	- Uses a background overlay + `url("./assets/project.jpg")`

- About / Contact: gradient sections with clipped diagonals
	- Styling: `src/sass/sections/_about.scss`, `src/sass/sections/_contact.scss`
	- Uses `clip-path` for angled section edges (disabled on smaller breakpoints)
	- Adds text-shadow only within gradient sections to maintain legibility

- Projects: dark section with project rows and thumbnail emphasis
	- Styling: `src/sass/sections/_projects.scss`
	- Uses a subtle shadow/transition on `.thumbnail` and responsive spacing

- Footer: minimal, dark, with social links and back-to-top affordance
	- Styling: `src/sass/layout/_footer.scss`

Global section spacing is in `src/sass/layout/_sections.scss`.

### Buttons (CTAs)

Buttons are designed as reusable components in `src/sass/components/_buttons.scss`:

- `.cta-btn--hero` uses gradient borders and a fill-on-hover effect
- `.cta-btn--resume` is a high-contrast outlined button with fill-on-hover

### Responsive breakpoints

Responsive behavior is standardized via the `respond(...)` mixin in `src/sass/abstracts/_mixins.scss`.

Breakpoints include:

- `phone-xs` (≤ 320px)
- `phone` (≤ 600px)
- `tab-port-sm` (≤ 768px)
- `tab-port` (≤ 900px)
- `tab-land` (≤ 1200px)
- `big-desktop` (≥ 1800px)

## JavaScript behavior

This project keeps JavaScript deliberately small and focused.

### Reveal animations (ScrollReveal)

- Initialization: `src/scripts/scrollReveal.js`
	- Sets `reset: false` so animations don’t constantly replay
	- Applies reveals to configured selectors
- Configuration: `src/data/scrollRevealConfig.js`
	- Defines `targetElements` (CSS selectors) and per-element animation props
	- Uses viewport width checks to change animation origin on mobile
- Integration: `src/index.js`
	- Checks `prefers-reduced-motion` and only initializes animations when motion is allowed
	- Adds the `sr` class to the root element to opt into ScrollReveal’s “start hidden” behavior
	- Calls the init function with `targetElements` and `defaultProps`

Elements start hidden only when the root has the `sr` class via `html.sr .load-hidden` in `src/sass/base/_base.scss`.
This keeps content visible when JavaScript is disabled or reduced motion is enabled.

### Tilt effect (Vanilla Tilt)

- Initialization: `src/scripts/tiltAnimation.js`
	- Applies tilt to elements with the `.js-tilt` class
	- Used on the project thumbnail container in `src/index.html`

## Content & assets

- Primary content is authored directly in `src/index.html`
- Static assets live in `src/assets/` (favicon, profile photo, project images, resume PDF)

## Build & deployment

### How the build works

- Entry point: `src/index.html` (see `package.json` `source`)
- Parcel bundles:
	- ES modules from `src/index.js`
	- SCSS from `src/styles.scss`
	- Referenced assets under `src/assets/`

### Deploy

1. `npm run build`
2. Upload/deploy the `dist/` folder to a static host (Netlify, GitHub Pages, Cloudflare Pages, Apache, etc.)

## Credits

- Original template: https://github.com/cobiwave/simplefolio

## License

MIT — see [LICENSE.md](LICENSE.md)
