import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import API from '../api/axios';
import '../styles/style.css'; 

// Assets
import darkBg from '../cp.png';
import lightBg from '../cpc.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data } = await API.post('/auth/login', { email, password });
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setUser(data.user); 
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'ACCESS DENIED: INVALID CREDENTIALS');
    } finally {
      setIsLoading(false);
    }
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
            <li><Link to="/register" className="nav-btn">REGISTER</Link></li>
          </ul>
        </nav>
      </header>

      <main className="hero" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <section className="content-box" style={{ width: '100%', maxWidth: '500px', background: 'rgba(0,0,0,0.85)', padding: '40px', border: '1px solid var(--cyber-blue)' }}>
          <div className="hazard-stripe"></div>
          
          <h2 className="hero-title" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '10px' }}>
            USER <span className="highlight">LOGIN</span>
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--cyber-blue)', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '30px' }}>
            SECURE_TERMINAL_v4.0
          </p>
          
          {error && (
            <p style={{ color: 'var(--cyber-pink)', background: 'rgba(227, 50, 91, 0.1)', padding: '10px', border: '1px solid var(--cyber-pink)', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', fontSize: '0.9rem' }}>
              {error}
            </p>
          )}
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group">
              <label style={{ color: 'var(--cyber-blue)', fontWeight: 'bold', fontSize: '0.8rem', display: 'block', marginBottom: '8px' }}>EMAIL_IDENTITY</label>
              <input 
                type="email" 
                placeholder="ENTER EMAIL..."
                style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #333', color: 'white', fontFamily: 'Rajdhani', fontSize: '1.1rem' }}
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label style={{ color: 'var(--cyber-blue)', fontWeight: 'bold', fontSize: '0.8rem', display: 'block', marginBottom: '8px' }}>PASSWORD_KEY</label>
              <input 
                type="password" 
                placeholder="••••••••"
                style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #333', color: 'white', fontFamily: 'Rajdhani', fontSize: '1.1rem' }}
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>

            <button type="submit" className="main-button" style={{ width: '100%', marginTop: '10px' }} disabled={isLoading}>
              {isLoading ? 'VERIFYING...' : 'INITIATE SESSION'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '0.9rem' }}>
            NEW TO THE ZONE? <Link to='/register' style={{ color: 'var(--cyber-yellow)', fontWeight: 'bold', textDecoration: 'none' }}>CREATE ACCOUNT</Link>
          </p>
          
          <div className="hazard-stripe" style={{ marginTop: '30px' }}></div>
        </section>
      </main>

      <footer style={{ textAlign: 'center', padding: '20px', borderTop: '1px solid rgba(0, 240, 255, 0.1)' }}>
        <p>&copy; 2026 Sebastian, Andro L. | Authorized Access Only</p>
      </footer>
    </div>
  );
};

export default LoginPage;