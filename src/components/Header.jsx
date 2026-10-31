import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Search, ShoppingCart, MapPin, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import shopConfig from '../data/shopConfig';

const navLinks = [
  { label: 'হোম', href: '#home' },
  { label: 'পণ্যসমূহ', href: '#products' },
  { label: 'ক্যাটাগরি', href: '#categories' },
  { label: 'আমাদের সম্পর্কে', href: '#about' },
  { label: 'যোগাযোগ', href: '#contact' },
];

export default function Header({ onSearch }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, setIsOpen } = useCart();

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

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        {/* Top Bar */}
        <div className="header-top">
          <div className="container">
            <div className="header-top-left">
              <span><MapPin size={14} /> {shopConfig.addressShort}</span>
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
                <span className="brand-name">{shopConfig.name}</span>
                <span className="brand-sub">{shopConfig.area}, {shopConfig.upazila}</span>
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
                placeholder="পণ্যের নাম লিখে খুঁজুন..."
                value={searchQuery}
                onChange={handleSearch}
                aria-label="পণ্য খুঁজুন"
              />
            </div>

            {/* Actions */}
            <div className="header-actions">
              <button
                className="cart-btn"
                onClick={() => setIsOpen(true)}
                aria-label="তালিকা দেখুন"
              >
                <ShoppingCart size={22} />
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </button>

              <a
                href="#contact"
                className="contact-btn-header"
                onClick={(e) => handleNavClick(e, '#contact')}
              >
                যোগাযোগ
              </a>

              <button
                className="mobile-menu-btn"
                onClick={() => setIsMobileNavOpen(true)}
                aria-label="মেনু খুলুন"
              >
                <Menu size={24} />
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
              <span className="brand-name" style={{ fontSize: '1.125rem' }}>{shopConfig.name}</span>
            </div>
            <button onClick={() => setIsMobileNavOpen(false)} aria-label="মেনু বন্ধ করুন">
              <X size={24} />
            </button>
          </div>

          {/* Mobile Search */}
          <div className="search-bar" style={{ display: 'flex', maxWidth: 'none', marginBottom: '1.5rem' }}>
            <Search size={18} />
            <input
              type="text"
              placeholder="পণ্যের নাম লিখে খুঁজুন..."
              value={searchQuery}
              onChange={handleSearch}
              aria-label="পণ্য খুঁজুন"
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
