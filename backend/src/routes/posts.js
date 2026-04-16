const express = require('express');
const { z } = require('zod');
const { Post } = require('../models/Post');
const { requireAdmin } = require('../middleware/auth');
const { toSlug } = require('../utils');

const router = express.Router();

const postSchema = z.object({
  title: z.string().min(5),
  excerpt: z.string().min(10),
  content: z.string().min(20),
  author: z.string().min(2),
  imageUrl: z.string().min(1).optional(),
  published: z.boolean().optional(),
});

function toDto(post) {
  return {
    id: String(post._id),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    imageUrl: post.imageUrl,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    published: post.published,
  };
}

router.get('/', async (_req, res) => {
  const posts = await Post.find({ published: true }).sort({ updatedAt: -1 }).lean();
  return res.json({ posts: posts.map(toDto) });
});

router.get('/admin/list', requireAdmin, async (_req, res) => {
  const posts = await Post.find({}).sort({ updatedAt: -1 }).lean();
  return res.json({ posts: posts.map(toDto) });
});

router.post('/admin', requireAdmin, async (req, res) => {
  const parsed = postSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid post payload' });

  const data = parsed.data;
  const baseSlug = toSlug(data.title);
  let slug = baseSlug;
  let count = 1;
  while (await Post.exists({ slug })) {
    slug = `${baseSlug}-${count++}`;
  }

  const post = await Post.create({
    slug,
    title: data.title.trim(),
    excerpt: data.excerpt.trim(),
    content: data.content.trim(),
    author: data.author.trim(),
    imageUrl: data.imageUrl?.trim() || '/assets/images/partner-growth-dashboard.webp',
    published: data.published ?? true,
  });

  return res.status(201).json({ post: toDto(post) });
});

router.patch('/admin/:id', requireAdmin, async (req, res) => {
  const parsed = postSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Invalid post payload' });

  const existing = await Post.findById(req.params.id);
  if (!existing) return res.status(404).json({ message: 'Post not found' });

  const data = parsed.data;
  existing.title = data.title.trim();
  existing.excerpt = data.excerpt.trim();
  existing.content = data.content.trim();
  existing.author = data.author.trim();
  existing.imageUrl = data.imageUrl?.trim() || '/assets/images/partner-growth-dashboard.webp';
  existing.published = data.published ?? true;

  const newBaseSlug = toSlug(existing.title);
  if (newBaseSlug !== existing.slug) {
    let slug = newBaseSlug;
    let count = 1;
    while (await Post.exists({ slug, _id: { $ne: existing._id } })) {
      slug = `${newBaseSlug}-${count++}`;
    }
    existing.slug = slug;
  }

  await existing.save();
  return res.json({ post: toDto(existing) });
});

router.delete('/admin/:id', requireAdmin, async (req, res) => {
  const deleted = await Post.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Post not found' });
  return res.json({ ok: true });
});

router.get('/:slug', async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug, published: true }).lean();
  if (!post) return res.status(404).json({ message: 'Post not found' });
  return res.json({ post: toDto(post) });
});

module.exports = { postsRouter: router };
