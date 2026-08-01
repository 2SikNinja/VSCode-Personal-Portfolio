import { useState, useEffect, useRef } from 'react';
import { fileList, personalInfo, skillsData, projectsData, experienceData } from '../data/portfolioData';

const userName = personalInfo.firstName.toLowerCase();
const prompt = `${userName}@portfolio:~$`;

const fileSystem = {
  '~': {
    type: 'dir',
    children: {
      'src': {
        type: 'dir',
        children: Object.fromEntries(
          fileList.map((f) => [f.name, { type: 'file', pageId: f.id }])
        ),
      },
      'README.md': { type: 'file', pageId: null },
      [`${personalInfo.firstName}_${personalInfo.lastName}_Resume.pdf`]: { type: 'file', pageId: null },
    },
  },
};

export default function TerminalPanel({ open, onClose, onOpenFile }) {
  const [history, setHistory] = useState([
    { type: 'system', text: "Welcome! Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('~');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const [activeTerminalTab, setActiveTerminalTab] = useState('TERMINAL');

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [history]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [open]);

  const getCurrentDir = () => {
    if (cwd === '~') return fileSystem['~'];
    const parts = cwd.replace('~/', '').split('/');
    let current = fileSystem['~'];
    for (const part of parts) {
      if (current.children?.[part]) {
        current = current.children[part];
      } else {
        return null;
      }
    }
    return current;
  };

  const processCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const newHistory = [...history, { type: 'input', text: `${prompt} ${trimmed}` }];
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    let output = [];

    switch (command) {
      case 'help':
        output = [
          { type: 'system', text: 'Available commands:' },
          { type: 'help', text: '  ls              list files in current directory' },
          { type: 'help', text: '  pwd             print working directory' },
          { type: 'help', text: '  cd <dir>        change directory (cd .. to go up)' },
          { type: 'help', text: '  cat <file>      view / open a file in the editor' },
          { type: 'help', text: '  open <file>     same as cat' },
          { type: 'help', text: '  whoami          who am I?' },
          { type: 'help', text: '  echo <text>     print text' },
          { type: 'help', text: '  date            show current date & time' },
          { type: 'help', text: '  git log         show recent commits' },
          { type: 'help', text: '  python --version  show Python version' },
          { type: 'help', text: '  skills          list tech stack' },
          { type: 'help', text: '  projects        list projects' },
          { type: 'help', text: '  clear           clear the terminal' },
        ];
        break;

      case 'ls':
        const dir = getCurrentDir();
        if (dir?.children) {
          const entries = Object.entries(dir.children);
          const dirs = entries.filter(([, v]) => v.type === 'dir').map(([k]) => k + '/');
          const files = entries.filter(([, v]) => v.type === 'file').map(([k]) => k);
          output = [{ type: 'ls', dirs, files }];
        } else {
          output = [{ type: 'error', text: 'Not a directory' }];
        }
        break;

      case 'pwd':
        output = [{ type: 'output', text: `/home/${userName}/portfolio/${cwd === '~' ? '' : cwd.replace('~/', '')}` }];
        break;

      case 'cd':
        if (!args || args === '~') {
          setCwd('~');
          output = [];
        } else if (args === '..') {
          if (cwd === '~') {
            output = [{ type: 'error', text: 'Already at root' }];
          } else {
            const parentParts = cwd.split('/');
            parentParts.pop();
            setCwd(parentParts.join('/') || '~');
          }
        } else {
          const currentDir = getCurrentDir();
          if (currentDir?.children?.[args] && currentDir.children[args].type === 'dir') {
            setCwd(cwd === '~' ? `~/${args}` : `${cwd}/${args}`);
          } else {
            output = [{ type: 'error', text: `cd: no such directory: ${args}` }];
          }
        }
        break;

      case 'cat':
      case 'open':
        if (!args) {
          output = [{ type: 'error', text: `${command}: missing file argument` }];
        } else {
          const currentDirForCat = getCurrentDir();
          const fileEntry = currentDirForCat?.children?.[args];
          if (fileEntry) {
            if (fileEntry.pageId) {
              onOpenFile(fileEntry.pageId);
              output = [{ type: 'success', text: `Opening ${args} in editor...` }];
            } else {
              output = [{ type: 'output', text: `${args} (binary file, cannot display)` }];
            }
          } else {
            output = [{ type: 'error', text: `${command}: ${args}: No such file` }];
          }
        }
        break;

      case 'whoami':
        output = [
          { type: 'output', text: `${personalInfo.firstName} ${personalInfo.lastName}` },
          { type: 'output', text: 'Software Engineer | Data Analyst | Full-Stack Dev' },
          { type: 'output', text: `GitHub: github.com/${personalInfo.githubUsername}` },
        ];
        break;

      case 'echo':
        output = [{ type: 'output', text: args || '' }];
        break;

      case 'date':
        output = [{ type: 'output', text: new Date().toString() }];
        break;

      case 'git':
        if (args === 'log') {
          output = [
            { type: 'git', text: 'commit a3f2b1c (HEAD -> main)' },
            { type: 'output', text: `Author: ${personalInfo.firstName} ${personalInfo.lastName}` },
            { type: 'output', text: `Date: ${new Date().toLocaleDateString()}` },
            { type: 'output', text: '' },
            { type: 'output', text: '    feat: update portfolio with new projects' },
            { type: 'output', text: '' },
            { type: 'git', text: 'commit 8d4e5f2' },
            { type: 'output', text: `Author: ${personalInfo.firstName} ${personalInfo.lastName}` },
            { type: 'output', text: '    fix: responsive layout on mobile' },
            { type: 'output', text: '' },
            { type: 'git', text: 'commit 1b7c9a0' },
            { type: 'output', text: `Author: ${personalInfo.firstName} ${personalInfo.lastName}` },
            { type: 'output', text: '    initial commit: VS Code portfolio' },
          ];
        } else {
          output = [{ type: 'error', text: `git: '${args}' is not a git command` }];
        }
        break;

      case 'python':
        if (args === '--version') {
          output = [{ type: 'output', text: 'Python 3.12.4' }];
        } else {
          output = [{ type: 'output', text: "Python 3.12.4 (use 'python --version')" }];
        }
        break;

      case 'node':
        if (args === '--version' || args === '-v') {
          output = [{ type: 'output', text: 'v20.11.0' }];
        } else {
          output = [{ type: 'output', text: "v20.11.0 (use 'node --version')" }];
        }
        break;

      case 'skills':
        output = Object.entries(skillsData).map(([category, items]) => ({
          type: 'output',
          text: `${category}: ${items.map((s) => s.name).join(', ')}`,
        }));
        break;

      case 'projects':
        output = projectsData.map((p) => ({
          type: 'output',
          text: `  ${p.title} [${p.tech.join(', ')}]`,
        }));
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = [{ type: 'error', text: `command not found: ${command}. Type 'help' for available commands.` }];
    }

    setHistory([...newHistory, ...output]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  if (!open) return null;

  const colorMap = {
    system: '#10b981',
    input: 'var(--text)',
    output: 'var(--text-secondary)',
    error: '#ef4444',
    help: 'var(--text-muted)',
    success: '#10b981',
    git: '#f7df1e',
  };

  return (
    <div style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--activitybar-bg)',
      display: 'flex', flexDirection: 'column',
      height: 220, flexShrink: 0,
    }}>
      {/* Terminal tabs header */}
      <div style={{
        display: 'flex', alignItems: 'center',
        borderBottom: '1px solid var(--border)',
        padding: '0 0.5rem', height: 30, flexShrink: 0,
      }}>
        {['TERMINAL', 'PROBLEMS', 'OUTPUT'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTerminalTab(tab)}
            style={{
              background: 'none', border: 'none',
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              color: activeTerminalTab === tab ? 'var(--text)' : 'var(--text-muted)',
              padding: '0.35rem 0.65rem', cursor: 'pointer',
              borderBottom: activeTerminalTab === tab ? '1px solid var(--text)' : '1px solid transparent',
              transition: 'color 0.15s',
              textTransform: 'uppercase', letterSpacing: '0.05em',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={(e) => { if (activeTerminalTab !== tab) e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            {tab}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none', color: 'var(--text-muted)',
            fontSize: '0.9rem', cursor: 'pointer', padding: '0 0.3rem',
            transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          ×
        </button>
      </div>

      {/* Terminal output */}
      <div
        ref={scrollRef}
        onClick={() => inputRef.current?.focus()}
        style={{
          flex: 1, overflowY: 'auto', padding: '0.5rem 0.75rem',
          fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
          lineHeight: 1.6,
        }}
      >
        {history.map((entry, i) => {
          if (entry.type === 'ls') {
            return (
              <div key={i} style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.2rem' }}>
                {entry.dirs.map((d) => (
                  <span key={d} style={{ color: '#7aa2f7', fontWeight: 600 }}>{d}</span>
                ))}
                {entry.files.map((f) => (
                  <span key={f} style={{ color: 'var(--text-secondary)' }}>{f}</span>
                ))}
              </div>
            );
          }
          return (
            <div key={i} style={{ color: colorMap[entry.type] || 'var(--text)', whiteSpace: 'pre-wrap' }}>
              {entry.text}
            </div>
          );
        })}

        {/* Input line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: '#10b981', flexShrink: 0 }}>{prompt}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              color: 'var(--text)', fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem', padding: 0,
            }}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}
