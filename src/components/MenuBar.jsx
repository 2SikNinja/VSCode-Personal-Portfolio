import { useState, useEffect, useRef } from 'react';
import { fileList, personalInfo } from '../data/portfolioData';

export default function MenuBar({
  onOpenFile,
  onNewTab,
  onCloseTab,
  onCloseAllTabs,
  onOpenPalette,
  onToggleSidebar,
  onToggleTerminal,
  onToggleCopilot,
  onDownloadResume,
  onFind,
  activeFile,
  openTabs,
}) {
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!openMenu) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenu(null);
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [openMenu]);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') setOpenMenu(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const handleAction = (action) => {
    setOpenMenu(null);
    if (action) action();
  };

  const recentFiles = openTabs.map((tabId) => fileList.find((f) => f.id === tabId)).filter(Boolean);

  const menus = {
    File: [
      { label: 'New Tab', shortcut: 'Ctrl+T', action: onNewTab },
      { label: 'Open File...', shortcut: 'Ctrl+P', action: onOpenPalette },
      { type: 'separator' },
      { label: 'Close Tab', shortcut: 'Ctrl+W', action: () => onCloseTab(activeFile) },
      { label: 'Close All Tabs', action: onCloseAllTabs },
      { type: 'separator' },
      { type: 'label', text: 'OPEN RECENT' },
      ...recentFiles.map((f) => ({
        label: f.name,
        action: () => onOpenFile(f.id),
      })),
      { type: 'separator' },
      { label: 'Download Resume', action: onDownloadResume },
    ],
    Edit: [
      { label: 'Find...', shortcut: 'Ctrl+P', action: onOpenPalette },
      { label: 'Select All', shortcut: 'Ctrl+A', action: null },
      { label: 'Copy', shortcut: 'Ctrl+C', action: null },
    ],
    View: [
      { label: 'Command Palette', shortcut: 'Ctrl+P', action: onOpenPalette },
      { label: 'Toggle Sidebar', shortcut: 'Ctrl+B', action: onToggleSidebar },
      { label: 'Toggle Terminal', shortcut: 'Ctrl+`', action: onToggleTerminal },
      { label: `✦ ${personalInfo.firstName}'s Copilot`, shortcut: 'Ctrl+Shift+C', action: onToggleCopilot, highlight: true },
      { type: 'separator' },
      { label: 'Enter Full Screen', shortcut: 'F11', action: () => document.documentElement.requestFullscreen?.() },
      { label: 'Zoom In', shortcut: 'Ctrl++', action: null },
      { label: 'Zoom Out', shortcut: 'Ctrl+-', action: null },
      { label: 'Reset Zoom', action: null },
    ],
    Go: [
      { label: 'Go to File...', shortcut: 'Ctrl+P', action: onOpenPalette },
      { type: 'separator' },
      { type: 'label', text: 'FILES' },
      ...fileList.map((f) => ({
        label: f.name,
        action: () => onOpenFile(f.id),
      })),
      { label: 'README.md', action: null },
      { label: `${personalInfo.firstName}_Resume.pdf`, action: onDownloadResume },
    ],
    Run: [
      { label: 'Start Terminal', shortcut: 'Ctrl+`', action: onToggleTerminal },
      { label: 'Run Last Command', action: null, disabled: true },
    ],
    Terminal: [
      { label: 'New Terminal', shortcut: 'Ctrl+`', action: onToggleTerminal },
    ],
    Help: [
      { label: 'Command Palette', shortcut: 'Ctrl+P', action: onOpenPalette },
      { type: 'separator' },
      { type: 'label', text: 'KEYBOARD SHORTCUTS' },
      { label: 'Ctrl+P    Go to file', isInfo: true },
      { label: 'Ctrl+B    Toggle sidebar', isInfo: true },
      { label: 'Ctrl+`    Toggle terminal', isInfo: true },
      { label: 'Ctrl+Shift+C    Toggle Copilot ✦', isInfo: true },
      { label: 'Esc    Close overlay', isInfo: true },
      { type: 'separator' },
      { label: 'GitHub ↗', action: () => window.open(personalInfo.githubUrl, '_blank') },
      { label: 'About', action: () => onOpenFile('about') },
    ],
    Copilot: [
      { label: `Open ${personalInfo.firstName}'s Copilot`, shortcut: 'Ctrl+Shift+C', action: onToggleCopilot, highlight: true },
    ],
  };

  const menuKeys = Object.keys(menus);

  return (
    <div ref={menuRef} style={{
      display: 'flex', alignItems: 'center', height: '100%',
      gap: '0',
    }} className="hideSmall">
      {menuKeys.map((key) => (
        <div key={key} style={{ position: 'relative' }}>
          <button
            onClick={() => setOpenMenu(openMenu === key ? null : key)}
            onMouseEnter={() => { if (openMenu) setOpenMenu(key); }}
            style={{
              background: openMenu === key ? 'rgba(255,255,255,0.08)' : 'none',
              border: 'none', color: openMenu === key ? 'var(--text)' : 'var(--text-muted)',
              fontFamily: 'var(--font-body)', fontSize: '0.78rem',
              padding: '0.2rem 0.55rem', borderRadius: 4,
              cursor: 'pointer', transition: 'background 0.1s, color 0.1s',
            }}
            onMouseOver={(e) => { if (!openMenu) e.currentTarget.style.color = 'var(--text)'; }}
            onMouseOut={(e) => { if (openMenu !== key) e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            {key}
          </button>

          {/* Dropdown */}
          {openMenu === key && (
            <div style={{
              position: 'absolute', top: '100%', left: 0,
              marginTop: 2, minWidth: 220,
              background: '#1e1f2e', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, padding: '0.3rem 0',
              boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
              zIndex: 1000,
              animation: 'menuDropIn 0.1s ease-out',
            }}>
              <style>{`
                @keyframes menuDropIn {
                  from { opacity: 0; transform: translateY(-4px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>

              {menus[key].map((item, i) => {
                if (item.type === 'separator') {
                  return <div key={i} style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0.3rem 0' }} />;
                }
                if (item.type === 'label') {
                  return (
                    <p key={i} style={{
                      padding: '0.4rem 0.85rem 0.2rem', fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem', color: 'var(--text-muted)',
                      textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600,
                    }}>
                      {item.text}
                    </p>
                  );
                }
                if (item.isInfo) {
                  return (
                    <div key={i} style={{
                      padding: '0.3rem 0.85rem', fontFamily: 'var(--font-mono)',
                      fontSize: '0.72rem', color: 'var(--text-muted)',
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                    }}>
                      <span style={{
                        padding: '0.1rem 0.35rem', background: 'rgba(255,255,255,0.06)',
                        borderRadius: 3, fontSize: '0.65rem',
                      }}>
                        {item.label.split('    ')[0]}
                      </span>
                      <span>{item.label.split('    ')[1]}</span>
                    </div>
                  );
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleAction(item.action)}
                    disabled={item.disabled}
                    style={{
                      width: '100%', padding: '0.4rem 0.85rem',
                      background: 'none', border: 'none', textAlign: 'left',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      fontFamily: 'var(--font-body)', fontSize: '0.8rem',
                      color: item.highlight ? '#e2b93d' : item.disabled ? 'var(--text-muted)' : 'var(--text-secondary)',
                      cursor: item.disabled ? 'default' : 'pointer',
                      transition: 'background 0.1s',
                      opacity: item.disabled ? 0.4 : 1,
                    }}
                    onMouseEnter={(e) => { if (!item.disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                  >
                    <span>{item.label}</span>
                    {item.shortcut && (
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                        color: 'var(--text-muted)', marginLeft: '1.5rem',
                      }}>
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
