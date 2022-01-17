function()
  {
    NS_ASSERT(this._state == READER_IN_HEADERS);

    // XXX things to fix here:
    //
    // - need to support RFC 2047-encoded non-US-ASCII characters

    try
    {
      var done = this._parseHeaders();
      if (done)
      {
        var request = this._metadata;

        // XXX this is wrong for requests with transfer-encodings applied to
        //     them, particularly chunked (which by its nature can have no
        //     meaningful Content-Length header)!
        this._contentLength = request.hasHeader("Content-Length")
                            ? parseInt(request.getHeader("Content-Length"), 10)
                            : 0;
        dumpn("_processHeaders, Content-length=" + this._contentLength);

        // Serve different contents based on the subdomain name
        try {
          var hostPort = request._headers.getHeader("Host");
          var colon = hostPort.indexOf(":");
          var host = (colon < 0) ? hostPort : hostPort.substring(0, colon);
          if (host != "@GAIA_DOMAIN@" && host.indexOf(".") != -1) {
            var oldPath = request._path;

            var applicationName = host.split(".")[0];
            request._path = this._findRealPath(applicationName);
            dumpn(request._path + '\n');
          }
        } catch (e) {
          dump(e);
        }

        this._state = READER_IN_BODY;
      }
      return done;
    }
    catch (e)
    {
      this._handleError(e);
      return false;
    }
  }