function(str, options){
  var options = options || {}
    , client = options.client
    , filename = options.filename
      ? JSON.stringify(options.filename)
      : 'undefined'
    , fn;

  if (options.compileDebug !== false) {
    fn = [
        'var __jade = [{ lineno: 1, filename: ' + filename + ' }];'
      , 'try {'
      , parse(String(str), options)
      , '} catch (err) {'
      , '  rethrow(err, __jade[0].filename, __jade[0].lineno);'
      , '}'
    ].join('\n');
  } else {
    fn = parse(String(str), options);
  }

  if (client) {
    fn = 'var attrs = jade.attrs, escape = jade.escape, rethrow = jade.rethrow;\n' + fn;
  }

  fn = new Function('locals, attrs, escape, rethrow', fn);

  if (client) return fn;

  return function(locals){
    return fn(locals, runtime.attrs, runtime.escape, runtime.rethrow);
  };
}