# Mohammed Jameel — Portfolio

Personal portfolio website for **Mohammed Jameel Fouad**, a Full Stack Developer (AWS Certified Developer – Associate) based in Cairo, Egypt.

## Tech Stack
- **HTML5** semantic markup
- **CSS3** with custom properties (variables), dark/light themes, RTL support
- **Vanilla JavaScript** — no frameworks, no build step
- **Boxicons** for icons (self-hosted skill icons under `assets/icons/`, CDN CSS pinned with SRI)
- **Self-hosted fonts** — Cairo / Lato / JetBrains Mono woff2 subsets under `assets/fonts/` (no third-party font CSS request)
- **WebP** optimized images

## Features
- Bilingual (English / Arabic) with full RTL support
- Dark / Light theme toggle (persisted via `localStorage`, **flash-free** via inline pre-paint script)
- Animated hero with typewriter role swap + "Open to Opportunities" badge
- AI chatbot — real LLM (streaming responses, bilingual EN/AR, conversation memory) with a rule-based offline fallback
- Working **contact form** (FormSubmit — no backend needed) with inline validation and status messages
- Copy-to-clipboard buttons for email / phone
- Back-to-top button + reading progress bar
- Responsive design (mobile sidebar, fluid grids)
- Accessibility: ARIA labels (translated), keyboard nav, visible focus rings everywhere (incl. chatbot), 44px-class tap targets, AA contrast in both themes, focus traps in sidebar/modal, `prefers-reduced-motion` support, logical heading outline (single `h1`, sections as `h2`)
- SEO: meta tags + Open Graph + Twitter cards with a proper 1200×630 share card, `sitemap.xml`, `robots.txt`, JSON-LD (`Person` + credentials + skills)
- PWA: `manifest.json` with PNG icons (192/512 + maskable) + service worker (`sw.js`) for offline support
- Custom branded `404.html`
- Lighthouse CI on every push (`.github/workflows/lighthouse.yml`)

## Sections
1. Hero — intro, availability badge, social links, animated stats
2. About — bio + engineering stats (150+ endpoints, 500+ tests)
3. Education
4. Experience
5. Projects (5 featured)
6. Skills (Frontend, Backend & Database, Cloud & DevOps, Mobile & Programming, Systems & Networking)
7. Certifications (11)
8. Volunteering (GDG on Campus)
9. Contact (info + working form)

## ⚠️ Before You Deploy — 2 one-time steps

### 1. Activate the contact form (one click)
The form posts via [FormSubmit](https://formsubmit.co) to `mo.jameel.official@gmail.com` — no account needed. The **first** time anyone submits, FormSubmit emails you an activation link; confirm it once and the form is live forever. To pre-activate: open the deployed site, send yourself a test message, click the link in your inbox.

### 2. (Optional) Enable analytics
Create a free account at [goatcounter.com](https://www.goatcounter.com), then uncomment this line in `index.html` `<head>` and replace `YOUR-SITE`:
```html
<script data-goatcounter="https://YOUR-SITE.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>
```

### 3. (Optional, recommended) Add Live Demo links
Project cards currently link to source code only. When you deploy a live demo (e.g. the AWS Scalable Web App infrastructure as a CloudFormation stack or a hosted app), add a **Live Demo** button next to *View Code* in the project card — it is the strongest programming proof for the SAA certification.

## Deployment
Static site — push to GitHub Pages or any static host.

```bash
# from project root
git add .
git commit -m "feat: QA hardening — a11y/i18n/SEO fixes, self-hosted fonts, SRI"
git push origin main
```

Notes:
- The **AI chatbot** uses the free Pollinations.ai endpoint (no API key). It works from your `github.io` origin; heavy traffic may hit anonymous rate limits, in which case the bot automatically falls back to its built-in knowledge base.
- This release ships `CACHE_NAME = mj-portfolio-v3` in `sw.js` (already bumped). When you ship asset changes later, bump it again (`v4`, `v5`, …) so returning visitors get the fresh version.
- Lighthouse CI runs on push to `main`/`master` and fails the check if Performance < 90, Accessibility < 95, Best-Practices < 90, or SEO < 95.
- After the first deploy, do a quick real-device smoke test: open the chatbot and send a message, submit the contact form, and toggle language + theme once.

## License
MIT — free to use as a template, please replace personal info first.

---
&copy; 2026 Mohammed Jameel
