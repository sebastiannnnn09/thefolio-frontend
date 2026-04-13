import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css'; 

// Assets
import mapImage from '../map.png';
import darkBg from '../cp.png';
import lightBg from '../cpc.png';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isLightMode, setIsLightMode] = useState(false);

  // Theme & Background Sync
  useEffect(() => {
    const body = document.body;
    if (isLightMode) {
      body.classList.add('light-mode');
      body.style.backgroundImage = `url(${lightBg})`;
    } else {
      body.classList.remove('light-mode');
      body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${darkBg})`;
    }
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundAttachment = "fixed";
  }, [isLightMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("COMMUNICATION ENCRYPTED AND SENT!");
  };

  return (
    <div className="main-container">
      <div className="scanlines"></div>

      <header className="cyber-nav">
        <div className="logo">
          <span className="highlight">GAMERZONE</span>
        </div>

        <div className="switch-container">
          <span className="switch-label">MODE</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={isLightMode} 
              onChange={() => setIsLightMode(!isLightMode)} 
            />
            <span className="slider"></span>
          </label>
        </div>

        <nav>
          <ul className="nav-links">
            <li><Link to="/home">HOME</Link></li>
            <li><Link to="/about">ABOUT</Link></li>
            <li><Link to="/contact" className="active">CONTACT</Link></li>
            <li><Link to="/register" className="nav-btn">REGISTER</Link></li>
          </ul>
        </nav>
      </header>

      <main className="hero" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', padding: '40px 60px' }}>
        
        {/* Left Side: Contact Form */}
        <section className="content-box" style={{ background: 'rgba(0,0,0,0.6)', padding: '30px', border: '1px solid var(--cyber-pink)' }}>
          <div className="hazard-stripe"></div>
          <h2 className="hero-title" style={{ fontSize: '2.5rem', marginBottom: '20px' }}>ESTABLISH <span className="highlight">COMMS</span></h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group">
              <label style={{ color: 'var(--cyber-blue)', fontWeight: 'bold', fontSize: '0.8rem' }}>SENDER_NAME</label>
              <input 
                type="text" 
                name="name"
                placeholder="INPUT NAME..." 
                style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #333', color: 'white', fontFamily: 'Rajdhani' }}
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label style={{ color: 'var(--cyber-blue)', fontWeight: 'bold', fontSize: '0.8rem' }}>SENDER_EMAIL</label>
              <input 
                type="email" 
                name="email"
                placeholder="INPUT EMAIL..." 
                style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #333', color: 'white', fontFamily: 'Rajdhani' }}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label style={{ color: 'var(--cyber-blue)', fontWeight: 'bold', fontSize: '0.8rem' }}>TRANSMISSION_DATA</label>
              <textarea 
                name="message"
                rows="4"
                placeholder="ENTER MESSAGE..."
                style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #333', color: 'white', fontFamily: 'Rajdhani', resize: 'none' }}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="main-button" style={{ width: '100%' }}>SEND MESSAGE</button>
          </form>
        </section>

        {/* Right Side: Info & Map */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="info-card" style={{ borderLeft: '4px solid var(--cyber-yellow)', paddingLeft: '20px' }}>
            <h2 style={{ letterSpacing: '2px', color: 'var(--cyber-yellow)' }}>OWNER_INTEL</h2>
            <p style={{ fontSize: '1.2rem', margin: '10px 0' }}><strong>| Sebastian Andro L.</strong></p>
            <p style={{ color: 'var(--cyber-blue)', fontWeight: 'bold' }}>COLLEGE OF COMPUTER SCIENCE</p>
          </div>

          <div className="content-box" style={{ border: '1px solid var(--cyber-blue)', padding: '10px', background: 'rgba(0,240,255,0.05)' }}>
            <h3 style={{ marginBottom: '10px', fontSize: '0.9rem', color: 'var(--cyber-blue)' }}>LOCATION_TRACKER</h3>
            <img 
              src={mapImage} 
              alt="Map" 
              className="hero-image" 
              style={{ width: '100%', height: 'auto', borderRadius: '0', filter: 'hue-rotate(180deg) brightness(0.8)' }} 
            />
          </div>
          
          <div className="hazard-stripe"></div>
        </section>
      </main>

      <footer style={{ padding: '20px 60px', borderTop: '1px solid rgba(0, 240, 255, 0.1)' }}>
        <p>&copy; 2026 Sebastian, Andro L. | Mobile Gaming Portfolio Project</p>
      </footer>
    </div>
  );
};

export default Contact;