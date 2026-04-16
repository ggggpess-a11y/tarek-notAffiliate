import { formatBlogDate, useBlogPosts } from '../blogData';
import { BlogLink } from './BlogLink';

export function BlogSection() {
  const { sortedPosts, loading, error } = useBlogPosts();

  return (
    <section id="blog" className="py-24 px-6 lg:px-12 bg-surface-container-lowest scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs tracking-[0.2em] text-primary-container font-bold mb-3">المدونة</p>
            <h2 className="text-4xl sm:text-5xl font-headline font-extrabold tracking-tight mb-4">آخر المقالات</h2>
            <p className="text-on-surface-variant max-w-2xl">
              محتوى تسويقي عملي للشركاء: أفكار جذب الزيارات، تحسين التحويل، واستراتيجيات زيادة الأرباح.
            </p>
          </div>
        </div>

        {loading ? <p className="text-on-surface-variant">جاري تحميل المقالات...</p> : null}
        {error ? <p className="text-red-300">{error}</p> : null}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPosts.map((post) => (
            <article
              key={post.id}
              className="bg-surface-container rounded-3xl overflow-hidden border border-outline-variant/20 h-full flex flex-col hover:border-primary-container/40 transition-colors"
            >
              <BlogLink href={`/blog/${encodeURIComponent(post.slug)}`} className="flex flex-col h-full">
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-6 flex flex-col gap-4 grow">
                  <div className="text-xs text-on-surface-variant flex items-center justify-between gap-3">
                    <span>{post.author}</span>
                    <time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt)}</time>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-on-surface">{post.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{post.excerpt}</p>
                  <span className="text-primary-container font-bold mt-auto">اقرأ المقال</span>
                </div>
              </BlogLink>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
