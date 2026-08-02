import { useState, useEffect, useRef } from 'react';
import { personalInfo } from '../data/portfolioData';

const GITHUB_API = `https://api.github.com/repos/${personalInfo.githubUsername}`;
const REPO_NAME = 'VSCode-Personal-Portfolio';

export default function SourceControlPopup({ open, onClose }) {
  const popupRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [repoData, setRepoData] = useState(null);
  const [commits, setCommits] = useState([]);
  const [error, setError] = useState(false);

  // Fetch repo data when opened
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    setError(false);

    const fetchData = async () => {
      try {
        // Fetch repo info and commit list
        const [repoRes, commitsRes] = await Promise.all([
          fetch(`${GITHUB_API}/${REPO_NAME}`),
          fetch(`${GITHUB_API}/${REPO_NAME}/commits?per_page=100`),
        ]);

        if (!repoRes.ok || !commitsRes.ok) throw new Error('API error');

        const repo = await repoRes.json();
        const commitsList = await commitsRes.json();
        const totalCommits = Array.isArray(commitsList) ? commitsList.length : 0;

        // Fetch the latest commit detail to get additions/deletions
        let latestAdditions = 0;
        let latestDeletions = 0;

        if (commitsList.length > 0) {
          const latestSha = commitsList[0].sha;
          const detailRes = await fetch(`${GITHUB_API}/${REPO_NAME}/commits/${latestSha}`);
          if (detailRes.ok) {
            const detailData = await detailRes.json();
            latestAdditions = detailData.stats?.additions || 0;
            latestDeletions = detailData.stats?.deletions || 0;
          }
        }

        setRepoData({ ...repo, totalCommits, latestAdditions, latestDeletions });
        setCommits(commitsList.slice(0, 5));
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [open]);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) onClose();
    };
    const timeout = setTimeout(() => window.addEventListener('mousedown', handleClick), 50);
    return () => { clearTimeout(timeout); window.removeEventListener('mousedown', handleClick); };
  }, [open, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const defaultBranch = repoData?.default_branch || 'master';
  const totalCommits = repoData?.size ? commits.length + '+' : '...';
  const lastPush = repoData?.pushed_at
    ? new Date(repoData.pushed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : '...';

  const formatTimeAgo = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 30) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div
      ref={popupRef}
      style={{
        position: 'fixed', top: 80, left: 56,
        width: 320, background: '#1e1f2e',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10, boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
        zIndex: 900, overflow: 'hidden',
        animation: 'scPopupIn 0.15s ease-out',
      }}
    >
      <style>{`
        @keyframes scPopupIn {
          from { opacity: 0; transform: translateX(-8px) scale(0.96); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        padding: '0.65rem 0.85rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
          color: 'var(--text-muted)', textTransform: 'uppercase',
          letterSpacing: '0.1em', fontWeight: 600,
        }}>
          Source Control
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none', color: 'var(--text-muted)',
            fontSize: '1rem', cursor: 'pointer', padding: '0 0.25rem',
            lineHeight: 1, borderRadius: 3, transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div style={{ padding: '0.75rem 0.85rem' }}>
        {loading ? (
          <div style={{
            textAlign: 'center', padding: '2rem 0',
            fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
            color: 'var(--text-muted)',
          }}>
            <span style={{ animation: 'scPulse 1.5s ease-in-out infinite' }}>Fetching repo data...</span>
            <style>{`@keyframes scPulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }`}</style>
          </div>
        ) : error ? (
          <div style={{
            textAlign: 'center', padding: '1.5rem 0',
            fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
            color: 'var(--text-muted)',
          }}>
            <p style={{ marginBottom: '0.5rem' }}>Could not fetch repo data</p>
            <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', opacity: 0.6 }}>GitHub API rate limit may have been reached</p>
          </div>
        ) : (
          <>
            {/* Branch info */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.6rem 0.7rem', background: 'var(--card-bg)',
              border: '1px solid var(--border)', borderRadius: 8,
              marginBottom: '0.75rem',
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <circle cx="12" cy="5" r="2.5" />
                <circle cx="6" cy="19" r="2.5" />
                <circle cx="18" cy="19" r="2.5" />
                <path d="M12 7.5V12M12 12L6 16.5M12 12L18 16.5" />
              </svg>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
                color: 'var(--text)', fontWeight: 600, flex: 1,
              }}>
                {defaultBranch}
              </p>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                color: '#10b981',
              }}>
                last push: {lastPush}
              </span>
            </div>

            {/* Stats grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '0.45rem', marginBottom: '0.85rem',
            }}>
              {[
                { value: repoData?.totalCommits ?? 0, label: 'Commits', color: '#f7df1e' },
                { value: repoData?.latestAdditions ?? 0, label: 'Added', color: '#10b981' },
                { value: repoData?.latestDeletions ?? 0, label: 'Deleted', color: '#ef4444' },
              ].map((stat) => (
                <div key={stat.label} style={{
                  padding: '0.7rem 0.4rem', background: 'var(--card-bg)',
                  border: '1px solid var(--border)', borderRadius: 8,
                  textAlign: 'center',
                }}>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontSize: '1.3rem',
                    fontWeight: 800, color: stat.color,
                  }}>
                    {stat.value}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.55rem',
                    color: 'var(--text-muted)', textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent commits */}
            <div style={{ marginBottom: '0.85rem' }}>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                color: 'var(--text-muted)', textTransform: 'uppercase',
                letterSpacing: '0.1em', fontWeight: 600,
                marginBottom: '0.4rem',
              }}>
                Recent Commits
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {commits.slice(0, 5).map((commit) => (
                  <div key={commit.sha} style={{
                    padding: '0.45rem 0.55rem',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                    borderRadius: 6, display: 'flex',
                    alignItems: 'flex-start', gap: '0.5rem',
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
                      color: '#f7df1e', flexShrink: 0, marginTop: '0.1rem',
                    }}>
                      {commit.sha.substring(0, 7)}
                    </span>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: '0.72rem',
                      color: 'var(--text-secondary)', flex: 1,
                      lineHeight: 1.4, overflow: 'hidden',
                      textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {commit.commit.message.split('\n')[0]}
                    </p>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
                      color: 'var(--text-muted)', flexShrink: 0,
                    }}>
                      {formatTimeAgo(commit.commit.author.date)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* View on GitHub */}
        <a
          href={personalInfo.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '0.4rem', padding: '0.55rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
            color: 'var(--accent)', textDecoration: 'none',
            border: '1px solid var(--border)', borderRadius: 8,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.background = 'rgba(122,162,247,0.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.style.background = 'transparent';
          }}
        >
          View on GitHub ↗
        </a>
      </div>
    </div>
  );
}