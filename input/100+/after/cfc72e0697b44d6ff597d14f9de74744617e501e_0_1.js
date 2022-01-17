function finalize(err) {
  var http, resp, type, compression, log;

  /*jshint validthis:true*/

  if (err) {
    process_error(this.origin.http.req, this.origin.http.res, err, this.extras.log);
    return;
  }

  //
  // Shorten some vars
  //

  http = this.origin.http;
  resp = this.response;
  log  = this.extras.log;

  //
  // Check whenever compression is allowed by client or not
  //

  type = resp.headers['Content-Type'] || http.res.getHeader('Content-Type');
  compression = /json|text|javascript/.test(type) && get_allowed_compression(http.req);

  //
  // Mark for proxies, that we can return different content (plain & gzipped),
  // depending on specified (comma-separated) headers
  //

  resp.headers['Vary'] = 'Accept-Encoding';

  //
  // Return raw response, if compression is not allowed or body is too small
  //

  if (false === compression || 500 > Buffer.byteLength(resp.body)) {
    end(http.req, http.res, resp.statusCode || 200, resp.headers, resp.body);
    return;
  }

  //
  // Compression is allowed, set Content-Encoding
  //

  resp.headers['Content-Encoding'] = compression;

  //
  // Compress body
  //

  compress(compression, resp.body, function (err, buffer) {
    if (err) {
      process_error(http.req, http.res, err, log);
      return;
    }

    end(http.req, http.res, resp.statusCode || 200, resp.headers, buffer);
  });
}