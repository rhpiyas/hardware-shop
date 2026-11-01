import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { lang, t } = useLanguage();

  return (
    <section className="section section-alt" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>{t('aboutTitle')}</h2>
            <p>{t('aboutP1')}</p>
            <p>{t('aboutP2')}</p>
            <p>{t('aboutP3')}</p>
          </div>
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=400&fit=crop"
              alt={lang === 'en' ? "Alamin Hardware Store" : "আলামিন হার্ডওয়্যার দোকান"}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
