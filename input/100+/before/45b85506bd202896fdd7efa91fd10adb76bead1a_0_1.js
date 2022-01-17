function emitError(code, req, res) {
    req.noobhttp.error =  {
      headers: {'content-type': 'text/plain'},
      data: this.errorTexts[code]
    };

    this.emit("error/" + req.headers.host + '/' + code, code, req);

    res.setHeader('content-length', Buffer.byteLength(req.noobhttp.error.data));
    res.writeHead(code, req.noobhttp.error.headers);
    res.end(req.noobhttp.error.data);
  }