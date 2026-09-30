# LandingPagePortfolio — Oak Corner Workshop

Landing page for a small solid-wood furniture workshop in Warsaw (ul. Drewniana 14).
Custom tables, kitchens and wardrobes from oak, ash and walnut — from sketch to installation, with a 5-year warranty.

Built with Vite + vanilla HTML/CSS/JS. Styling combines Tailwind (CDN) with a custom `src/style.css` for the paper/print aesthetic.

## Sections

- **Hero** — headline, workshop intro, lead-time/warranty ledger, CTA buttons, layered workshop photos with stamp badge and subtle 3D tilt on desktop
- **Process** — 4 steps: measurements, sketch + fixed price, building (4–8 weeks), delivery + assembly
- **Work** — portfolio grid of recent pieces (what / wood / time / district)
- **Workshop** — why-us rows (solid wood only, one roof, 5-year warranty) + "what we won't do" box
- **Notes** — client reviews pinned like notes on the workshop door
- **Order sheet** — quote form (name, phone, type, size) with validation and a confirmation modal
- **Footer** — address, phone, copyright year (auto)

## Interactions

- Mobile menu with accessible toggle
- Form validation (required name, phone digit check) + success modal (Esc/backdrop/close)
- Scroll-reveal animations with `prefers-reduced-motion` support
- Sticky header shadow on scroll, stamp slam-in, hover states on work cards

## Tech stack

- [Vite 8](https://vite.dev/) — dev server and production build
- Vanilla HTML, CSS, JavaScript (no framework)
- Tailwind CSS via CDN with inline theme (`bark`, `wood`, `cream`, `paper`, `moss`, `line`)
- Google Fonts: Bitter, Inter, Caveat, IBM Plex Mono
- Images: remote Unsplash URLs (swap for real workshop photos)

## Project structure

```text
index.html        # page markup, Vite entry (loads /src/main.js)
src/main.js       # UI logic: menu, form + modal, reveal, tilt, header
src/style.css     # custom theme: print photos, ledger, notes, animations
vite.config.js    # base './' so the build works from any subpath
```

## Getting started

Requirements: Node.js 20+.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build and preview

```bash
npm run build
npm run preview
```

The production bundle goes to `dist/` (`dist/` is git-ignored). Because `base` is `'./'`, the built `index.html` can be served statically or deployed to GitHub Pages.

## Customization

- Contacts: search `index.html` for `+48 600 000 000` and `Drewniana 14` and replace with real ones.
- Photos: replace the `images.unsplash.com` URLs in `index.html` with your own shots; captions already follow the `No. / wood / weeks / district` format.
- Form backend: `src/main.js` currently shows a demo modal on submit — hook the submit handler up to your Telegram/Discord bot or endpoint.
- Theme: Tailwind palette lives in the inline `tailwind.config` in `index.html`; textures, buttons and animations live in `src/style.css`.
