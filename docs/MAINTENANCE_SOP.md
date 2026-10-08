# Maintenance SOP

## Fast update workflow

### A. New paper accepted

1. Make sure the paper is on ORCID (or Semantic Scholar / arXiv)
2. Wait for the weekly `Publication sync` pull request, or run the `Sync publications` workflow by hand, or run `npm run sync:pubs` locally
3. Check the new entry; fix anything wrong (short name, theme, link, author spelling, `hidden: true`) in `overrides` in `src/data/publications.ts`
4. Merge the pull request (or commit and push to `main`)
5. Papers the sources cannot find (e.g. patents) go in `manual` in the same file

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
