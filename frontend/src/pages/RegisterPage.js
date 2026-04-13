import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/style.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    genre: 'fps' 
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirm_password) {
      setError("UPLOADING_FAILED: PASSWORDS_DO_NOT_MATCH");
      return;
    }

    const newUser = {
      id: Date.now(),
      username: formData.name, 
      email: formData.email,
      genre: formData.genre,
      status: "Active",
      role: "USER"
    };

    try {
      const existingUsers = JSON.parse(localStorage.getItem('gamerzone_users') || '[]');
      localStorage.setItem('gamerzone_users', JSON.stringify([...existingUsers, newUser]));
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/home');
    } catch (err) {
      setError("SYSTEM_WRITE_ERROR: DISK_FULL");
    }
  };

  return (
    <div className="main-container">
      <div className="scanlines"></div>
      
      <main className="hero" style={{ justifyContent: 'center', alignItems: 'center', padding: '40px' }}>
        {/* INCREASED WIDTH TO 800PX AND ADDED DEPTH */}
        <section className="content-box" style={{ 
          maxWidth: '800px', 
          width: '100%', 
          background: 'rgba(0,0,0,0.95)', 
          border: '2px solid var(--cyber-blue)',
          boxShadow: '0 0 20px rgba(0, 240, 255, 0.2)',
          padding: '50px' 
        }}>
          <div className="hazard-stripe"></div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
            <h1 style={{ color: 'var(--cyber-yellow)', fontSize: '2rem', margin: 0 }}>
              PILOT_<span className="highlight">REGISTRATION</span>
            </h1>
            <span style={{ color: '#444', fontSize: '0.8rem' }}>SYS_VER: 2.1.0_L</span>
          </div>
          
          {error && (
            <div style={{ background: 'rgba(255, 0, 85, 0.1)', border: '1px solid #ff0055', padding: '10px', marginBottom: '20px' }}>
              <p style={{ color: '#ff0055', fontSize: '0.8rem', textAlign: 'center', margin: 0, fontWeight: 'bold' }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
            
            {/* COLUMN 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="input-group">
                <label style={{ color: 'var(--cyber-blue)', fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>CALLSIGN (USERNAME)</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="NOMINAL_ID..." 
                  className="intel-input" 
                  style={{ width: '100%', fontSize: '1.1rem', padding: '15px' }}
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="input-group">
                <label style={{ color: 'var(--cyber-blue)', fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>COMMS_LINK (EMAIL)</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="ENCRYPTED_MAIL..." 
                  className="intel-input" 
                  style={{ width: '100%', fontSize: '1.1rem', padding: '15px' }}
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="input-group">
                <label style={{ color: 'var(--cyber-yellow)', fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>SPECIALIZATION</label>
                <select name="genre" className="intel-input" style={{ width: '100%', fontSize: '1.1rem', padding: '15px' }} onChange={handleChange}>
                  <option value="fps">FIRST_PERSON_SHOOTER</option>
                  <option value="rpg">ROLE_PLAYING_GAME</option>
                  <option value="moba">MOBA_OPERATIVE</option>
                  <option value="sports">SPORTS_SIMULATION</option>
                </select>
              </div>
            </div>

            {/* COLUMN 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div className="input-group">
                <label style={{ color: 'var(--cyber-blue)', fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>ACCESS_CRYPT_KEY</label>
                <input 
                  type="password" 
                  name="password"
                  placeholder="********" 
                  className="intel-input" 
                  style={{ width: '100%', fontSize: '1.1rem', padding: '15px' }}
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="input-group">
                <label style={{ color: 'var(--cyber-blue)', fontSize: '0.8rem', fontWeight: 'bold', display: 'block', marginBottom: '5px' }}>CONFIRM_CRYPT_KEY</label>
                <input 
                  type="password" 
                  name="confirm_password"
                  placeholder="********" 
                  className="intel-input" 
                  style={{ width: '100%', fontSize: '1.1rem', padding: '15px' }}
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div style={{ marginTop: 'auto' }}>
                <button type="submit" className="publish-button-slanted" style={{ width: '100%', height: '55px', fontSize: '1.2rem' }}>
                  INITIALIZE_PROFILE
                </button>
              </div>
            </div>
          </form>

          <div style={{ textAlign: 'center', marginTop: '40px', borderTop: '1px solid #222', paddingTop: '20px' }}>
            <p style={{ fontSize: '0.8rem', color: '#666' }}>
              DATA_SYNC_ACTIVE: <Link to="/login" className="highlight" style={{ textDecoration: 'none' }}>ENTER_TERMINAL</Link>
            </p>
          </div>
          
          <div className="hazard-stripe" style={{ marginTop: '20px' }}></div>
        </section>
      </main>
    </div>
  );
};

export default RegisterPage;