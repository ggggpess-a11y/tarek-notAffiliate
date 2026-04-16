import { useEffect, useState } from 'react';
import { BlogPost, fetchPostBySlug, formatBlogDate } from '../blogData';
import { applyBlogIndexDocumentSeo, applyBlogPostDocumentSeo } from '../seo/documentSeo';

type BlogPostPageProps = {
  postSlug: string;
};

export function BlogPostPage({ postSlug }: BlogPostPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchPostBySlug(postSlug)
      .then((data) => {
        if (mounted) setPost(data);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [postSlug]);

  useEffect(() => {
    if (loading) return;
    if (!post) {
      applyBlogIndexDocumentSeo();
      return;
    }
    applyBlogPostDocumentSeo(post);
  }, [post, loading]);

  if (loading) {
    return (
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center bg-surface-container rounded-3xl border border-outline-variant/20 p-10">
          <p className="text-on-surface-variant">جاري تحميل المقال...</p>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center bg-surface-container rounded-3xl border border-outline-variant/20 p-10">
          <h1 className="text-3xl font-headline font-extrabold mb-4">المقال غير موجود</h1>
          <p className="text-on-surface-variant mb-8">قد يكون تم حذف المقال أو تغيير رابطه.</p>
          <a
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-bold"
          >
            العودة إلى المدونة
          </a>
        </div>
      </section>
    );
  }

  return (
    <article className="py-16 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-primary-container hover:text-primary transition-colors mb-6 font-bold"
        >
          العودة إلى المدونة
        </a>
        <div className="overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container">
          <div className="aspect-[16/8] w-full overflow-hidden">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-6 sm:p-10">
            <div className="text-sm text-on-surface-variant flex items-center justify-between gap-3 mb-5">
              <span>{post.author}</span>
              <time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt)}</time>
            </div>
            <h1 className="text-3xl sm:text-4xl font-headline font-extrabold text-on-surface mb-4">{post.title}</h1>
            <p className="text-lg text-on-surface-variant mb-8">{post.excerpt}</p>
            <div
              className="blog-post-body text-on-surface/95 leading-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
