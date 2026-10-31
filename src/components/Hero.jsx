import { MapPin, ArrowRight } from 'lucide-react';
import shopConfig from '../data/shopConfig';

export default function Hero() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <img
          src="/images/hero-bg.jpg"
          alt="আলামিন হার্ডওয়্যার দোকানের অভ্যন্তরীণ দৃশ্য"
          loading="eager"
        />
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            ⭐ আপনার বিশ্বস্ত হার্ডওয়্যার দোকান
          </div>
          <h1>বাড়ি নির্মাণ থেকে শুরু করে প্রতিদিনের প্রয়োজনীয় সবকিছু, এক জায়গায়।</h1>
          <p className="hero-description">
            সিমেন্ট, রড, রং, পাইপ, বৈদ্যুতিক সরঞ্জাম, নাট-বল্টু এবং প্রয়োজনীয় হার্ডওয়্যার সামগ্রী কিনুন আপনার পরিচিত দোকান {shopConfig.name} থেকে।
          </p>
          <div className="hero-actions">
            <a href="#products" className="btn btn-primary btn-lg" onClick={(e) => scrollTo(e, '#products')}>
              পণ্য দেখুন <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn btn-outline btn-lg" onClick={(e) => scrollTo(e, '#contact')}>
              যোগাযোগ করুন
            </a>
          </div>
          <div className="hero-location">
            <MapPin size={16} />
            <span>{shopConfig.addressShort}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
