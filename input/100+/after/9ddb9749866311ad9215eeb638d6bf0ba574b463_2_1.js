function (err, req, res, next) {
  if (err && err instanceof Error) {
    console.log('responding with error: '+err.name);
    console.dir(err);
    var code = err.code || 500;
    var data = err.data || {error: {name: err.name, msg: err.message}};
    res.json({result: 'error', data: data}, code);
    if (['ReferenceError', 'TypeError', 'SyntaxError'].indexOf(err.name) >= 0) {
      console.log(err.stack);
    }
  } else {
    console.log('uncaught error');
    console.dir(err);
    next(err);
  }
}