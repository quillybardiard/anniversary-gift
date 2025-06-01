import React, { useState, useRef, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { calculateSizes } from '../constants/index.js';
import PixelPopup from '../components/PixelPopup.jsx';

const Hero = () => {
  // Use media queries to determine screen size
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);
  const [showPopup, setShowPopup] = useState(false);
  const [showMailPopup, setShowMailPopup] = useState(false);
  const [mailPos, setMailPos] = useState({ x: window.innerWidth / 2 - 24, y: window.innerHeight - 100 });
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Tambahkan state untuk kontrol audio
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [wasDragged, setWasDragged] = useState(false);

  const handleHeartClick = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const handleMailClick = (e) => {
    e.preventDefault();
    if (!wasDragged) {
      setShowMailPopup(true);
    }
  };
  const handleCloseMailPopup = () => setShowMailPopup(false);

  const handleMailMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    setWasDragged(false);
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    dragOffset.current = {
      x: clientX - mailPos.x,
      y: clientY - mailPos.y,
    };
  };

  const handleMailMouseMove = (e) => {
    if (!dragging) return;
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    const newX = clientX - dragOffset.current.x;
    const newY = clientY - dragOffset.current.y;
    // Jika posisi berubah cukup jauh, anggap drag
    if (Math.abs(newX - mailPos.x) > 2 || Math.abs(newY - mailPos.y) > 2) {
      setWasDragged(true);
    }
    setMailPos({ x: newX, y: newY });
  };

  const handleMailMouseUp = () => setDragging(false);

  const handleAudioPlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Event listener global untuk drag
  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', handleMailMouseMove);
      window.addEventListener('mouseup', handleMailMouseUp);
      window.addEventListener('touchmove', handleMailMouseMove);
      window.addEventListener('touchend', handleMailMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMailMouseMove);
      window.removeEventListener('mouseup', handleMailMouseUp);
      window.removeEventListener('touchmove', handleMailMouseMove);
      window.removeEventListener('touchend', handleMailMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMailMouseMove);
      window.removeEventListener('mouseup', handleMailMouseUp);
      window.removeEventListener('touchmove', handleMailMouseMove);
      window.removeEventListener('touchend', handleMailMouseUp);
    };
  }, [dragging]);

  return (
    <section className="hero-section" id="home">
      <div className="hero-center">
        <p className="hero-title">
          I<span className="waving-hand cursor-pointer" onClick={handleHeartClick}>💗</span>PRINCESS
        </p>
      </div>

      {/* Popup overlay utama dengan PixelPopup */}
      <PixelPopup open={showPopup} onClose={handleClosePopup} title="Spotlight">
        <span className="block text-center mt-4">HAPPY ANNIVERSARY💟</span>
        <div className="flex flex-wrap gap-0 justify-center items-center">
          <img src="assets/selfie1.png" alt="img1" className="w-24 h-40 object-contain rounded-none" />
          <img src="assets/selfie2.png" alt="img2" className="w-24 h-40 object-contain rounded-md" />
          <img src="assets/selfie.png" alt="img3" className="w-24 h-40 object-contain rounded-md" />
          <img src="assets/IMG_0040.png" alt="img4" className="w-24 h-40 object-contain rounded-md" />
          <img src="assets/IMG_0037.png" alt="img5" className="w-24 h-49 object-contain rounded-md" />
        </div>
        
      </PixelPopup>

      {/* Popup overlay mail dengan PixelPopup */}
      <PixelPopup open={showMailPopup} onClose={handleCloseMailPopup} title="Pesan-kesan">
        <span className="block text-center text-lg font-semibold">Sampai di 8 tahun✨<br/>Terima kasih banyak Princess cantik imut nan menggemaskan sudah selalu bersabar dan bertahan dengan aku. Aku pun juga begitu dong, hehe!</span>
      </PixelPopup>
      <style>
        {`
          .popup-title-8tahun {
            font-size: 2rem;
            font-weight: bold;
            display: block;
            text-align: center;
            margin-bottom: 0.5rem;
          }
          .popup-desc-8tahun {
            font-size: 1.1rem;
            display: block;
            text-align: center;
            font-weight: 500;
          }
          @media (min-width: 640px) {
            .popup-title-8tahun {
        font-size: 2.0rem;
            }
            .popup-desc-8tahun {
        font-size: 1.25rem;
            }
          }
        `}
      </style>
      <PixelPopup open={showMailPopup} onClose={handleCloseMailPopup} title="Pesan-kesan">
        <span className="popup-title-8tahun">Sampai di 8 tahun✨</span>
        <span className="popup-desc-8tahun">
          Terima kasih banyak Princess cantik imut nan menggemaskan sudah selalu bersabar dan bertahan dengan aku. 
          Aku pun juga begitu dong, hehe! Mohon maafkan aku, sebab hanya begini yang dapat kuberikan kepada kamu cintakuu🙏🏼
          ILOVEYOUMOSTPRINCESS💗💖💖
        </span>
      </PixelPopup>
      <div className="left-0 right-0 w-full z-10 c-space">
        <a
          href="#about"
          className="w-fit flex justify-center"
          onClick={handleMailClick}
          style={{ position: 'fixed', left: mailPos.x, top: mailPos.y, zIndex: 60, cursor: dragging ? 'grabbing' : 'grab' }}
        >
          <img
            src="assets/flower-pixel.png"
            alt="Flower Pixel"
            className="w-12 h-12 cursor-pointer hover:scale-110 transition-transform duration-200 select-none"
            onMouseDown={handleMailMouseDown}
            onTouchStart={handleMailMouseDown}
            draggable={false}
          />
        </a>
      </div>

      {/* Audio Player - pojok kanan bawah */}
      <div style={{position: 'fixed', right: 24, bottom: 24, zIndex: 100}}>
        <audio ref={audioRef} src="assets/Digital-Love.mp3" loop onEnded={() => setIsPlaying(false)} />
        <button
          onClick={handleAudioPlayPause}
          className=" text-white shadow-lg p-3 flex items-center justify-center hover:bg-black-500 transition-colors"
          style={{outline: 'none'}}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <img src="assets/Pictogrammers-Material-Light-Music.svg" alt="Pause" className="w-8 h-8 pixelated" style={{imageRendering:'pixelated'}} />
          ) : (
            <img src="assets/Pictogrammers-Material-Light-Music-off.svg" alt="Play" className="w-8 h-8 pixelated" style={{imageRendering:'pixelated'}} />
          )}
        </button>
      </div>
    </section>
  );
};

export default Hero;
