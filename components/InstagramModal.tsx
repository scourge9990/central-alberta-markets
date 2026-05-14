'use client';

import { useState, useEffect } from 'react';

export function InstagramModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Clickable Instagram Image */}
      <div 
        className="ad-frame" 
        style={{ padding: '8px', cursor: 'pointer' }}
        onClick={() => setIsOpen(true)}
        role="button"
        aria-label="Click to enlarge image"
      >
        <img 
          src="/instagram-post.jpg" 
          alt="Arabic cheese from Print Your Heart Out Red Deer - Central Alberta Markets" 
          style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '6px' }}
        />
      </div>

      {/* Modal */}
      {isOpen && (
        <div 
          className="image-modal-overlay"
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '40px',
          }}
        >
          <div 
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: 'auto',
              height: 'auto',
              maxWidth: '98vw',
              maxHeight: '95vh',
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '-50px',
                right: '0',
                background: '#FFEB43',
                border: 'none',
                borderRadius: '50%',
                width: '44px',
                height: '44px',
                fontSize: '24px',
                cursor: 'pointer',
                fontWeight: 'bold',
                color: '#003594',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close modal"
            >
              ✕
            </button>
            <img 
              src="/instagram-post.jpg" 
              alt="Arabic cheese from Print Your Heart Out Red Deer - Full Size" 
              style={{
                display: 'block',
                width: 'auto',
                height: 'auto',
                maxWidth: '98vw',
                maxHeight: '95vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 0 40px rgba(0,0,0,0.5)',
              }}
            />
            <p style={{
              textAlign: 'center',
              color: '#FFEB43',
              marginTop: '15px',
              fontSize: '14px',
            }}>
              Click outside or press Escape to close
            </p>
          </div>
        </div>
      )}
    </>
  );
}