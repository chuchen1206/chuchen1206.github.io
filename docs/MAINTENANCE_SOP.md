# Maintenance SOP

## Fast update workflow

### A. New paper accepted

1. Add a new entry in `src/data/publications.ts`
2. Set category: `journal` or `conference` or `preprint`
3. Add DOI/arXiv link
4. Commit message: `update publication list`
5. Push to `main`

### B. Position or service update

1. Edit `src/data/profile.ts` and/or `src/data/service.ts` (homepage and CV page update together)
2. For new photos, add a resized image under `public/images/web/` and an entry in `src/data/gallery.ts` (include the pixel `width` and `height`, e.g. from `sips -g pixelWidth -g pixelHeight`, so the photo is shown uncropped)
3. Institution logos live in `public/images/logos/` and are referenced by the `logo` field of timeline entries
4. Commit and push

### C. CV PDF update

1. Export latest PDF from LaTeX
2. Save as `public/files/CV.pdf`
3. Commit and push

## Quarterly checklist

- [ ] Check all social links (ORCID, Scholar, LinkedIn, GitHub)
- [ ] Check all publication links
- [ ] Confirm homepage featured papers are still representative
- [ ] Review `meta description` and title for current role
- [ ] Open Google Search Console and check index coverage
- [ ] Submit sitemap again if major URL changes happened
