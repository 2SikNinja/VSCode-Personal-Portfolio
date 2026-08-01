import { useState } from 'react';
import { contactSocials, contactPageData } from '../data/portfolioData';
import Icon, { getIconColor } from '../components/Icon';

const commentStyle = { fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--comment)', fontStyle: 'italic' };
const headingStyle = { fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '-0.02em' };
const subLabel = { fontFamily: 'var(--font-display)', fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem', fontWeight: 600 };

function Field({ label, req, value, onChange, ph, multi }) {
  const Tag = multi ? 'textarea' : 'input';
  return (
    <div>
      <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '0.3rem', marginBottom: '0.35rem' }}>
        {'// '}{label}{req && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <Tag value={value} onChange={(e) => onChange(e.target.value)} placeholder={ph} style={{
        width: '100%', padding: '0.65rem 0.75rem', background: 'rgba(255,255,255,0.03)',
        border: '1px solid var(--border)', borderRadius: 6, color: 'var(--text)',
        fontFamily: 'var(--font-mono)', fontSize: '0.82rem', outline: 'none',
        resize: multi ? 'vertical' : 'none', minHeight: multi ? 90 : 'auto',
        transition: 'border-color 0.2s',
      }}
        onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
      />
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const handleChange = (field, value) => setFormData((p) => ({ ...p, [field]: value }));

  return (
    <div style={{ padding: '2.5rem clamp(1.5rem, 5vw, 4rem)', maxWidth: 900 }}>
      <p style={{ ...commentStyle, marginBottom: '2rem' }}>{contactPageData.comment}</p>
      <h2 style={headingStyle}>Contact</h2>
      <p style={{ ...commentStyle, marginBottom: '2rem' }}>{contactPageData.subtitle}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
        <div>
          <h3 style={subLabel}>Find Me On</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {contactSocials.map((link) => {
              const color = getIconColor(link.logoKey);
              return (
                <a key={link.label} href={link.url}
                  target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  style={{
                  display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0.85rem',
                  background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 10,
                  textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = color + '50'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  <div style={{
                    width: 34, height: 34, borderRadius: 7, background: color + '18',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon logoKey={link.logoKey} size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.75rem', color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.1rem' }}>{link.label}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.value}</p>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', flexShrink: 0 }}>↗</span>
                </a>
              );
            })}
          </div>
        </div>

        <div>
          <h3 style={subLabel}>Send A Message</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <Field label="YOUR_NAME" req value={formData.name} onChange={(v) => handleChange('name', v)} ph="string" />
            <Field label="YOUR_EMAIL" req value={formData.email} onChange={(v) => handleChange('email', v)} ph="string" />
            <Field label="SUBJECT" value={formData.subject} onChange={(v) => handleChange('subject', v)} ph="string" />
            <Field label="MESSAGE" req value={formData.message} onChange={(v) => handleChange('message', v)} ph={'"your message"'} multi />
            <button style={{
              padding: '0.8rem', background: 'var(--accent)', color: '#fff', border: 'none',
              borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
              fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = 'brightness(1.15)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              onClick={() => alert('Connect Formspree to make this work!')}
            >{contactPageData.submitLabel}</button>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', textAlign: 'center' }}>{contactPageData.formNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
