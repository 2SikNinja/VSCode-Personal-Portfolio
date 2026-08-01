import { useState, useEffect } from 'react';
import { fileList, statusBarData } from '../data/portfolioData';
import Icon from './Icon';

const extensionLanguageMap = {
  tsx: 'TypeScript',
  ts: 'TypeScript',
  js: 'JavaScript',
  jsx: 'JavaScript',
  html: 'HTML',
  css: 'CSS',
  json: 'JSON',
  md: 'Markdown',
};

const statusBtnStyle = {
  background: 'none', border: 'none',
  color: 'rgba(255,255,255,0.85)',
  fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
  cursor: 'pointer', display: 'flex', alignItems: 'center',
  gap: '0.3rem', padding: '0 0.3rem', height: '100%',
  transition: 'background 0.15s', borderRadius: 2,
};

export default function StatusBar({ activeFile, onToggleTerminal, onToggleClaude, currentTheme, onToggleThemePicker }) {
  const file = fileList.find((f) => f.id === activeFile);
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const n = new Date();
      setTime(n.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    update();
    const iv = setInterval(update, 30000);
    return () => clearInterval(iv);
  }, []);

  const extension = file?.name?.split('.').pop() || '';
  const language = extensionLanguageMap[extension] || statusBarData.language;

  return (
    <div style={{
      height: 24, background: 'var(--accent)', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 0.5rem',
      fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.85)', flexShrink: 0,
    }}>
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem', height: '100%' }}>
        <span style={{ padding: '0 0.3rem' }}>{statusBarData.branch}</span>

        {/* Error/Warning button that opens terminal */}
        <button
          onClick={onToggleTerminal}
          title="Toggle Terminal"
          style={{ ...statusBtnStyle }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
        >
          {/* Error icon (triangle) */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <span>0</span>

          {/* Warning icon (circle with i) */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '0.2rem' }}>
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>0</span>
        </button>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.15rem', height: '100%' }}>
        {/* Claude button */}
        <button
          onClick={onToggleClaude}
          title="Toggle Claude AI"
          className="hideSmall"
          style={{ ...statusBtnStyle }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
        >
          <Icon logoKey="claude" size={13} />
          <span>Claude</span>
        </button>

        <span className="hideSmall" style={{ padding: '0 0.3rem' }}>{language}</span>
        <span style={{ padding: '0 0.3rem' }}>{statusBarData.encoding}</span>
        <span className="hideSmall" style={{ padding: '0 0.3rem' }}>{statusBarData.formatter}</span>
        <button
          onClick={onToggleThemePicker}
          title="Change Color Theme"
          className="hideSmall"
          style={{ ...statusBtnStyle }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
        >
          <span>🎨</span>
          <span>{currentTheme || statusBarData.theme}</span>
        </button>
        <span style={{ padding: '0 0.3rem' }}>{time}</span>
      </div>
    </div>
  );
}
