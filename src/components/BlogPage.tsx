import { useEffect } from 'react';
import { BlogSection } from './BlogSection';
import { BlogPostPage } from './BlogPostPage';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { WEB_APP_URL } from '../runtimeConfig';
import { applyBlogIndexDocumentSeo } from '../seo/documentSeo';

type BlogPageProps = {
  postSlug?: string;
};

export function BlogPage({ postSlug }: BlogPageProps) {
  useEffect(() => {
    if (postSlug) return;
    applyBlogIndexDocumentSeo();
  }, [postSlug]);

  return (
    <>
      <Nav activeSection="home" baseUrl={WEB_APP_URL} hideSectionNav />
      <main className="pt-[5.25rem] sm:pt-24">
        {postSlug ? <BlogPostPage postSlug={postSlug} /> : <BlogSection />}
      </main>
      <Footer />
    </>
  );
}
