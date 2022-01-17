function() {
      debug('HTTP socket close');
      req.emit('close');
      if (req.res && req.res.readable) {
        // Socket closed before we emitted "end" below.
        req.res.emit('aborted');
        req.res.emit('end');
        req.res.emit('close');
      } else if (!req.res && !req._hadError) {
        // This socket error fired before we started to
        // receive a response. The error needs to
        // fire on the request.
        req.emit('error', createHangUpError());
      }

      // Nothing more to be done with this req, since the socket
      // is closed, and we've emitted the appropriate abort/end/close/error
      // events.  Disavow all knowledge, and break the references to
      // the variables trapped by closures and on the socket object.
      req = null;
      socket._httpMessage = null;
    }