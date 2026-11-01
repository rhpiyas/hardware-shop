/**
 * আলামিন হার্ডওয়্যার — Central Shop Configuration
 * 
 * এই ফাইলে দোকানের সমস্ত গুরুত্বপূর্ণ তথ্য রাখা হয়েছে।
 * দোকানের মালিক এই ফাইল সম্পাদনা করে তথ্য আপডেট করতে পারবেন।
 */

const shopConfig = {
  // দোকানের নাম
  name: 'আলামিন হার্ডওয়্যার',
  nameEn: 'Alamin Hardware',

  // ঠিকানা
  address: 'রামপুর বাজার, কালিহাতি, টাঙ্গাইল, বাংলাদেশ',
  addressShort: 'রামপুর বাজার, কালিহাতি, টাঙ্গাইল',
  district: 'টাঙ্গাইল',
  upazila: 'কালিহাতি',
  area: 'রামপুর বাজার',

  // যোগাযোগ — প্রকৃত নম্বর পাওয়ার পর এখানে আপডেট করুন
  // ⚠️ নিচের নম্বরগুলো প্লেসহোল্ডার। আসল নম্বর দিয়ে প্রতিস্থাপন করুন।
  phone: null, // উদাহরণ: '+8801XXXXXXXXX'
  whatsapp: null, // উদাহরণ: '+8801XXXXXXXXX'
  email: null, // উদাহরণ: 'alamin.hardware@example.com'

  // খোলার সময় — দোকান থেকে নিশ্চিত করুন
  openingHours: "সকাল ৮ টা", // উদাহরণ: 'সকাল ৮:০০ — রাত ৯:০০'
  offDay: "রাত ৯ টা", // উদাহরণ: 'শুক্রবার'

  // Google Maps — সঠিক অবস্থান যাচাই করে আপডেট করুন
  // এই লিংকটি ঠিকানা ভিত্তিক সার্চ লিংক, নির্দিষ্ট পিন নয়
  mapSearchUrl: 'https://www.google.com/maps/place/%E0%A6%86%E0%A6%B2-%E0%A6%86%E0%A6%AE%E0%A6%BF%E0%A6%A8+%E0%A6%B9%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%A1%E0%A6%93%E0%A7%9F%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B0+%E0%A6%B8%E0%A7%8D%E0%A6%9F%E0%A7%8B%E0%A6%B0/@24.3092804,90.031446,19.58z/data=!4m14!1m7!3m6!1s0x37560345978d2427:0xb8bbb509eb7dfb82!2sRampur+Bazar!8m2!3d24.3090107!4d90.0313863!16s%2Fg%2F11fnwt0lyq!3m5!1s0x3756037339c58def:0x9a10c2a5c9ff25ee!8m2!3d24.3090618!4d90.0315458!16s%2Fg%2F11kqd8b3q7?entry=ttu&g_ep=EgoyMDI2MTAyOC4wIKXMDSoASAFQAw%3D%3D',
  // সঠিক embed URL পাওয়ার পর নিচেরটি আপডেট করুন
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d909.0168758882048!2d90.031446!3d24.3092804!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3756037339c58def%3A0x9a10c2a5c9ff25ee!2z4KaG4KayLeCmhuCmruCmv-CmqCDgprngpr7gprDgp43gpqHgppPgp5_gp43gpq_gpr7gprAg4Ka44KeN4Kaf4KeL4Kaw!5e0!3m2!1sen!2sbd!4v1793459525418!5m2!1sen!2sbd",

  // সামাজিক যোগাযোগ মাধ্যম
  facebook: null, // উদাহরণ: 'https://facebook.com/alaminhardware'

  // ওয়েবসাইটের মেটা তথ্য
  siteTitle: 'আলামিন হার্ডওয়্যার | রামপুর বাজার, কালিহাতি, টাঙ্গাইল',
  siteDescription: 'আলামিন হার্ডওয়্যার — সিমেন্ট, রড, রং, পাইপ, বৈদ্যুতিক সরঞ্জাম ও হার্ডওয়্যার সামগ্রী। রামপুর বাজার, কালিহাতি, টাঙ্গাইল।',
};

export default shopConfig;
