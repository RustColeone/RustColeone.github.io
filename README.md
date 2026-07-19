# RustColeone.github.io

Personal site for **Haoxian Yan** — hardware designer working on power electronics at UCLA.

The page is deliberately explicit that the software projects dominate it only because software is what a git host can display. Hardware is the primary discipline; the apps are side work that happens to be publishable.

## Sections

**Research** — Converter control for datacentre voltage regulator modules. Co-author on *Fast-Response Variable-Frequency Series-Capacitor Buck VRM Through Integrated Control Approaches* (IEEE COMPEL 2025) with Guanyu Qian and Xiaofan Cui — [arXiv:2507.10086](https://arxiv.org/abs/2507.10086). Includes a collaborator disclosure for [Guanyu Qian](https://qgy511.github.io/), first author and lab colleague.

**Toolkit** — Links into the [UCLA PEEC lab web toolkit](https://peec-research-lab.github.io/web-tool-kit/?page=home.html): scientific/LaTeX calculator, PCB trace requirements, wire resistance, inductor core sizing, resistor and capacitor code, resistor colour code.

**Apps** — Closed-source, but each one documents why it exists and how it handles data:

- **ImageDB** — Local-first image vault with tagging, captions, albums, books and full-text search. Single HTML file in a Capacitor Android shell; SQLite/WASM metadata over a layered OPFS/IndexedDB blob store. Has its own [privacy policy page](privacy/imagedb-privacy.html).
- **Memora** — Self-hosted memo / finance / planner database. Flask server you host yourself plus a Capacitor Android client, syncing over an event-sourced operation log. Optional BYO-key AI features. Has its own [privacy policy page](privacy/memora-privacy.html).
- **NeuroCamp** — Eight cognitive games (Schulte table, stop-signal, interval recognition, and others) behind a camping-themed hub. No accounts, no ads, no network. Has its own [privacy policy page](privacy/neurocamp-privacy.html).
- **Planner** — Calendar, todos, project Gantt and habits. Front-end prototype on local storage; being ported into Memora as a third sync variant.
- **DoraemonDB** — Local semantic search over 61,565 manga panels: PaddleOCR extraction, DeepSeek tag enrichment, BAAI/bge-m3 embeddings, Flask UI.
- **Shared building blocks** — UniversalReader (embeddable image/PDF reader) and a 2,129-icon MIT SVG library, both shared across the apps.

## Files

| File | Purpose |
|---|---|
| `index.html` | Main page |
| `privacy/imagedb-privacy.html` | ImageDB privacy policy |
| `privacy/memora-privacy.html` | Memora privacy policy |
| `privacy/neurocamp-privacy.html` | NeuroCamp privacy policy |
| `styles.css` | All styling |
| `site.js` | Theme toggle, nav highlighting, print handling |
| `directory.json` | Unused sample data from an earlier auto-generation idea |

## Implementation notes

Plain HTML, CSS and JavaScript. No build step, no dependencies, no external requests — no CDNs, no web fonts, no analytics. Everything needed to render the site is in the four files above.

**Theming.** The palette is declared once using the CSS `light-dark()` function against `color-scheme`. Switching themes only flips `color-scheme` on `:root`, so there is no duplicated dark-mode token block and no JavaScript walking the DOM to restyle elements. With JavaScript disabled the site still follows the OS preference; the toggle just adds an explicit override, remembered in `localStorage`. A tiny inline script in `<head>` applies the stored choice before first paint to avoid a flash.

**Progressive enhancement.** Collapsible sections are native `<details>`/`<summary>`, so they work without JavaScript and are keyboard accessible for free. `site.js` only adds the theme toggle, scroll-spy nav highlighting via `IntersectionObserver`, the footer year, and expanding accordions before printing.

**Accessibility.** Skip link, semantic landmarks, visible focus rings, and `prefers-reduced-motion` support. All text colours were measured to clear WCAG AA (4.5:1) against their backgrounds in both themes.

**Also included.** Structured data (schema.org `Person` + `ScholarlyArticle`), Open Graph tags, an inline SVG favicon, and print styles that expand every accordion and append link URLs.
