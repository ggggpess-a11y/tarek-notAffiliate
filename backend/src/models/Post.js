const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: '/assets/images/partner-growth-dashboard.webp' },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };
