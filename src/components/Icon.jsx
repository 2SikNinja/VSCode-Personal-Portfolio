import iconMap from '../data/svgIcons';

/*
  Usage:
    <Icon logoKey="github" size={18} />
    <Icon logoKey="react" size={14} />
    <Icon logoKey="tsx" size={16} />

  If the icon exists in @thesvg/react, it renders the SVG component.
  If not, it renders the fallback character from the fallbacks map.
*/

const fallbacks = {
  github: '⊙',
  linkedin: 'in',
  leetcode: '◆',
  email: '✉',
  medium: 'M',
  youtube: '▶',
  instagram: '📷',
  twitter: '𝕏',
  portfolio: '◈',
  javascript: 'JS',
  typescript: 'TS',
  python: '🐍',
  java: '☕',
  cpp: '++',
  dart: '◇',
  sql: '🗃',
  react: '⚛',
  html: '◇',
  css: '#',
  tailwindcss: '🌊',
  nextjs: 'N',
  flutter: '◇',
  nodejs: '▲',
  express: 'Ex',
  firebase: '🔥',
  postgresql: '🐘',
  tensorflow: 'TF',
  numpy: 'np',
  pandas: '🐼',
  scikitlearn: 'sk',
  jupyter: '📓',
  matplotlib: '📈',
  selenium: 'Se',
  docker: '🐳',
  linux: '🐧',
  git: '⊙',
  vercel: '▲',
  riotapi: 'R',
  googleai: '✦',
  claude: '✦',
  tsx: '⚛',
  js: 'JS',
  ts: 'TS',
  json: '{}',
  md: 'i',
  pdf: '📄',
};

const fallbackColors = {
  github: '#f0f0f0',
  linkedin: '#0a66c2',
  leetcode: '#ffa116',
  email: '#ea4335',
  medium: '#ffffff',
  youtube: '#ff0000',
  instagram: '#e4405f',
  twitter: '#1da1f2',
  portfolio: '#00d4ff',
  javascript: '#f7df1e',
  typescript: '#3178c6',
  python: '#3776ab',
  java: '#007396',
  cpp: '#00599c',
  dart: '#0175c2',
  sql: '#e38c00',
  react: '#61dafb',
  html: '#e44d26',
  css: '#264de4',
  tailwindcss: '#38bdf8',
  nextjs: '#ffffff',
  flutter: '#02569b',
  nodejs: '#68a063',
  express: '#ffffff',
  firebase: '#ffca28',
  postgresql: '#336791',
  tensorflow: '#ff6f00',
  numpy: '#4dabcf',
  pandas: '#150458',
  scikitlearn: '#f89939',
  jupyter: '#f37626',
  matplotlib: '#11557c',
  selenium: '#43b02a',
  docker: '#2496ed',
  linux: '#fcc624',
  git: '#f05032',
  vercel: '#ffffff',
  riotapi: '#d32936',
  googleai: '#4285f4',
  tsx: '#61dafb',
  js: '#f7df1e',
  ts: '#3178c6',
  json: '#8bc34a',
  md: '#5c6bc0',
  pdf: '#ef4444',
};

export default function Icon({ logoKey, size = 16, style = {} }) {
  if (!logoKey) return null;

  const SvgComponent = iconMap[logoKey];

  if (SvgComponent) {
    return (
      <SvgComponent
        width={size}
        height={size}
        style={{
          display: 'block',
          flexShrink: 0,
          width: size,
          height: size,
          ...style,
        }}
      />
    );
  }

  // Fallback to text/emoji
  return (
    <span style={{
      fontSize: size * 0.75,
      color: fallbackColors[logoKey] || 'var(--text-muted)',
      fontWeight: 700,
      fontFamily: 'var(--font-mono)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      flexShrink: 0,
      lineHeight: 1,
      ...style,
    }}>
      {fallbacks[logoKey] || '?'}
    </span>
  );
}

export function getIconColor(logoKey) {
  return fallbackColors[logoKey] || 'var(--text-muted)';
}
