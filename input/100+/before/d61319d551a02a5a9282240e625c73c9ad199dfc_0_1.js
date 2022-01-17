function renderCachableView(req, res, template, options) {
  if (config.get('env') !== 'local') {
    // allow caching, but require revalidation via ETag
    res.etagify();
    res.setHeader('Cache-Control', 'public, max-age=0');
  } else {
    // disable all caching for local dev
    res.setHeader('Cache-Control', 'no-store');
  }
  res.setHeader('Date', new Date().toUTCString());
  res.setHeader('Vary', 'Accept-Encoding,Accept-Language');
  res.setHeader('Content-Type', 'text/html; charset=utf8');
  res.render(template, options);
}