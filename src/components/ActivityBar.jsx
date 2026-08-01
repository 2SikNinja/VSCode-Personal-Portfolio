import { personalInfo } from '../data/portfolioData';
import Icon from './Icon';

export default function ActivityBar({ activeIcon, onIconClick }) {
  const topIcons = [
    { id: 'files', label: 'Explorer', svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 7V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V9C21 7.9 20.1 7 19 7H13L11 5H5C3.9 5 3 5.9 3 7Z" />
      </svg>
    )},
    { id: 'search', label: 'Search', svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="11" cy="11" r="7" />
        <path d="M16 16L21 21" />
      </svg>
    )},
    { id: 'source', label: 'Source Control', svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="5" r="2.5" />
        <circle cx="6" cy="19" r="2.5" />
        <circle cx="18" cy="19" r="2.5" />
        <path d="M12 7.5V12M12 12L6 16.5M12 12L18 16.5" />
      </svg>
    )},
    { id: 'download', label: 'Download Resume', svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="12" x2="12" y2="18" />
        <polyline points="9 15 12 18 15 15" />
      </svg>
    )},
    { id: 'claude', label: 'Ask Claude AI', isSpecial: true },
  ];

  const bottomIcons = [
    { id: 'settings', label: 'Settings', svg: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    )},
  ];

  const handleClick = (id) => {
    if (id === 'download') {
      const link = document.createElement('a');
      link.href = `${personalInfo.repoName ? '/' + personalInfo.repoName : ''}/Peter_Nguyen_Resume.pdf`;
      link.download = 'Peter_Nguyen_Resume.pdf';
      link.click();
      return;
    }
    onIconClick(id);
  };

  const btnBase = {
    width: 48, height: 48, background: 'none', border: 'none',
    cursor: 'pointer', display: 'flex', alignItems: 'center',
    justifyContent: 'center', transition: 'color 0.15s, opacity 0.15s',
  };

  return (
    <div style={{
      width: 48, minWidth: 48, background: 'var(--activitybar-bg)',
      borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '0.5rem', paddingBottom: '0.5rem',
    }}>
      {/* Top icons */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }}>
        {topIcons.map((icon) => {
          const isActive = activeIcon === icon.id;
          return (
            <button
              key={icon.id}
              title={icon.label}
              onClick={() => handleClick(icon.id)}
              style={{
                ...btnBase,
                color: isActive ? 'var(--text)' : 'var(--text-muted)',
                borderLeft: isActive ? '2px solid var(--text)' : '2px solid transparent',
                opacity: isActive ? 1 : 0.6,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.opacity = '1'; }}
              onMouseLeave={(e) => {
                if (!isActive) { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.opacity = '0.6'; }
              }}
            >
              {icon.isSpecial ? <Icon logoKey="claude" size={24} /> : icon.svg}
            </button>
          );
        })}
      </div>

      {/* Bottom icons */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.15rem' }}>
        {bottomIcons.map((icon) => (
          <button
            key={icon.id}
            title={icon.label}
            onClick={() => handleClick(icon.id)}
            style={{
              ...btnBase,
              color: 'var(--text-muted)',
              opacity: 0.6,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.opacity = '0.6'; }}
          >
            {icon.svg}
          </button>
        ))}
      </div>
    </div>
  );
}
