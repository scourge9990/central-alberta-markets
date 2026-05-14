'use client';

import { useState, useEffect } from 'react';

interface Message {
  id: number;
  email: string;
  name: string;
  message: string;
  createdAt: string;
}

export function LiveTicker() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isPaidMember, setIsPaidMember] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('userSession');
    if (session) {
      const userData = JSON.parse(session);
      setUser(userData);
      setIsPaidMember(userData?.subscription?.status === 'active');
      
      if (userData?.subscription?.status === 'active') {
        loadMessages();
        const interval = setInterval(loadMessages, 5000);
        return () => clearInterval(interval);
      }
    }
  }, []);

  const loadMessages = async () => {
    try {
      const res = await fetch('/api/chat');
      const data = await res.json();
      setMessages(data.messages?.slice(-4) || []);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user?.email) return;
    setSending(true);

    try {
      await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          name: user.name || user.email.split('@')[0],
          message: newMessage.trim()
        })
      });
      setNewMessage('');
      loadMessages();
    } catch (err) {
      console.error(err);
    }
    setSending(false);
  };

  if (!isPaidMember) return null;

  return (
    <div style={{
      background: '#0a0a0a',
      borderTop: '3px solid #FFEB43',
      padding: '16px 20px',
      margin: '0 auto',
      maxWidth: '100%',
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '12px',
        maxWidth: '1200px',
        margin: '0 auto 12px',
      }}>
        <span style={{ 
          color: '#FFEB43', 
          fontWeight: 'bold',
          fontSize: '0.9rem',
          letterSpacing: '2px'
        }}>
          💬 LIVE MARKET CHAT
        </span>
        <span style={{ 
          color: '#22c55e', 
          fontSize: '0.75rem',
          animation: 'pulse 2s infinite'
        }}>
          ● LIVE
        </span>
      </div>

      {/* Scrolling Messages - Full Width */}
      <div style={{
        height: '60px',
        overflow: 'hidden',
        marginBottom: '12px',
        maxWidth: '1200px',
        margin: '0 auto 12px',
      }}>
        {messages.slice(-3).map((msg, i) => (
          <div
            key={msg.id}
            style={{
              padding: '3px 0',
              fontSize: '0.85rem',
              animation: 'scrollUp 6s ease-in-out forwards',
            }}
          >
            <span style={{ fontWeight: 'bold', color: '#FFEB43' }}>
              {msg.name}:
            </span>{' '}
            <span style={{ color: '#FFFFFF' }}>
              {msg.message}
            </span>
          </div>
        ))}
        {messages.length === 0 && (
          <p style={{ color: '#888888', fontSize: '0.85rem' }}>
            No messages yet. Start the conversation!
          </p>
        )}
      </div>

      {/* Input - Full Width */}
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message to all market members..."
          maxLength={200}
          style={{
            flex: 1,
            padding: '12px 16px',
            background: '#1a1a1a',
            border: '2px solid #333',
            borderRadius: '6px',
            color: '#FFFFFF',
            fontSize: '0.9rem',
          }}
        />
        <button
          onClick={sendMessage}
          disabled={sending || !newMessage.trim()}
          style={{
            background: '#FFEB43',
            color: '#003594',
            border: 'none',
            borderRadius: '6px',
            padding: '12px 24px',
            cursor: sending ? 'not-allowed' : 'pointer',
            fontSize: '0.9rem',
            fontWeight: 'bold',
          }}
        >
          Send
        </button>
      </div>

      <style jsx global>{`
        @keyframes scrollUp {
          0% { transform: translateY(20px); opacity: 0; }
          15% { transform: translateY(0); opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(-40px); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}