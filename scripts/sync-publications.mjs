// Pulls the publication list from ORCID + Semantic Scholar, fills in full metadata from
// Crossref and arXiv, and writes src/data/publications.auto.json in the site's format.
//
// The sync is additive: papers already in the JSON are refreshed when found again and kept
// when a source is temporarily unavailable. Manual corrections belong in publications.ts.
//
// Usage: node scripts/sync-publications.mjs [--summary path/to/summary.md]

import { readFile, writeFile } from "node:fs/promises";

const ORCID_ID = "0000-0002-3055-6988";
const S2_AUTHOR_IDS = ["2202254998"];
const OUTPUT = new URL("../src/data/publications.auto.json", import.meta.url);
const USER_AGENT = "chuchen1206.github.io publication sync (mailto:cc2331@cam.ac.uk)";

// Venue display names. `match` is tested against every venue string the sources report.
const VENUES = [
  {
    match: /transactions on biomedical engineering/i,
    venue: "IEEE Transactions on Biomedical Engineering",
    short: "TBME",
    category: "journal"
  },
  { match: /neurocomputing/i, venue: "Neurocomputing", short: "NEUCOM", category: "journal" },
  {
    match: /marine science and engineering/i,
    venue: "Journal of Marine Science and Engineering",
    short: "JMSE",
    category: "journal"
  },
  {
    match: /acoustics,? speech,? and signal processing|\bICASSP\b/i,
    venue: "IEEE International Conference on Acoustics, Speech and Signal Processing (ICASSP)",
    short: "ICASSP",
    category: "conference"
  },
  {
    match: /medical image computing|\bMICCAI\b/i,
    venue: "Medical Image Computing and Computer Assisted Intervention (MICCAI)",
    short: "MICCAI",
    category: "conference"
  },
  {
    match: /symposium on biomedical imaging|\bISBI\b/i,
    venue: "IEEE International Symposium on Biomedical Imaging (ISBI)",
    short: "ISBI",
    category: "conference"
  },
  {
    match: /computer vision and pattern recognition|\bCVPR\b/i,
    venue: "IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)",
    short: "CVPR",
    category: "conference"
  },
  {
    match: /european conference on computer vision|\bECCV\b/i,
    venue: "European Conference on Computer Vision (ECCV)",
    short: "ECCV",
    category: "conference"
  },
  {
    match: /international conference on computer vision|\bICCV\b/i,
    venue: "IEEE/CVF International Conference on Computer Vision (ICCV)",
    short: "ICCV",
    category: "conference"
  },
  {
    match: /transactions on medical imaging/i,
    venue: "IEEE Transactions on Medical Imaging",
    short: "TMI",
    category: "journal"
  },
  { match: /medical image analysis/i, venue: "Medical Image Analysis", short: "MedIA", category: "journal" },
  {
    match: /magnetic resonance in medicine/i,
    venue: "Magnetic Resonance in Medicine",
    short: "MRM",
    category: "journal"
  },
  {
    match: /siam journal on imaging sciences/i,
    venue: "SIAM Journal on Imaging Sciences",
    short: "SIIMS",
    category: "journal"
  },
  { match: /inverse problems/i, venue: "Inverse Problems", short: "IP", category: "journal" }
];

// Keyword hints for the research theme. Anything unmatched falls back to "inverse".
const THEMES = [
  { theme: "imaging", match: /\b(cest|mri|magnetic resonance|ultrasound|x-ray|laminograph|medical|clinical)\b/i },
  { theme: "geometry", match: /quasiconformal|point cloud|geometr|3d|mesh|diffusion|story|detection/i }
];

const STOPWORDS = new Set(["of", "and", "the", "on", "for", "in", "a", "an", "to", "&"]);

