function(req, res, options) {
    var hasBody, pipe, requestOpts;
    options = makeDefaults(options);
    hasBody = reqHasBody;
    requestOpts = buildRequestObject(req, hasBody, options);
    pipe = null;
    if (hasBody) {
      pipe = req.pipe(request(requestOpts)).pipe(res);
    } else {
      pipe = request(requestOpts).pipe(res);
    }
    return handleError(pipe, options.onError, req, res);
  }