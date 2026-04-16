const { connectDb } = require('./db');
const { Post } = require('./models/Post');

const POSTS = [
  {
    slug: 'affiliate-start-guide',
    title: 'دليل البداية في التسويق بالعمولة: من الصفر لأول تحويل',
    excerpt: 'خطوات عملية لتأسيس قناة تسويق قوية واختيار العروض المناسبة وتحقيق أول تحويلات بسرعة.',
    content:
      'ابدأ بتحديد مصدر زيارات واحد تتقنه، ثم صمّم صفحة هبوط واضحة بعنوان قوي ونداء إجراء مباشر. ركّز على اختبار العناوين والصور وزر الدعوة للتسجيل. بعد ذلك راقب بيانات النقر والتحويل يوميًا، وحسّن العناصر الأضعف تدريجيًا. النجاح في التسويق بالعمولة يعتمد على التجربة المستمرة والتحسين المبني على البيانات.',
    author: 'فريق MELBET',
    imageUrl: '/assets/images/hero-sports-banner.jpg',
    published: true,
  },
  {
    slug: 'boost-conversion-rate',
    title: '5 طرق فعّالة لرفع معدل التحويل في صفحات الشركاء',
    excerpt: 'تحسينات سريعة على النصوص، الثقة، وتجربة الجوال تؤثر مباشرة على نتائج الحملات.',
    content:
      'استخدم عنوانًا واضحًا يشرح الفائدة خلال ثوانٍ، وأضف عناصر ثقة مثل الشهادات والنتائج الواقعية. اجعل النموذج مختصرًا وسهلًا، خصوصًا على الجوال. حسّن سرعة الصفحة وتقليل المشتتات البصرية. أخيرًا، أنشئ نسختين A/B لكل صفحة وقارن النتائج أسبوعيًا لتثبيت النسخة الأعلى أداءً.',
    author: 'قسم النمو',
    imageUrl: '/assets/images/partner-growth-dashboard.webp',
    published: true,
  },
  {
    slug: 'sports-casino-content-plan',
    title: 'خطة محتوى شهرية لعروض الرياضة والكازينو',
    excerpt: 'جدول بسيط يساعدك على نشر محتوى منتظم يزيد الزيارات المؤهلة ويحسن جودة العملاء.',
    content:
      'قسّم الشهر إلى 4 أسابيع: أسبوع توعوي، أسبوع مقارنات، أسبوع عروض، وأسبوع قصص نجاح. لكل أسبوع حدّد نوع المحتوى (مقال، فيديو قصير، بوست اجتماعي) وهدفًا واضحًا (نقر، تسجيل، إيداع). اربط كل قطعة محتوى برابط تتبع مختلف لتعرف المصدر الأفضل، ثم ركّز ميزانيتك على القنوات الأكثر ربحية.',
    author: 'فريق المحتوى',
    imageUrl: '/assets/images/product-slots.webp',
    published: true,
  },
];

async function seedPosts() {
  await connectDb();

  let created = 0;
  let updated = 0;

  for (const post of POSTS) {
    const existing = await Post.findOne({ slug: post.slug });
    if (existing) {
      existing.title = post.title;
      existing.excerpt = post.excerpt;
      existing.content = post.content;
      existing.author = post.author;
      existing.imageUrl = post.imageUrl;
      existing.published = post.published;
      await existing.save();
      updated += 1;
    } else {
      await Post.create(post);
      created += 1;
    }
  }

  console.log(`Posts seeding complete. created=${created}, updated=${updated}`);
  process.exit(0);
}

seedPosts().catch((err) => {
  console.error(err);
  process.exit(1);
});
