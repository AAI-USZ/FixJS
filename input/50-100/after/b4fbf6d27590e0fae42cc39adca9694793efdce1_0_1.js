function errorListener(err) {
      debug('HTTP SOCKET ERROR: ' + err.message + '\n' + err.stack);
      if (req) {
        req.emit('error', err);
        // For Safety. Some additional errors might fire later on
        // and we need to make sure we don't double-fire the error event.
        req._hadError = true;
      }
      if (parser) {
        parser.finish();
        freeParser(parser, req);
      }
      socket.destroy();
    }