import { MapPin, Phone, ExternalLink } from 'lucide-react';
import shopConfig from '../data/shopConfig';
import { categories } from '../data/products';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <a href="#home" className="logo" onClick={(e) => scrollTo(e, '#home')}>
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
            <p>
              বাড়ি নির্মাণ ও মেরামতের জন্য প্রয়োজনীয় হার্ডওয়্যার সামগ্রী।
              সিমেন্ট, রড, রং, পাইপ, বৈদ্যুতিক সরঞ্জাম এবং আরও অনেক কিছু।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4>দ্রুত লিংক</h4>
            <div className="footer-links">
              <a href="#home" onClick={(e) => scrollTo(e, '#home')}>হোম</a>
              <a href="#products" onClick={(e) => scrollTo(e, '#products')}>পণ্যসমূহ</a>
              <a href="#categories" onClick={(e) => scrollTo(e, '#categories')}>ক্যাটাগরি</a>
              <a href="#about" onClick={(e) => scrollTo(e, '#about')}>আমাদের সম্পর্কে</a>
              <a href="#contact" onClick={(e) => scrollTo(e, '#contact')}>যোগাযোগ</a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4>পণ্যের ক্যাটাগরি</h4>
            <div className="footer-links">
              {categories.slice(0, 6).map(cat => (
                <a href="#categories" key={cat.id} onClick={(e) => scrollTo(e, '#categories')}>
                  {cat.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4>যোগাযোগ</h4>
            <div className="footer-contact-item">
              <MapPin size={16} />
              <span>{shopConfig.address}</span>
            </div>
            {shopConfig.phone && (
              <div className="footer-contact-item">
                <Phone size={16} />
                <a href={`tel:${shopConfig.phone}`}>{shopConfig.phone}</a>
              </div>
            )}
            <a
              href={shopConfig.mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--orange-400)',
                fontSize: '0.875rem',
                marginTop: '0.5rem',
              }}
            >
              <ExternalLink size={14} />
              ম্যাপে দোকান দেখুন
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {currentYear} {shopConfig.name}। সর্বস্বত্ব সংরক্ষিত।</span>
          <span>যত্নের সাথে তৈরি 🇧🇩</span>
        </div>
      </div>
    </footer>
  );
}
