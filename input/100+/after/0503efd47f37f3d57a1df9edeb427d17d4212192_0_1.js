function(res){
    var max = self._maxRedirects
      , type = res.headers['content-type'] || ''
      , multipart = ~type.indexOf('multipart')
      , redirect = isRedirect(res.statusCode);

    // redirect
    if (redirect && self._redirects++ != max) {
      return self.redirect(res);
    }

    // zlib support
    if (/^(deflate|gzip)$/.test(res.headers['content-encoding'])) {
      utils.unzip(req, res);
    }

    // don't buffer multipart
    if (multipart) buffer = false;

    // TODO: make all parsers take callbacks
    if (multipart) {
      var form = new formidable.IncomingForm;

      form.parse(res, function(err, fields, files){
        if (err) throw err;
        // TODO: handle error
        // TODO: emit formidable events, parse json etc
        var response = new Response(req, res);
        response.body = fields;
        response.files = files;
        self.emit('end');
        self.callback(null, response);
      });
      return;
    }

    // buffered response
    // TODO: optional
    if (buffer) {
      res.text = '';
      res.setEncoding('utf8');
      res.on('data', function(chunk){ res.text += chunk; });
    }

    // parser
    var parse = exports.parse[utils.type(res.headers['content-type'] || '')];
    if (parse) {
      parse(res, function(err, obj){
        // TODO: handle error
        res.body = obj;
      });
    }

    // end event
    self.res = res;
    res.on('end', function(){
      // TODO: unless buffering emit earlier to stream
      self.emit('response', new Response(self.req, self.res));
      self.emit('end');
    });
  }