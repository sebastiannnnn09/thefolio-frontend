import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css'; 

const Register = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    dob: '',
    password: '',
    confirm_password: '',
    genre: 'fps',
    terms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match!");
      return; 
    }

    console.log("Registration Data:", formData);
    alert("Account created successfully!");
  };

  return (
    <div className={isDarkMode ? 'dark-theme' : 'light-theme'}>
      <header>
        <h1>GamerZone</h1>
        <div className="switch-container">
          <span className="switch-label">MODE</span>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={isDarkMode} 
              onChange={() => setIsDarkMode(!isDarkMode)} 
            />
            <span className="slider"></span>
          </label>
        </div>
        <nav>
          <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/register" className="active">Register</Link></li>
          </ul>
        </nav>
      </header>

      <main className="container">
        <section className="form-section">
          <h2>User Registration</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullname">Full Name:</label>
              <input 
                type="text" 
                id="fullname" 
                name="fullname" 
                value={formData.fullname} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input 
                type="password" 
                id="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm_password">Confirm Password:</label>
              <input 
                type="password" 
                id="confirm_password" 
                name="confirm_password" 
                value={formData.confirm_password} 
                onChange={handleChange} 
                required 
              />
            </div>

            {/* --- GENRE RADIO BUTTONS --- */}
            <div className="form-group">
              <p>Select Your Main Genre:</p>
              
              <label htmlFor="fps">
                <input 
                  type="radio" 
                  id="fps" 
                  name="genre" 
                  value="fps" 
                  checked={formData.genre === 'fps'} 
                  onChange={handleChange}
                />
                FPS 
              </label><br />
              
              <label htmlFor="moba">
                <input 
                  type="radio" 
                  id="moba" 
                  name="genre" 
                  value="moba" 
                  checked={formData.genre === 'moba'} 
                  onChange={handleChange}
                />
                MOBA
              </label><br />
              
              <label htmlFor="br">
                <input 
                  type="radio" 
                  id="br" 
                  name="genre" 
                  value="br" 
                  checked={formData.genre === 'br'} 
                  onChange={handleChange}
                />
                Tactics
              </label>
            </div>

            {/* --- TERMS CHECKBOX --- */}
            <div className="form-group">
              <label htmlFor="terms">
                <input 
                  type="checkbox" 
                  id="terms" 
                  name="terms" 
                  checked={formData.terms}
                  onChange={handleChange}
                  required 
                />
                I agree to the Community Fair Play Rules.
              </label>
            </div>
            <button type="submit" className="submit-btn">Create Account</button>
          </form>
        </section>
      </main>
      <footer>

        <p>&copy; 2026 Sebastian, Andro | Mobile Gaming Portfolio Project</p>
      </footer>
    </div>
  );
};

export default Register;