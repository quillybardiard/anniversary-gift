import React from 'react';

const PixelPopup = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={onClose}>
      <div
        className="pixel-shadow pixel-popup"
        style={{
          minWidth: 320,
          maxWidth: 400,
          background: '#F0F0F0',
          border: '4px solid #000',
          boxShadow: '8px 8px 0 #000',
          borderRadius: 0,
          padding: 0,
          fontFamily: 'Press Start 2P, monospace',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{
            background: '#E0E0E0',
            borderBottom: '4px solid #000',
            fontFamily: 'Press Start 2P, monospace',
            color: '#222831',
            fontSize: '1rem',
            letterSpacing: 1,
            textShadow: '2px 2px 0 #B0B0B0',
          }}
        >
          <span>{title}</span>
          <button
            onClick={onClose}
            style={{
              background: '#B0B0B0',
              color: '#000',
              border: 'none',
              fontFamily: 'Press Start 2P, monospace',
              fontSize: '1.2rem',
              padding: '0 10px',
              cursor: 'pointer',
              borderRadius: 0,
              boxShadow: '2px 2px 0 #fff',
              marginLeft: 8,
            }}
            aria-label="Close popup"
          >
            ×
          </button>
        </div>
        <div style={{ padding: 24, color: '#222831', fontFamily: 'Press Start 2P, monospace', fontSize: '0.9rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PixelPopup;
