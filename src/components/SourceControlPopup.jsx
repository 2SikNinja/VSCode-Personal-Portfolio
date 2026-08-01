import { useEffect, useRef } from 'react';
import { personalInfo, sourceControlData } from '../data/portfolioData';

export default function SourceControlPopup({ open, onClose }) {
  const popupRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
      }
    };
    // Delay to avoid closing immediately from the icon click
    const timeout = setTimeout(() => {
      window.addEventListener('mousedown', handleClick);
    }, 50);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('mousedown', handleClick);
    };
  }, [open, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={popupRef}
      style={{
        position: 'fixed',
        top: 80,
        left: 56,
        width: 300,
        background: '#1e1f2e',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10,
        boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
        zIndex: 900,
        overflow: 'hidden',
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
            {sourceControlData.branch}
          </p>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            color: '#10b981',
          }}>
            {sourceControlData.commitStatus}
          </span>
        </div>

        {/* Stats grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0.45rem', marginBottom: '0.85rem',
        }}>
          {sourceControlData.stats.map((stat) => (
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
