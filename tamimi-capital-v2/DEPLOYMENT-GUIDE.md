# D Al Tamimi Capital Website - Complete Deployment Guide

A world-class, minimal website for a prestigious Gulf family office.

---

## Table of Contents

1. [Website Overview](#website-overview)
2. [Pre-Deployment Checklist](#pre-deployment-checklist)
3. [Step 1: Prepare Your Files](#step-1-prepare-your-files)
4. [Step 2: Create GitHub Account](#step-2-create-github-account)
5. [Step 3: Create Repository & Upload](#step-3-create-repository--upload)
6. [Step 4: Enable GitHub Pages](#step-4-enable-github-pages)
7. [Step 5: Set Up Contact Form](#step-5-set-up-contact-form)
8. [Step 6: Connect Custom Domain](#step-6-connect-custom-domain)
9. [Step 7: Configure DNS at GoDaddy](#step-7-configure-dns-at-godaddy)
10. [Troubleshooting](#troubleshooting)

---

## Website Overview

**Pages:**
- `index.html` - Homepage
- `focus.html` - Our Focus (consolidated investment areas)
- `insights.html` - Thought leadership
- `contact.html` - Contact form
- `terms.html` - Legal/Terms/Privacy

**Design Philosophy:**
- Minimal, prestigious aesthetic inspired by Mubadala, Investcorp, and elite family offices
- Deep navy (#0a1628) with champagne gold (#b8976a) accents
- Elegant typography: Cormorant Garamond (display) + Inter (body)
- Cinematic hero sections with subtle animations
- Mobile-responsive throughout

---

## Pre-Deployment Checklist

Before you begin, ensure you have:

- [ ] Your logo file (PNG or SVG, recommended height: 40-60px)
- [ ] Favicon (32x32 or 64x64 PNG)
- [ ] Access to your GoDaddy account (for DNS)
- [ ] An email address for the contact form

---

## Step 1: Prepare Your Files

### 1.1 Download and Extract
Download the ZIP file and extract it to your computer.

### 1.2 Add Your Logo
Place your logo in the `/images/` folder:
- Name it `logo.png` or `logo.svg`
- If using a logo image, update the HTML files to use `<img>` instead of text

**To add a logo image**, replace this in each HTML file:
```html
<span class="logo-text">D Al Tamimi Capital</span>
```
With:
```html
<img src="images/logo.png" alt="D Al Tamimi Capital" style="height: 40px;">
```

### 1.3 Add Favicon
Place your favicon as `favicon.png` in the `/images/` folder.

---

## Step 2: Create GitHub Account

### 2.1 Go to GitHub
Visit [github.com](https://github.com) and click **Sign Up**

### 2.2 Create Account
- Enter your email address
- Create a password
- Choose a username (this will be part of your temporary URL)
- Complete verification

### 2.3 Verify Email
Check your email and click the verification link from GitHub.

---

## Step 3: Create Repository & Upload

### 3.1 Create New Repository
1. Click the **+** icon in the top right corner
2. Select **New repository**
3. Fill in details:
   - **Repository name:** `tamimi-capital` (or any name you prefer)
   - **Description:** (optional) "D Al Tamimi Capital Website"
   - **Public:** Select this option (required for free GitHub Pages)
   - **Initialize with README:** Leave unchecked
4. Click **Create repository**

### 3.2 Upload Files
1. On your new repository page, click **uploading an existing file** link
2. Drag and drop ALL files from your extracted folder:
   - `index.html`
   - `focus.html`
   - `insights.html`
   - `contact.html`
   - `terms.html`
   - `css/` folder (with styles.css inside)
   - `js/` folder (with main.js inside)
   - `images/` folder (with your logo/favicon)
3. Scroll down and click **Commit changes**

### 3.3 Verify Upload
Your repository should now show all your files. Ensure the structure looks like:
```
├── index.html
├── focus.html
├── insights.html
├── contact.html
├── terms.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── images/
    ├── logo.png (your logo)
    └── favicon.png
```

---

## Step 4: Enable GitHub Pages

### 4.1 Go to Settings
1. In your repository, click **Settings** (tab at the top)
2. Scroll down the left sidebar and click **Pages**

### 4.2 Configure GitHub Pages
1. Under **Source**, select **Deploy from a branch**
2. Under **Branch**, select **main** and **/ (root)**
3. Click **Save**

### 4.3 Wait for Deployment
- GitHub will now build your site (takes 1-3 minutes)
- Refresh the page after a minute
- You'll see: "Your site is live at https://yourusername.github.io/tamimi-capital/"

### 4.4 Test Your Site
Click the link to view your live website! 🎉

---

## Step 5: Set Up Contact Form

The contact form uses **Formspree** (free for up to 50 submissions/month).

### 5.1 Create Formspree Account
1. Go to [formspree.io](https://formspree.io)
2. Click **Get Started** → **Sign Up**
3. Create account with your email

### 5.2 Create a Form
1. After logging in, click **+ New Form**
2. Enter a name: "D Al Tamimi Capital Contact"
3. Click **Create Form**
4. Copy your form endpoint (looks like: `https://formspree.io/f/xyzabcde`)

### 5.3 Update Your Website
1. Go back to GitHub → your repository
2. Click on `contact.html`
3. Click the **pencil icon** (Edit this file)
4. Find this line:
   ```html
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
5. Replace `YOUR_FORM_ID` with your actual form ID (e.g., `xyzabcde`)
6. Scroll down and click **Commit changes**

### 5.4 Test the Form
1. Visit your live site's contact page
2. Submit a test message
3. Check your email for the submission

---

## Step 6: Connect Custom Domain

Now let's connect your domain to your new site.

> **Note:** If you own `tamimicapital.com`, you can continue using it - the "D Al" is part of the brand name, not necessarily the domain. Alternatively, if you want a new domain like `daltamimi.com` or `daltamimicapital.com`, you'd purchase that first from GoDaddy or another registrar.

### 6.1 Add Custom Domain in GitHub
1. Go to your repository → **Settings** → **Pages**
2. Under **Custom domain**, enter: `www.tamimicapital.com` (or your preferred domain)
3. Click **Save**
4. Check the box **Enforce HTTPS** (may take a few minutes to appear)

### 6.2 Create CNAME File
GitHub should automatically create a CNAME file. If not:
1. In your repository, click **Add file** → **Create new file**
2. Name it: `CNAME` (all caps, no extension)
3. Contents: `www.tamimicapital.com`
4. Click **Commit new file**

---

## Step 7: Configure DNS at GoDaddy

This is the critical step that connects your domain to GitHub.

### 7.1 Log into GoDaddy
1. Go to [godaddy.com](https://www.godaddy.com)
2. Sign in to your account
3. Go to **My Products** → Find `tamimicapital.com` → Click **DNS**

### 7.2 Remove Old Records
**Important:** You need to remove the existing website builder records.

1. Find any **A records** pointing to GoDaddy's servers
2. Delete them (click the trash icon)
3. Find any **CNAME** records for `www` pointing to GoDaddy
4. Delete those too

### 7.3 Add New DNS Records

**Record 1 - A Record (apex domain):**
| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.108.153 | 600 |

**Record 2 - A Record:**
| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.109.153 | 600 |

**Record 3 - A Record:**
| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.110.153 | 600 |

**Record 4 - A Record:**
| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 185.199.111.153 | 600 |

**Record 5 - CNAME Record (www subdomain):**
| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | yourusername.github.io | 600 |

*(Replace `yourusername` with your actual GitHub username)*

### 7.4 How to Add Records in GoDaddy

1. Click **Add** button
2. Select record **Type** (A or CNAME)
3. Enter **Name** (@ or www)
4. Enter **Value** (IP address or github.io URL)
5. Set **TTL** to 600 seconds (or "10 minutes")
6. Click **Save**
7. Repeat for all 5 records

### 7.5 Wait for Propagation
- DNS changes can take **15 minutes to 48 hours** to propagate worldwide
- Typically works within **1-2 hours**
- You can check status at [dnschecker.org](https://dnschecker.org)

### 7.6 Verify HTTPS
1. Once DNS propagates, go back to GitHub → Settings → Pages
2. The **Enforce HTTPS** checkbox should now be available
3. Check it to enable secure connections

---

## Troubleshooting

### Site Not Loading
- **Wait longer:** DNS can take up to 48 hours
- **Check DNS:** Use [dnschecker.org](https://dnschecker.org) to verify records
- **Clear cache:** Try incognito/private browsing mode

### HTTPS Not Working
- Ensure DNS has fully propagated
- Wait 24 hours after DNS setup for GitHub to issue SSL certificate
- Verify CNAME file exists in repository

### Form Not Working
- Verify Formspree form ID is correct
- Check Formspree dashboard for submissions
- Test in incognito mode (ad blockers can interfere)

### Styles Not Loading
- Ensure CSS file path is correct: `css/styles.css`
- Check that file was uploaded to correct folder
- Clear browser cache

### Images Not Showing
- Verify images are in `/images/` folder
- Check file names match exactly (case-sensitive)
- Ensure file extensions are correct (.png, .jpg, .svg)

---

## Summary: What You've Accomplished

✅ Built a world-class, minimal family office website
✅ Hosted for free on GitHub Pages
✅ Connected your custom domain
✅ Set up secure HTTPS
✅ Configured working contact form

---

## Ongoing Maintenance

### To Update Content:
1. Go to GitHub → your repository
2. Click on the file you want to edit
3. Click the pencil icon
4. Make changes
5. Click **Commit changes**
6. Site updates automatically in ~1 minute

### To Add Images:
1. Go to `/images/` folder in GitHub
2. Click **Add file** → **Upload files**
3. Drag and drop your images
4. Commit changes

---

## Support

If you encounter issues:
1. Check GitHub Pages documentation: [docs.github.com/pages](https://docs.github.com/en/pages)
2. Check Formspree documentation: [help.formspree.io](https://help.formspree.io)
3. GoDaddy DNS help: [godaddy.com/help/dns](https://www.godaddy.com/help/manage-dns-680)

---

**Congratulations!** Your prestigious family office website is now live.

*Built with precision. Presented with restraint. Designed to endure.*
