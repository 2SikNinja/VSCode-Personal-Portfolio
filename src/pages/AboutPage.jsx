import { aboutPageData } from '../data/portfolioData';

const commentStyle = { fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--comment)', fontStyle: 'italic' };
const headingStyle = { fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '-0.02em' };

export default function AboutPage() {
  return (
    <div style={{ padding: '2.5rem clamp(1.5rem, 5vw, 4rem)', maxWidth: 800 }}>
      <p style={{ ...commentStyle, marginBottom: '2rem' }}>{aboutPageData.comment}</p>
      <h2 style={headingStyle}>About Me</h2>
      <p style={{ ...commentStyle, marginBottom: '2rem' }}>{aboutPageData.subtitle}</p>

      <div style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.9, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {aboutPageData.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 10, borderLeft: '3px solid var(--accent)' }}>
        <p style={{ ...commentStyle, marginBottom: '0.75rem' }}>{'//'} education</p>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: 'var(--text)', fontWeight: 600, marginBottom: '0.3rem' }}>
          {aboutPageData.education.degree}
        </h3>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: 'var(--accent)' }}>
          {aboutPageData.education.school} · {aboutPageData.education.year}
        </p>
      </div>
    </div>
  );
}
