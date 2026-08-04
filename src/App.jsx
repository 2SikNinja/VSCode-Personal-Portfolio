import { useState, useEffect, useRef, useCallback } from 'react';
import { personalInfo, fileList } from './data/portfolioData';
import themes from './data/themes';
import ActivityBar from './components/ActivityBar';
import SidePanel from './components/SidePanel';
import TabBar from './components/TabBar';
import Breadcrumb from './components/Breadcrumb';
import StatusBar from './components/StatusBar';
import CommandPalette from './components/CommandPalette';
import SourceControlPopup from './components/SourceControlPopup';
import ClaudeChatPopup from './components/ClaudeChatPopup';
import MenuBar from './components/MenuBar';
import TerminalPanel from './components/TerminalPanel';
import SettingsPanel from './components/SettingsPanel';
import ThemePickerPopup from './components/ThemePickerPopup';
import Icon from './components/Icon';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import SkillsPage from './pages/SkillsPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';

export default function App() {
  const [activeFile, setActiveFile] = useState('home');
  const [openTabs, setOpenTabs] = useState(['home']);
  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth >= 768);
  const [activeIcon, setActiveIcon] = useState('files');
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sourceControlOpen, setSourceControlOpen] = useState(false);
  const [claudeChatOpen, setClaudeChatOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [themePickerOpen, setThemePickerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [dotsHovered, setDotsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'peter-dark';
  });

  // ─── Apply theme CSS variables ───
  useEffect(() => {
    const theme = themes[currentTheme];
    if (!theme) return;
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([prop, value]) => {
      root.style.setProperty(prop, value);
    });
    localStorage.setItem('portfolio-theme', currentTheme);
  }, [currentTheme]);

  // ─── Custom cursor ───
  const dotRef = useRef(null);
  const boxRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const boxPos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    let animationId;
    const animateBox = () => {
      const lerp = 0.2;
      boxPos.current.x += (mousePos.current.x - boxPos.current.x) * lerp;
      boxPos.current.y += (mousePos.current.y - boxPos.current.y) * lerp;
      if (boxRef.current) {
        boxRef.current.style.left = `${boxPos.current.x}px`;
        boxRef.current.style.top = `${boxPos.current.y}px`;
      }
      animationId = requestAnimationFrame(animateBox);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, select, [role="button"]');
      const nowHovering = !!target;
      if (nowHovering !== isHovering.current) {
        isHovering.current = nowHovering;
        document.body.classList.toggle('cursor-hover', nowHovering);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    animationId = requestAnimationFrame(animateBox);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // ─── Responsive detection ───
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarVisible(false);
        setClaudeChatOpen(false);
        setTerminalOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ─── Handlers ───
  const handleFileSelect = useCallback((id) => {
    setActiveFile(id);
    setOpenTabs((t) => t.includes(id) ? t : [...t, id]);
  }, []);

  const handlePaletteSelect = useCallback((id) => {
    handleFileSelect(id);
    setPaletteOpen(false);
  }, [handleFileSelect]);

  const handleCloseTab = useCallback((id) => {
    setOpenTabs((prev) => {
      const newTabs = prev.filter((t) => t !== id);
      if (newTabs.length === 0) {
        setActiveFile('home');
        return ['home'];
      }
      setActiveFile((current) => current === id ? newTabs[newTabs.length - 1] : current);
      return newTabs;
    });
  }, []);

  const handleCloseAllTabs = useCallback(() => {
    setOpenTabs(['home']);
    setActiveFile('home');
  }, []);

  const handleDownloadResume = useCallback(() => {
    const link = document.createElement('a');
    link.href = `${import.meta.env.BASE_URL}Peter_Nguyen_Resume.pdf`;
    link.download = 'Peter_Nguyen_Resume.pdf';
    link.click();
  }, []);

  const handleToggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      document.documentElement.requestFullscreen?.();
    }
  }, []);

  const showToast = useCallback((message) => {
    setToastMessage(message);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  }, []);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText('peter.nguyen2121@gmail.com').then(() => {
      showToast('✉ Email copied to clipboard!');
    }).catch(() => {
      window.location.href = 'mailto:peter.nguyen2121@gmail.com';
    });
  }, [showToast]);

  const handleIconClick = useCallback((id) => {
    if (id === 'search') { setPaletteOpen(true); return; }
    if (id === 'source') { setSourceControlOpen((v) => !v); return; }
    if (id === 'claude') { setClaudeChatOpen((v) => !v); setSettingsOpen(false); return; }
    if (id === 'settings') { setSettingsOpen((v) => !v); setClaudeChatOpen(false); return; }
    if (id === 'files') {
      setSidebarVisible((v) => !v);
      setActiveIcon(id);
    } else {
      setActiveIcon(id);
      setSidebarVisible(false);
    }
  }, []);

  // ─── Keyboard shortcuts ───
  useEffect(() => {
    const handleKeyboard = (e) => {
      const ctrl = e.ctrlKey || e.metaKey;
      if (ctrl && e.key === 'p') { e.preventDefault(); setPaletteOpen(true); }
      if (ctrl && e.key === 'b') { e.preventDefault(); setSidebarVisible((v) => !v); }
      if (ctrl && e.key === '`') { e.preventDefault(); setTerminalOpen((v) => !v); }
      if (ctrl && e.shiftKey && (e.key === 'C' || e.key === 'c')) { e.preventDefault(); setClaudeChatOpen((v) => !v); }
      if (ctrl && e.key === 't') { e.preventDefault(); handleFileSelect('home'); }
      if (ctrl && e.key === 'w') { e.preventDefault(); handleCloseTab(activeFile); }
    };
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [activeFile, handleFileSelect, handleCloseTab]);

  const renderPage = () => {
    switch (activeFile) {
      case 'home': return <HomePage onNavigate={handleFileSelect} />;
      case 'about': return <AboutPage />;
      case 'projects': return <ProjectsPage />;
      case 'skills': return <SkillsPage />;
      case 'experience': return <ExperiencePage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage onNavigate={handleFileSelect} />;
    }
  };

  const themeName = themes[currentTheme]?.name || 'Peter Dark';

  // ═══════════════════════════════════════════
  // MOBILE LAYOUT
  // ═══════════════════════════════════════════
  if (isMobile) {
    return (
      <div style={{
        height: '100vh', display: 'flex', flexDirection: 'column',
        background: 'var(--editor-bg)', color: 'var(--text)', overflow: 'hidden',
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}>
        {/* Mobile header with nav icons */}
        <div style={{
          background: 'var(--activitybar-bg)',
          borderBottom: '1px solid var(--border)',
          flexShrink: 0,
        }}>
          {/* Top row: title + action buttons */}
          <div style={{
            height: 42, display: 'flex', alignItems: 'center',
            padding: '0 0.6rem', justifyContent: 'space-between',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
              color: 'var(--text-muted)',
            }}>
              {personalInfo.titleBarLabel}
            </span>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              <button
                onClick={() => setPaletteOpen(true)}
                style={{
                  background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                  borderRadius: 6, padding: '0.25rem 0.5rem',
                  color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem',
                  fontSize: '0.62rem', fontFamily: 'var(--font-mono)',
                }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" /><path d="M16 16L21 21" />
                </svg>
                Search
              </button>
              <button
                onClick={() => setTerminalOpen((v) => !v)}
                style={{
                  background: terminalOpen ? 'rgba(122,162,247,0.15)' : 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border)', borderRadius: 6,
                  padding: '0.25rem 0.45rem', color: terminalOpen ? 'var(--accent)' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
                </svg>
              </button>
              <button
                onClick={() => { setClaudeChatOpen((v) => !v); setSettingsOpen(false); }}
                style={{
                  background: claudeChatOpen ? 'rgba(122,162,247,0.15)' : 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border)', borderRadius: 6,
                  padding: '0.25rem 0.45rem', color: claudeChatOpen ? 'var(--accent)' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center',
                }}
              >
                <Icon logoKey="claude" size={14} />
              </button>
              <button
                onClick={handleDownloadResume}
                style={{
                  background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                  borderRadius: 6, padding: '0.25rem 0.45rem',
                  color: 'var(--text-muted)', display: 'flex', alignItems: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="12" x2="12" y2="18" />
                  <polyline points="9 15 12 18 15 15" />
                </svg>
              </button>
              <button
                onClick={() => { setSettingsOpen((v) => !v); setClaudeChatOpen(false); }}
                style={{
                  background: settingsOpen ? 'rgba(122,162,247,0.15)' : 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border)', borderRadius: 6,
                  padding: '0.25rem 0.45rem', color: settingsOpen ? 'var(--accent)' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Tab bar row */}
          <div style={{
            display: 'flex', overflowX: 'auto',
            borderTop: '1px solid var(--border)',
            WebkitOverflowScrolling: 'touch',
          }}>
            {fileList.map((file) => (
              <button
                key={file.id}
                onClick={() => handleFileSelect(file.id)}
                style={{
                  padding: '0.4rem 0.65rem', background: activeFile === file.id ? 'var(--editor-bg)' : 'transparent',
                  border: 'none', borderBottom: activeFile === file.id ? '2px solid var(--accent)' : '2px solid transparent',
                  color: activeFile === file.id ? 'var(--text)' : 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                  whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.25rem',
                  flexShrink: 0,
                }}
              >
                <Icon logoKey={file.iconKey} size={13} />
                {file.name.split('.')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {renderPage()}
        </div>

        {/* Terminal overlay from bottom */}
        {terminalOpen && (
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            height: '45vh', zIndex: 800,
            borderTop: '2px solid var(--accent)',
          }}>
            <TerminalPanel
              open={terminalOpen}
              onClose={() => setTerminalOpen(false)}
              onOpenFile={handleFileSelect}
            />
          </div>
        )}

        {/* Claude chat full screen overlay */}
        {claudeChatOpen && (
          <div style={{
            position: 'fixed', inset: 0, zIndex: 850,
            background: 'var(--sidebar-bg)',
          }}>
            <ClaudeChatPopup
              open={claudeChatOpen}
              onClose={() => setClaudeChatOpen(false)}
            />
          </div>
        )}

        {/* Settings popup */}
        <SettingsPanel
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          onOpenPalette={() => setPaletteOpen(true)}
          onToggleTerminal={() => setTerminalOpen((v) => !v)}
          onToggleCopilot={() => { setClaudeChatOpen((v) => !v); setSettingsOpen(false); }}
          onDownloadResume={handleDownloadResume}
          onToggleFullscreen={handleToggleFullscreen}
        />

        {/* Command palette */}
        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          onFileSelect={handlePaletteSelect}
        />

        {/* Toast */}
        {toastVisible && (
          <div style={{
            position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)',
            background: 'var(--accent)', color: '#fff',
            padding: '0.55rem 1.25rem', borderRadius: 8,
            fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
            fontWeight: 600, zIndex: 9999,
            boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
            animation: 'toastIn 0.2s ease-out',
          }}>
            {toastMessage}
          </div>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════
  // DESKTOP LAYOUT (unchanged)
  // ═══════════════════════════════════════════
  return (
    <div style={{
      height: '100vh', display: 'flex', flexDirection: 'column',
      background: 'var(--editor-bg)', color: 'var(--text)', overflow: 'hidden',
    }}>
      {/* Title bar - dots + centered search only */}
      <div style={{
        height: 34, background: 'var(--activitybar-bg)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center',
        padding: '0 0.85rem', flexShrink: 0,
        position: 'relative',
      }}>
        {/* Mac dots with hover icons */}
        <div
          style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}
          onMouseEnter={() => setDotsHovered(true)}
          onMouseLeave={() => setDotsHovered(false)}
        >
          <div style={{
            width: 12, height: 12, borderRadius: '50%', background: '#ff5f57',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.55rem', color: dotsHovered ? '#4a0002' : 'transparent',
            fontWeight: 800, lineHeight: 1, transition: 'color 0.15s',
          }}>✕</div>
          <div style={{
            width: 12, height: 12, borderRadius: '50%', background: '#febc2e',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.6rem', color: dotsHovered ? '#5a4500' : 'transparent',
            fontWeight: 800, lineHeight: 1, transition: 'color 0.15s',
          }}>−</div>
          <div style={{
            width: 12, height: 12, borderRadius: '50%', background: '#28c840',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.5rem', color: dotsHovered ? '#003a08' : 'transparent',
            fontWeight: 800, lineHeight: 1, transition: 'color 0.15s',
          }}>⤢</div>
        </div>

        {/* Centered search button */}
        <button
          onClick={() => setPaletteOpen(true)}
          style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 6, padding: '0.2rem 1.5rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: 'var(--text-muted)', cursor: 'pointer',
            transition: 'all 0.15s',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
        >
          {personalInfo.titleBarLabel}
        </button>
      </div>

      {/* Menu bar row */}
      <div style={{
        height: 28, background: 'var(--activitybar-bg)',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center',
        padding: '0 0.85rem', flexShrink: 0,
      }}>
        <MenuBar
          onOpenFile={handleFileSelect}
          onNewTab={() => handleFileSelect('home')}
          onCloseTab={handleCloseTab}
          onCloseAllTabs={handleCloseAllTabs}
          onOpenPalette={() => setPaletteOpen(true)}
          onToggleSidebar={() => setSidebarVisible((v) => !v)}
          onToggleTerminal={() => setTerminalOpen((v) => !v)}
          onToggleCopilot={() => setClaudeChatOpen((v) => !v)}
          onDownloadResume={handleDownloadResume}
          onFind={() => setPaletteOpen(true)}
          activeFile={activeFile}
          openTabs={openTabs}
        />
      </div>

      {/* Main area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <ActivityBar activeIcon={activeIcon} onIconClick={handleIconClick} />
        <SidePanel
          activeFile={activeFile}
          onFileSelect={handleFileSelect}
          visible={sidebarVisible && activeIcon === 'files'}
        />

        <SourceControlPopup
          open={sourceControlOpen}
          onClose={() => setSourceControlOpen(false)}
        />

        {/* Editor + Terminal column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <TabBar
            activeFile={activeFile}
            openTabs={openTabs}
            onFileSelect={setActiveFile}
            onCloseTab={handleCloseTab}
          />
          <Breadcrumb activeFile={activeFile} />
          <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
            {renderPage()}
          </div>

          <TerminalPanel
            open={terminalOpen}
            onClose={() => setTerminalOpen(false)}
            onOpenFile={handleFileSelect}
          />
        </div>

        {/* Claude AI right-side panel */}
        <ClaudeChatPopup
          open={claudeChatOpen}
          onClose={() => setClaudeChatOpen(false)}
        />
      </div>

      <StatusBar
        activeFile={activeFile}
        onToggleTerminal={() => setTerminalOpen((v) => !v)}
        onToggleClaude={() => setClaudeChatOpen((v) => !v)}
        currentTheme={themeName}
        onToggleThemePicker={() => setThemePickerOpen((v) => !v)}
      />

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onFileSelect={handlePaletteSelect}
      />

      {/* Settings popup (anchored to gear icon) */}
      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        onOpenPalette={() => setPaletteOpen(true)}
        onToggleTerminal={() => setTerminalOpen((v) => !v)}
        onToggleCopilot={() => { setClaudeChatOpen((v) => !v); setSettingsOpen(false); }}
        onDownloadResume={handleDownloadResume}
        onToggleFullscreen={handleToggleFullscreen}
      />

      {/* Theme picker popup (anchored to status bar theme button) */}
      <ThemePickerPopup
        open={themePickerOpen}
        onClose={() => setThemePickerOpen(false)}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />

      {/* Toast notification */}
      {toastVisible && (
        <div style={{
          position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--accent)', color: '#fff',
          padding: '0.55rem 1.25rem', borderRadius: 8,
          fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
          fontWeight: 600, zIndex: 9999,
          boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
          animation: 'toastIn 0.2s ease-out',
        }}>
          {toastMessage}
        </div>
      )}

      {/* Custom cursor */}
      <div ref={dotRef} className="cursor-dot" />
      <div ref={boxRef} className="cursor-box" />
    </div>
  );
}