import { useState, useEffect, useRef } from 'react';
import { paletteFiles, personalInfo } from '../data/portfolioData';
import Icon from './Icon';

export default function CommandPalette({ open, onClose, onFileSelect }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => { if (open && inputRef.current) { inputRef.current.focus(); setQuery(''); } }, [open]);
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape' && open) onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const lowerQuery = query.toLowerCase();
  const filteredFiles = paletteFiles.filter((f) => f.name.toLowerCase().includes(lowerQuery) || f.dir.toLowerCase().includes(lowerQuery));
  const commandLabel = `Open ${personalInfo.copilotName}`;

  const handleSelect = (id) => { if (id) onFileSelect(id); onClose(); };

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999, backdropFilter: 'blur(2px)' }} />
      <div style={{ position: 'fixed', top: '12%', left: '50%', transform: 'translateX(-50%)', width: 'min(560px, 90vw)', background: '#1e1f2e', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, zIndex: 1000, boxShadow: '0 20px 60px rgba(0,0,0,0.6)', overflow: 'hidden', animation: 'paletteIn 0.15s ease-out' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.06)', gap: '0.5rem' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>›</span>
          <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Go to file or run command..." style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'var(--text)', fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }} />
          <span style={{ padding: '0.15rem 0.5rem', background: 'rgba(255,255,255,0.06)', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>Esc</span>
        </div>

        {(!query || commandLabel.toLowerCase().includes(lowerQuery) || 'copilot'.includes(lowerQuery)) && (
          <div>
            <p style={{ padding: '0.6rem 1rem 0.3rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>Commands</p>
            <button style={{ width: '100%', padding: '0.55rem 1rem', background: 'rgba(122,162,247,0.08)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', textAlign: 'left', transition: 'background 0.1s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(122,162,247,0.14)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(122,162,247,0.08)'}>
              <span style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>✦</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#e2b93d', fontWeight: 500 }}>{commandLabel}</span>
              <span style={{ marginLeft: 'auto', padding: '0.12rem 0.45rem', background: 'rgba(255,255,255,0.06)', borderRadius: 4, fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>Ctrl+Shift+C</span>
            </button>
          </div>
        )}

        <div>
          <p style={{ padding: '0.6rem 1rem 0.3rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600 }}>Files</p>
          {filteredFiles.map((file) => (
            <button key={file.name} onClick={() => handleSelect(file.id)} style={{ width: '100%', padding: '0.5rem 1rem', background: 'none', border: 'none', cursor: file.id ? 'pointer' : 'default', display: 'flex', alignItems: 'center', gap: '0.6rem', textAlign: 'left', transition: 'background 0.1s' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'} onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
              <div style={{ width: 22, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: 4, flexShrink: 0 }}>
                <Icon logoKey={file.iconKey} size={14} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text)' }}>{file.name}</span>
              <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{file.dir}</span>
            </button>
          ))}
        </div>

        <div style={{ padding: '0.5rem 1rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.75rem', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
            <span>↑↓ navigate</span><span>· ↵ open</span><span>· Esc close</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>Tip: type "copilot" to open AI chat</span>
        </div>
      </div>
    </>
  );
}
