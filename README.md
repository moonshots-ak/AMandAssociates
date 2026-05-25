# AMA Website — Akshay Maheshwari & Associates

## How to Make Changes (No IT Knowledge Required)

Everything on this website is managed through **GitHub** and automatically published via **Cloudflare Pages**.
You do not need to install anything on your computer.

---

## How to Update Website Content

### Step 1 — Open GitHub
Go to [github.com](https://github.com) and sign in to your account.
Open the repository for this website.

### Step 2 — Find the file to edit
All website files are inside the **`src/`** folder.
- `src/index.html` — Home page
- `src/about.html` — About Us page
- `src/services.html` — Services page
- `src/international.html` — International page
- `src/sectors.html` — Sectors page
- `src/team.html` — Team page
- `src/gallery.html` — Gallery page
- `src/contact.html` — Contact Us page

### Step 3 — Edit the file
Click on the file name, then click the **pencil icon (Edit)** in the top right.
Make your changes to the text. Look for the words between `>` and `<` — that is the content.

**Example:** To change a phone number, find:
```
+91 96694 29551
```
And replace it with the new number.

### Step 4 — Save (Commit)
Scroll down, add a short note about what you changed (e.g. "Updated phone number"),
then click **"Commit changes"**.

✅ **Done!** The website will update automatically within 1–2 minutes.

---

## How to Add a Photo to the Gallery

### Step 1 — Upload the photo
In GitHub, go to `src/assets/gallery/`.
Click **"Add file" → "Upload files"**.
Drag your photo into the upload area and click **"Commit changes"**.

> Photo tips: Use JPG format. Keep file size under 2MB for fast loading.
> Name files simply: `office-new.jpg`, `team-2025.jpg`, etc.

### Step 2 — Add the photo to the gallery list
Open the file `src/js/gallery-data.js` and click the **pencil icon** to edit it.

Find the last entry in the list (it ends with `},`) and add a new line **before** the closing `];`.

Copy this pattern exactly:
```
{ file: "your-photo-name.jpg", caption: "A short description", category: "office" },
```

**Categories available:**
- `"office"` — for office photos
- `"team"` — for team photos
- `"events"` — for events and celebrations

### Step 3 — Commit the change
Click **"Commit changes"**. The photo will appear on the gallery page within 1–2 minutes.

---

## How to Set Up the Contact Form

The contact form uses a free service called **Formspree**. You only need to do this once.

1. Go to [formspree.io](https://formspree.io) and sign up for a free account using your Gmail.
2. Click **"New Form"**, give it a name (e.g. "AMA Website Contact"), and enter your email address.
3. Formspree will give you a **Form ID** that looks like: `xyzabcde`
4. Open `src/contact.html` in GitHub, find this line:
   ```
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
   Replace `YOUR_FORM_ID` with your actual Form ID.
5. Commit the change.

From now on, every form submission will be sent directly to your email.

---

## How to Add a Team Member Photo

1. Take a professional photo (square or portrait works best).
2. Name it something like: `akshay-maheshwari.jpg`
3. Upload it to `src/assets/team/` in GitHub.
4. Open `src/team.html` and find the team member's card.
   Look for this line inside their card:
   ```html
   <!-- Replace src with actual photo: <img src="assets/team/akshay-maheshwari.jpg" alt="CA Akshay Maheshwari"> -->
   ```
5. Remove the `<!--` and `-->` comment markers to activate the `<img>` tag,
   and delete the line with `<span class="avatar-initials">`.
6. Commit the change.

---

## Deployment

This site is deployed via **Cloudflare Pages** connected to this GitHub repository.
Every commit to the `main` branch triggers an automatic deployment.
The site is live globally via Cloudflare's CDN with free HTTPS.

**To set up Cloudflare Pages (one-time):**
1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Go to **Pages** → **Create a project** → **Connect to Git**
3. Select this GitHub repository
4. Set **Build output directory** to: `src`
5. Leave build command empty (this is a plain HTML site — no build needed)
6. Click **Save and Deploy**

To connect a custom domain (e.g. `amaindia.com`), go to your Cloudflare Pages project → **Custom domains**.

---

## File Structure

```
src/
├── index.html              — Home page
├── about.html              — About Us
├── services.html           — Services (8 practice areas)
├── international.html      — International advisory
├── sectors.html            — 12 industries served
├── team.html               — Team profiles
├── gallery.html            — Photo gallery
├── contact.html            — Contact form + map
├── 404.html                — Page not found
├── _headers                — Security headers (Cloudflare)
├── css/
│   └── style.css           — All styles (one file)
├── js/
│   ├── main.js             — Core JavaScript
│   ├── gallery.js          — Gallery rendering & lightbox
│   └── gallery-data.js     — ★ Edit this to add/update gallery photos ★
└── assets/
    ├── gallery/            — ★ Drop gallery photos here ★
    └── team/               — Team member photos
```

---

## Support

For technical help, contact your web developer.

For content updates (text, photos, contact details), follow the steps in this guide —
no developer needed.
