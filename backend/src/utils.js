function toSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\u0600-\u06FF\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function isProduction(nodeEnv) {
  return nodeEnv === 'production';
}

module.exports = { toSlug, isProduction };
