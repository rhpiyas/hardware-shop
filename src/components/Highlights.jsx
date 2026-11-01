import { Package, Grid3x3, Store, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Highlights() {
  const { t } = useLanguage();

  const highlights = [
    {
      icon: Package,
      title: t('highlight1Title'),
      description: t('highlight1Desc'),
    },
    {
      icon: Grid3x3,
      title: t('highlight2Title'),
      description: t('highlight2Desc'),
    },
    {
      icon: Store,
      title: t('highlight3Title'),
      description: t('highlight3Desc'),
    },
    {
      icon: Phone,
      title: t('highlight4Title'),
      description: t('highlight4Desc'),
    },
  ];

  return (
    <section className="highlights">
      <div className="container">
        {highlights.map((item, i) => {
          const Icon = item.icon;
          return (
            <div className="highlight-card" key={i}>
              <div className="highlight-icon">
                <Icon size={28} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
