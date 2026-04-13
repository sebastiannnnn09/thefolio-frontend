import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css'; 

// Assets
import legendaryRank from '../LEGENDARY.jpg';
import darkBg from '../cp.png';
import lightBg from '../cpc.png';

const quizData = [
  {
    question: "AN FPS MOBA GAME LIKE COUNTER STRIKE?",
    options: ["CALL OF DUTY", "MINECRAFT", "MOBILE LEGENDS", "CANDY CRUSH"],
    answer: 0
  },
  {
    question: "A PORTABLE GAMING DEVICE?",
    options: ["TELEVISION", "MOBILE PHONE", "LAPTOP", "COMPUTER"],
    answer: 1
  },
  {
    question: "USED TO LOAD AND TO PLAY THE GAME?",
    options: ["SHAREIT", "BLUETOOTH", "INTERNET", "INCOGNITO"],
    answer: 2
  },
  {
    question: "USED TO SMOOTH THE GAMING EXPERIENCE?",
    options: ["BUTTONS", "FRAME RATE", "GRAPHICS", "CONTROLLER"],
    answer: 1
  }
];

const About = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [resultMessage, setResultMessage] = useState({ text: '', color: '' });
  const [isFinished, setIsFinished] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  // Theme & Background Sync
  useEffect(() => {
    const body = document.body;
    if (isLightMode) {
      body.classList.add('light-mode');
      body.style.backgroundImage = `url(${lightBg})`;
    } else {
      body.classList.remove('light-mode');
      body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)), url(${darkBg})`;
    }
    body.style.backgroundSize = "cover";
    body.style.backgroundPosition = "center";
    body.style.backgroundAttachment = "fixed";
  }, [isLightMode]);

  useEffect(() => {
    let timer;
    if (isProcessing) {
      timer = setTimeout(() => {
        if (currentQuestionIndex < quizData.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedOptionIndex(null);
          setResultMessage({ text: '', color: '' });
          setIsProcessing(false);
        } else {
          setIsFinished(true);
        }
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [isProcessing, currentQuestionIndex]);

  const handleSelectOption = (index) => {
    if (isProcessing) return; 
    setSelectedOptionIndex(index);
  };

  const handleSubmit = () => {
    if (selectedOptionIndex === null || isProcessing) return;
    const currentData = quizData[currentQuestionIndex];
    if (selectedOptionIndex === currentData.answer) {
      setScore((prev) => prev + 1);
      setResultMessage({ text: 'ACCESS GRANTED: CORRECT', color: 'var(--cyber-blue)' });
    } else {
      setResultMessage({ 
        text: `ACCESS DENIED: ${currentData.options[currentData.answer]}`, 
        color: 'var(--cyber-pink)' 
      });
    }
    setIsProcessing(true);
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
            <li><Link to="/about" className="active">ABOUT</Link></li>
            <li><Link to="/contact">CONTACT</Link></li>
            <li><Link to="/register" className="nav-btn">REGISTER</Link></li>
          </ul>
        </nav>
      </header>

      <main className="hero" style={{ flexDirection: 'column', alignItems: 'flex-start', overflowY: 'auto', padding: '40px 60px' }}>
        
        {/* Bio Section */}
        <section className="content-box" style={{ marginBottom: '40px', maxWidth: '800px' }}>
          <div className="hazard-stripe"></div>
          <h1 className="hero-title" style={{ fontSize: '3rem' }}>PASSION FOR THE <span className="highlight">SCREEN</span></h1>
          <p className="cyber-description">
            What started as a way to pass time during my commute turned into a serious passion for competitive play. 
            Mobile gaming is often underestimated, but the skill ceiling in titles like <strong>CODM</strong> is incredibly high.
          </p>
        </section>

        {/* Evolution Section */}
        <section style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', width: '100%', marginBottom: '40px' }}>
          <div className="info-card" style={{ flex: '1', minWidth: '300px', borderLeft: '3px solid var(--cyber-yellow)' }}>
            <h3 style={{ color: 'var(--cyber-yellow)' }}>GAMING EVOLUTION</h3>
            <ul style={{ listStyle: 'none', marginTop: '15px', lineHeight: '2' }}>
              <li><span style={{ color: 'var(--cyber-blue)' }}>[2021]</span> DEPLOYED FIRST COMPETITIVE APP</li>
              <li><span style={{ color: 'var(--cyber-blue)' }}>[2022]</span> EXPLORED MOBILE ECOSYSTEM</li>
              <li><span style={{ color: 'var(--cyber-blue)' }}>[2023]</span> REACHED "LEGENDARY" RANK</li>
            </ul>
          </div>
          
          <div className="hero-gallery" style={{ flex: '1', justifyContent: 'center' }}>
            <img 
              src={legendaryRank} 
              alt="Rank achievement" 
              className="hero-image" 
              style={{ width: '100%', height: '200px', maxWidth: '400px' }} 
            />
          </div>
        </section>

        {/* Quiz Section */}
        <section className="content-box" style={{ width: '100%', maxWidth: '600px', alignSelf: 'center', background: 'rgba(0,0,0,0.6)', border: '1px solid var(--cyber-blue)', padding: '30px' }}>
          <h2 style={{ color: 'var(--cyber-blue)', letterSpacing: '3px', marginBottom: '20px' }}>GAMER TRIVIA // HUD</h2>
          
          {!isFinished ? (
            <>
              <div style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#fff', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                {quizData[currentQuestionIndex].question}
              </div>
              <div style={{ display: 'grid', gap: '10px', marginBottom: '20px' }}>
                {quizData[currentQuestionIndex].options.map((option, index) => (
                  <button 
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    style={{
                      padding: '12px',
                      background: selectedOptionIndex === index ? 'var(--cyber-blue)' : 'rgba(255,255,255,0.05)',
                      color: selectedOptionIndex === index ? 'black' : 'white',
                      border: '1px solid var(--cyber-blue)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'Rajdhani',
                      fontWeight: 'bold',
                      transition: '0.3s'
                    }}
                  >
                    {index + 1}. {option}
                  </button>
                ))}
              </div>
              <button 
                onClick={handleSubmit} 
                className="main-button" 
                disabled={selectedOptionIndex === null || isProcessing}
                style={{ width: '100%', padding: '15px' }}
              >
                SUBMIT DATA
              </button>
              <div style={{ marginTop: '15px', color: resultMessage.color, fontWeight: '900', textAlign: 'center', letterSpacing: '2px' }}>
                {resultMessage.text}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <h2 className="highlight" style={{ color: 'black' }}>MISSION COMPLETE</h2>
              <div style={{ margin: '20px 0', fontSize: '1.5rem' }}>SCORE: {score} / {quizData.length}</div>
              <button onClick={() => window.location.reload()} className="main-button">REBOOT QUIZ</button>
            </div>
          )}
        </section>
      </main>

      <footer style={{ padding: '20px 60px', borderTop: '1px solid rgba(0, 240, 255, 0.1)' }}>
        <p>&copy; 2026 Sebastian, Andro L. | College of Computer Science</p>
      </footer>
    </div>
  );
};

export default About;