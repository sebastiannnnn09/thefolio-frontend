import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import '../styles/style.css'; 

// Assets
import darkBg from '../cp.png';
import lightBg from '../cpc.png';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);

  // Theme & Background Sync
  useEffect(() => {
    const body = document.body;
    if (isLightMode) {
      body.classList.add('light-mode');
      body.style.backgroundImage = `url(${lightBg})`;
    } else {
      body.classList.remove('light-mode');
      body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.95)), url(${darkBg})`;
    }
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundAttachment = "fixed";
  }, [isLightMode]);

  useEffect(() => {
    window.scrollTo(0, 0);
    API.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error("TRANSMISSION_ERROR:", err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="main-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <h1 className="glitch-title" style={{ fontSize: '2rem' }}>DECRYPTING_DATA...</h1>
    </div>
  );

  if (!post) return (
    <div className="main-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <h2 className="glitch-title" style={{ color: 'var(--cyber-pink)' }}>404: INTEL NOT FOUND</h2>
      <button onClick={() => navigate('/home')} className="main-button" style={{ marginTop: '20px' }}>RETURN TO FEED</button>
    </div>
  );

  return (
    <div className="main-container">
      <div className="scanlines"></div>

      <header className="cyber-nav">
        <div className="logo">
          <span className="highlight">GAMERZONE // INTEL</span>
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
            <li><Link to="/register" className="nav-btn">REGISTER</Link></li>
          </ul>
        </nav>
      </header>

      <main className="hero" style={{ flexDirection: 'column', alignItems: 'center', overflowY: 'auto', padding: '40px 20px' }}>
        
        {/* Navigation & Back Action */}
        <div style={{ width: '100%', maxWidth: '900px', marginBottom: '20px' }}>
          <button onClick={() => navigate(-1)} className="nav-btn" style={{ background: 'rgba(0,240,255,0.1)', border: '1px solid var(--cyber-blue)', color: 'var(--cyber-blue)', padding: '10px 25px' }}>
            ← BACK_TO_FEED
          </button>
        </div>

        <article className="content-box" style={{ width: '100%', maxWidth: '900px', background: 'rgba(0,0,0,0.85)', padding: '40px', border: '1px solid var(--cyber-blue)' }}>
          <div className="hazard-stripe"></div>
          
          <header style={{ marginBottom: '30px' }}>
            <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '10px' }}>{post.title.toUpperCase()}</h1>
            <div style={{ color: 'var(--cyber-yellow)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.9rem' }}>
              SOURCE: <span style={{ color: 'white' }}>{post.author?.name}</span> 
              <span style={{ margin: '0 15px', color: '#444' }}>|</span> 
              DATE: <span style={{ color: 'white' }}>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </header>

          {post.image && (
            <div style={{ marginBottom: '30px', border: '2px solid var(--cyber-blue)', padding: '5px', background: '#000' }}>
              <img 
                src={`http://localhost:5000/uploads/${post.image}`} 
                alt={post.title} 
                className="hero-image"
                style={{ width: '100%', height: 'auto', borderRadius: '0' }}
              />
            </div>
          )}

          <div className="cyber-description" style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ddd', marginBottom: '40px', whiteSpace: 'pre-wrap' }}>
            {post.body}
          </div>

          <div className="hazard-stripe" style={{ height: '5px' }}></div>

          {/* Comments Placeholder */}
          <section style={{ marginTop: '40px', padding: '20px', background: 'rgba(0, 240, 255, 0.05)', border: '1px solid rgba(0, 240, 255, 0.2)' }}>
            <h3 style={{ color: 'var(--cyber-blue)', letterSpacing: '3px', marginBottom: '10px' }}>COMMS_CHANNEL</h3>
            <p style={{ color: 'var(--cyber-pink)', fontWeight: 'bold', fontSize: '0.8rem' }}>[REDACTED] ENCRYPTED COMMS COMING SOON...</p>
          </section>
        </article>

      </main>

      <footer style={{ padding: '20px', textAlign: 'center', borderTop: '1px solid rgba(0, 240, 255, 0.1)' }}>
        <p>&copy; 2026 Sebastian, Andro L. | Intel Archive Terminal</p>
      </footer>
    </div>
  );
};

export default PostPage;