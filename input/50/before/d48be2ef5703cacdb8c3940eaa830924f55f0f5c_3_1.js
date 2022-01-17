function(body, contentType) {
  body = exports.replaceGA(body, contentType);
  body = exports.replaceGAD(body, contentType);
  return body;
}