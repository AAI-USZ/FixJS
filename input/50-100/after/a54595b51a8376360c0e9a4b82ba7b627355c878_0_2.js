function(req, res, options) {
    var remotePipe, reqPipe, requestOpts;
    options = makeDefaults(options);
    requestOpts = buildRequestObject(req, options);
    remotePipe = req.pipe(request(requestOpts));
    handleError(remotePipe, options.onError, req, res);
    reqPipe = remotePipe.pipe(res);
    return handleError(reqPipe, options.onError, req, res);
  }