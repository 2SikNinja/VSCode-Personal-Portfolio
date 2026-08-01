import { useState, useEffect, useRef } from 'react';
import { personalInfo } from '../data/portfolioData';
import Icon from './Icon';

const systemPrompt = `You are an AI assistant embedded in ${personalInfo.firstName} ${personalInfo.lastName}'s portfolio website. You help visitors learn about ${personalInfo.firstName}'s skills, projects, and experience. Be friendly, concise, and helpful. If asked something you don't know about ${personalInfo.firstName}, say so honestly. Keep responses brief since this is a side panel chat widget. You can also answer general programming or tech questions.`;

const suggestedPrompts = [
  `Tell me about ${personalInfo.firstName}!`,
  `What projects has ${personalInfo.firstName} built?`,
  `Tell me about his work experience.`,
  `What's his tech stack?`,
  `How can I contact ${personalInfo.firstName}?`,
  `How can I support ${personalInfo.firstName}?`,
];

export default function ClaudeChatPopup({ open, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 150);
    }
  }, [open]);

  const sendMessage = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || loading) return;

    const userMessage = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const apiMessages = updatedMessages.map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: apiMessages,
        }),
      });

      const data = await response.json();
      const assistantText = data.content
        ?.filter((block) => block.type === 'text')
        .map((block) => block.text)
        .join('\n') || 'Sorry, I had trouble responding. Please try again.';

      setMessages((prev) => [...prev, { role: 'assistant', content: assistantText }]);
    } catch (err) {
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: 'Oops, something went wrong connecting to Claude. Please try again later.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!open) return null;

  const hasMessages = messages.length > 0;

  return (
    <div style={{
      width: 340, minWidth: 340, background: 'var(--sidebar-bg)',
      borderLeft: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '0.6rem 0.85rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        flexShrink: 0,
      }}>
        <Icon logoKey="claude" size={18} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
          color: 'var(--text)', fontWeight: 600, flex: 1,
        }}>
          {personalInfo.firstName}'s AI Assistant
        </span>
        {/* Edit / close buttons like VS Code */}
        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none', color: 'var(--text-muted)',
            fontSize: '1rem', cursor: 'pointer', padding: '0 0.2rem',
            lineHeight: 1, borderRadius: 3, transition: 'color 0.15s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          ×
        </button>
      </div>

      {/* Workspace label */}
      <div style={{
        padding: '0.4rem 0.85rem',
        borderBottom: '1px solid var(--border)',
        fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
        color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem',
        flexShrink: 0,
      }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>Workspace</span>
        <span style={{
          padding: '0.1rem 0.4rem', background: 'rgba(122,162,247,0.1)',
          color: 'var(--accent)', borderRadius: 3, fontSize: '0.6rem',
        }}>
          ★ portfolio-{personalInfo.firstName.toLowerCase()}
        </span>
      </div>

      {/* Chat area */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '0.85rem',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Empty state with avatar and suggested prompts */}
        {!hasMessages && (
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            paddingTop: '1.5rem', gap: '1rem',
          }}>
            {/* Avatar */}
            <div style={{
              width: 48, height: 48, borderRadius: 12,
              background: 'rgba(217,119,87,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon logoKey="claude" size={28} />
            </div>

            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: 'var(--font-display)', fontSize: '1rem',
                color: 'var(--text)', fontWeight: 700, marginBottom: '0.35rem',
              }}>
                Hi! I'm {personalInfo.firstName}'s Copilot 👋
              </p>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                color: 'var(--text-muted)', lineHeight: 1.5, maxWidth: 260,
              }}>
                Ask me anything about his projects, skills, experience, or achievements.
              </p>
            </div>

            {/* Suggested prompt buttons */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '0.4rem', width: '100%', marginTop: '0.5rem',
            }}>
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  style={{
                    padding: '0.5rem 0.6rem',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border)',
                    borderRadius: 8, textAlign: 'left',
                    fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                    color: 'var(--text-secondary)', cursor: 'pointer',
                    transition: 'all 0.15s', lineHeight: 1.4,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.background = 'rgba(122,162,247,0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                  }}
                >
                  <span style={{ color: 'var(--accent)', marginRight: '0.3rem' }}>✦</span>
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {hasMessages && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}>
                <div style={{
                  maxWidth: '90%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: msg.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  background: msg.role === 'user'
                    ? 'rgba(122,162,247,0.12)'
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${msg.role === 'user'
                    ? 'rgba(122,162,247,0.18)'
                    : 'rgba(255,255,255,0.05)'}`,
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '0.55rem 0.75rem',
                  borderRadius: '12px 12px 12px 2px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                }}>
                  <span style={{ animation: 'claudePulse 1.5s ease-in-out infinite' }}>thinking...</span>
                  <style>{`@keyframes claudePulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }`}</style>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div style={{
        padding: '0.6rem 0.75rem',
        borderTop: '1px solid var(--border)',
        flexShrink: 0,
      }}>
        <div style={{
          display: 'flex', gap: '0.4rem', alignItems: 'flex-end',
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid var(--border)',
          borderRadius: 8, padding: '0.4rem 0.5rem',
          transition: 'border-color 0.2s',
        }}
          onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask about ${personalInfo.firstName}'s projects, experience, skills...`}
            rows={1}
            style={{
              flex: 1, padding: '0.25rem 0',
              background: 'none', border: 'none',
              color: 'var(--text)', fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem', outline: 'none',
              resize: 'none', maxHeight: 80, lineHeight: 1.4,
            }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            style={{
              width: 28, height: 28, borderRadius: 6,
              background: input.trim() && !loading ? 'var(--accent)' : 'rgba(255,255,255,0.04)',
              border: 'none', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: input.trim() && !loading ? 'pointer' : 'default',
              transition: 'background 0.2s',
              flexShrink: 0,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
            </svg>
          </button>
        </div>

        {/* Footer note */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          marginTop: '0.35rem', padding: '0 0.1rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.58rem',
            color: 'var(--text-muted)',
          }}>
            AI can make mistakes. Contact {personalInfo.firstName} directly for important matters.
          </span>
        </div>
      </div>
    </div>
  );
}
