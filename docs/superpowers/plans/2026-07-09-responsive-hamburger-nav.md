# Responsive Hamburger Nav Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Below 768px viewport width, replace the horizontal `.nav-links` row with a hamburger button that toggles a stacked dropdown panel, on all four site pages.

**Architecture:** Pure CSS media query (`max-width: 768px`) swaps `.nav-links` from a horizontal flex row to an absolutely-positioned full-width dropdown panel that animates via `max-height`. A new shared `nav.js` (vanilla JS, no dependencies) toggles an `open` class on click and auto-closes the menu when a link is clicked. Same markup/script is added to all four HTML pages since there's no templating system — each page is edited individually.

**Tech Stack:** Plain HTML/CSS/JS (no build step, no frameworks, no test runner). Verification is manual, in-browser (open the HTML file directly, resize/use devtools responsive mode).

## Global Constraints

- Breakpoint is exactly `max-width: 768px` (matches the existing breakpoint in `contact.css`).
- No hamburger-to-X icon morph animation.
- No click-outside-to-close or Escape-key handling.
- Desktop (`>768px`) nav appearance/behavior must be unchanged.
- Menu auto-closes when a nav link is clicked.

---

## File Structure

- Modify: `style.css` — add `.hamburger` icon styles + the `max-width: 768px` media query (dropdown panel behavior). Inserted after the existing `.nav-links li a.active::after, .nav-links li a:hover::after` rule (ends at line 82) and before the `body {` rule (line 84).
- Create: `nav.js` — toggles the mobile menu open/closed; auto-closes on link click.
- Modify: `index.html` — add hamburger button markup inside `.navbar`, add `<script src="nav.js" defer></script>` before `</body>` (line 163).
- Modify: `shop.html` — same two additions; `</body>` is at line 612.
- Modify: `about.html` — same two additions; `</body>` is at line 87.
- Modify: `contact.html` — same two additions; `</body>` is at line 152.

**Interfaces:**
- `nav.js` depends on: `#hamburger-btn` (button element) and `.nav-links` (the `<ul>`) existing in the page's DOM, and an `.open` CSS class defined in `style.css` that makes `.nav-links` visible/expanded.
- `style.css` depends on: the hamburger button being three child `<span>` elements inside `button.hamburger`, and JS toggling the literal class name `open` on `.nav-links`.

---

## Task 1: Core feature — CSS, JS, and index.html wiring

**Files:**
- Modify: `style.css:82-84` (insert new rules between these lines)
- Create: `nav.js`
- Modify: `index.html:30-32` (insert hamburger button)
- Modify: `index.html:163` (insert script tag before `</body>`)

**Interfaces:**
- Produces: `.hamburger` CSS class, `.nav-links.open` CSS class, `nav.js` click handlers — all consumed by Task 2's HTML edits on the other three pages.

- [ ] **Step 1: Add hamburger button markup to `index.html`**

In `index.html`, the navbar currently reads (lines 26-32):

```html
            <div class="logo-wrapper">
                <span class="logo-pic">
                    <img src="assets/romdoul.PNG" width="45px">
                </span>
                <span class="logo">Srok Souvenirs</span>
            </div>
            <ul class="nav-links">
```

Insert a hamburger button between the closing `</div>` of `.logo-wrapper` and the `<ul class="nav-links">`:

```html
            <div class="logo-wrapper">
                <span class="logo-pic">
                    <img src="assets/romdoul.PNG" width="45px">
                </span>
                <span class="logo">Srok Souvenirs</span>
            </div>
            <button class="hamburger" id="hamburger-btn" aria-label="Toggle menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
            <ul class="nav-links">
```

- [ ] **Step 2: Add the script tag to `index.html`**

`index.html` currently ends with:

```html
    </body>
</html>
```

Change it to load `nav.js` right before the closing `</body>`:

```html
    <script src="nav.js" defer></script>
    </body>
</html>
```

- [ ] **Step 3: Create `nav.js`**

Create a new file `nav.js` in the project root (same directory as `style.css`):

```javascript
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.querySelector('.nav-links');

hamburgerBtn.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  });
});
```

- [ ] **Step 4: Add hamburger + dropdown CSS to `style.css`**

In `style.css`, the nav rules currently end at line 82 with:

```css
.nav-links li a.active::after,
.nav-links li a:hover::after {
  transform: scaleX(1);
}
```

...followed by the `body {` rule at line 84. Insert this new block between them:

```css
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  margin-left: auto;
  margin-right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 3px;
  background-color: #472104;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    margin-left: 0;
    padding-right: 0;
    flex-direction: column;
    align-items: stretch;
    background-color: rgba(214, 178, 92);
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .nav-links.open {
    max-height: 300px;
  }

  .nav-links li a {
    height: auto;
    padding: 16px 28px;
  }
}
```

