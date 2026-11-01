/* oxlint-disable react/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext();

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('alamin_lang');
      if (saved === 'en' || saved === 'bn') return saved;
    } catch {
      // Ignore
    }
    return 'bn'; // Default to Bengali
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute('lang', lang);
      localStorage.setItem('alamin_lang', lang);
    } catch {
      // Ignore
    }
  }, [lang]);

  const toggleLang = useCallback(() => {
    setLang(prev => (prev === 'bn' ? 'en' : 'bn'));
  }, []);

  const t = useCallback((key, params = {}) => {
    let str = translations[lang]?.[key] || translations.bn[key] || key;
    if (typeof str === 'string') {
      Object.keys(params).forEach(p => {
        str = str.replace(`{${p}}`, params[p]);
      });
    }
    return str;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageContext;

