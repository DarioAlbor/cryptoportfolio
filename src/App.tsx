import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PortfolioList from './components/assets/PortfolioList';
import './App.css';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const savedLang = localStorage.getItem('language');
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    if (savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-content">
          <div className="app-header-left">
            <span className="app-header-icon">💰</span>
            <h1>{t('app.title')}</h1>
          </div>
          <div className="app-header-right">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              title={theme === 'light' ? t('theme.dark') : t('theme.light')}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button 
              className="lang-toggle"
              onClick={toggleLanguage}
              title={i18n.language === 'en' ? t('language.spanish') : t('language.english')}
            >
              {i18n.language === 'en' ? '🇪🇸 ES' : '🇺🇸 EN'}
            </button>
          </div>
        </div>
      </header>
      <main className="app-main">
        <PortfolioList />
      </main>
    </div>
  );
};

export default App;
