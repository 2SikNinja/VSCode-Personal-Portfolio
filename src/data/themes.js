/* ════════════════════════════════════════════════════════════════
   themes.js — Color theme definitions

   Each theme defines the CSS custom properties that the entire
   app uses. To add a new theme, copy an existing one and change
   the hex values. The key becomes the theme ID.
   ════════════════════════════════════════════════════════════════ */

const themes = {
  'peter-dark': {
    name: 'Peter Dark',
    emoji: '💜',
    colors: {
      '--editor-bg': '#1a1b26',
      '--sidebar-bg': '#13141c',
      '--activitybar-bg': '#0f1017',
      '--tab-bg': '#13141c',
      '--card-bg': 'rgba(255, 255, 255, 0.025)',
      '--border': 'rgba(255, 255, 255, 0.06)',
      '--active-bg': 'rgba(255, 255, 255, 0.04)',
      '--text': '#c0caf5',
      '--text-secondary': '#9aa5ce',
      '--text-muted': '#565f89',
      '--comment': '#565f89',
      '--accent': '#7aa2f7',
    },
  },
  'tokyo-night': {
    name: 'Tokyo Night',
    emoji: '🌃',
    colors: {
      '--editor-bg': '#1a1b26',
      '--sidebar-bg': '#1f2335',
      '--activitybar-bg': '#1f2335',
      '--tab-bg': '#1f2335',
      '--card-bg': 'rgba(255, 255, 255, 0.025)',
      '--border': 'rgba(59, 66, 97, 0.6)',
      '--active-bg': 'rgba(41, 46, 66, 0.5)',
      '--text': '#c0caf5',
      '--text-secondary': '#a9b1d6',
      '--text-muted': '#565f89',
      '--comment': '#565f89',
      '--accent': '#7aa2f7',
    },
  },
  'github-dark': {
    name: 'GitHub Dark',
    emoji: '🐙',
    colors: {
      '--editor-bg': '#0d1117',
      '--sidebar-bg': '#010409',
      '--activitybar-bg': '#010409',
      '--tab-bg': '#010409',
      '--card-bg': 'rgba(255, 255, 255, 0.03)',
      '--border': 'rgba(48, 54, 61, 0.8)',
      '--active-bg': 'rgba(56, 62, 71, 0.3)',
      '--text': '#e6edf3',
      '--text-secondary': '#8b949e',
      '--text-muted': '#484f58',
      '--comment': '#484f58',
      '--accent': '#58a6ff',
    },
  },
  'github-light': {
    name: 'GitHub Light',
    emoji: '☀️',
    colors: {
      '--editor-bg': '#ffffff',
      '--sidebar-bg': '#f6f8fa',
      '--activitybar-bg': '#f0f0f0',
      '--tab-bg': '#f6f8fa',
      '--card-bg': 'rgba(0, 0, 0, 0.03)',
      '--border': 'rgba(208, 215, 222, 0.8)',
      '--active-bg': 'rgba(0, 0, 0, 0.04)',
      '--text': '#1f2328',
      '--text-secondary': '#656d76',
      '--text-muted': '#8b949e',
      '--comment': '#8b949e',
      '--accent': '#0969da',
    },
  },
  'powershell': {
    name: 'PowerShell',
    emoji: '⚡',
    colors: {
      '--editor-bg': '#012456',
      '--sidebar-bg': '#001b3e',
      '--activitybar-bg': '#00112b',
      '--tab-bg': '#001b3e',
      '--card-bg': 'rgba(255, 255, 255, 0.04)',
      '--border': 'rgba(255, 255, 255, 0.08)',
      '--active-bg': 'rgba(255, 255, 255, 0.06)',
      '--text': '#cccccc',
      '--text-secondary': '#9a9a9a',
      '--text-muted': '#6a6a6a',
      '--comment': '#6a9955',
      '--accent': '#569cd6',
    },
  },
  'omni': {
    name: 'Omni',
    emoji: '🔮',
    colors: {
      '--editor-bg': '#191622',
      '--sidebar-bg': '#13111b',
      '--activitybar-bg': '#0e0d14',
      '--tab-bg': '#13111b',
      '--card-bg': 'rgba(255, 255, 255, 0.025)',
      '--border': 'rgba(255, 255, 255, 0.06)',
      '--active-bg': 'rgba(255, 255, 255, 0.04)',
      '--text': '#e1e1e6',
      '--text-secondary': '#a8a8b3',
      '--text-muted': '#6c6c80',
      '--comment': '#5a5475',
      '--accent': '#988bc7',
    },
  },
};

export default themes;

export const themeOrder = [
  'peter-dark',
  'tokyo-night',
  'github-dark',
  'github-light',
  'powershell',
  'omni',
];
