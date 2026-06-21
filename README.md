# Chu Chen Academic Homepage

Astro-based academic personal website, optimized for:

- clean design
- low maintenance
- easy content updates
- search discoverability

## 1) Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

## 2) Content model (single source of truth)

Only update these files for most changes:

- `src/data/profile.ts` - name, title, links, research interests
- `src/data/publications.ts` - journal/conference/preprint/patent list
- `src/data/service.ts` - organizer/reviewer/teaching/service
- `src/content/cv.md` - CV narrative
- `src/content/service.md` - service narrative

Core page files:

- `src/pages/index.astro`
- `src/pages/publications.astro`
- `src/pages/cv.astro`
- `src/pages/service.astro`

## 3) Add a new publication (5 minutes)

1. Edit `src/data/publications.ts`
2. Add one item with `title/authors/venue/year/category/link`
3. Commit and push to `main`
4. GitHub Actions auto-deploys

## 4) Deploy to GitHub Pages

1. Create repository: `chuchen1206.github.io`
2. Push this project to branch `main`
3. In GitHub repo settings:
   - `Pages -> Source`: `GitHub Actions`
4. Wait for workflow `.github/workflows/deploy.yml` to finish

## 5) SEO checklist (search visibility)

Already configured:

- canonical URL in each page
- OpenGraph/Twitter meta
- JSON-LD (`Person` and `ScholarlyArticle`)
- `robots.txt`
- sitemap via `@astrojs/sitemap`

After first deployment:

1. Submit `https://chuchen1206.github.io/sitemap-index.xml` to:
   - Google Search Console
   - Bing Webmaster Tools
2. Add site link back from:
   - ORCID profile
   - Google Scholar profile
   - LinkedIn
   - GitHub profile bio

## 6) Quarterly maintenance routine

- verify external links and emails
- update current position and affiliation
- publish accepted papers/preprints
- check index coverage in Search Console
- refresh featured papers on homepage

## 7) Optional improvements

- add `public/files/CV.pdf` and link from `/cv`
- migrate publication source to `.bib` and auto-generate list
- add news page for accepted papers and talks
