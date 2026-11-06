# THE 2 AM PROTOCOL ☕🌙

One cup of tea. One endless conversation. Zero intentions of sleeping.

A standalone, mobile-first invitation website for the 2 AM tea-and-coffee ritual — built with React, TypeScript, and Vite, hosted on GitHub Pages. No sign-in, no database, no tracking: it is a single static site that anyone can open on a phone and answer with one tap.

**Live site:** https://abdallhmetwallycs.github.io/the-2am-protocol/

---

## What it does

The experience runs in three stages, each on its own screen with a short transition between them.

**1 · The opening.** The invitation card, the question — "Tea or coffee? You know the drill. ☕😏" — and one button: *LET'S BREAK OUR SLEEP SCHEDULE*.

**2 · The night.** Scroll through the five-step plan, a simulated call-duration counter that keeps ticking while the tab is open (01:23:45 / 02:47:19 / 04:12:38 are the "previous confirmed incidents"), the *OK, LAST FIVE MINUTES* button that counts every time you press it, the six "things we both know, but pretend we don't" — each one toggles official — and a **SHOW ME MORE TROUBLE 💋** button that admits nine more things before it runs out. Then the invitation card itself: activity, start time, duration, location, dress code, exit strategy.

**3 · Approved.** The Insomnia Committee RSVPs, the celebration fires, a cup fills with tea or coffee (tap it to switch sides of the argument), and the WhatsApp button opens a share sheet with the acceptance message already typed.

Throughout: a drifting starfield, floating cups / moons / stars / kisses you can tap for a surprise line, and an ambient night pad that only ever starts when you press the sound control — nothing autoplays.

## Requirements

- Node.js `^22.13.0` or `>=24.0.0` (the `preinstall` / `predev` / `prebuild` hooks refuse anything older)
- npm

## Quick start

```bash
npm install          # or: npm ci
npm run dev          # http://127.0.0.1:5173
```

Verify the production bundle locally:

```bash
npm run typecheck    # tsc --noEmit
npm run build        # typecheck + vite build → dist/
npm run preview      # serves dist/ at http://127.0.0.1:4173
```

## Project structure

```
index.html                 title, meta / Open Graph tags, Google Fonts link
public/favicon.svg         browser tab icon
vite.config.ts             base: "./" so the build works from a /project-name/ sub-path
.github/workflows/deploy.yml  build + publish to GitHub Pages
src/
  content.ts               ← every readable string in the app lives here
  globals.css              ← design tokens, component styles, keyframes
  App.tsx                  ← stage machine: opening → night → accepted
  main.tsx                 React root
  components/              Opening, Night, Accepted, PlanSequence, CallViz,
                           KnowDont, LastFiveMinutes, FinalInvite, CupFill,
                           Starfield, Backdrop, Burst, FloatingEmojis,
                           MoonMark, MoonSeal, SoundControl, SurpriseToast
  hooks/                   useReducedMotion, useRevealOnScroll,
                           useCallTimer, useNightAmbience
  scripts/                 build / node-version helpers
```

## Editing it

**Words.** Open [`src/content.ts`](src/content.ts). Headings, the question, the five plan steps, the call archive, the know-don't list and its extras, the invitation rows, the acceptance copy, the WhatsApp message, the surprise lines, and the footer are all there. Change the text, save, and the site updates — nothing else needs touching. The types are declared, so a missing or misspelled field fails the typecheck instead of shipping blank.

**WhatsApp share.** `invite.accepted.share.message` is the only place to edit it. The URL is built with `encodeURIComponent`, so emoji and punctuation are encoded correctly — do not hand-encode it.

**Look and feel.** Colour, type, and motion tokens are CSS custom properties at the top of [`src/globals.css`](src/globals.css):

| Token | Role | Default |
| --- | --- | --- |
| `--midnight` | page background | `#100B16` |
| `--burgundy` / `--cherry` | card fills, depth | `#42152D` / `#761E45` |
| `--rose` | accents, italics, glow | `#D97891` |
| `--champagne` | seals, numerals, highlights | `#E9CDA9` |
| `--cream` | primary text | `#FFF0DF` |
| `--coffee` | warm neutrals | `#593B32` |
| `--ease` | shared easing curve | `cubic-bezier(0.22, 1, 0.36, 1)` |

**Fonts and social preview.** `index.html` carries the Google Fonts `<link>` (Fraunces for display, Manrope for body) plus the `<title>`, theme colour, and Open Graph / Twitter tags used when the link is shared.

## Deployment

The site is published by GitHub Actions to GitHub Pages. Pushing to `main` is enough:

```bash
git push origin main
```

`.github/workflows/deploy.yml` installs dependencies, runs the typecheck, builds `dist/`, and deploys it. Pages is configured with **Source: GitHub Actions** in *Settings → Pages*; no branch artifact or `/docs` folder is involved. A deployment takes roughly a minute, and Actions shows the live URL when it finishes.

To deploy somewhere else (Vercel, Netlify, Cloudflare Pages), use the same output: build command `npm run build`, output directory `dist`. If the site is served from a domain root rather than a sub-path, set `base: "/"` in `vite.config.ts`.

There are no environment variables and no secrets in this project — nothing to configure per environment, and `.env*` files are gitignored anyway.

## Notes on behaviour

- **The call timer is a joke, not telemetry.** It counts locally in the browser, is capped at `05:59:59`, pauses when the tab is hidden, and the page states plainly that no call is placed and nothing about the visitor is tracked.
- **Sound never autoplays.** The ambient pad is created inside the click handler of the sound control, so browsers' autoplay rules are respected and the toggle is silent until it is asked to be.
- **Reduced motion is honoured.** With `prefers-reduced-motion: reduce`, the starfield paints once and stops, the call counter freezes, transitions collapse, decorations stay reachable instead of being hidden, and the celebration and ambient audio do not fire.
- **No third-party requests** beyond the Google Fonts stylesheet and font files. No analytics, no cookies, no API calls.

## License

Private — written for one very long night.
