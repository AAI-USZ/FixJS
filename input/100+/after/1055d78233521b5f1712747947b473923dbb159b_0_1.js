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

  options.enable_development_menu = config.get('enable_development_menu');

  // The real version number is not ready until sometime after initial load,
  // until it is ready a fake randomly generated string is used. Go get
  // the real SHA whenever it is actually needed so that the randomly
  // generated SHA is not returned to the user.
  options.commit = version();

  res.local('util', util);
  res.render(template, options);
}