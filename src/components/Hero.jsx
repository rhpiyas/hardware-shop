import { MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import shopConfig from '../data/shopConfig';

export default function Hero() {
  const { lang, t } = useLanguage();

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const address = lang === 'en' ? 'Rampur Bazar, Kalihati, Tangail' : shopConfig.addressShort;

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <img
          src="/images/hero-bg.jpg"
          alt={lang === 'en' ? "Alamin Hardware Shop Interior" : "আলামিন হার্ডওয়্যার দোকানের অভ্যন্তরীণ দৃশ্য"}
          loading="eager"
        />
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            ⭐ {t('heroBadge')}
          </div>
          <h1>{t('heroHeading')}</h1>
          <p className="hero-description">
            {t('heroDescription')}
          </p>
          <div className="hero-actions">
            <a href="#products" className="btn btn-primary btn-lg" onClick={(e) => scrollTo(e, '#products')}>
              {t('heroViewProducts')} <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-outline btn-lg" onClick={(e) => scrollTo(e, '#contact')}>
              {t('heroContactUs')}
            </a>
          </div>
          <div className="hero-location">
            <MapPin size={16} />
            <span>{address}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
