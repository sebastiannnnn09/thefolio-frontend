import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import API from '../api/axios'; // REMOVED: Not needed for LocalStorage
import '../styles/style.css'; 

import darkBg from '../cp.png';
import lightBg from '../cpc.png';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState(''); // This maps to 'content' in your handlePublish
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  const [isLightMode, setIsLightMode] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const bodyEl = document.body;
    if (isLightMode) {
      bodyEl.classList.add('light-mode');
      bodyEl.style.backgroundImage = `url(${lightBg})`;
    } else {
      bodyEl.classList.remove('light-mode');
      bodyEl.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url(${darkBg})`;
    }
    bodyEl.style.backgroundSize = "cover";
    bodyEl.style.backgroundPosition = "center";
    bodyEl.style.backgroundAttachment = "fixed";
  }, [isLightMode]);

  // Turn the file into a string so it can be saved in LocalStorage
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // This is the Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // --- REPLACED SUBMIT LOGIC ---
  const handlePublish = (e) => {
    e.preventDefault();
    setError('');

    try {
      // 1. Create the data package
      const newIntel = {
        id: Date.now(),
        // Check both AuthContext and LocalStorage for the username
        author: user?.username || JSON.parse(localStorage.getItem('user'))?.username,
        title: title,
        content: body, // Matching your state variable 'body'
        image: image,  // This is now the Base64 string
        date: new Date().toLocaleString()
      };

      // 2. Push to the 'gamerzone_posts' array
      const existingPosts = JSON.parse(localStorage.getItem('gamerzone_posts') || '[]');
      const updatedPosts = [newIntel, ...existingPosts];
      
      // 3. Save and Redirect
      localStorage.setItem('gamerzone_posts', JSON.stringify(updatedPosts));
      
      alert("INTEL BROADCAST SUCCESSFUL!");
      navigate('/home'); 
    } catch (err) {
      setError("UPLOADING INTEL FAILED: STORAGE_LIMIT_EXCEEDED");
    }
  };

  return (
    <div className="main-container">
      <div className="scanlines"></div>

      <header className="cyber-nav">
        <div className="logo"><span className="highlight">GAMERZONE // UPLOAD</span></div>
        <div className="switch-container">
          <span className="switch-label">MODE</span>
          <label className="switch">
            <input type="checkbox" checked={isLightMode} onChange={() => setIsLightMode(!isLightMode)} />
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
        <section className="content-box" style={{ width: '100%', maxWidth: '800px', background: 'rgba(0,0,0,0.8)', padding: '40px', border: '1px solid var(--cyber-blue)' }}>
          <div className="hazard-stripe"></div>
          <h1 className="hero-title" style={{ fontSize: '2.5rem', textAlign: 'center' }}>
            INTEL <span className="highlight">DISPATCH</span>
          </h1>
          
          {error && <p style={{ color: 'var(--cyber-pink)', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px' }}>{error}</p>}
          
          <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group">
              <label style={{ color: 'var(--cyber-blue)', fontWeight: 'bold', fontSize: '0.8rem' }}>POST_TITLE</label>
              <input 
                type="text"
                value={title} 
                onChange={e => setTitle(e.target.value)}
                placeholder="ENTER TITLE..." 
                className="cyber-input-field" // Apply your CSS class here
                style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #333', color: 'white', fontFamily: 'Rajdhani' }}
                required 
              />
            </div>

            <div className="form-group">
              <label style={{ color: 'var(--cyber-blue)', fontWeight: 'bold', fontSize: '0.8rem' }}>TRANSMISSION_CONTENT</label>
              <textarea 
                value={body} 
                onChange={e => setBody(e.target.value)}
                placeholder="WRITE YOUR INTEL HERE..." 
                rows={8} 
                style={{ width: '100%', padding: '15px', background: '#111', border: '1px solid #333', color: 'white', fontFamily: 'Rajdhani', resize: 'none' }}
                required 
              />
            </div>

            {/* Photo preview so you can see it before uploading */}
            {image && <img src={image} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', border: '1px solid var(--cyber-blue)' }} />}

            <div className="form-group" style={{ background: 'rgba(252, 238, 10, 0.1)', padding: '15px', border: '1px dashed var(--cyber-yellow)' }}>
              <label style={{ color: 'var(--cyber-yellow)', fontWeight: 'bold', display: 'block', marginBottom: '10px' }}>ADMIN_OVERRIDE: COVER IMAGE</label>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                style={{ color: 'white' }}
              />
            </div>

            <button type="submit" className="main-button" style={{ width: '100%', marginTop: '10px' }}>
              PUBLISH INTEL
            </button>
          </form>
          
          <div className="hazard-stripe" style={{ marginTop: '30px' }}></div>
        </section>
      </main>
    </div>
  );
};

export default CreatePostPage;