- [ ] **Step 5: Manually verify in a browser**

Open `index.html` directly in a browser (double-click the file, or run `start index.html` from the project root on Windows).

Check desktop width (window wider than 768px):
- Navbar looks exactly as before — horizontal links, no hamburger icon visible.

Check mobile width (use devtools responsive mode, or resize the window below 768px):
- The horizontal links disappear; a 3-bar hamburger icon appears at the right of the navbar.
- Clicking the hamburger opens a dropdown panel below the navbar with the 4 links stacked vertically, animating open.
- Clicking the hamburger again closes it.
- Clicking one of the links (e.g. "Shop") navigates to that page — confirm the menu is not left open when the new page loads.

- [ ] **Step 6: Commit**

```bash
git add style.css nav.js index.html
git commit -m "Add responsive hamburger menu for navbar on index.html"
```

---

## Task 2: Roll out to shop.html, about.html, contact.html

**Files:**
- Modify: `shop.html:25-27` (insert hamburger button), `shop.html:612` (insert script tag)
- Modify: `about.html:29-31` (insert hamburger button), `about.html:87` (insert script tag)
- Modify: `contact.html:33-35` (insert hamburger button), `contact.html:152` (insert script tag)

**Interfaces:**
- Consumes: `.hamburger`/`.nav-links.open` CSS from Task 1's `style.css` changes, and the click handlers in Task 1's `nav.js` — both already shared/global, so these pages just need the matching markup.

- [ ] **Step 1: Add hamburger button + script tag to `shop.html`**

`shop.html` navbar (lines 21-27):

```html
            <div class="logo-wrapper">
                <span class="logo-pic">
                    <img src="assets/romdoul.PNG" width="45px">
                </span>
                <span class="logo">Srok Souvenirs</span>
            </div>
            <ul class="nav-links">
```

Insert the same hamburger button as Task 1 between `</div>` and `<ul class="nav-links">`:

```html
            <div class="logo-wrapper">
                <span class="logo-pic">
                    <img src="assets/romdoul.PNG" width="45px">
                </span>
                <span class="logo">Srok Souvenirs</span>
            </div>
            <button class="hamburger" id="hamburger-btn" aria-label="Toggle menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
            <ul class="nav-links">
```

`shop.html` ends with (line 612):

```html
    </body>
</html>
```

Change to:

```html
    <script src="nav.js" defer></script>
    </body>
</html>
```

- [ ] **Step 2: Add hamburger button + script tag to `about.html`**

`about.html` navbar (lines 25-31):

```html
            <div class="logo-wrapper">
                <span class="logo-pic">
                    <img src="assets/romdoul.PNG" width="45px">
                </span>
                <span class="logo">Srok Souvenirs</span>
            </div>
            <ul class="nav-links">
```

Insert the hamburger button the same way:

```html
            <div class="logo-wrapper">
                <span class="logo-pic">
                    <img src="assets/romdoul.PNG" width="45px">
                </span>
                <span class="logo">Srok Souvenirs</span>
            </div>
            <button class="hamburger" id="hamburger-btn" aria-label="Toggle menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
            <ul class="nav-links">
```

`about.html` line 87 currently:

```html
    </body>
```

Change to:

```html
    <script src="nav.js" defer></script>
    </body>
```

- [ ] **Step 3: Add hamburger button + script tag to `contact.html`**

`contact.html` navbar (lines 29-35):

```html
            <div class="logo-wrapper">
                <span class="logo-pic">
                    <img src="assets/romdoul.PNG" width="45px">
                </span>
                <span class="logo">Srok Souvenirs</span>
            </div>
            <ul class="nav-links">
```

Insert the hamburger button the same way:

```html
            <div class="logo-wrapper">
                <span class="logo-pic">
                    <img src="assets/romdoul.PNG" width="45px">
                </span>
                <span class="logo">Srok Souvenirs</span>
            </div>
            <button class="hamburger" id="hamburger-btn" aria-label="Toggle menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
            <ul class="nav-links">
```

`contact.html` line 152 currently:

```html
  </body>
```

Change to:

```html
  <script src="nav.js" defer></script>
  </body>
```

- [ ] **Step 4: Manually verify all three pages in a browser**

For each of `shop.html`, `about.html`, `contact.html`: open the file directly in a browser, switch to a viewport below 768px (devtools responsive mode), and confirm:
- The hamburger icon appears and toggles the dropdown panel open/closed.
- Clicking a link inside the panel navigates and the menu is closed on arrival at the new page.
- At desktop width, the navbar looks unchanged (no hamburger visible, links horizontal).

- [ ] **Step 5: Commit**

```bash
git add shop.html about.html contact.html
git commit -m "Roll out responsive hamburger menu to shop, about, and contact pages"
```
