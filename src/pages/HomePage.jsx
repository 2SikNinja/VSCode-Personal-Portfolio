import { useState, useEffect } from 'react';
import { socialLinks, homePageData, personalInfo, assets } from '../data/portfolioData';
import Icon, { getIconColor } from '../components/Icon';

const commentStyle = { fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--comment)', fontStyle: 'italic' };
const ctaBtn = { padding: '0.6rem 1.25rem', borderRadius: 8, fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s ease', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' };

const taglines = [
  'Building full-stack apps and exploring cybersecurity 🚀',
  'Turning ideas into scalable software 💡',
  'CS grad passionate about data and security 🔐',
];

function useStagger(count, baseDelay = 80) {
  const [visible, setVisible] = useState(Array(count).fill(false));
  useEffect(() => {
    const timers = [];
    for (let i = 0; i < count; i++) {
      timers.push(setTimeout(() => {
        setVisible((prev) => { const next = [...prev]; next[i] = true; return next; });
      }, 150 + i * baseDelay));
    }
    return () => timers.forEach(clearTimeout);
  }, [count, baseDelay]);
  return visible;
}

function TypingTagline({ texts, speed = 40, pauseTime = 2500 }) {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout;
    if (!isDeleting && charIndex === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % texts.length);
    } else {
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
      }, isDeleting ? 25 : speed);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, pauseTime]);

  return texts[textIndex].substring(0, charIndex);
}

