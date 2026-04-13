import { useState, useEffect } from 'react';

export const useTheme = () => {
  // 1. Initialize state from localStorage so it remembers the choice
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('gamerzone-theme');
    // Default to true (Dark Mode) as per your preference
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  // 2. Update localStorage and the HTML body class whenever theme changes
  useEffect(() => {
    localStorage.setItem('gamerzone-theme', JSON.stringify(isDarkMode));
    
    // Applying the class to the <body> ensures the whole background changes
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return { isDarkMode, toggleTheme };
};