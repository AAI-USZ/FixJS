function process_error(req, res, err, log) {
  var body;

  //
  // user asks for request termination providing:
  //
  //    - statusCode  (Number)
  //    - headers     (Object)        Optional
  //    - body        (String|Buffer) Optional
  //

  if (err.statusCode) {
    if (400 <= err.statusCode) {
      log('error', err.statusCode + ' - ' + err.body);
    }

    end(req, res, err.statusCode, err.headers || {}, err.body);
    return;
  }

  //
  // exceptions or fatal fuckup happened
  //

  body = ('development' !== nodeca.runtime.env) ? 'Application error'
       : (err.stack || err.toString());

  log('error', 500 + ' - ' + (err.stack || err.toString()));
  nodeca.logger.fatal(err);

  end(req, res, 500, {'Content-Type': 'text/plain; charset=utf-8'}, body);
}