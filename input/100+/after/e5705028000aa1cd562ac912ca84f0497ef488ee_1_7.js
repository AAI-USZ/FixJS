function(options) {
    options = options || {};

    // Set up alias's
    options.domain = options.domain || options.host;
    if(options.host) {
      // Delete it as it's not used
      delete options.host;
    }
    options.fragment = options.fragment || options.anchor;
    if(options.anchor) {
      // Delete it as it's not used
      delete options.anchor;
    }

    // If `host` option exists set `relPath` as false
    options = utils.object.merge({ relPath: !options.domain }, options);

    // If no `host` is available, and `relPath` is false then we have no idea who
    // the host is
    if(!options.domain && !options.relPath) {
      throw 'Missing `host` to create URL to! Please provide a `host` paremeter, or `relPath` to true.';
    }
    var protocol = ''
      , userinfo = ''
      , host = ''
      , path = ''
      , query = ''
      , fragment = '';

    // If we're getting the full path, then create the full URI scheme
    if(!options.relPath) {
      protocol += this.genProtocol(options);
      userinfo += this.genAuth(options);
      host += this.genHost(options);
    }
    path += this.genPath(options);
    fragment += this.genFragment(options);
    query += this.genQuery(options);

    return protocol + userinfo + host + path + query + fragment;
  }