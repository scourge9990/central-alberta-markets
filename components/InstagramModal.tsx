'use client';

import { useState } from 'react';

export function InstagramModal() {
  const [isOpen, setIsOpen] = useState(false);

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
            background: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px',
          }}
        >
          <div 
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '85vh',
            }}
          >
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: '#FFEB43',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                fontSize: '20px',
                cursor: 'pointer',
                fontWeight: 'bold',
                color: '#003594',
              }}
              aria-label="Close modal"
            >
              ✕
            </button>
            <img 
              src="/instagram-post.jpg" 
              alt="Arabic cheese from Print Your Heart Out Red Deer - Full Size" 
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}