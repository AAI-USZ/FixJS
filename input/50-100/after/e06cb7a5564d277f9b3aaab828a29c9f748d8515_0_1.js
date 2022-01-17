function () {
      log.silly('client', 'client disconnected');

      if (buf.length > 0) {
        result = JSON.parse(buf.toString());
        log.silly('client', 'request exited with code: %s', result.exitCode);
        log.silly('client', result);
        respond(result.err, result.res);
      }
    }