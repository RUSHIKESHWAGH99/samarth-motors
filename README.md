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

## Google Search Console

- Add property for your final URL.
- Submit `https://<your-domain>/sitemap.xml`.
- Optionally claim the [Google Business Profile](https://business.google.com) for the garage and link this website — that helps local “Samarth Motors” searches.

## Local preview

Open `public/index.html` in a browser, or run any static server from the `public` folder.
