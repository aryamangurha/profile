# Aryaman Gurha - Personal Editorial Website

This repository contains the static source code for the personal identity website of Aryaman Gurha. Designed with a luxury print-editorial aesthetic inspired by high-end publications like *Monocle* and *The Financial Times*, this website functions as a clean, responsive, and timeless presentation of his work, certifications, education, and entrepreneurial experience.

## Folder Structure

The project has been architected to deploy directly to GitHub Pages:

```text
aryaman-gurha-personal-site/
├── index.html          # Core structure, meta tags, and structured JSON-LD schema.
├── style.css           # Custom variables, typographic grids, and responsive layouts.
├── script.js           # Scroll observer, mobile navigation drawer, and micro-interactions.
├── robots.txt          # Web crawler configuration.
├── sitemap.xml         # XML indexing sitemap.
├── README.md           # This project guide.
└── assets/             # Nested static asset directory.
    ├── images/
    │   └── portrait.jpg       # Tastefully cropped professional portrait.
    ├── logos/
    │   ├── redwalk_logo.png   # Transparent logo for Redwalk Events.
    │   └── iim_jammu_logo.png # Transparent logo for Indian Institute of Management Jammu.
    └── resume/
        └── resume.pdf         # Downloadable copy of the current curriculum vitae.
```

## Technical Details

- **Frameworks**: None (pure HTML5, CSS3, and Vanilla JavaScript).
- **Typography System**: 
  - Headings: `Cormorant Garamond` (Google Fonts Serif)
  - Body Text: `Lora` (Google Fonts Serif)
  - Labels & Metadata: `Libre Franklin` (Google Fonts Sans-Serif)
- **Color System**:
  - Background: Pure White (`#ffffff`)
  - Typography: Ink Black (`#0c0c0c`) and Charcoal (`#2d2d2d`)
  - Accent: Muted Gold (`#c5a880`)
- **SEO & Performance**: Responsive structures, lazy-loaded images, schema.org JSON-LD Person schema integration, and strict semantic markup.

## How to Run Locally

You can run this project locally by spinning up any simple static file server. For example:

### Using Python:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

### Using Node.js (npx):
```bash
npx live-server
```

## Deployment to GitHub Pages

1. Commit and push the folder contents to a GitHub repository (e.g. `github.com/aryamangurha/aryamangurha.github.io`).
2. Go to the repository settings.
3. Navigate to **Pages** under the "Code and automation" sidebar.
4. Select **Deploy from a branch** under Source.
5. Set the branch to `main` (or your default branch) and directory to `/ (root)`.
6. Click **Save**. The website will be live in a few minutes.
