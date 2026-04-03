import { useEffect, useMemo, useState } from "react";
import { FaGithub } from "react-icons/fa";
import Section from "../Section.jsx";
import { useLanguage } from "../../state/language.jsx";
import { useTheme } from "../../state/theme.jsx";
import config from "../../../portfolio.config.json";
import { fetchGithubRepos, groupRepos, readCachedRepos, writeCachedRepos } from "../../lib/github.js";

function SkeletonCard() {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="glass rounded-4 p-4 h-100">
        <div className="placeholder-glow">
          <div className="placeholder col-6 mb-2" />
          <div className="placeholder col-10 mb-2" />
          <div className="placeholder col-8" />
        </div>
      </div>
    </div>
  );
}

function LinkButton({ href, label }) {
  const { theme } = useTheme();
  const cls = theme === "light" ? "btn btn-sm btn-outline-dark border-opacity-25" : "btn btn-sm btn-outline-light border-opacity-25";
  return (
    <a
      className={cls}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {label}
    </a>
  );
}

export default function Projects() {
  const { t, lang } = useLanguage();
  const { theme } = useTheme();

  const username = config.githubUser;
  const ttl = Number(config?.projects?.cacheTtlSeconds || 3600);
  const defaultIncludeForks = Boolean(config?.projects?.includeForks);

  const [includeForks, setIncludeForks] = useState(defaultIncludeForks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const cached = readCachedRepos(username, ttl);
        if (cached && mounted) {
          setRepos(cached);
          setLoading(false);
        }

        const fresh = await fetchGithubRepos(username);
        if (!mounted) return;
        writeCachedRepos(username, fresh);
        setRepos(fresh);
      } catch (e) {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [ttl, username]);

  const visibleRepos = useMemo(() => {
    return repos
      .filter((r) => !r.archived && !r.disabled)
      .filter((r) => (includeForks ? true : !r.fork));
  }, [includeForks, repos]);

  const groups = useMemo(() => groupRepos(visibleRepos), [visibleRepos]);

  return (
    <Section id="projects" eyebrow={t.projects.eyebrow} title={t.projects.title}>
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
        <div className="muted">{t.projects.hint}</div>
        <a
          className={`btn btn-sm ${
            theme === "light" ? "btn-outline-dark" : "btn-outline-light"
          } border-opacity-25 d-inline-flex align-items-center gap-2`}
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub size={16} />
          <span>{t.projects.githubProfile}</span>
        </a>
      </div>

      <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="forks"
            checked={includeForks}
            onChange={(e) => setIncludeForks(e.target.checked)}
          />
          <label className="form-check-label muted" htmlFor="forks">
            {includeForks ? t.projects.forksShown : t.projects.forksHidden}
          </label>
        </div>
      </div>

      {loading ? (
        <div className="row g-3">
          {Array.from({ length: 6 }).map((_, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </div>
      ) : error ? (
        <div className="glass rounded-4 p-4">
          <div className="fw-semibold mb-1">{t.projects.errorTitle}</div>
          <div className="muted small mb-2">
            {t.projects.errorHint} ({error})
          </div>
          <div className="muted small mb-0">This portfolio fetches public data directly from GitHub.</div>
        </div>
      ) : (
        <div className="row g-3">
          {groups.map((g) => {
            const updated = g.latestPushed
              ? new Date(g.latestPushed).toLocaleDateString(lang === "pt-BR" ? "pt-BR" : "en-US")
              : "—";

            const used = new Set();
            const frontend = g.frontend[0] || null;
            const backend = g.backend[0] || null;
            if (frontend) used.add(frontend.full_name);
            if (backend) used.add(backend.full_name);
            const remaining = g.repos.filter((r) => !used.has(r.full_name));
            const extraPrimary = remaining[0] || null;
            const extraList = remaining.slice(extraPrimary ? 1 : 0);

            return (
              <div key={g.base} className="col-md-6 col-lg-4">
                <div className="glass card-hover rounded-4 p-4 h-100">
                  <div className="d-flex align-items-start justify-content-between gap-3">
                    <div>
                      <div className="fw-semibold">{g.displayName}</div>
                      <div className="small muted">
                        {g.languages.length ? g.languages.join(" • ") : "—"} • {t.projects.updated} {updated}
                      </div>
                    </div>
                    <FaGithub className="muted" size={18} />
                  </div>

                  <p className="mt-3 mb-3 muted">
                    {g.primary?.description || "—"}
                  </p>

                  <div className="d-flex flex-wrap gap-2">
                    {frontend ? (
                      <LinkButton href={frontend.html_url} label={t.projects.frontend} />
                    ) : null}
                    {backend ? (
                      <LinkButton href={backend.html_url} label={t.projects.backend} />
                    ) : null}
                    {(!frontend && !backend && g.repos[0]) || extraPrimary ? (
                      <LinkButton
                        href={(extraPrimary || g.repos[0]).html_url}
                        label={t.projects.repo}
                      />
                    ) : null}
                  </div>

                  {extraList.length ? (
                    <div className="mt-3">
                      <div className="small fw-semibold mb-2">{t.projects.other}</div>
                      <div className="d-flex flex-wrap gap-2">
                        {extraList.slice(0, 4).map((r) => (
                          <a
                            key={r.full_name}
                            className={`btn btn-sm ${
                              theme === "light" ? "btn-outline-dark" : "btn-outline-light"
                            } border-opacity-25`}
                            href={r.html_url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {r.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Section>
  );
}
