import { useEffect, useRef } from 'react';
import themes, { themeOrder } from '../data/themes';

export default function ThemePickerPopup({ open, onClose, currentTheme, onThemeChange }) {
  const popupRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) onClose();
    };
    const timeout = setTimeout(() => window.addEventListener('mousedown', handleClick), 50);
    return () => { clearTimeout(timeout); window.removeEventListener('mousedown', handleClick); };
  }, [open, onClose]);

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
        bottom: 30,
        right: 80,
        width: 220,
        background: '#1e1f2e',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10,
        boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
        zIndex: 960,
        overflow: 'hidden',
        animation: 'themePickerIn 0.12s ease-out',
      }}
    >
      <style>{`
        @keyframes themePickerIn {
          from { opacity: 0; transform: translateY(6px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      <div style={{
        padding: '0.5rem 0.7rem 0.3rem',
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
        color: 'var(--text-muted)', textTransform: 'uppercase',
        letterSpacing: '0.1em', fontWeight: 600,
      }}>
        Color Theme
      </div>

      <div style={{ padding: '0.2rem 0.4rem 0.5rem' }}>
        {themeOrder.map((themeId) => {
          const theme = themes[themeId];
          const isActive = currentTheme === themeId;
          return (
            <button
              key={themeId}
              onClick={() => { onThemeChange(themeId); onClose(); }}
              style={{
                width: '100%', padding: '0.4rem 0.5rem',
                background: isActive ? 'var(--active-bg)' : 'transparent',
                border: 'none', borderRadius: 6, cursor: 'pointer',
                textAlign: 'left', display: 'flex', alignItems: 'center',
                gap: '0.45rem', transition: 'background 0.12s',
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = isActive ? 'var(--active-bg)' : 'transparent'; }}
            >
              <div style={{
                width: 16, height: 16, borderRadius: '50%',
                background: theme.colors['--accent'],
                border: '2px solid ' + theme.colors['--editor-bg'],
                flexShrink: 0,
              }} />
              <span style={{ fontSize: '0.75rem' }}>{theme.emoji}</span>
              <span style={{
                fontFamily: 'var(--font-body)', fontSize: '0.78rem',
                color: isActive ? 'var(--text)' : 'var(--text-secondary)',
                fontWeight: isActive ? 600 : 400, flex: 1,
              }}>
                {theme.name}
              </span>
              {isActive && <span style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
