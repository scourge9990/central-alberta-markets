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

  // Fixed position between ad frames
  // Ad cards are: left at 10px (320px wide), right at 10px (320px wide)
  // Space between = viewport - 660px, centered
  return (
    <div style={{
      position: 'fixed',
      top: 'calc(50% + 120px)',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'calc(100vw - 680px)',
      maxWidth: '800px',
      minWidth: '400px',
      background: '#0a0a0a',
      border: '2px solid #FFEB43',
      borderRadius: '8px',
      padding: '12px 16px',
      zIndex: 100,
      boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '8px',
      }}>
        <span style={{ 
          color: '#FFEB43', 
          fontWeight: 'bold',
          fontSize: '0.8rem',
          letterSpacing: '1px'
        }}>
          💬 LIVE CHAT
        </span>
        <span style={{ 
          color: '#22c55e', 
          fontSize: '0.65rem',
          animation: 'pulse 2s infinite'
        }}>
          ● LIVE
        </span>
      </div>

      {/* Scrolling Messages */}
      <div style={{
        height: '45px',
        overflow: 'hidden',
        marginBottom: '8px',
      }}>
        {messages.slice(-3).map((msg, i) => (
          <div
            key={msg.id}
            style={{
              padding: '2px 0',
              fontSize: '0.75rem',
              animation: 'scrollUp 6s ease-in-out forwards',
              whiteSpace: 'normal',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxLines: 1,
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
          <p style={{ color: '#888888', fontSize: '0.75rem' }}>
            No messages yet. Start the chat!
          </p>
        )}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type a message..."
          maxLength={150}
          style={{
            flex: 1,
            padding: '8px 10px',
            background: '#1a1a1a',
            border: '1px solid #333',
            borderRadius: '4px',
            color: '#FFFFFF',
            fontSize: '0.75rem',
          }}
        />
        <button
          onClick={sendMessage}
          disabled={sending || !newMessage.trim()}
          style={{
            background: '#FFEB43',
            color: '#003594',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: sending ? 'not-allowed' : 'pointer',
            fontSize: '0.75rem',
            fontWeight: 'bold',
          }}
        >
          Send
        </button>
      </div>

      <style jsx global>{`
        @keyframes scrollUp {
          0% { transform: translateY(15px); opacity: 0; }
          15% { transform: translateY(0); opacity: 1; }
          85% { opacity: 1; }
          100% { transform: translateY(-30px); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}