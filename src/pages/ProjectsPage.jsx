import { useState } from 'react';
import { projectsData, projectsPageData } from '../data/portfolioData';
import Icon from '../components/Icon';

const commentStyle = { fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--comment)', fontStyle: 'italic' };
const headingStyle = { fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '-0.02em' };
const linkStyle = { fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.3rem', transition: 'color 0.2s' };

export default function ProjectsPage() {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ padding: '2.5rem clamp(1.5rem, 5vw, 4rem)', maxWidth: 900 }}>
      <p style={{ ...commentStyle, marginBottom: '2rem' }}>{projectsPageData.comment}</p>
      <h2 style={headingStyle}>Projects</h2>
      <p style={{ ...commentStyle, marginBottom: '2rem' }}>{projectsPageData.subtitle}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {projectsData.map((p, i) => (
          <div key={p.title} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)} style={{
            padding: '1.6rem', background: 'var(--card-bg)',
            border: `1px solid ${hovered === i ? p.color + '50' : 'var(--border)'}`,
            borderRadius: 12, transition: 'all 0.3s ease',
            transform: hovered === i ? 'translateY(-4px)' : 'none',
            boxShadow: hovered === i ? `0 12px 40px ${p.color}12` : 'none',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: p.color, opacity: hovered === i ? 1 : 0.3, transition: 'opacity 0.3s' }} />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
              {`// project_${String(i).padStart(2, '0')}`}
            </p>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: 'var(--text)', fontWeight: 700, marginBottom: '0.65rem' }}>{p.title}</h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '1.1rem' }}>{p.description}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
              {p.tech.map((t, ti) => {
                const logoKey = p.techLogoKeys?.[ti];
                return (
                  <span key={t} style={{
                    padding: '0.2rem 0.55rem', background: p.color + '15', color: p.color,
                    borderRadius: 4, fontSize: '0.7rem', fontFamily: 'var(--font-mono)', fontWeight: 500,
                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  }}>
                    {logoKey && <Icon logoKey={logoKey} size={12} />}
                    {t}
                  </span>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {p.links.github ? (
                <a href={p.links.github} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>⊙ source</a>
              ) : (
                <span style={{ ...linkStyle, opacity: 0.3, cursor: 'default' }}>⊙ source</span>
              )}
              {p.links.live ? (
                <a href={p.links.live} target="_blank" rel="noopener noreferrer" style={{ ...linkStyle }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}>↗ live</a>
              ) : (
                <span style={{ ...linkStyle, opacity: 0.3, cursor: 'default' }}>↗ live</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
