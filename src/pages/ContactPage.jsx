import { useState } from 'react';
import { contactSocials, contactPageData } from '../data/portfolioData';
import Icon, { getIconColor } from '../components/Icon';

/* ─────────────────────────────────────────────────────────
   FORMSPREE SETUP:
   1. Go to formspree.io and create a free account
   2. Create a new form
   3. Replace the ID below with your form ID
   ───────────────────────────────────────────────────────── */
const FORMSPREE_ID = 'mdaqrbbn'; // e.g. 'xyzabcde'

const commentStyle = { fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--comment)', fontStyle: 'italic' };
const headingStyle = { fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem', letterSpacing: '-0.02em' };
const subLabel = { fontFamily: 'var(--font-display)', fontSize: '0.82rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '1rem', fontWeight: 600 };

function Field({ label, req, value, onChange, ph, multi, name, type = 'text' }) {
  const Tag = multi ? 'textarea' : 'input';
  return (
    <div>
      <label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '0.3rem', marginBottom: '0.35rem' }}>
        {'// '}{label}{req && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <Tag
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={ph}
        required={req}
        style={{
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
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const handleChange = (field, value) => setFormData((p) => ({ ...p, [field]: value }));

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('validation');
      setTimeout(() => setStatus('idle'), 2500);
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: formData.subject || `Portfolio message from ${formData.name}`,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }

    setTimeout(() => { if (status !== 'idle') setStatus('idle'); }, 4000);
  };

  const buttonLabel = {
    idle: contactPageData.submitLabel,
    sending: '⏳ sending...',
    success: '✓ sent!',
    error: '✕ failed, try again',
    validation: '⚠ fill required fields',
  }[status];

  const buttonBg = {
    idle: 'var(--accent)',
    sending: 'var(--text-muted)',
    success: '#10b981',
    error: '#ef4444',
    validation: '#f59e0b',
  }[status];

  return (
    <div style={{ padding: '2.5rem clamp(1rem, 4vw, 4rem)', maxWidth: 900 }}>
      <p style={{ ...commentStyle, marginBottom: '2rem' }}>{contactPageData.comment}</p>
      <h2 style={headingStyle}>Contact</h2>
      <p style={{ ...commentStyle, marginBottom: '2rem' }}>{contactPageData.subtitle}</p>

      <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem' }}>
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
            <Field label="YOUR_NAME" req name="name" value={formData.name} onChange={(v) => handleChange('name', v)} ph="string" />
            <Field label="YOUR_EMAIL" req name="email" type="email" value={formData.email} onChange={(v) => handleChange('email', v)} ph="string" />
            <Field label="SUBJECT" name="_subject" value={formData.subject} onChange={(v) => handleChange('subject', v)} ph="string" />
            <Field label="MESSAGE" req name="message" value={formData.message} onChange={(v) => handleChange('message', v)} ph={'"your message"'} multi />
            <button
              onClick={handleSubmit}
              disabled={status === 'sending'}
              style={{
                padding: '0.8rem', background: buttonBg, color: '#fff', border: 'none',
                borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
                fontWeight: 600, cursor: status === 'sending' ? 'wait' : 'pointer',
                transition: 'all 0.3s',
                opacity: status === 'sending' ? 0.7 : 1,
              }}
              onMouseEnter={(e) => { if (status === 'idle') { e.currentTarget.style.filter = 'brightness(1.15)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >{buttonLabel}</button>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', textAlign: 'center' }}>{contactPageData.formNote}</p>
          </div>
        </div>
      </div>
    </div>
  );
}