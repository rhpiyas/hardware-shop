import { Store, MapPin, Clock, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import shopConfig from '../data/shopConfig';

export default function StoreInfo() {
  const { lang, t } = useLanguage();

  const shopName = lang === 'en' ? shopConfig.nameEn : shopConfig.name;
  const address = lang === 'en' ? (shopConfig.addressShortEn || 'Rampur Bazar, Kalihati, Tangail') : shopConfig.addressShort;
  const hours = lang === 'en'
    ? '8:00 AM – 9:00 PM'
    : (shopConfig.openingHours ? `${shopConfig.openingHours} — ${shopConfig.offDay}` : t('needToConfirm'));

  return (
    <section className="section" id="store-info">
      <div className="container">
        <div className="section-header">
          <h2>{t('storeInfoTitle')}</h2>
        </div>
        <div className="store-info-grid">
          <div className="store-info-item">
            <div className="info-icon">
              <Store size={22} />
            </div>
            <div>
              <h4>{t('shopNameLabel')}</h4>
              <p>{shopName}</p>
            </div>
          </div>

          <div className="store-info-item">
            <div className="info-icon">
              <MapPin size={22} />
            </div>
            <div>
              <h4>{t('addressLabel')}</h4>
              <p>{address}</p>
            </div>
          </div>

          <div className="store-info-item">
            <div className="info-icon">
              <Clock size={22} />
            </div>
            <div>
              <h4>{t('openingHoursLabel')}</h4>
              <p>{hours}</p>
            </div>
          </div>

          <div className="store-info-item">
            <div className="info-icon">
              <Phone size={22} />
            </div>
            <div>
              <h4>{t('contactLabel')}</h4>
              <p>{shopConfig.phone || t('needToAddPhone')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
