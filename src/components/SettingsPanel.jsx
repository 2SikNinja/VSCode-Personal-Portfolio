import { useEffect, useRef } from 'react';
import { personalInfo } from '../data/portfolioData';
import themes, { themeOrder } from '../data/themes';

export default function SettingsPanel({
  open,
  onClose,
  currentTheme,
  onThemeChange,
  onOpenPalette,
  onToggleTerminal,
  onToggleCopilot,
  onDownloadResume,
  onToggleFullscreen,
}) {
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
        bottom: 40,
        left: 6,
        width: 270,
        maxHeight: 'calc(100vh - 80px)',
        background: '#1e1f2e',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10,
        boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
        zIndex: 950,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        animation: 'settingsPopupIn 0.15s ease-out',
      }}
    >
      <style>{`
        @keyframes settingsPopupIn {
          from { opacity: 0; transform: translateY(8px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>

      {/* Header */}
      <div style={{
        padding: '0.6rem 0.85rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
          color: 'var(--text-muted)', textTransform: 'uppercase',
          letterSpacing: '0.1em', fontWeight: 600,
        }}>
          Settings
        </span>
        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none', color: 'var(--text-muted)',
            fontSize: '1rem', cursor: 'pointer', lineHeight: 1,
            borderRadius: 3, transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          ×
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.6rem 0.75rem' }}>

        {/* Color Theme */}
        <SectionLabel icon="🎨" text="Color Theme" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginBottom: '1rem' }}>
          {themeOrder.map((themeId) => {
            const theme = themes[themeId];
            const isActive = currentTheme === themeId;
            return (
              <button
                key={themeId}
                onClick={() => onThemeChange(themeId)}
                style={{
                  width: '100%', padding: '0.45rem 0.6rem',
                  background: isActive ? 'var(--active-bg)' : 'transparent',
                  border: isActive ? '1px solid var(--accent)' : '1px solid transparent',
                  borderRadius: 7, cursor: 'pointer', textAlign: 'left',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = isActive ? 'var(--active-bg)' : 'transparent'; }}
              >
                <div style={{
                  width: 18, height: 18, borderRadius: '50%',
                  background: theme.colors['--accent'],
                  border: '2px solid ' + theme.colors['--editor-bg'],
                  boxShadow: isActive ? `0 0 0 2px ${theme.colors['--accent']}40` : 'none',
                  flexShrink: 0,
                }} />
                <span style={{ fontSize: '0.8rem' }}>{theme.emoji}</span>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                  color: isActive ? 'var(--text)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 400, flex: 1,
                }}>
                  {theme.name}
                </span>
                {isActive && <span style={{ color: 'var(--accent)', fontSize: '0.8rem' }}>✓</span>}
              </button>
            );
          })}
        </div>

        {/* Quick Actions */}
        <SectionLabel icon="⚡" text="Quick Actions" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', marginBottom: '1rem' }}>
          <ActionButton icon="🔍" label="Command Palette" shortcut="Ctrl+P" onClick={() => { onClose(); onOpenPalette(); }} />
          <ActionButton icon="💻" label="Toggle Terminal" shortcut="Ctrl+`" onClick={() => { onClose(); onToggleTerminal(); }} />
          <ActionButton icon="✦" label="Copilot Chat" onClick={() => { onClose(); onToggleCopilot(); }} />
          <ActionButton icon="📄" label="Download Resume" onClick={() => { onClose(); onDownloadResume(); }} />
          <ActionButton icon="🖥" label="Toggle Fullscreen" shortcut="F11" onClick={() => { onClose(); onToggleFullscreen(); }} />
        </div>

        {/* Keyboard Shortcuts */}
        <SectionLabel icon="⌨️" text="Keyboard Shortcuts" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '1rem' }}>
          <ShortcutRow keys="Ctrl P" description="Go to file (command palette)" />
          <ShortcutRow keys="Ctrl `" description="Toggle terminal" />
          <ShortcutRow keys="Ctrl B" description="Toggle sidebar" />
          <ShortcutRow keys="Esc" description="Close overlay" />
          <ShortcutRow keys="↑ / ↓" description="Terminal history" />
        </div>

        {/* Footer */}
        <div style={{
          padding: '0.75rem 0 0.4rem',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            color: 'var(--text-muted)', marginBottom: '0.25rem',
          }}>
            Portfolio v3.0 · React + Vite + Tailwind
          </p>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
            color: 'var(--text-muted)',
          }}>
            Made with <span style={{ color: '#f472b6' }}>♥</span> by{' '}
            <span style={{ color: 'var(--accent)', fontWeight: 600 }}>
              {personalInfo.firstName} {personalInfo.lastName}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ icon, text }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.4rem',
      padding: '0.25rem 0', marginBottom: '0.35rem',
    }}>
      <span style={{ fontSize: '0.72rem' }}>{icon}</span>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
        color: 'var(--text-muted)', textTransform: 'uppercase',
        letterSpacing: '0.1em', fontWeight: 600,
      }}>
        {text}
      </span>
    </div>
  );
}

function ActionButton({ icon, label, shortcut, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', padding: '0.4rem 0.55rem',
        background: 'transparent', border: 'none',
        borderRadius: 5, cursor: 'pointer', textAlign: 'left',
        display: 'flex', alignItems: 'center', gap: '0.45rem',
        transition: 'background 0.15s',
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
      <span style={{ fontSize: '0.75rem', width: 18, textAlign: 'center' }}>{icon}</span>
      <span style={{
        fontFamily: 'var(--font-body)', fontSize: '0.78rem',
        color: 'var(--text-secondary)', flex: 1,
      }}>
        {label}
      </span>
      {shortcut && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
          color: 'var(--text-muted)',
        }}>
          {shortcut}
        </span>
      )}
    </button>
  );
}

function ShortcutRow({ keys, description }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.45rem',
      padding: '0.15rem 0.25rem',
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
        color: 'var(--text-muted)', padding: '0.12rem 0.35rem',
        background: 'rgba(255,255,255,0.06)', borderRadius: 3,
        whiteSpace: 'nowrap', minWidth: 48, textAlign: 'center',
      }}>
        {keys}
      </span>
      <span style={{
        fontFamily: 'var(--font-body)', fontSize: '0.7rem',
        color: 'var(--text-muted)',
      }}>
        {description}
      </span>
    </div>
  );
}
