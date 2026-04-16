import type { BlogPost } from '../blogData';

const DEFAULT_TITLE = 'MELBET | برنامج الشركاء — عمولات حتى 50% مدى الحياة';
const DEFAULT_DESCRIPTION =
  'برنامج شركاء MELBET: حقق ربحاً على كل عميل تحيله، بعمولات تصل إلى 50% مدى الحياة، تغطية رياضة وكازينو وألعاب، ودعم شركاء على مدار الساعة.';
const OG_IMAGE = '/assets/branding/og-share-1200x630.png';
const SITE_NAME = 'MELBET — برنامج الشركاء';

function siteOrigin(): string {
  const fromEnv = (import.meta.env.VITE_WEB_APP_URL as string | undefined)?.trim();
  if (fromEnv && /^https?:\/\//i.test(fromEnv)) return fromEnv.replace(/\/$/, '');
  if (typeof window !== 'undefined') return window.location.origin;
  return '';
}

function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const base = siteOrigin();
  if (!pathOrUrl.startsWith('/')) return `${base}/${pathOrUrl}`;
  return `${base}${pathOrUrl}`;
}

function setMetaName(name: string, content: string) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setMetaProperty(property: string, content: string) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setHreflang(href: string) {
  let el = document.querySelector('link[rel="alternate"][hreflang="ar"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'alternate');
    el.setAttribute('hreflang', 'ar');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setDocumentTitle(title: string) {
  document.title = title;
}

function removeBlogPostingLd() {
  document.getElementById('blog-posting-ld')?.remove();
}

function setBlogPostingLd(post: BlogPost, canonical: string) {
  removeBlogPostingLd();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = 'blog-posting-ld';
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [absoluteUrl(post.imageUrl)],
    datePublished: post.createdAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'MELBET',
      url: siteOrigin() || undefined,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    inLanguage: 'ar',
  };
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

function applyOpenGraph(args: { url: string; title: string; description: string; image: string; type: string }) {
  setMetaProperty('og:type', args.type);
  setMetaProperty('og:url', args.url);
  setMetaProperty('og:title', args.title);
  setMetaProperty('og:description', args.description);
  setMetaProperty('og:image', args.image);
  setMetaProperty('og:image:secure_url', args.image);
  setMetaProperty('og:locale', 'ar_SA');
  setMetaProperty('og:site_name', SITE_NAME);
  setMetaName('twitter:card', 'summary_large_image');
  setMetaName('twitter:title', args.title);
  setMetaName('twitter:description', args.description);
  setMetaName('twitter:image', args.image);
}

/** الصفحة الرئيسية — يُستدعى من LandingPage */
export function applyLandingDocumentSeo() {
  removeBlogPostingLd();
  const origin = siteOrigin();
  const url = origin ? `${origin}/` : '/';
  setDocumentTitle(DEFAULT_TITLE);
  setMetaName('description', DEFAULT_DESCRIPTION);
  setMetaName('robots', 'index,follow');
  setCanonical(url);
  setHreflang(url);
  applyOpenGraph({
    url,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    image: absoluteUrl(OG_IMAGE),
    type: 'website',
  });
}

/** قائمة المقالات /blog */
export function applyBlogIndexDocumentSeo() {
  removeBlogPostingLd();
  const origin = siteOrigin();
  const path = '/blog';
  const url = origin ? `${origin}${path}` : path;
  const title = `المدونة | ${SITE_NAME}`;
  const description =
    'مقالات ونصائح لشركاء MELBET: تسويق بالعمولة، زيادة الإحالات، وأفضل الممارسات لبرنامج الشركاء.';
  setDocumentTitle(title);
  setMetaName('description', description);
  setMetaName('robots', 'index,follow');
  setCanonical(url);
  setHreflang(url);
  applyOpenGraph({
    url,
    title,
    description,
    image: absoluteUrl(OG_IMAGE),
    type: 'website',
  });
}

/** صفحة مقال */
export function applyBlogPostDocumentSeo(post: BlogPost) {
  const origin = siteOrigin();
  const path = `/blog/${encodeURIComponent(post.slug)}`;
  const url = origin ? `${origin}${path}` : path;
  const title = `${post.title} | ${SITE_NAME}`;
  setDocumentTitle(title);
  setMetaName('description', post.excerpt);
  setMetaName('robots', 'index,follow');
  setCanonical(url);
  setHreflang(url);
  applyOpenGraph({
    url,
    title: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.imageUrl),
    type: 'article',
  });
  setBlogPostingLd(post, url);
}
