function emitError(code, req, res, error) {
    req.noobhttp.error =  {
      headers: {'content-type': 'text/plain'},
      data: this.errorTexts[code]
    };

    this.emit("error/" + req.headers.host + '/' + code, code, req, error);

    res.setHeader('content-length', Buffer.byteLength(req.noobhttp.error.data));
    res.writeHead(code, req.noobhttp.error.headers);
    res.end(req.noobhttp.error.data);
  }