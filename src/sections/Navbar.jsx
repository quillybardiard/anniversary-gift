import React, { useState } from 'react';

const navLinks = [
  { name: 'file', href: '#home' },
  { name: 'edit', href: '#about' },
  { name: 'view', href: '#projects' },
];

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const handleToggleTheme = () => {
    setDark(d => !d);
    document.body.classList.toggle('dark-theme');
  };
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-12 flex items-center ${dark ? 'navbar-dark' : ''}`}
      style={{ borderRadius: 0, boxShadow: '4px 4px 0 #B0B0B0, 8px 8px 0 #B0B0B0', border: '4px solid #B0B0B0', background: '#F0F0F0' }}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center h-full px-2">
        <div className="flex items-center gap-2 h-full">
          <img src={"assets/apple-1984.png"} alt="Apple 1984 Logo" className="h-8 w-auto pixelated" style={{ imageRendering: 'pixelated', marginLeft: 0 }} />
          <nav className="flex flex-row gap-4 items-center h-full ml-2" style={{alignItems:'center', height:'100%'}}>
            {navLinks.map(link => (
              <a
                key={link.name}
                href={link.href}
                className="pixel-title"
                style={{ fontSize: '0.9rem', color: '#222831', textShadow: '1px 1px 0 #B0B0B0', textDecoration: 'none', padding: '0 4px', display: 'flex', alignItems: 'center', height: '100%' }}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
        <button
          onClick={handleToggleTheme}
          className="ml-auto mr-2 flex items-center justify-center bg-transparent border-none outline-none"
          style={{cursor:'pointer'}}
          aria-label="Toggle dark mode"
        >
          <img
            src={dark ? "assets/light-mode.svg" : "assets/dark-mode.svg"}
            alt="Toggle theme"
            className="h-8 w-8 pixelated"
            style={{imageRendering:'pixelated'}}
          />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
