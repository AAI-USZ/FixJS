function(uri, method, data, options, callback){

    var self = this, post_data = null;
    var callback = (typeof options == 'function') ? options : callback;
    var options = options || {};
    if(uri.indexOf('http') == -1) uri = 'http://' + uri;

    var method = method || 'GET';

    var config = {
      base_opts: {},
      proxy: options.proxy,
      encoding: options.encoding || (options.multipart ? 'binary' : 'utf8'),
      parse_response: options.parse === false ? false : true,
      follow: options.follow === false ? 0 : options.follow || 10, // 10 by default
      timeout: (typeof options.timeout == 'number') ? options.timeout : 10000
    }

    additional_http_opts.forEach(function(key){
      if(typeof options[key] != 'undefined')
        config.base_opts[key] = options[key];
    });

    config.headers = {
      "User-Agent": options.user_agent || this.default_user_agent,
      "Connection": "close",
      "Accept": "*/*"
    }

    if (options.compressed && typeof unzip != 'undefined')
      config.headers['Accept-Encoding'] = 'gzip,deflate';

    for(h in options.headers)
      config.headers[h] = options.headers[h];

    if(options.username && options.password){
      var b = new Buffer([options.username, options.password].join(':'));
      config.headers['Authorization'] = "Basic " + b.toString('base64');
    }

    if(data) {
      if(options.multipart){

        var boundary = options.boundary || this.default_boundary;
        return this.build_multipart_body(data, boundary, function(err, body){

          if(err) throw(err);
          config.headers['Content-Type'] = 'multipart/form-data; boundary=' + boundary;
          config.headers['Content-Length'] = body.length;
          self.send_request(1, method, uri, config, body, callback);

        });

      } else {
        post_data = (typeof(data) === "string") ? data : stringify(data);
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        config.headers['Content-Length'] = post_data.length;
      }

    }

    this.send_request(1, method, uri, config, post_data, callback);

  }