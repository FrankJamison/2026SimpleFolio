# SimpleFolio

Developer-focused documentation for a single-page portfolio site built from the SimpleFolio template.

Live Preview: https://simplefolio.fcjamison.com/

## What this repo is

- A fast, static, single-page portfolio website.
- Clean SCSS architecture (tokens/mixins/sections) and a small amount of JavaScript for progressive enhancement.
- Built with Parcel (dev server + production bundling).

## Tech stack

- Parcel 2
- SCSS (structured partials under `src/sass/`)
- Bootstrap 5 (grid + base utilities) imported via SCSS
- ScrollReveal (reveal animations)
- Vanilla Tilt (tilt effect on thumbnails)
- Font Awesome (icons via CDN)

## Quickstart

### Prerequisites

- Node.js (LTS recommended) + npm

### Install

```bash
npm install
```

### Run the dev server

```bash
npm start
```

Then open:

- http://localhost:1234/
- http://simplefolio.localhost:1234/ (if you use the optional local domain setup)

### Build for production

```bash
npm run build
```

Parcel outputs a static build to `dist/`.

### Optional: format code

Prettier is included as a dev dependency. You can run it directly:

```bash
npx prettier --write .
```

## Scripts

- `npm start` — starts Parcel on port `1234`
- `npm run build` — creates the production build in `dist/`

## VS Code tasks (optional)

This repo includes a few pre-configured tasks in `.vscode/tasks.json`:

- `Dev: install + start` — runs `npm install` then starts the Parcel dev server
- `Open in Browser` — opens `http://simplefolio.localhost:1234/`

If you’re on Windows and using the local `*.localhost` workflow, you may also have tasks like:

- `Setup Web Workspace` — configures the `simplefolio.localhost` host entry + Apache vhost (may require admin privileges)
- `XAMPP: Start` / `XAMPP: Stop` — starts/stops the XAMPP control utilities

## Troubleshooting

### Port already in use

`npm start` runs Parcel on port `1234`. If something else is using it, either stop the other process or change the port:

```bash
npx parcel --port 1235
```

### `simplefolio.localhost` doesn’t resolve / won’t load

This repo can be used in two ways:

- **Direct Parcel dev server**: use `http://localhost:1234/` (no extra setup)
- **Local domain**: use `http://simplefolio.localhost:1234/` (requires hosts/vhost setup)

If `simplefolio.localhost` isn’t working, run the `Setup Web Workspace` task (Windows) or use `http://localhost:1234/` instead.

### “It’s not picking up my changes” / weird build output

Clear Parcel’s cache and rebuild:

```bash
rd /s /q .parcel-cache dist
npm run build
```

(On macOS/Linux: `rm -rf .parcel-cache dist`.)

### Node/npm issues

If you hit dependency or tooling errors, try using a current Node LTS version and reinstall:

```bash
rd /s /q node_modules
del package-lock.json
npm install
```

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

## Customization guide

### 1) Update content

Edit `src/index.html`:

- Page metadata: `<title>`, `meta[name="description"]`, `meta[name="keywords"]`
- Hero/About/Projects/Contact text
- Project entries (each project is one `.row`/`article` block)
- External links (GitHub, live demos, contact)

### 2) Update images and documents

Put assets in `src/assets/` and reference them from `src/index.html`.

Common items:

- `profile.jpg` (headshot)
- project thumbnails
- resume PDF
- favicon

### 3) Tweak the visual theme (design tokens)

Core design tokens live in `src/sass/abstracts/_variables.scss`.

Typical edits:

- Accent color (links/highlights/gradients)
- Base background colors
- Type scale variables

### 4) Adjust layout/sections

Section-specific styles live in:

- Hero: `src/sass/sections/_hero.scss`
- About: `src/sass/sections/_about.scss`
- Projects: `src/sass/sections/_projects.scss`
- Contact: `src/sass/sections/_contact.scss`
- Footer: `src/sass/layout/_footer.scss`

Global section spacing is in `src/sass/layout/_sections.scss`.

### 5) Animation behavior

This repo keeps JS deliberately small and gated behind user preferences.

Reveal animations (ScrollReveal):

- Initialization: `src/scripts/scrollReveal.js`
- Configuration: `src/data/scrollRevealConfig.js`
- Integration: `src/index.js`

Tilt effect (Vanilla Tilt):

- Initialization: `src/scripts/tiltAnimation.js`
- Applied to elements with the `.js-tilt` class

Reduced-motion behavior:

- If the user has `prefers-reduced-motion: reduce`, ScrollReveal + tilt are not initialized.
- `.load-hidden` is only hidden when the root has the `sr` class; `src/index.js` adds it only when animations will run.

## Semantic HTML & accessibility notes

This site is implemented with semantic landmarks and accessibility-first defaults.

Highlights:

- Skip navigation (“Skip to main content”) is the first focusable element in `src/index.html`.
- Landmarks: `header`, `main`, `footer`.
- Section labeling: major sections use `aria-labelledby` pointing to the section heading.
- External links that open a new tab use `rel="noopener noreferrer"`.
- Focus styles: `:focus-visible` outline + skip-link styling in `src/sass/base/_base.scss`.

## Build & deployment

### How the build works

- Entry point: `src/index.html` (see `package.json` `source`)
- Parcel bundles:
  - ES modules from `src/index.js`
  - SCSS from `src/styles.scss`
  - Referenced assets under `src/assets/`

### Deploy

1. Run `npm run build`
2. Deploy the contents of `dist/` to any static host (Netlify, GitHub Pages, Cloudflare Pages, Apache, etc.)

## Credits

- Original template: https://github.com/cobiwave/simplefolio

## License

MIT — see [LICENSE.md](LICENSE.md)
