function () {
    if (req.url === '/timeout') {
      return setTimeout(function () {
        res.writeHeader(200);
        res.end('timeout 500ms');
      }, 500);
    } else if (req.url === '/error') {
      return res.destroy();
    } else if (req.url === '/302') {
      res.writeHeader(302);
      return res.end();
    } else if (req.url === '/301') {
      res.writeHeader(301);
      return res.end('I am 301 body');
    } else if (req.url === '/post') {
      res.writeHeader(200);
      return res.end(implode_buffer_chunks(chunks));
    } else if (req.url.indexOf('/get') === 0) {
      res.writeHeader(200);
      return res.end(req.url);
    }

    var url = req.url.split('?');
    var get = querystring.parse(url[1]);
    var ret;
    if (chunks.length > 0) {
      ret = implode_buffer_chunks(chunks).toString();
    } else {
      ret = '<html><head><meta http-equiv="Content-Type" content="text/html;charset=##{charset}##">...</html>';
    }
    chunks  = [];
    res.writeHead(get.code ? get.code : 200, {
      'Content-Type': 'text/html',
    });
    res.end(ret.replace('##{charset}##', get.charset ? get.charset : ''));

  }