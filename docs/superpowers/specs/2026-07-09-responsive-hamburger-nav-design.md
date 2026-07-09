# Responsive Hamburger Nav — Design

## Problem
The site navbar (`.navbar` / `.nav-links` in `style.css`) is a fixed horizontal row of links. On narrow screens (phones, small tablets) there isn't room for it to stay horizontal. The navbar markup is duplicated identically in `index.html`, `shop.html`, `about.html`, and `contact.html`; there is currently no JavaScript anywhere in the project, and only `contact.css` has a media query (`max-width: 768px`), which sets the site's existing responsive breakpoint precedent.

## Goal
Below `768px` viewport width, replace the horizontal nav-links row with a hamburger button that toggles a dropdown panel of stacked links. Above `768px`, behavior is unchanged from today.

## Scope
Applies to all four pages: `index.html`, `shop.html`, `about.html`, `contact.html`. Shared styling lives in `style.css` (already linked by all four pages). A new shared `nav.js` file is added and linked by all four pages.

## Breakpoint
`max-width: 768px`, matching the existing breakpoint used in `contact.css`.

## HTML changes
In each of the four HTML files, inside `<nav class="navbar">`, insert a hamburger button between `.logo-wrapper` and `.nav-links`:

```html
<button class="hamburger" id="hamburger-btn" aria-label="Toggle menu" aria-expanded="false">
  <span></span><span></span><span></span>
</button>
```

Each page adds `<script src="nav.js" defer></script>` before `</body>`.

## CSS changes (`style.css`)
- `.hamburger`: `display: none` by default (desktop). Contains three stacked bar `span`s styled to look like a hamburger icon (no open/close morph animation — bars stay static, only the panel's visibility changes).
- At `max-width: 768px`:
  - `.hamburger` becomes `display: flex` (column), positioned at the right edge of the navbar.
  - `.nav-links` switches from its current horizontal flex row to a full-width dropdown panel:
    - `position: absolute; top: 70px; left: 0; width: 100%;`
    - `flex-direction: column` (links stack vertically instead of side by side)
    - Starts closed: `max-height: 0; overflow: hidden;` with a `transition` on `max-height` so opening/closing animates.
  - `.nav-links.open` sets `max-height` to a value large enough to reveal all four links (e.g. `300px`).
- Existing `.nav-links li a`, `.active`/`:hover`, and the underline `::after` effect are unchanged — they continue to apply when links are stacked.

## JavaScript (`nav.js`, new file, shared across all 4 pages)
- On `click` of `#hamburger-btn`: toggle the `open` class on `.nav-links`, and toggle `aria-expanded` (`"true"`/`"false"`) on the button to reflect state for accessibility.
- On `click` of any link inside `.nav-links`: remove the `open` class (auto-close the menu after navigating), so the menu doesn't stay open across page loads or leave stale open state visible momentarily on the next page.

## Out of scope
- No hamburger-to-X icon morph animation (explicitly declined).
- No click-outside-to-close or Escape-key handling (not requested; can be added later if desired).
- No changes to the desktop (`>768px`) nav appearance or behavior.

## Testing
Manually verify in a browser at both a desktop width (>768px, confirm unchanged behavior) and a narrow width (≤768px): hamburger appears, click opens the dropdown panel with stacked links, clicking a link navigates and the menu doesn't stay stuck open on the new page, and this works identically on all four pages.
