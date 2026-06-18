# 3Shamrocks Media Network — Hub

A self-hosted **link-in-bio hub** + **product landing page** for the 3Shamrocks faceless-brand network. No third-party platform required — plain static HTML/CSS/JS deployed on GitHub Pages.

**Live:** https://3shamrocksstudio.github.io/media-network-hub/

## Pages
- **`index.html`** — the link-in-bio hub. One premium page with a section per brand (Solo Stack, Prompt & Pixel, One Percent Daily, First Dollar). Each IG page points its bio link here; deep-link a single brand with an anchor, e.g. `…/#solo-stack`.
- **`kit.html`** — the landing page for **The AI Brand Kit** ($29): hero, benefits, what's inside, price, FAQ, buy CTA + email capture.

## Wiring it up (see `SETUP-NEXT.md` in the project root)
Two values in `assets/app.js`:
- `GUMROAD_URL` — paste your Gumroad product link; every **Buy** button points to it automatically.
- `FORMSPREE_ID` — paste your Formspree form ID; email signups are delivered to your inbox.

Until those are set, the site still works: **Buy** buttons route visitors to the email-capture, and signups are saved in the browser (`localStorage` key `3s_leads`) so no lead is lost on day one.

## Local preview
```
cd media-network-hub
python3 -m http.server 8080
# open http://localhost:8080
```

## Stack
Static HTML + one CSS file + one vanilla-JS file. Fonts via Google Fonts with full system fallbacks (renders fine if blocked). `.nojekyll` keeps GitHub Pages from processing it.

© 2026 3Shamrocks Studio
