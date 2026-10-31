import { Search, Grid3x3, Info, MapPin } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'প্রয়োজনীয় পণ্য সহজে খুঁজে পাওয়ার সুবিধা',
    description: 'আমাদের ওয়েবসাইটে পণ্যের নাম লিখে সহজেই আপনার প্রয়োজনীয় হার্ডওয়্যার সামগ্রী খুঁজে নিতে পারবেন।',
  },
  {
    icon: Grid3x3,
    title: 'বিভিন্ন ক্যাটাগরিতে পণ্য দেখার সুযোগ',
    description: 'সিমেন্ট, রং, পাইপ, বৈদ্যুতিক সামগ্রী সহ বিভিন্ন ক্যাটাগরিতে পণ্য সাজানো আছে আপনার সুবিধার জন্য।',
  },
  {
    icon: Info,
    title: 'পণ্যের তথ্য সম্পর্কে সহজে জানার ব্যবস্থা',
    description: 'প্রতিটি পণ্যের বিস্তারিত তথ্য, ছবি এবং ক্যাটাগরি দেখে সিদ্ধান্ত নিতে পারবেন।',
  },
  {
    icon: MapPin,
    title: 'দোকানের ঠিকানা ও যোগাযোগের তথ্য',
    description: 'দোকানের অবস্থান, ঠিকানা এবং যোগাযোগের তথ্য সহজেই পেয়ে যাবেন আমাদের ওয়েবসাইটে।',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2>কেন আলামিন হার্ডওয়্যার?</h2>
          <p>আমাদের ওয়েবসাইটের সুবিধাসমূহ</p>
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
