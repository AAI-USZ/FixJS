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
    }