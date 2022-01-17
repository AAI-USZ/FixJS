function (req, headers) {
  headers = headers || {};

  if (this.sid) {
    headers['Set-Cookie'] = 'io=' + this.sid;
  }

  if (req.headers.origin) {
    headers['Access-Control-Allow-Credentials'] = 'true';
    headers['Access-Control-Allow-Origin'] = req.headers.origin;
  } else {
    headers['Access-Control-Allow-Origin'] = '*';
  }

  return headers;
}