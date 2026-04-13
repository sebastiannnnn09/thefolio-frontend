import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css'; 

// Assets
import darkBg from '../cp.png';
import lightBg from '../cpc.png';

const AdminPage = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  // 1. LIVE USER LOGIC
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('gamerzone_users');
    return savedUsers ? JSON.parse(savedUsers) : [
      { id: 1, username: "Sebastian_Andro_L", email: "admin@gamerzone.com", status: "Active", role: "ROOT" }
    ];
  });

  // 2. LIVE MESSAGES LOGIC (Now pulls from storage!)
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('gamerzone_messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  // UPDATED TOGGLE HANDLER
  const toggleUserStatus = (id) => {
    const updatedUsers = users.map(user => {
      if (user.id === id) {
        return { ...user, status: user.status === "Active" ? "Deactivated" : "Active" };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    localStorage.setItem('gamerzone_users', JSON.stringify(updatedUsers));
  };

  // UPDATED MESSAGE DELETE (Removes from storage too)
  const deleteMessage = (id) => {
    const updatedMessages = messages.filter(msg => msg.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem('gamerzone_messages', JSON.stringify(updatedMessages));
  };

  // Theme Sync
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

  return (
    <div className="main-container">
      <div className="scanlines"></div>

      <header className="cyber-nav">
        <div className="logo"><span className="highlight">GAMERZONE // ROOT</span></div>
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
            <li><Link to="/login" className="nav-btn-exit">LOGOUT</Link></li>
          </ul>
        </nav>
      </header>

      <main className="hero" style={{ flexDirection: 'column', padding: '40px 60px', overflowY: 'auto' }}>
        
        {/* USER DATABASE SECTION */}
        <section className="content-box" style={{ width: '100%', marginBottom: '30px' }}>
          <div className="hazard-stripe"></div>
          <h2 style={{ color: 'var(--cyber-yellow)' }}>USER_DATABASE ({users.length} REGISTERED)</h2>
          
          <table style={{ width: '100%', marginTop: '20px', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ color: 'var(--cyber-blue)', borderBottom: '1px solid #333' }}>
                <th style={{ padding: '10px' }}>USERNAME</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} style={{ borderBottom: '1px solid #222' }}>
                  <td style={{ padding: '15px 10px' }}>
                    {user.username}
                    <div style={{ fontSize: '0.7rem', color: '#666' }}>{user.email}</div>
                  </td>
                  <td style={{ color: user.status === "Active" ? "#0f0" : "#f00" }}>{user.status}</td>
                  <td>
                    <button 
                      onClick={() => toggleUserStatus(user.id)}
                      style={{ 
                        background: user.status === "Active" ? "rgba(255,0,0,0.2)" : "rgba(0,255,0,0.2)",
                        border: `1px solid ${user.status === "Active" ? "#f00" : "#0f0"}`,
                        color: 'white', padding: '5px 10px', cursor: 'pointer', fontFamily: 'Rajdhani'
                      }}>
                      {user.status === "Active" ? "DEACTIVATE" : "RECOVER"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* MESSAGES SECTION */}
        <section className="content-box" style={{ width: '100%', background: 'rgba(0,0,0,0.8)' }}>
          <h2 style={{ color: 'var(--cyber-pink)' }}>ENCRYPTED_MESSAGES ({messages.length})</h2>
          <div style={{ marginTop: '20px' }}>
            {messages.length > 0 ? messages.map(msg => (
              <div key={msg.id} style={{ borderLeft: '3px solid var(--cyber-pink)', padding: '15px', marginBottom: '10px', background: 'rgba(255, 255, 255, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {/* Note: I used msg.from || msg.name to handle different key names */}
                  <strong style={{ color: 'var(--cyber-blue)' }}>FROM: {msg.from || msg.name}</strong>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>{msg.date}</span>
                </div>
                {/* Note: Handles msg.content or msg.message */}
                <p style={{ margin: '10px 0', fontSize: '0.9rem' }}>{msg.content || msg.message}</p>
                <button 
                  onClick={() => deleteMessage(msg.id)} 
                  className="gear-link" 
                  style={{ background: 'none', border: 'none', color: '#ff0055', cursor: 'pointer', textDecoration: 'underline' }}>
                  WIPE_DATA
                </button>
              </div>
            )) : <p>NO_NEW_SIGNALS_FOUND</p>}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;