import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css'; 

// Import your high-fidelity background
import splashBg from '../cpk.png'; 

const SplashPage = () => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5; // Faster boot sequence
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setIsFading(true); 
        setTimeout(() => {
          navigate('/home'); 
        }, 800); 
      }, 500);
    }
  }, [progress, navigate]);

  // Inline dynamic style for the background image
  const splashContainerStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${splashBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative'
  };

  return (
    <div style={splashContainerStyle} className="main-container">
      {/* Scanline overlay for that CRT/Gamer monitor feel */}
      <div className="scanlines"></div>
      
      <div className={`loader-content ${isFading ? 'fade-out-exit' : ''}`} style={{ textAlign: 'center', zIndex: 2 }}>
        <h1 className="glitch-title" style={{ fontSize: '5.5rem', marginBottom: '0' }}>
          GAMERZONE
        </h1>
        
        <div className="hazard-stripe" style={{ width: '100%', maxWidth: '400px', margin: '15px auto' }}></div>
        
        <p style={{ color: 'var(--cyber-blue)', letterSpacing: '8px', fontWeight: 'bold', fontSize: '0.9rem' }}>
          SYSTEM_INITIALIZING...
        </p>

        {/* Progress Tracker */}
        <div className="boot-loader-container" style={{ width: '350px', border: '1px solid var(--cyber-pink)' }}>
          <div 
            className="boot-progress-bar" 
            style={{ 
              width: `${progress}%`, 
              backgroundColor: 'var(--cyber-pink)', 
              boxShadow: '0 0 20px var(--cyber-pink)' 
            }}
          ></div>
          <span className="boot-percentage" style={{ color: 'var(--cyber-pink)' }}>{progress}%</span>
        </div>

        <div className="system-status-log" style={{ color: 'var(--cyber-yellow)', opacity: 0.8 }}>
          <code>{progress > 40 ? ">> LOADING_CODM_ASSETS..." : ">> SCANNING_HARDWARE..."}</code><br/>
          <code>{progress > 80 ? ">> CONNECTION_STABLE" : ""}</code>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;