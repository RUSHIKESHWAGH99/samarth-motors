# Samarth Motors — Website

Static one-page site for **Samarth Motors** garage (Waluj, Chhatrapati Sambhajinagar).

## Free hosting (Vercel)

1. Push this repo to GitHub (e.g. `RUSHIKESHWAGH99/samarth-motors`).
2. Import the project in [Vercel](https://vercel.com) and deploy.
3. In Vercel → Project → **Settings → Domains**, add a subdomain such as **`samarth-motors`** so the live URL becomes **`https://samarth-motors.vercel.app`** (first come, first served on the name).

After your real URL is live, update these files to match **exactly** (replace `https://samarth-motors.vercel.app`):

- `public/index.html` — `canonical`, `og:url`, JSON-LD `@id` / `url`
- `public/sitemap.xml`
- `public/robots.txt`

## Google Search Console & SEO

The site includes **meta tags**, **Open Graph / Twitter**, **`robots.txt`**, **`sitemap.xml`**, and **JSON-LD** (`WebSite`, `LocalBusiness` + `AutomotiveRepair`, `FAQPage`), plus a **local keywords** section on the page for Waluj / CIDCO / Maruti / Hyundai.

1. Add a Search Console property for your live URL.
2. Submit **`/sitemap.xml`** and request indexing for the homepage.
3. **Google Business Profile** — claim the garage, use the same name, address, phone, and **link this website**. This matters most for ranking above random pages in **local** search.
4. Ask happy customers to **review on Google** and mention “Waluj” / “Samarth Motors” naturally.

## Local preview

Open `public/index.html` in a browser, or run any static server from the `public` folder.
