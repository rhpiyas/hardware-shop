import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Search, ClipboardList, MapPin, Phone, Sun, Moon, Languages } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import shopConfig from '../data/shopConfig';

export default function Header({ onSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, setIsOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();

  const navLinks = [
    { label: t('home'), href: '#home' },
    { label: t('products'), href: '#products' },
    { label: t('categories'), href: '#categories' },
    { label: t('about'), href: '#about' },
    { label: t('contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  }, [onSearch]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setIsMobileNavOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const brandName = lang === 'en' ? shopConfig.nameEn : shopConfig.name;
  const addressShort = lang === 'en' ? (shopConfig.addressShortEn || 'Rampur Bazar, Kalihati') : shopConfig.addressShort;
  const itemsCountFormatted = totalItems.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US');

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        {/* Top Bar */}
        <div className="header-top">
          <div className="container">
            <div className="header-top-left">
              <span><MapPin size={14} /> {addressShort}</span>
              {shopConfig.phone && (
                <span><Phone size={14} /> {shopConfig.phone}</span>
              )}
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="header-main">
          <div className="container">
            <a href="#home" className="logo" onClick={(e) => handleNavClick(e, '#home')}>
              <div className="logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M5 21V7l7-4 7 4v14" />
                  <path d="M9 21v-6h6v6" />
                </svg>
              </div>
              <div className="logo-text">
                <span className="brand-name">{brandName}</span>
                <span className="brand-sub">{lang === 'en' ? 'Kalihati, Tangail' : `${shopConfig.area}, ${shopConfig.upazila}`}</span>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="nav-desktop">
              {navLinks.map(link => (
                <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Search */}
            <div className="search-bar">
              <Search size={18} />
              <input
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchQuery}
                onChange={handleSearch}
                aria-label={t('searchPlaceholder')}
              />
            </div>

            {/* Actions */}
            <div className="header-actions">
              {/* Language Toggle */}
              <button
                type="button"
                className="lang-toggle-btn"
                onClick={toggleLang}
                aria-label={lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
                title={lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
              >
                <Languages size={16} />
                <span className="lang-text">{lang === 'bn' ? 'EN' : 'বাং'}</span>
              </button>

              {/* Theme Toggle */}
              <button
                type="button"
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
                title={theme === 'dark' ? t('lightMode') : t('darkMode')}
              >
                {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
              </button>

              {/* List / Inquiry Toggle */}
              <button
                type="button"
                className="cart-btn"
                onClick={() => setIsOpen(true)}
                aria-label={t('cartTitle')}
                title={t('cartTitle')}
              >
                <ClipboardList size={19} />
                {totalItems > 0 && <span className="cart-badge">{itemsCountFormatted}</span>}
              </button>

              <a
                href="#contact"
                className="contact-btn-header"
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                {t('contact')}
              </a>

              <button
                type="button"
                className="mobile-menu-btn"
                onClick={() => setIsMobileNavOpen(true)}
                aria-label={t('openMenu')}
                title={t('openMenu')}
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${isMobileNavOpen ? 'open' : ''}`} onClick={() => setIsMobileNavOpen(false)}>
        <div className="mobile-nav-content" onClick={e => e.stopPropagation()}>
          <div className="mobile-nav-header">
            <div className="logo-text">
              <span className="brand-name" style={{ fontSize: '1.125rem' }}>{brandName}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                className="lang-toggle-btn"
                onClick={toggleLang}
                aria-label={lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
                title={lang === 'bn' ? 'Switch to English' : 'বাংলায় দেখুন'}
              >
                <Languages size={15} />
                <span className="lang-text">{lang === 'bn' ? 'EN' : 'বাং'}</span>
              </button>
              <button
                type="button"
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
                title={theme === 'dark' ? t('lightMode') : t('darkMode')}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                type="button"
                className="cart-btn"
                onClick={() => { setIsMobileNavOpen(false); setIsOpen(true); }}
                aria-label={t('cartTitle')}
                title={t('cartTitle')}
              >
                <ClipboardList size={18} />
                {totalItems > 0 && <span className="cart-badge">{itemsCountFormatted}</span>}
              </button>
              <button
                type="button"
                className="mobile-close-btn"
                onClick={() => setIsMobileNavOpen(false)}
                aria-label={t('closeMenu')}
                title={t('closeMenu')}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="search-bar" style={{ display: 'flex', maxWidth: 'none', marginBottom: '1.5rem' }}>
            <Search size={18} />
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={handleSearch}
              aria-label={t('searchPlaceholder')}
            />
          </div>

          <nav className="mobile-nav-links">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={(e) => handleNavClick(e, link.href)}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
