function cacheKey(username) {
  return `githubRepos:${username}`;
}

export function readCachedRepos(username, ttlSeconds) {
  try {
    const raw = localStorage.getItem(cacheKey(username));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.ts || !Array.isArray(parsed?.data)) return null;
    if (typeof ttlSeconds === "number" && ttlSeconds > 0) {
      const ageMs = Date.now() - parsed.ts;
      if (ageMs > ttlSeconds * 1000) return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

export function writeCachedRepos(username, repos) {
  try {
    localStorage.setItem(cacheKey(username), JSON.stringify({ ts: Date.now(), data: repos }));
  } catch {
    // ignore
  }
}

export async function fetchGithubRepos(username) {
  const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`;
  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  const remaining = res.headers.get("x-ratelimit-remaining");
  const reset = res.headers.get("x-ratelimit-reset");
  if (!res.ok) {
    const extra =
      res.status === 403 && remaining === "0" && reset
        ? `Rate limit reset at ${new Date(Number(reset) * 1000).toLocaleString()}`
        : null;
    const msg = extra ? `${res.status} (${extra})` : `${res.status}`;
    throw new Error(msg);
  }
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Unexpected GitHub response");
  return data.map((r) => ({
    name: r.name,
    full_name: r.full_name,
    html_url: r.html_url,
    description: r.description,
    language: r.language,
    fork: Boolean(r.fork),
    archived: Boolean(r.archived),
    disabled: Boolean(r.disabled),
    stargazers_count: Number(r.stargazers_count || 0),
    pushed_at: r.pushed_at,
    homepage: r.homepage || null,
  }));
}

const FRONT_SUFFIXES = ["-front", "-frontend", "-web", "-ui", "-client"];
const BACK_SUFFIXES = ["-back", "-backend", "-api", "-server", "-service", "-svc"];

function normalizeName(name) {
  return String(name || "").trim().toLowerCase().replaceAll("_", "-");
}

function stripAnySuffix(normalized, suffixes) {
  for (const suf of suffixes) {
    if (normalized.endsWith(suf)) return normalized.slice(0, -suf.length);
  }
  return normalized;
}

export function classifyRepo(repoName) {
  const n = normalizeName(repoName);
  if (FRONT_SUFFIXES.some((s) => n.endsWith(s))) return "frontend";
  if (BACK_SUFFIXES.some((s) => n.endsWith(s))) return "backend";
  return "other";
}

export function groupRepos(repos) {
  const byBase = new Map();

  for (const repo of repos) {
    const n = normalizeName(repo.name);
    let base = stripAnySuffix(n, [...FRONT_SUFFIXES, ...BACK_SUFFIXES]);
    base = base.replace(/-+$/g, "");
    if (!base) base = n;

    const entry = byBase.get(base) || { base, repos: [], frontend: [], backend: [], other: [] };
    entry.repos.push(repo);

    const cls = classifyRepo(repo.name);
    entry[cls].push(repo);

    byBase.set(base, entry);
  }

  const groups = Array.from(byBase.values()).map((g) => {
    const latestPushed = g.repos
      .map((r) => new Date(r.pushed_at).getTime())
      .filter((t) => Number.isFinite(t))
      .sort((a, b) => b - a)[0];

    const stars = g.repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
    const languages = Array.from(
      new Set(g.repos.map((r) => r.language).filter(Boolean).map((l) => String(l)))
    );

    const primary = g.backend[0] || g.frontend[0] || g.other[0] || g.repos[0];

    const displayName = g.base
      .split("-")
      .filter(Boolean)
      .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
      .join(" ");

    return { ...g, latestPushed, stars, languages, primary, displayName };
  });

  groups.sort((a, b) => {
    if ((b.latestPushed || 0) !== (a.latestPushed || 0)) return (b.latestPushed || 0) - (a.latestPushed || 0);
    return (b.stars || 0) - (a.stars || 0);
  });

  return groups;
}

