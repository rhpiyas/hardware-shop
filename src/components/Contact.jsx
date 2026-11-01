import { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import shopConfig from '../data/shopConfig';

export default function Contact() {
  const { lang, t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const address = lang === 'en' ? (shopConfig.addressFullEn || 'Rampur Bazar, Kalihati, Tangail, Bangladesh') : shopConfig.address;
  const hours = lang === 'en'
    ? '8:00 AM – 9:00 PM'
    : (shopConfig.openingHours ? `${shopConfig.openingHours} — ${shopConfig.offDay}` : t('needToConfirm'));

  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <div className="section-header">
          <h2>{t('contactTitle')}</h2>
          <p>{t('contactSubtitle')}</p>
        </div>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info-card">
            <h3>{t('contactInfoTitle')}</h3>

            <div className="contact-item">
              <div className="contact-item-icon">
                <MapPin size={20} />
              </div>
              <div className="contact-item-text">
                <h4>{t('shopAddress')}</h4>
                <p>{address}</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <Phone size={20} />
              </div>
              <div className="contact-item-text">
                <h4>{t('phoneNumber')}</h4>
                {shopConfig.phone ? (
                  <p><a href={`tel:${shopConfig.phone}`}>{shopConfig.phone}</a></p>
                ) : (
                  <p className="config-needed">{t('needToAddPhone')}</p>
                )}
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <MessageCircle size={20} />
              </div>
              <div className="contact-item-text">
                <h4>WhatsApp</h4>
                {shopConfig.whatsapp ? (
                  <p>
                    <a href={`https://wa.me/${shopConfig.whatsapp.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                      {shopConfig.whatsapp}
                    </a>
                  </p>
                ) : (
                  <p className="config-needed">{lang === 'en' ? 'WhatsApp number to be added' : 'WhatsApp নম্বর যোগ করতে হবে'}</p>
                )}
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <Clock size={20} />
              </div>
              <div className="contact-item-text">
                <h4>{t('openingHoursLabel')}</h4>
                <p>{hours}</p>
              </div>
            </div>

            <a
              href={shopConfig.mapSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ marginTop: '1rem', width: '100%' }}
            >
              <MapPin size={18} />
              {t('viewOnMap')}
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card">
            <h3>{t('sendMessage')}</h3>

            {!formSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name">{t('yourName')}</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder={t('namePlaceholder')}
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-phone">{t('phoneNumber')}</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder={t('phonePlaceholder')}
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">{t('yourMessage')}</label>
                  <textarea
                    id="contact-message"
                    placeholder={t('messagePlaceholder')}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  {t('sendBtn')}
                </button>
                <p className="form-notice">
                  {t('formNotice')}
                </p>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <p style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--navy-800)', marginBottom: '0.5rem' }}>
                  {t('formNotConfigured')}
                </p>
                <p style={{ color: 'var(--gray-500)', marginBottom: '1rem' }}>
                  {t('formNotConfiguredDesc')}
                </p>
                <button type="button" className="btn btn-secondary" onClick={() => setFormSubmitted(false)}>
                  {t('tryAgain')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
