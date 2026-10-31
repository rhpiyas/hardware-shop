import { Store, MapPin, Clock, Phone } from 'lucide-react';
import shopConfig from '../data/shopConfig';

export default function StoreInfo() {
  return (
    <section className="section" id="store-info">
      <div className="container">
        <div className="section-header">
          <h2>দোকানের তথ্য</h2>
        </div>
        <div className="store-info-grid">
          <div className="store-info-item">
            <div className="info-icon">
              <Store size={22} />
            </div>
            <div>
              <h4>দোকানের নাম</h4>
              <p>{shopConfig.name}</p>
            </div>
          </div>

          <div className="store-info-item">
            <div className="info-icon">
              <MapPin size={22} />
            </div>
            <div>
              <h4>ঠিকানা</h4>
              <p>{shopConfig.addressShort}</p>
            </div>
          </div>

          <div className="store-info-item">
            <div className="info-icon">
              <Clock size={22} />
            </div>
            <div>
              <h4>খোলার সময়</h4>
              <p>{shopConfig.openingHours || 'দোকান থেকে নিশ্চিত করতে হবে'}</p>
            </div>
          </div>

          <div className="store-info-item">
            <div className="info-icon">
              <Phone size={22} />
            </div>
            <div>
              <h4>যোগাযোগ</h4>
              <p>{shopConfig.phone || 'ফোন নম্বর যোগ করতে হবে'}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
