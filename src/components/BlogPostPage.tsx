import { useEffect, useState } from 'react';
import { BlogPost, fetchPostBySlug, formatBlogDate } from '../blogData';
import { applyBlogNotFoundDocumentSeo, applyBlogPostDocumentSeo } from '../seo/documentSeo';
import { SpaLink } from './SpaLink';

type BlogPostPageProps = {
  postSlug: string;
};

type LoadState =
  | { status: 'loading' }
  | { status: 'ok'; post: BlogPost }
  | { status: 'not_found' }
  | { status: 'error'; message: string };

export function BlogPostPage({ postSlug }: BlogPostPageProps) {
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let mounted = true;
    setState({ status: 'loading' });
    fetchPostBySlug(postSlug).then((result) => {
      if (!mounted) return;
      if (result.status === 'ok') setState({ status: 'ok', post: result.post });
      else if (result.status === 'not_found') setState({ status: 'not_found' });
      else setState({ status: 'error', message: result.message });
    });

    return () => {
      mounted = false;
    };
  }, [postSlug]);

  useEffect(() => {
    if (state.status === 'loading') return;
    if (state.status === 'ok') {
      applyBlogPostDocumentSeo(state.post);
      return;
    }
    /** فقط 404 الحقيقي يحصل على noindex — أخطاء الشبكة/الـ API لا تغيّر robots إلى noindex */
    if (state.status === 'not_found') {
      applyBlogNotFoundDocumentSeo();
    }
  }, [state]);

  if (state.status === 'loading') {
    return (
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center bg-surface-container rounded-3xl border border-outline-variant/20 p-10">
          <p className="text-on-surface-variant">جاري فتح المقال...</p>
        </div>
      </section>
    );
  }

  if (state.status === 'error') {
    return (
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center bg-surface-container rounded-3xl border border-outline-variant/20 p-10">
          <h1 className="text-3xl font-headline font-extrabold mb-4">تعذّر تحميل المقال</h1>
          <p className="text-on-surface-variant mb-8">{state.message}</p>
          <SpaLink
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-bold"
          >
            العودة إلى المدونة
          </SpaLink>
        </div>
      </section>
    );
  }

  if (state.status === 'not_found') {
    return (
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center bg-surface-container rounded-3xl border border-outline-variant/20 p-10">
          <h1 className="text-3xl font-headline font-extrabold mb-4">المقال غير موجود</h1>
          <p className="text-on-surface-variant mb-8">قد يكون تم حذف المقال أو تغيير رابطه.</p>
          <SpaLink
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary-container text-on-primary-container font-bold"
          >
            العودة إلى المدونة
          </SpaLink>
        </div>
      </section>
    );
  }

  const post = state.post;

  return (
    <article className="py-16 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <SpaLink
          href="/blog"
          className="inline-flex items-center gap-2 text-primary-container hover:text-primary transition-colors mb-6 font-bold"
        >
          العودة إلى المدونة
        </SpaLink>
        <div className="overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container">
          <div className="aspect-[16/8] w-full overflow-hidden">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0 p-6 sm:p-10">
            <div className="text-sm text-on-surface-variant flex items-center justify-between gap-3 mb-5">
              <span>{post.author}</span>
              <time dateTime={post.updatedAt}>{formatBlogDate(post.updatedAt)}</time>
            </div>
            <h1 className="text-3xl sm:text-4xl font-headline font-extrabold tracking-tight mb-6 text-on-surface">
              {post.title}
            </h1>
            <div
              className="prose prose-invert max-w-none text-on-surface-variant leading-relaxed blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>
    </article>
  );
}
