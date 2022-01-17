function () {
      log.silly('client', 'client disconnected');

      result = JSON.parse(buf.toString());
      log.silly('client', 'request exited with code: %s', result.exitCode);

      respond(result.err, result.res);
    }