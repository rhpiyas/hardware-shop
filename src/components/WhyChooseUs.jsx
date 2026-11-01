import { Search, Grid3x3, Info, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const features = [
    {
      icon: Search,
      title: t('why1Title'),
      description: t('why1Desc'),
    },
    {
      icon: Grid3x3,
      title: t('why2Title'),
      description: t('why2Desc'),
    },
    {
      icon: Info,
      title: t('why3Title'),
      description: t('why3Desc'),
    },
    {
      icon: MapPin,
      title: t('why4Title'),
      description: t('why4Desc'),
    },
  ];

  return (
    <section className="section" id="why-choose-us">
      <div className="container">
        <div className="section-header">
          <h2>{t('whyTitle')}</h2>
          <p>{t('whySubtitle')}</p>
        </div>
        <div className="features-grid">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div className="feature-card" key={i}>
                <div className="feature-icon">
                  <Icon size={24} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
