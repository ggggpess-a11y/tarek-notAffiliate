/**
 * رؤوس موحّدة لاستجابات HTML حتى يعرض المتصفح الصفحة ولا يبدأ تنزيلاً
 * (مثلاً عند الرجوع أو عند فتح الرابط في تبويب جديد).
 * تُستخدم مع res.send(html) ومع res.sendFile لملفات .html
 */
function setInlineHtmlHeaders(res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Content-Disposition', 'inline');
  res.setHeader('X-Content-Type-Options', 'nosniff');
}

module.exports = { setInlineHtmlHeaders };
