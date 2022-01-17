function (uri, options, callback) {
  var params = initParams(uri, options, callback);
  params.options.method = 'HEAD'
  if (options.body || options.requestBodyStream || options.json || options.multipart) {
    throw new Error("HTTP HEAD requests MUST NOT include a request body.")
  }
  return request(params.uri, params.options, params.callback)
}