function Request(request){
    var parsed = url.parse(request.url, true);
    this.pathname = request.url;
    this.headers = request.headers;
    this.method = request.method.toLowerCase();
    this.pathname = parsed.pathname;
    this.hash = parsed.hash;
    this.params = parsed.query;
    this.data = querystring.parse(request.post);
  }