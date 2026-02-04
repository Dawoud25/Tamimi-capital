# D. Al Tamimi Capital Website - Version 3.0

A world-class, institutional-grade website for a prestigious Gulf family office.

---

## Site Structure

```
├── index.html              # Homepage with video hero
├── principles.html         # 8 Guiding Principles + Mandate
├── focus.html              # Overview of focus areas
├── private-credit.html     # Private Credit & Commercial Real Estate
├── legacy-nexus.html       # Business Continuity & Governance
├── digital-transformation.html  # Fintech & Technology
├── insights.html           # Media coverage & thought leadership
├── contact.html            # Contact form
├── terms.html              # Legal disclaimers
├── css/
│   └── styles.css          # All styling
├── js/
│   └── main.js             # Interactions & animations
├── images/                 # Your images go here
│   ├── logo.png            # Your logo (add this)
│   ├── favicon.png         # Browser tab icon (add this)
│   ├── og-image.jpg        # Social sharing image (add this)
│   └── hero-bg.jpg         # Fallback hero image (add this)
└── video/
    └── hero-video.mp4      # Your hero video (add this)
```

---

## Before Deploying

### 1. Add Your Video
Place your DaVinci Resolve export in `/video/`:
- Filename: `hero-video.mp4`
- Format: MP4 (H.264)
- Resolution: 1920x1080
- Length: 12-15 seconds
- Size: Under 10MB for performance
- Audio: None (muted)

### 2. Add Your Images
Place in `/images/`:
- `logo.png` - Your logo (transparent background)
- `favicon.png` - 64x64 browser icon
- `og-image.jpg` - 1200x630 for social sharing
- `hero-bg.jpg` - Fallback image if video doesn't load

### 3. Set Up Contact Form
1. Go to formspree.io and create account
2. Create new form, copy form ID
3. In `contact.html`, replace `YOUR_FORM_ID` with your actual ID

---

## Deploying to GitHub Pages

### Upload Files:
1. Go to your GitHub repository
2. Delete old files (or create new repo)
3. Upload all files from this folder
4. Ensure folder structure is preserved

### Enable GitHub Pages:
1. Repository → Settings → Pages
2. Source: Deploy from branch
3. Branch: main, folder: / (root)
4. Save

### Custom Domain (if using tamimicapital.com):
1. In GitHub Pages settings, add custom domain
2. Update DNS at GoDaddy (see previous instructions)

---

## Features

- **Video Hero**: Cinematic background with desert→cityscape narrative
- **Partner Portal**: Signals institutional infrastructure
- **8 Principles**: Your governance philosophy
- **Focus Areas**: 3 dedicated pages with depth
- **Insights**: Media coverage and thought leadership
- **Legal**: Comprehensive disclaimers (no solicitation, institutional only)
- **Mobile Responsive**: Works on all devices
- **Subtle Animations**: Fade-in on scroll

---

## Design Philosophy

- Heritage expressed through tone, not explicit claims
- Institutional credibility without boastfulness
- "Quiet strength" - prestige through restraint
- No social media icons or clutter
- Partner Portal signals exclusive access

---

## Color Palette

- Primary Navy: #0a1628
- Accent Gold: #b8976a
- Off-White: #f9f9f9
- Body Text: #4a4a4a

## Typography

- Headings: Cormorant Garamond (serif)
- Body: Inter (sans-serif)

---

## Files to Update Periodically

- `insights.html` - Add new media coverage, speaking engagements
- `terms.html` - Update year in copyright
- `legacy-nexus.html` - Add white paper download when ready

---

## Questions?

Refer to the deployment guide or contact your developer.

Built with precision. Presented with restraint. Designed to endure.
