import React, { useState } from 'react';
import Feed from '../components/Feed';
import API from '../api/axios';
import '../styles/style.css';

const Home = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!text.trim() && !file) return;

    setIsPosting(true);
    const fd = new FormData();
    fd.append('text', text);
    if (file) fd.append('postImage', file);

    try {
      await API.post('/posts', fd);
      setText('');
      setFile(null);
      setRefresh(prev => prev + 1); // This re-renders the Feed component
    } catch (err) {
      console.error("Post failed:", err);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <main className="container dashboard-view">
      <div className="home-layout">
        <header className="home-header">
          <h2 className="glow-text main-title">GAMER FEED</h2>
          <p className="subtitle">Connect with your squad and share your latest wins.</p>
        </header>

        {/* --- CREATE POST SECTION --- */}
        <section className="create-post-card shadow-glow">
          <form onSubmit={handlePost}>
            <div className="post-input-wrapper">
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What's happening in the zone?"
                rows="3"
                className="post-textarea"
              />
            </div>
            
            <div className="post-footer">
              <div className="post-options">
                <label className="attach-btn">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])} 
                    hidden 
                  />
                  <span className="icon">🖼️</span> 
                  {file ? <span className="file-name">{file.name.substring(0, 10)}...</span> : "Add Image"}
                </label>
              </div>

              <button 
                type="submit" 
                className={`post-submit-btn ${isPosting ? 'loading' : ''}`}
                disabled={isPosting}
              >
                {isPosting ? 'POSTING...' : 'POST'}
              </button>
            </div>
          </form>
        </section>

        {/* --- DYNAMIC FEED SECTION --- */}
        <Feed key={refresh} />
      </div>
    </main>
  );
};

export default Home;