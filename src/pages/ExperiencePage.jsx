import { experienceData, experiencePageData } from '../data/portfolioData';

const commentStyle = { fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--comment)', fontStyle: 'italic' };
const headingStyle = { fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '-0.02em' };

export default function ExperiencePage() {
  return (
    <div style={{ padding: '2.5rem clamp(1.5rem, 5vw, 4rem)', maxWidth: 800 }}>
      <p style={{ ...commentStyle, marginBottom: '2rem' }}>{experiencePageData.comment}</p>
      <h2 style={headingStyle}>Experience</h2>
      <p style={{ ...commentStyle, marginBottom: '2rem' }}>{experiencePageData.subtitle}</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {experienceData.map((exp, i) => (
          <div key={i} style={{ padding: '1.5rem 1.75rem', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, borderLeft: '3px solid var(--accent)', transition: 'all 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(122,162,247,0.04)'; e.currentTarget.style.transform = 'translateX(6px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--card-bg)'; e.currentTarget.style.transform = 'translateX(0)'; }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.85rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text)', fontWeight: 700, marginBottom: '0.2rem' }}>{exp.role}</h3>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)' }}>@ {exp.company}</p>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', padding: '0.2rem 0.55rem', borderRadius: 4 }}>{exp.period}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent)', background: 'rgba(122,162,247,0.1)', padding: '0.2rem 0.55rem', borderRadius: 4 }}>{exp.type}</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {exp.description.map((line, j) => (
                <p key={j} style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.7, paddingLeft: '0.85rem', borderLeft: '2px solid rgba(255,255,255,0.04)' }}>{line}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