export default function HomePage({ onNavigate }) {
  const v = useStagger(9);
  const photoUrl = `${assets.images}/headshot.jpg`;
  const [photoError, setPhotoError] = useState(false);

  const animStyle = (index) => ({
    opacity: v[index] ? 1 : 0,
    transform: v[index] ? 'translateY(0)' : 'translateY(18px)',
    transition: 'opacity 0.5s cubic-bezier(.16,1,.3,1), transform 0.5s cubic-bezier(.16,1,.3,1)',
  });

  return (
    <div style={{ padding: '2rem clamp(1.25rem, 4vw, 3rem)', maxWidth: 1100 }}>
      <style>{`
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 15px rgba(122,162,247,0.12), 0 0 40px rgba(122,162,247,0.04); }
          50% { box-shadow: 0 0 25px rgba(122,162,247,0.2), 0 0 60px rgba(122,162,247,0.08); }
        }
        @keyframes badgePop {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes blink { 50% { opacity: 0; } }

        .home-hero {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          gap: 3rem;
        }
        .home-hero-left {
          flex: 1;
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .home-hero-right {
          flex-shrink: 0;
          width: 280px;
        }
        .home-photo-container {
          width: 100%;
          height: 100%;
          min-height: 380px;
          border-radius: 14px;
          border: 2px solid rgba(122,162,247,0.2);
          overflow: hidden;
          position: relative;
          background: var(--card-bg);
        }
        .home-photo-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .home-mobile-photo {
          display: none;
        }

        @media (max-width: 768px) {
          .home-hero {
            flex-direction: column;
            gap: 1.5rem;
          }
          .home-hero-right {
            display: none;
          }
          .home-mobile-photo {
            display: block;
            margin-bottom: 1.5rem;
          }
          .home-mobile-photo-inner {
            width: 100%;
            max-width: 320px;
            height: 300px;
            border-radius: 14px;
            border: 2px solid rgba(122,162,247,0.2);
            overflow: hidden;
            position: relative;
            margin: 0 auto;
          }
          .home-mobile-photo-inner img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
          }
          .home-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>

      {/* Comment */}
      <div style={animStyle(0)}>
        <p style={{ ...commentStyle, marginBottom: '1.5rem' }}>{homePageData.greeting}</p>
      </div>

      {/* Mobile photo - shows on top on small screens */}
      <div className="home-mobile-photo" style={animStyle(1)}>
        <div className="home-mobile-photo-inner" style={{ background: 'var(--card-bg)' }}>
          {!photoError ? (
            <img
              src={photoUrl}
              alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
              onError={() => setPhotoError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <PhotoFallback />
          )}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
            background: 'linear-gradient(transparent, rgba(0,0,0,0.35))',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* Hero: Left content + Right photo */}
      <div className="home-hero" style={animStyle(1)}>
        {/* Left side */}
        <div className="home-hero-left">
          {/* Name */}
          <h1 style={{ fontFamily: 'var(--font-display)', lineHeight: 0.95, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
            <span style={{ display: 'block', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, color: 'var(--text)' }}>
              {personalInfo.firstName}
            </span>
            <span style={{ display: 'block', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, color: personalInfo.lastNameColor }}>
              {personalInfo.lastName}
            </span>
          </h1>

          {/* Role badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem', ...animStyle(3) }}>
            {homePageData.roleBadges.map((role, i) => (
              <span key={role.label} style={{
                padding: '0.35rem 0.85rem',
                background: role.accent ? 'rgba(244,114,182,0.1)' : 'rgba(255,255,255,0.04)',
                border: `1px solid ${role.accent ? 'rgba(244,114,182,0.25)' : 'rgba(255,255,255,0.08)'}`,
                borderRadius: 20, fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
                color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem',
                animation: v[3] ? `badgePop 0.4s ease-out ${i * 0.08}s both` : 'none',
              }}>
                <span style={{
                  width: 7, height: 7, borderRadius: '50%', background: role.dot, flexShrink: 0,
                  boxShadow: `0 0 6px ${role.dot}60`,
                }} />
                {role.label}
              </span>
            ))}
          </div>

          {/* Typing tagline */}
          <div style={{ ...animStyle(4), marginBottom: '1.5rem', minHeight: '1.6rem' }}>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '1rem',
              color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', gap: '0.3rem',
              overflow: 'hidden', whiteSpace: 'nowrap',
            }}>
              <span><TypingTagline texts={taglines} /></span>
              <span style={{
                display: 'inline-block', width: 2, height: '1.1em',
                background: 'var(--accent)', animation: 'blink 1s step-end infinite',
                flexShrink: 0,
              }} />
            </p>
          </div>

          {/* Description */}
          <div style={animStyle(5)}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.85, maxWidth: 520, marginBottom: '2rem' }}>
              {homePageData.description.map((seg, i) =>
                seg.bold ? <strong key={i} style={{ color: 'var(--text)' }}>{seg.text}</strong> : <span key={i}>{seg.text}</span>
              )}
            </p>
          </div>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', ...animStyle(6) }}>
            {homePageData.ctaButtons.map((btn) => (
              <button key={btn.target} onClick={() => onNavigate(btn.target)} style={{
                ...ctaBtn,
                background: btn.primary ? 'var(--accent)' : 'transparent',
                color: btn.primary ? '#fff' : 'var(--text)',
                border: btn.primary ? '1px solid var(--accent)' : '1px solid var(--border)',
                boxShadow: btn.primary ? '0 4px 15px rgba(122,162,247,0.2)' : 'none',
              }}
                onMouseEnter={(e) => {
                  if (btn.primary) {
                    e.currentTarget.style.filter = 'brightness(1.15)';
                    e.currentTarget.style.boxShadow = '0 6px 25px rgba(122,162,247,0.35)';
                  } else {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.color = 'var(--accent)';
                  }
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  if (btn.primary) {
                    e.currentTarget.style.filter = 'brightness(1)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(122,162,247,0.2)';
                  } else {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.color = 'var(--text)';
                  }
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right side - large photo */}
        <div className="home-hero-right" style={animStyle(2)}>
          <div style={{ position: 'relative', height: '100%' }}>
            {/* Glow border */}
            <div style={{
              position: 'absolute', inset: -5,
              borderRadius: 18,
              animation: 'glowPulse 4s ease-in-out infinite',
              pointerEvents: 'none',
              border: '1px solid rgba(122,162,247,0.06)',
            }} />

            <div className="home-photo-container">
              {!photoError ? (
                <img
                  src={photoUrl}
                  alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                  onError={() => setPhotoError(true)}
                />
              ) : (
                <PhotoFallback />
              )}
              {/* Bottom gradient overlay */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
                background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
                pointerEvents: 'none',
              }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="home-stats-grid" style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        background: 'var(--card-bg)', border: '1px solid var(--border)',
        borderRadius: 12, overflow: 'hidden', marginBottom: '2rem',
        marginTop: '2.5rem',
        ...animStyle(7),
      }}>
        {homePageData.stats.map((stat, i) => (
          <div key={i} style={{
            padding: '1.25rem 0.5rem', textAlign: 'center',
            borderRight: i < homePageData.stats.length - 1 ? '1px solid var(--border)' : 'none',
            transition: 'background 0.2s',
          }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(122,162,247,0.04)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <p style={{
              fontFamily: 'var(--font-display)', fontSize: '1.75rem',
              fontWeight: 800, color: 'var(--text)', marginBottom: '0.25rem',
            }}>{stat.value}</p>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem',
              color: 'var(--text-muted)', textTransform: 'uppercase',
              letterSpacing: '0.12em',
            }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Social pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', ...animStyle(8) }}>
        {socialLinks.map((s) => {
          const color = getIconColor(s.logoKey);
          return (
            <a key={s.label} href={s.url}
              target={s.url.startsWith('mailto:') ? '_self' : '_blank'}
              rel="noopener noreferrer"
              style={{
                padding: '0.3rem 0.7rem', border: '1px solid var(--border)', borderRadius: 16,
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)',
                textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.35rem',
                transition: 'all 0.25s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.color = color;
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${color}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Icon logoKey={s.logoKey} size={14} />
              {s.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}

function PhotoFallback() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(135deg, rgba(122,162,247,0.08), rgba(244,114,182,0.06))',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: '0.5rem',
    }}>
      <span style={{
        fontFamily: 'var(--font-display)', fontSize: '3.5rem',
        fontWeight: 800, color: 'var(--accent)', opacity: 0.5,
      }}>
        {personalInfo.firstName[0]}{personalInfo.lastName[0]}
      </span>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
        color: 'var(--text-muted)',
      }}>
        headshot.jpg
      </span>
    </div>
  );
}
