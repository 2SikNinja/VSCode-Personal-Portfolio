import { useState } from 'react';
import { fileList, personalInfo } from '../data/portfolioData';
import Icon from './Icon';

function ExplorerView({ activeFile, onFileSelect }) {
  const [srcOpen, setSrcOpen] = useState(true);

  return (
    <>
      <div style={{ padding: '0.6rem 1rem', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 600, borderBottom: '1px solid var(--border)' }}>
        Explorer
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0.35rem 0' }}>
        <div style={{ padding: '0.3rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.35rem', fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
          <span style={{ fontSize: '0.6rem', opacity: 0.5 }}>▼</span>
          {personalInfo.sidebarLabel}
        </div>
        <button onClick={() => setSrcOpen((p) => !p)} style={{ width: '100%', padding: '0.28rem 0.6rem 0.28rem 1.2rem', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textAlign: 'left', transition: 'background 0.1s' }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
        >
          <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)', width: 10, textAlign: 'center', flexShrink: 0 }}>{srcOpen ? '▼' : '▶'}</span>
          <span style={{ fontSize: '0.7rem', flexShrink: 0 }}>📁</span>
          src
        </button>
        {srcOpen && fileList.map((file) => (
          <button key={file.id} onClick={() => onFileSelect(file.id)} style={{
            width: '100%', padding: '0.28rem 0.6rem 0.28rem 2.6rem',
            background: activeFile === file.id ? 'var(--active-bg)' : 'transparent',
            border: 'none', color: activeFile === file.id ? 'var(--text)' : 'var(--text-secondary)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.45rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textAlign: 'left',
            transition: 'background 0.1s',
            borderLeft: activeFile === file.id ? '2px solid var(--accent)' : '2px solid transparent',
          }}
            onMouseEnter={(e) => { if (activeFile !== file.id) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
            onMouseLeave={(e) => { if (activeFile !== file.id) e.currentTarget.style.background = 'transparent'; }}
          >
            <Icon logoKey={file.iconKey} size={16} />
            {file.name}
          </button>
        ))}
        <div style={{ marginTop: '0.2rem' }}>
          {[
            { logoKey: 'md', name: 'README.md', action: null },
            { logoKey: 'pdf', name: personalInfo.resumeFileName, action: 'download' },
          ].map((f) => (
            <button key={f.name}
              onClick={() => {
                if (f.action === 'download') {
                  const link = document.createElement('a');
                  link.href = `${import.meta.env.BASE_URL}Peter_Nguyen_Resume.pdf`;
                  link.download = 'Peter_Nguyen_Resume.pdf';
                  link.click();
                }
              }}
              style={{ width: '100%', padding: '0.28rem 0.6rem 0.28rem 1.2rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.45rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', textAlign: 'left', transition: 'color 0.15s, background 0.1s' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}
            >
              <Icon logoKey={f.logoKey} size={16} />
              {f.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default function SidePanel({ activeFile, onFileSelect, visible }) {
  if (!visible) return null;
  return (
    <div style={{ width: 230, minWidth: 230, background: 'var(--sidebar-bg)', borderRight: '1px solid var(--border)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <ExplorerView activeFile={activeFile} onFileSelect={onFileSelect} />
      <div style={{ padding: '0.5rem 0.75rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <span style={{ fontSize: '0.6rem', padding: '0.15rem 0.4rem', background: 'rgba(122,162,247,0.15)', color: 'var(--accent)', borderRadius: 3, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>◆</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>{personalInfo.copilotName}</span>
        <span style={{ fontSize: '0.55rem', padding: '0.1rem 0.3rem', background: 'rgba(255,255,255,0.06)', color: 'var(--text-muted)', borderRadius: 3, fontFamily: 'var(--font-mono)', marginLeft: 'auto' }}>AI</span>
      </div>
    </div>
  );
}