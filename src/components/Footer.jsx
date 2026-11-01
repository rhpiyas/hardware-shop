import { MapPin, Phone, ExternalLink } from 'lucide-react';
import shopConfig from '../data/shopConfig';
import { categories } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const { lang, t } = useLanguage();
  const currentYear = lang === 'bn' ? CURRENT_YEAR.toLocaleString('bn-BD').replace(/,/g, '') : CURRENT_YEAR;

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
                <span className="brand-name">{lang === 'en' ? shopConfig.nameEn : shopConfig.name}</span>
                <span className="brand-sub">
                  {lang === 'en'
                    ? `${shopConfig.areaEn}, ${shopConfig.upazilaEn}`
                    : `${shopConfig.area}, ${shopConfig.upazila}`}
                </span>
              </div>
            </a>
            <p>{t('footerDesc')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4>{t('quickLinks')}</h4>
            <div className="footer-links">
              <a href="#home" onClick={(e) => scrollTo(e, '#home')}>{t('home')}</a>
              <a href="#products" onClick={(e) => scrollTo(e, '#products')}>{t('products')}</a>
              <a href="#categories" onClick={(e) => scrollTo(e, '#categories')}>{t('categories')}</a>
              <a href="#about" onClick={(e) => scrollTo(e, '#about')}>{t('about')}</a>
              <a href="#contact" onClick={(e) => scrollTo(e, '#contact')}>{t('contact')}</a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4>{t('productCategories')}</h4>
            <div className="footer-links">
              {categories.slice(0, 6).map(cat => (
                <a href="#categories" key={cat.id} onClick={(e) => scrollTo(e, '#categories')}>
                  {cat[lang === 'en' ? 'nameEn' : 'name']}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4>{t('contact')}</h4>
            <div className="footer-contact-item">
              <MapPin size={16} />
              <span>{lang === 'en' ? shopConfig.addressEn : shopConfig.address}</span>
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
              {t('viewOnMap')}
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>{t('copyright', { year: currentYear })}</span>
          <span>{t('craftedWithCare')}</span>
        </div>
      </div>
    </footer>
  );
}
