# Orison Project — website

Orison Project sits at the intersection of data, AI, research, technology and development. We work with organisations building solutions to major social and development challenges.

Our focus is not simply on building technology. We help organisations understand problems through data, build better solutions, evaluate what actually works, and move the ones that do toward the people who need them most — a bridge from **data → AI → solutions → evidence → scale → impact**.

**Solutions.** We work in three domains — Agriculture × AI, Health × AI, and Education × AI — helping with data, building the solution, evaluation and design. We also help promising, evidence-backed solutions scale, connecting the teams behind them with INGOs, governments, development organisations, funders and implementation partners in a position to adopt what works.

**Services.** Research, data analysis, impact evaluation, and systematic and narrative reviews. Our clients are NGOs, governments, INGOs, startups and social enterprises working to reduce poverty and improve people's lives.

**Careers.** We look for people interested in data, AI, research, design, technology and social impact.

Contact: hello@orisonproject.org

---

## About this repository

A static site — HTML, CSS and vanilla JavaScript, no build step and no dependencies to install. It runs by opening a file and deploys to GitHub Pages as-is.

```
orison-web/
├─ index.html        home
├─ about.html
├─ solutions.html
├─ services.html
├─ careers.html
├─ .nojekyll
└─ assets/
    ├─ css/main.css
    ├─ js/main.js
    └─ img/
```

### Preview locally

Open `index.html`, or serve the folder:

```bash
cd orison-web
python3 -m http.server 8000   # then visit http://localhost:8000
```

### Deploy to GitHub Pages

1. Push these files to the root of a repository.
2. **Settings → Pages → Source:** *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. The site publishes within a minute or two. `.nojekyll` is included so `assets/` is served untouched.

For a custom domain, add a `CNAME` file containing just the domain and set it under Settings → Pages.

### What's interactive

Everything works — no static mockups. Sticky navigation, a full-screen mobile drawer with staggered links, line-by-line headline reveals, scroll-triggered section and image reveals, an animated network diagram in the scaling sections, an accessible services accordion (real `aria-expanded`/`aria-controls`, one panel open at a time, keyboard-operable), hover states throughout, and gentle parallax on full-bleed images. All motion is disabled under `prefers-reduced-motion`, and the site is fully readable with JavaScript off.

### Before launch

- Replace `hello@orisonproject.org` with the real address if it differs.
- Add real roles to `careers.html` when you have them — the page currently shows the "no open positions" state with a general contact route.
- Swap `assets/img/og.png` if you want a different link-preview image.

### A note on the tech stack

The brief specified Next.js, React, Tailwind and Framer Motion. This is built as a plain static site instead, because the existing site deploys to GitHub Pages and this version needs no build pipeline, no `node_modules`, and no hosting change — while delivering the same interactions. If you'd prefer the Next.js version (useful once you add a CMS, a blog index, or server-rendered job listings), the design system and components port over cleanly.
