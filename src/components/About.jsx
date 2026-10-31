import shopConfig from '../data/shopConfig';

export default function About() {
  return (
    <section className="section section-alt" id="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>{shopConfig.name} সম্পর্কে</h2>
            <p>
              {shopConfig.name} {shopConfig.addressShort} এলাকায় অবস্থিত একটি স্থানীয় হার্ডওয়্যার দোকান।
              বাড়ি নির্মাণ, ঘর মেরামত এবং দৈনন্দিন বিভিন্ন কাজের জন্য প্রয়োজনীয় হার্ডওয়্যার সামগ্রী
              সম্পর্কে জানতে ও পণ্য খুঁজে পেতে আমাদের ওয়েবসাইটটি ব্যবহার করুন।
            </p>
            <p>
              আপনার প্রয়োজনীয় পণ্যের নাম ও বিস্তারিত দেখে নিন। কোনো পণ্যের দাম, স্টক বা অন্যান্য তথ্য
              নিশ্চিত করতে সরাসরি দোকানের সঙ্গে যোগাযোগ করুন।
            </p>
            <p>
              সিমেন্ট, রড, রং, পাইপ, বৈদ্যুতিক সরঞ্জাম, নাট-বল্টু, তালা, হাতের যন্ত্রপাতি, ড্রিল মেশিন
              এবং আরও অনেক ধরনের হার্ডওয়্যার পণ্য আমাদের দোকানে পাওয়া যায়।
            </p>
          </div>
          <div className="about-image">
            <img
              src="/images/hero-bg.jpg"
              alt="আলামিন হার্ডওয়্যার দোকান"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
