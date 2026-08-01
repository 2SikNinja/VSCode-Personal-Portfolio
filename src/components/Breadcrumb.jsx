import { fileList, breadcrumbData } from '../data/portfolioData';

export default function Breadcrumb({ activeFile }) {
  const file = fileList.find((f) => f.id === activeFile);
  return (
    <div style={{
      padding: '0.3rem 1.25rem', background: 'var(--editor-bg)',
      borderBottom: '1px solid var(--border)', fontFamily: 'var(--font-mono)',
      fontSize: '0.7rem', color: 'var(--text-muted)',
      display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0,
    }}>
      <span>{breadcrumbData.root}</span>
      <span style={{ opacity: 0.4 }}>›</span>
      <span>{breadcrumbData.folder}</span>
      <span style={{ opacity: 0.4 }}>›</span>
      <span style={{ color: 'var(--text-secondary)' }}>{file?.name}</span>
    </div>
  );
}
