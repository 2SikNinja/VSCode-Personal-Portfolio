import { fileList } from '../data/portfolioData';
import Icon from './Icon';

export default function TabBar({ activeFile, openTabs, onFileSelect, onCloseTab }) {
  return (
    <div style={{
      display: 'flex', background: 'var(--tab-bg)',
      borderBottom: '1px solid var(--border)',
      overflowX: 'auto', minHeight: 36, flexShrink: 0,
    }}>
      {openTabs.map((tabId) => {
        const file = fileList.find((f) => f.id === tabId);
        if (!file) return null;
        const isActive = activeFile === tabId;
        return (
          <div
            key={tabId}
            onClick={() => onFileSelect(tabId)}
            style={{
              padding: '0 0.4rem 0 0.9rem', height: 36,
              background: isActive ? 'var(--editor-bg)' : 'transparent',
              borderTop: isActive ? '2px solid var(--accent)' : '2px solid transparent',
              borderRight: '1px solid var(--border)',
              color: isActive ? 'var(--text)' : 'var(--text-muted)',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              gap: '0.45rem', fontFamily: 'var(--font-mono)',
              fontSize: '0.76rem', whiteSpace: 'nowrap',
              transition: 'background 0.1s',
            }}
          >
            <Icon logoKey={file.iconKey} size={16} />
            {file.name}
            <button
              onClick={(e) => { e.stopPropagation(); onCloseTab(tabId); }}
              style={{
                width: 20, height: 20, background: 'none', border: 'none',
                color: isActive ? 'var(--text-muted)' : 'transparent',
                cursor: 'pointer', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '0.85rem', borderRadius: 3,
                transition: 'color 0.15s, background 0.15s',
                marginLeft: '0.25rem',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = isActive ? 'var(--text-muted)' : 'transparent'; e.currentTarget.style.background = 'none'; }}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}
