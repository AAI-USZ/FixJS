function (req, headers) {
  headers = headers || {};

  // disable XSS protection for IE
  if (/MSIE 8\.0/.test(req.headers['user-agent'])) {
    headers['X-XSS-Protection'] = '0';
  }

  return headers;
}