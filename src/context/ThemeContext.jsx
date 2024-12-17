import React, { createContext, useState } from 'react';
import { Theme as DaisyTheme } from 'react-daisyui';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const themes = ['#92dce7', 'dark' ]; 
  const [theme, setTheme] = useState('#92dce7'); 

  const toggleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <DaisyTheme dataTheme={theme}> 
        <div className="min-h-screen">{children}</div>
      </DaisyTheme>
      {/* Add a button for demonstration */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={toggleTheme}
          className="btn btn-primary"
        >
          Toggle Theme ({theme})
        </button>
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
