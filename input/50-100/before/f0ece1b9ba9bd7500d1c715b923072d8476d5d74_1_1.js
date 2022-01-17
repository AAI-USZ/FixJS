function (req, headers) {
  headers = headers || {};

  if (req.headers.origin) {
    headers['Access-Control-Allow-Credentials'] = 'true';
    headers['Access-Control-Allow-Origin'] = req.headers.origin;
  } else {
    headers['Access-Control-Allow-Origin'] = '*';
  }

  return headers;
}