import { skillsData, skillCategories, skillsPageData } from '../data/portfolioData';
import Icon from '../components/Icon';

const commentStyle = { fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--comment)', fontStyle: 'italic' };
const headingStyle = { fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '-0.02em' };

export default function SkillsPage() {
  return (
    <div style={{ padding: '2.5rem clamp(1.5rem, 5vw, 4rem)', maxWidth: 800 }}>
      <p style={{ ...commentStyle, marginBottom: '2rem' }}>{skillsPageData.comment}</p>
      <h2 style={headingStyle}>Skills</h2>
      <p style={{ ...commentStyle, marginBottom: '2rem' }}>{skillsPageData.subtitle}</p>

      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: 2 }}>
        <span style={{ color: 'var(--text-muted)' }}>{'{'}</span>
        {skillCategories.map((cat, ci) => (
          <div key={cat.key} style={{ paddingLeft: '1.5rem' }}>
            <span style={{ color: cat.color }}>"{cat.label}"</span>
            <span style={{ color: 'var(--text-muted)' }}>: [</span>
            <div style={{ paddingLeft: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.2rem 0' }}>
              {skillsData[cat.key].map((skill, si) => (
                <span key={skill.name} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span style={{ color: 'var(--text-secondary)', transition: 'color 0.2s', cursor: 'default', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = cat.color}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {skill.logoKey && <Icon logoKey={skill.logoKey} size={13} />}
                    "{skill.name}"
                  </span>
                  {si < skillsData[cat.key].length - 1 && <span style={{ color: 'var(--text-muted)' }}>, </span>}
                </span>
              ))}
            </div>
            <span style={{ color: 'var(--text-muted)' }}>{']'}{ci < skillCategories.length - 1 ? ',' : ''}</span>
          </div>
        ))}
        <span style={{ color: 'var(--text-muted)' }}>{'}'}</span>
      </div>
    </div>
  );
}
