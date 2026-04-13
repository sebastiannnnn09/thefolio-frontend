import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css'; 

// Import all assets
import codm0 from '../CODM.jpg';
import codm1 from '../CODM1.jpg';
import codm2 from '../CODM2.jpg';
import darkBg from '../cp.png';   
import lightBg from '../cpc.png'; 

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === null ? true : savedTheme === 'dark';
  });

  // Theme & Background Sync
  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.remove('light-mode');
      body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.8)), url(${darkBg})`;
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.add('light-mode');
      body.style.backgroundImage = `url(${lightBg})`;
      localStorage.setItem('theme', 'light');
    }
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundAttachment = "fixed";
  }, [isDarkMode]);

  // Load Posts and User from LocalStorage
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem('gamerzone_posts') || '[]');
    const sessionUser = JSON.parse(localStorage.getItem('user') || '{}');
    setPosts(savedPosts.sort((a, b) => b.id - a.id)); // Newest first
    setUser(sessionUser);
  }, []);

  // Admin Purge Feature
  const handleDelete = (id) => {
    if (window.confirm("SYSTEM_CONFIRM: PURGE THIS INTEL?")) {
      const updated = posts.filter(p => p.id !== id);
      setPosts(updated);
      localStorage.setItem('gamerzone_posts', JSON.stringify(updated));
    }
  };

  const handleToggle = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="main-container">
      <div className="scanlines"></div>
      
      <header className="cyber-nav">
  <div className="logo">
    <span className="highlight">GAMERZONE</span>
  </div>
  
  <div className="switch-container">
  <span className="switch-label">SYSTEM_MODE</span>
  <label className="cyber-switch">
    <input type="checkbox" checked={!isDarkMode} onChange={handleToggle} />
    <span className="cyber-slider">
      <span className="slider-text">{isDarkMode ? '🌗' : '🌗'}</span>
    </span>
  </label>
</div>

  <nav>
    <ul className="nav-links">
      <li><Link to="/home" className="active">HOME</Link></li>
      <li><Link to="/profile">PROFILE</Link></li>
      <li><Link to="/admin">ADMIN</Link></li>
      {/* This styled link replaces the ugly white box */}
      <li><Link to="/login" className="nav-btn-exit">LOGOUT</Link></li>
    </ul>
  </nav>
</header>
      <main className="container hero">
        {/* SECTION 1: HERO (INFOS) */}
        <section className="content-box">
          <div className="hazard-stripe"></div>
          <h2 className="subtitle">TORE UP!!!!: MOBILE GAMING EXPERIENCE</h2>
          <h1 className="hero-title">
            YOUR LIFE IS OBSOLETE.<br />
            GET AN <span className="highlight">UPDATE!</span>
          </h1>
          <div className="hazard-stripe"></div>
          <p className="cyber-description">Experience why the phone in your pocket is the ultimate gaming console.</p>
          <div className="hero-gallery">
            <img src={codm0} className="hero-image" alt="1" />
            <img src={codm1} className="hero-image" alt="2" />
            <img src={codm2} className="hero-image" alt="3" />
          </div>
          <li></li><button className="main-button">REGISTER NOW!</button>
        </section>

        {/* SECTION 2: WHY MOBILE (INFOS) */}
        <section className="mega-info-section" style={{ marginTop: '100px' }}>
          <h2 className="glitch-title">WHY MOBILE?</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <span className="stat-header">SLEEK</span>
              <p className="stat-desc">HIGH-QUALITY GAMES IN YOUR POCKET.</p>
            </div>
            <div className="stat-box">
              <span className="stat-header">GLOBAL</span>
              <p className="stat-desc">CONNECT WITH PLAYERS WORLDWIDE.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: THE LIVE INTEL FEED (SCROLLABLE BOTTOM) */}
        <section id="intel-feed" className="mega-info-section" style={{ marginTop: '120px', paddingBottom: '100px' }}>
          <div className="hazard-stripe"></div>
          <h2 className="glitch-title" style={{ fontSize: '3.5rem' }}>LIVE_INTEL_FEED</h2>
          
          <div className="intel-scroll-window" style={{ 
            marginTop: '50px', 
            maxHeight: '600px', 
            overflowY: 'auto', 
            padding: '20px',
            background: 'rgba(0,0,0,0.5)'
          }}>
            <div className="posts-grid" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: '30px' 
            }}>
              {posts.map((post) => (
                <div key={post.id} className="stat-box" style={{ textAlign: 'left', background: 'rgba(0,0,0,0.8)' }}>
                  {post.image && (
                    <img src={post.image} alt="Intel" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                  )}
                  <span className="stat-header" style={{ color: 'var(--cyber-pink)' }}>{post.title}</span>
                  <p className="stat-desc">{post.content}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                    <span style={{ fontSize: '0.6rem', color: '#666' }}>BY: {post.author}</span>
                    {/* ADMIN REMOVE FEATURE */}
                    {(user?.role === 'admin' || user?.username === 'Sebastian_Andro_L') && (
                      <button onClick={() => handleDelete(post.id)} className="purge-link" style={{ color: '#ff0055', background: 'none', border: 'none', cursor: 'pointer' }}>
                        [ PURGE ]
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 Sebastian, Andro L. | College of Computer Science</p>
      </footer>
    </div>
  );
};

export default Home;