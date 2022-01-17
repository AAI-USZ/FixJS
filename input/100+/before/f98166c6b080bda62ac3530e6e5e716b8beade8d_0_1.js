function (cb) {
  if (!this.url) return cb(new Error('Facebook request url not defined.'));
  if (this.url.charAt(0) !== '/') this.url = '/' + this.url;

  var self = this
    , uri = this.url

  this.url = graphUrl + this.url;

  if (this.method === 'GET') {
    if (this.accessToken) {
      this.url += ~this.url.indexOf('?') ? '&' : '?';
      this.url += "access_token=" + this.accessToken;
    }
    var request = superagent.get(this.url);
  } else if (this.method === 'POST') {
    if (!this.token) return cb(new Error('Access Token required to post.'));
    var postData = this.postData || {}
      , request = superagent.post(this.url);
    postData['access_token'] = this.accessToken;
    request.send(postData);
  } else {
    return cb(new Error('Facebook method not defined'));
  }

  debug((this.accessToken ? 'tokened ' : '') + '%s %s', this.method, uri);
  request.end(function (res) {
    var result = null
      , err = null

    if (~res.headers['content-type'].indexOf('image')) {
      result = { image: true, location: res.headers.location };
      return cb(null, result);
    }

    if (res.text && res.text.length > 0) {
      var text = res.text;
      if (~text.indexOf('{') && ~text.indexOf('}')) {
        try { result = JSON.parse(text); }
        catch (ex) { err = ex }
      } else {
        if (!~text.indexOf('=')) text = 'data=' + text;
        if (text.charAt(0) !== '?') text = '?' + text;
        try { result = url.parse(text, true).query; }
        catch (ex) { err = ex }
      }
    }

    if (!err && (result && result.error)) err = result.error;
    debug((err ? 'ERR :: ' : 'OK :: ') + '%d %s %s', res.status, self.method, uri);
    cb(err, result);
  });
}