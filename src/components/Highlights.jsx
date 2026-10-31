import { Package, Grid3x3, Store, Phone } from 'lucide-react';

const highlights = [
  {
    icon: Package,
    title: 'নিত্যপ্রয়োজনীয় হার্ডওয়্যার সামগ্রী',
    description: 'বাড়ি নির্মাণ ও মেরামতের জন্য প্রয়োজনীয় সব ধরনের হার্ডওয়্যার পণ্য।',
  },
  {
    icon: Grid3x3,
    title: 'বিভিন্ন পণ্যের সমাহার',
    description: 'সিমেন্ট, রড, রং, পাইপ, বৈদ্যুতিক সামগ্রী সহ বিভিন্ন ক্যাটাগরির পণ্য।',
  },
  {
    icon: Store,
    title: 'আপনার কাছের পরিচিত দোকান',
    description: 'রামপুর বাজার, কালিহাতি, টাঙ্গাইল এলাকায় অবস্থিত স্থানীয় দোকান।',
  },
  {
    icon: Phone,
    title: 'সহজে যোগাযোগ ও তথ্য',
    description: 'পণ্যের দাম ও স্টক সম্পর্কে জানতে সহজেই যোগাযোগ করুন।',
  },
];

export default function Highlights() {
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
