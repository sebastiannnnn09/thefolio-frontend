import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import '../styles/style.css'; 

// Assets
import darkBg from '../cp.png';
import lightBg from '../cpc.png';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const [isLightMode, setIsLightMode] = useState(false);

  // Theme & Background Sync
  useEffect(() => {
    const bodyEl = document.body;
    if (isLightMode) {
      bodyEl.classList.add('light-mode');
      bodyEl.style.backgroundImage = `url(${lightBg})`;
    } else {
      bodyEl.classList.remove('light-mode');
      bodyEl.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.95)), url(${darkBg})`;
    }
    bodyEl.style.backgroundSize = "cover";
    bodyEl.style.backgroundPosition = "center";
    bodyEl.style.backgroundAttachment = "fixed";
  }, [isLightMode]);

  // Fetch Transmission Data
  useEffect(() => {
    API.get(`/posts/${id}`)
      .then(res => {
        setTitle(res.data.title);
        setBody(res.data.body);
      })
      .catch(err => console.error("CALIBRATION_ERROR:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/posts/${id}`, { title, body });
      alert("TRANSMISSION UPDATED!");
      navigate(`/posts/${id}`);
    } catch (err) {
      console.error("UPDATE_FAILED:", err);
      alert("CRITICAL ERROR: UPDATE FAILED.");
    }
  };

  if (loading) return (
    <div className="main-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <h1 className="glitch-title" style={{ fontSize: '2rem' }}>RETRIEVING_DATA...</h1>
    </div>
  );

  return (
    <div className="main-container">
      <div className="scanlines"></div>

      <header className="cyber-nav">
        <div className="logo">
          <span className="highlight">GAMERZONE // EDIT</span>
        </div>
        
        <div className="switch-container">
          <span className="switch-label">CALIBRATE</span>
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

      <main className="hero" style={{ justifyContent: 'center' }}>
        <section className="content-box" style={{ width: '100%', maxWidth: '800px', background: 'rgba(0,0,0,0.85)', padding: '40px', border: '1px solid var(--cyber-yellow)' }}>
          <div className="hazard-stripe"></div>
          <h1 className="hero-title" style={{ fontSize: '2.5rem', textAlign: 'center' }}>
            SYSTEM <span className="highlight">CALIBRATION</span>
          </h1>
          <p style={{ textAlign: 'center', color: 'var(--cyber-yellow)', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px' }}>
            MODIFYING_TRANSMISSION_ID: {id.toUpperCase()}
          </p>

          <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
            <div className="form-group">
              <label style={{ color: 'var(--cyber-blue)', fontWeight: 'bold', fontSize: '0.8rem' }}>INTEL_TITLE</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #333', color: 'white', fontFamily: 'Rajdhani', fontSize: '1.2rem' }}
                required 
              />
            </div>

            <div className="form-group">
              <label style={{ color: 'var(--cyber-blue)', fontWeight: 'bold', fontSize: '0.8rem' }}>DATA_STREAM</label>
              <textarea 
                value={body} 
                onChange={(e) => setBody(e.target.value)} 
                rows="8"
                style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #333', color: 'white', fontFamily: 'Rajdhani', fontSize: '1.1rem', resize: 'none' }}
                required 
              />
            </div>

            <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
              <button type="submit" className="main-button" style={{ flex: 2 }}>
                APPLY CHANGES
              </button>
              <button 
                type="button" 
                onClick={() => navigate(-1)} 
                className="main-button" 
                style={{ flex: 1, background: '#333', boxShadow: 'none' }}
              >
                CANCEL
              </button>
            </div>
          </form>
          
          <div className="hazard-stripe" style={{ marginTop: '30px' }}></div>
        </section>
      </main>

      <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid rgba(0, 240, 255, 0.1)' }}>
        <p>&copy; 2026 Sebastian, Andro L. | Terminal v2.1.0-EDIT</p>
      </footer>
    </div>
  );
};

export default EditPostPage;