// ------------------------------------------------------------------ helpers

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJson(url, { retries = 5, headers = {} } = {}) {
  for (let attempt = 0; ; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": USER_AGENT, ...headers } });
    if (res.ok) return res.json();
    if (attempt >= retries || ![429, 500, 502, 503, 504].includes(res.status)) {
      throw new Error(`${res.status} ${res.statusText} for ${url}`);
    }
    await sleep(4000 * (attempt + 1));
  }
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { "User-Agent": USER_AGENT } });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res.text();
}

const clean = (text = "") =>
  text
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

const titleKey = (title) => `title:${clean(title).toLowerCase().replace(/[^a-z0-9]/g, "")}`;

const ARXIV_DOI = /^10\.48550\/arxiv\.(.+)$/i;

const normalizeDoi = (doi) => doi?.toLowerCase().replace(/^https?:\/\/(dx\.)?doi\.org\//, "").trim();

const arxivFromDoi = (doi) => doi?.match(ARXIV_DOI)?.[1];

const normalizeArxiv = (id) =>
  id
    ?.replace(/^https?:\/\/arxiv\.org\/abs\//i, "")
    .replace(/^arxiv:/i, "")
    .replace(/v\d+$/, "")
    .trim();

const yearIn = (text) => {
  const match = text?.match(/\b(19|20)\d{2}\b/);
  return match ? Number(match[0]) : undefined;
};

function acronym(name) {
  const paren = name.match(/\(([A-Z][A-Za-z0-9-]{1,11})\)/);
  if (paren) return paren[1];
  const words = name.split(/[\s\-–:]+/).filter((w) => w && !STOPWORDS.has(w.toLowerCase()));
  if (words.length === 1) return words[0].slice(0, 8).toUpperCase();
  return words.map((w) => w[0].toUpperCase()).join("");
}

// ------------------------------------------------------------------ sources

async function fromOrcid() {
  const data = await fetchJson(`https://pub.orcid.org/v3.0/${ORCID_ID}/works`, {
    headers: { Accept: "application/json" }
  });
  return data.group.map((group) => {
    const summary = group["work-summary"][0];
    const ids = Object.fromEntries(
      (summary["external-ids"]?.["external-id"] ?? []).map((e) => [e["external-id-type"], e["external-id-value"]])
    );
    const doi = normalizeDoi(ids.doi);
    return {
      source: "orcid",
      title: summary.title?.title?.value,
      venues: [summary["journal-title"]?.value].filter(Boolean),
      year: Number(summary["publication-date"]?.year?.value) || undefined,
      type: summary.type,
      doi: arxivFromDoi(doi) ? undefined : doi,
      doiText: arxivFromDoi(doi) ? undefined : ids.doi?.trim(),
      arxiv: normalizeArxiv(ids.arxiv) ?? arxivFromDoi(doi)
    };
  });
}

async function fromSemanticScholar() {
  const records = [];
  for (const authorId of S2_AUTHOR_IDS) {
    const fields = "title,year,venue,externalIds,publicationTypes,authors,journal";
    const data = await fetchJson(
      `https://api.semanticscholar.org/graph/v1/author/${authorId}/papers?fields=${fields}&limit=100`,
      { retries: 8 }
    );
    for (const paper of data.data) {
      const ids = paper.externalIds ?? {};
      const doi = normalizeDoi(ids.DOI);
      records.push({
        source: "s2",
        title: paper.title,
        authors: paper.authors?.map((a) => a.name),
        venues: [paper.venue, paper.journal?.name].filter(Boolean),
        year: paper.year ?? undefined,
        type: paper.publicationTypes?.includes("Conference") ? "conference" : undefined,
        doi: arxivFromDoi(doi) ? undefined : doi,
        doiText: arxivFromDoi(doi) ? undefined : ids.DOI?.trim(),
        arxiv: normalizeArxiv(ids.ArXiv) ?? arxivFromDoi(doi)
      });
    }
  }
  return records;
}

async function crossref(doi) {
  const { message: m } = await fetchJson(`https://api.crossref.org/works/${encodeURIComponent(doi)}`);
  const date = m.issued?.["date-parts"]?.[0]?.[0];
  return {
    source: "crossref",
    title: clean(m.title?.[0]),
    authors: m.author?.map((a) => clean([a.given, a.family].filter(Boolean).join(" ") || a.name)),
    venues: (m["container-title"] ?? []).filter((t) => !/lecture notes/i.test(t)),
    year: date,
    type: m.type,
    doi
  };
}

async function arxivMeta(ids) {
  if (!ids.length) return new Map();
  const xml = await fetchText(`https://export.arxiv.org/api/query?id_list=${ids.join(",")}&max_results=${ids.length}`);
  const entries = new Map();
  for (const entry of xml.split("<entry>").slice(1)) {
    const id = normalizeArxiv(entry.match(/<id>http:\/\/arxiv\.org\/abs\/([^<]+)<\/id>/)?.[1]);
    if (!id) continue;
    entries.set(id, {
      source: "arxiv",
      title: clean(entry.match(/<title>([\s\S]*?)<\/title>/)?.[1]),
      authors: [...entry.matchAll(/<name>([^<]+)<\/name>/g)].map((m) => clean(m[1])),
      year: yearIn(entry.match(/<published>([^<]+)<\/published>/)?.[1]),
      arxiv: id
    });
  }
  return entries;
}

// ------------------------------------------------------------------ merge

function aliasesOf(record) {
  return [
    record.doi && `doi:${record.doi}`,
    record.arxiv && `arxiv:${record.arxiv}`,
    record.title && titleKey(record.title)
  ].filter(Boolean);
}

function group(records) {
  const groups = [];
  for (const record of records) {
    const keys = aliasesOf(record);
    const hits = groups.filter((g) => keys.some((k) => g.keys.has(k)));
    const target = hits[0] ?? { keys: new Set(), records: [] };
    if (!hits.length) groups.push(target);
    for (const other of hits.slice(1)) {
      other.keys.forEach((k) => target.keys.add(k));
      target.records.push(...other.records);
      groups.splice(groups.indexOf(other), 1);
    }
    keys.forEach((k) => target.keys.add(k));
    target.records.push(record);
  }
  return groups;
}

const pick = (records, field, order) => {
  for (const source of order) {
    const value = records.find((r) => r.source === source && r[field]?.length !== 0 && r[field])?.[field];
    if (value) return value;
  }
  return undefined;
};

function toPublication({ records }) {
  const doi = records.find((r) => r.doi)?.doi;
  const doiText = records.find((r) => r.doiText)?.doiText ?? doi;
  const arxiv = records.find((r) => r.arxiv)?.arxiv;
  const title = pick(records, "title", ["s2", "arxiv", "crossref", "orcid"]);
  const authors = pick(records, "authors", ["crossref", "arxiv", "s2"]) ?? [];
  const venues = records.flatMap((r) => r.venues ?? []);
  const known = VENUES.find((v) => venues.some((name) => v.match.test(name)));
  const published = Boolean(doi) && records.some((r) => r.venues?.some((v) => !/arxiv/i.test(v)));

  let category;
  let venue;
  let venueShort;
  if (known && published) {
    ({ category, venue, short: venueShort } = known);
  } else if (published) {
    const type = pick(records, "type", ["crossref", "orcid", "s2"]) ?? "";
    category = /journal/.test(type) ? "journal" : /preprint|posted/.test(type) ? "preprint" : "conference";
    venue = clean(venues.find((v) => !/arxiv/i.test(v)));
    venueShort = acronym(venue);
  } else if (arxiv) {
    category = "preprint";
    venue = `arXiv:${arxiv}`;
    venueShort = "arXiv";
  } else {
    category = "preprint";
    venue = clean(venues[0] ?? "Preprint");
    venueShort = acronym(venue);
  }

  const year =
    (category === "conference" && venues.map(yearIn).find(Boolean)) ||
    (category === "preprint" ? pick(records, "year", ["arxiv", "s2", "orcid"]) : undefined) ||
    pick(records, "year", ["crossref", "orcid", "s2", "arxiv"]);

  const theme = THEMES.find((t) => t.match.test(`${title} ${venue}`))?.theme ?? "inverse";
  const link =
    category === "preprint" && arxiv
      ? `https://arxiv.org/abs/${arxiv}`
      : doi
        ? `https://doi.org/${doiText}`
        : undefined;
  const aliases = [doi && `doi:${doi}`, arxiv && `arxiv:${arxiv}`, titleKey(title)].filter(Boolean);

  return {
    id: aliases[0],
    aliases,
    title,
    authors: authors.join("; "),
    venue,
    venueShort,
    year,
    category,
    theme,
    ...(link && { link })
  };
}

const CATEGORY_ORDER = ["journal", "conference", "preprint", "patent"];
const byYear = (a, b) =>
  b.year - a.year ||
  CATEGORY_ORDER.indexOf(a.category) - CATEGORY_ORDER.indexOf(b.category) ||
  a.title.localeCompare(b.title);

// ------------------------------------------------------------------ main

async function main() {
  const summaryPath = process.argv.includes("--summary")
    ? process.argv[process.argv.indexOf("--summary") + 1]
    : undefined;

  const previous = JSON.parse(await readFile(OUTPUT, "utf8").catch(() => "[]"));
  const warnings = [];
  const records = [];

  for (const [name, load] of [
    ["ORCID", fromOrcid],
    ["Semantic Scholar", fromSemanticScholar]
  ]) {
    try {
      const found = await load();
      console.log(`${name}: ${found.length} works`);
      records.push(...found);
    } catch (error) {
      warnings.push(`${name} unavailable: ${error.message}`);
    }
  }
  if (!records.length) throw new Error(`No source responded.\n${warnings.join("\n")}`);

  for (const doi of [...new Set(records.map((r) => r.doi).filter(Boolean))]) {
    try {
      records.push(await crossref(doi));
    } catch (error) {
      warnings.push(`Crossref lookup failed for ${doi}: ${error.message}`);
    }
  }
  try {
    const arxivIds = [...new Set(records.map((r) => r.arxiv).filter(Boolean))];
    records.push(...(await arxivMeta(arxivIds)).values());
  } catch (error) {
    warnings.push(`arXiv lookup failed: ${error.message}`);
  }

  const fresh = group(records).map(toPublication);
  const merged = [...fresh];
  for (const old of previous) {
    if (!fresh.some((p) => p.aliases.some((a) => old.aliases.includes(a)))) merged.push(old);
  }
  merged.sort(byYear);

  const output = `${JSON.stringify(merged, null, 2)}\n`;
  const changed = output !== `${JSON.stringify(previous, null, 2)}\n`;
  if (changed) await writeFile(OUTPUT, output);

  const added = fresh.filter((p) => !previous.some((old) => old.aliases.some((a) => p.aliases.includes(a))));
  const updated = fresh.filter((p) => {
    const old = previous.find((o) => o.aliases.some((a) => p.aliases.includes(a)));
    return old && JSON.stringify(old) !== JSON.stringify(p);
  });

  const lines = ["## Publication sync", ""];
  if (added.length) {
    lines.push("### New papers", "");
    for (const p of added) lines.push(`- **${p.title}** — ${p.venueShort} ${p.year} (\`${p.id}\`, theme guessed as \`${p.theme}\`)`);
    lines.push("");
  }
  if (updated.length) {
    lines.push("### Updated metadata", "");
    for (const p of updated) lines.push(`- ${p.title} (\`${p.id}\`)`);
    lines.push("");
  }
  if (!added.length && !updated.length) lines.push("No changes.", "");
  if (warnings.length) lines.push("### Warnings", "", ...warnings.map((w) => `- ${w}`), "");
  lines.push(
    "Fix anything that looks wrong in `src/data/publications.ts` (`overrides`), keyed by DOI, arXiv id or title.",
    ""
  );

  const summary = lines.join("\n");
  console.log(summary);
  if (summaryPath) await writeFile(summaryPath, summary);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
