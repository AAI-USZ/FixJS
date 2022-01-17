function(req, resp) {
    var body, ext, index, page, pages, pathname, _i, _len;
    pages = wrench.readdirSyncRecursive('pages');
    pathname = url.parse(req.url).pathname;
    if (pathname === '/') {
      pathname = '/index.html';
    }
    try {
      if (pathname.match(/^\/(stylesheets|images|javascripts|css|img|js)/)) {
        return filed("." + pathname).pipe(resp);
      } else {
        pathname = pathname.replace('.html', '');
        for (index = _i = 0, _len = pages.length; _i < _len; index = ++_i) {
          page = pages[index];
          if ('/' + (page != null ? page.split('.')[0] : void 0) === pathname) {
            ext = page.split('.')[1];
          }
        }
        if (ext === 'html') {
          body = renderHtml(pathname);
        } else {
          body = renderMarkdown(pathname);
        }
        resp.writeHead(200, 'Content-Type: text/html');
        return resp.end(renderTemplate(body));
      }
    } catch (err) {
      console.log("Unable to locate file " + pathname);
      return filed('./404.html').pipe(resp);
    }
  }