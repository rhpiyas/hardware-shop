import { useState } from 'react';
import { MapPin, Phone, MessageCircle, Clock, ExternalLink } from 'lucide-react';
import shopConfig from '../data/shopConfig';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // No backend configured — show explanation
    setFormSubmitted(true);
  };

  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <div className="section-header">
          <h2>যোগাযোগ করুন</h2>
          <p>পণ্যের দাম, স্টক বা অন্য কোনো তথ্যের জন্য আমাদের সঙ্গে যোগাযোগ করুন।</p>
        </div>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info-card">
            <h3>যোগাযোগের তথ্য</h3>

            <div className="contact-item">
              <div className="contact-item-icon">
                <MapPin size={20} />
              </div>
              <div className="contact-item-text">
                <h4>দোকানের ঠিকানা</h4>
                <p>{shopConfig.address}</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <Phone size={20} />
              </div>
              <div className="contact-item-text">
                <h4>ফোন নম্বর</h4>
                {shopConfig.phone ? (
                  <p><a href={`tel:${shopConfig.phone}`}>{shopConfig.phone}</a></p>
                ) : (
                  <p className="config-needed">ফোন নম্বর যোগ করতে হবে</p>
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
                  <p className="config-needed">WhatsApp নম্বর যোগ করতে হবে</p>
                )}
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <Clock size={20} />
              </div>
              <div className="contact-item-text">
                <h4>খোলার সময়</h4>
                {shopConfig.openingHours ? (
                  <p>{shopConfig.openingHours}{shopConfig.offDay && ` (বন্ধ: ${shopConfig.offDay})`}</p>
                ) : (
                  <p className="config-needed">দোকান থেকে নিশ্চিত করতে হবে</p>
                )}
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
              ম্যাপে দোকান দেখুন
              <ExternalLink size={14} />
            </a>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card">
            <h3>মেসেজ পাঠান</h3>

            {!formSubmitted ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="contact-name">আপনার নাম</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="আপনার নাম লিখুন"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-phone">ফোন নম্বর</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="০১XXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-message">আপনার বার্তা</label>
                  <textarea
                    id="contact-message"
                    placeholder="আপনি কোন পণ্য সম্পর্কে জানতে চান বা কী বিষয়ে যোগাযোগ করতে চান, তা লিখুন..."
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  বার্তা পাঠান
                </button>
                <p className="form-notice">
                  ⚠️ এই ফর্মটি বর্তমানে সরাসরি বার্তা পাঠায় না। ফর্ম ব্যাকএন্ড কনফিগার করার পর এটি কার্যকর হবে।
                  এর পরিবর্তে দোকানে সরাসরি ফোন বা WhatsApp-এ যোগাযোগ করুন।
                </p>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <p style={{ fontSize: '1.125rem', fontWeight: 600, color: '#1a2744', marginBottom: '0.5rem' }}>
                  ⚠️ ফর্ম ব্যাকএন্ড এখনো কনফিগার করা হয়নি
                </p>
                <p style={{ color: '#6b7788', marginBottom: '1rem' }}>
                  এই ফর্মটি এখনো বার্তা পাঠাতে পারে না। দয়া করে সরাসরি দোকানে যোগাযোগ করুন।
                </p>
                <button className="btn btn-secondary" onClick={() => setFormSubmitted(false)}>
                  আবার চেষ্টা করুন
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
