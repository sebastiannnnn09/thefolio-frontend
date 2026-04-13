import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import '../styles/style.css'; 

// Assets
import darkBg from '../cp.png';
import lightBg from '../cpc.png';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [pic, setPic] = useState(null);
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [msg, setMsg] = useState('');
  const [isLightMode, setIsLightMode] = useState(false);
  
  const fileInputRef = useRef(null);

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

  const handleProfile = async (e) => {
    e.preventDefault(); 
    setMsg('UPLOADING_INTEL...');
    const fd = new FormData();
    fd.append('name', name);
    fd.append('bio', bio);
    if (pic) fd.append('profilePic', pic);

    try {
      const { data } = await API.put('/auth/profile', fd);
      setUser(data);
      setMsg('PROFILE_SYNC_COMPLETE');
      setPic(null);
    } catch (err) { 
      setMsg('ERROR: SYNC_FAILED'); 
    }
  };

  const handlePassword = async (e) => {
    e.preventDefault(); 
    setMsg('ENCRYPTING_NEW_KEY...');
    try {
      await API.put('/auth/change-password', { 
        currentPassword: curPw,
        newPassword: newPw 
      });
      setMsg('SECURITY_PROTOCOL_UPDATED');
      setCurPw(''); 
      setNewPw('');
    } catch (err) { 
      setMsg('ERROR: SECURITY_UPDATE_DENIED'); 
    }
  };

  const picSrc = user?.profilePic
    ? `http://localhost:5000/uploads/${user.profilePic}`
    : '/default-avatar.png';

  return (
    <div className="main-container">
      <div className="scanlines"></div>

      <header className="cyber-nav">
        <div className="logo">
          <span className="highlight">GAMERZONE // PROFILE</span>
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
        
        <section className="content-box" style={{ width: '100%', maxWidth: '900px', background: 'rgba(0,0,0,0.85)', padding: '40px', border: '1px solid var(--cyber-blue)' }}>
          <div className="hazard-stripe"></div>
          <h1 className="hero-title" style={{ fontSize: '3rem', marginBottom: '10px' }}>PLAYER <span className="highlight">DOSSIER</span></h1>
          
          {msg && (
            <p style={{ 
              color: msg.includes('ERROR') ? 'var(--cyber-pink)' : 'var(--cyber-blue)', 
              fontWeight: 'bold', 
              textAlign: 'center', 
              letterSpacing: '2px',
              padding: '10px',
              background: 'rgba(255,255,255,0.05)',
              marginBottom: '20px'
            }}>
              {msg}
            </p>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px', marginTop: '20px' }}>
            
            {/* Sidebar / Avatar Section */}
            <aside style={{ textAlign: 'center' }}>
              <div style={{ border: '2px solid var(--cyber-blue)', padding: '5px', background: '#000', marginBottom: '20px' }}>
                <img 
                  src={pic ? URL.createObjectURL(pic) : picSrc} 
                  alt='Profile' 
                  style={{ width: '100%', height: 'auto', display: 'block' }} 
                />
              </div>
              <label className="nav-btn" style={{ display: 'block', cursor: 'pointer', textAlign: 'center' }}>
                <input 
                  type='file' 
                  accept='image/*' 
                  ref={fileInputRef}
                  onChange={e => setPic(e.target.files[0])} 
                  hidden
                />
                {pic ? "[FILE_READY]" : "[UPLOAD_AVATAR]"}
              </label>
            </aside>

            {/* Profile Info Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <form onSubmit={handleProfile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-group">
                  <label style={{ color: 'var(--cyber-blue)', fontWeight: 'bold', fontSize: '0.8rem' }}>CODENAME</label>
                  <input 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    placeholder='ENTER NAME' 
                    style={{ width: '100%', padding: '12px', background: '#111', border: '1px solid #333', color: 'white', fontFamily: 'Rajdhani' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ color: 'var(--cyber-blue)', fontWeight: 'bold', fontSize: '0.8rem' }}>PLAYER_BIO</label>
                  <textarea 
                    value={bio} 
                    onChange={e => setBio(e.target.value)}
                    placeholder='TELL YOUR STORY...' 
                    rows={4} 
                    style={{ width: '100%', padding: '12px', background: '#111', border: '1px solid #333', color: 'white', fontFamily: 'Rajdhani', resize: 'none' }}
                  />
                </div>
                <button type='submit' className="main-button" style={{ padding: '15px' }}>SAVE_PROFILE_DATA</button>
              </form>

              <div className="hazard-stripe" style={{ height: '2px', opacity: 0.3 }}></div>

              {/* Security Section */}
              <form onSubmit={handlePassword} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ color: 'var(--cyber-yellow)', fontSize: '0.9rem', letterSpacing: '2px' }}>SECURITY_PROTOCOLS</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label style={{ color: 'var(--cyber-blue)', fontSize: '0.7rem' }}>CURRENT_KEY</label>
                    <input 
                      type='password' 
                      placeholder='••••••••'
                      value={curPw} 
                      onChange={e => setCurPw(e.target.value)} 
                      style={{ width: '100%', padding: '12px', background: '#111', border: '1px solid #333', color: 'white', fontFamily: 'Rajdhani' }}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ color: 'var(--cyber-blue)', fontSize: '0.7rem' }}>NEW_ENCRYPTION</label>
                    <input 
                      type='password' 
                      placeholder='6+ CHARS'
                      value={newPw} 
                      onChange={e => setNewPw(e.target.value)} 
                      style={{ width: '100%', padding: '12px', background: '#111', border: '1px solid #333', color: 'white', fontFamily: 'Rajdhani' }}
                      required 
                      minLength={6} 
                    />
                  </div>
                </div>
                <button type='submit' className="main-button" style={{ padding: '15px', background: 'var(--cyber-blue)', boxShadow: '0 0 15px rgba(0, 240, 255, 0.4)' }}>
                  UPDATE_ACCESS_KEY
                </button>
              </form>
            </div>
          </div>
          
          <div className="hazard-stripe" style={{ marginTop: '40px' }}></div>
        </section>
      </main>

      <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid rgba(0, 240, 255, 0.1)' }}>
        <p>&copy; 2026 Sebastian, Andro L. | Player Identity Management System</p>
      </footer>
    </div>
  );
};

export default ProfilePage;