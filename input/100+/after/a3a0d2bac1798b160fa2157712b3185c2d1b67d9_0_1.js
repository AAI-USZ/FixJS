function(opts, done) {
  // On Windows, child_process.spawn will only file .exe files in the PATH, not
  // other executable types (grunt issue #155).
  var cmd;
  try {
    cmd = which(opts.cmd);
  } catch (e) {
    done(e, e, 127);
    return;
  }
  var child = spawn(cmd, opts.args, opts.opts);
  var stdout = '';
  var stderr = '';
  child.stdout.on('data', function(buf) { stdout += buf; });
  child.stderr.on('data', function(buf) { stderr += buf; });
  child.on('exit', function(code) {
    // Remove trailing whitespace (newline)
    stdout = _.rtrim(stdout);
    stderr = _.rtrim(stderr);
    // To keep JSHint from complaining about using new String().
    var MyString = String;
    // Create a new string... with properties.
    var result = new MyString(code === 0 ? stdout : 'fallback' in opts ? opts.fallback : stderr);
    result.stdout = stdout;
    result.stderr = stderr;
    result.code = code;
    // On error, pass result object as error object.
    done(code === 0 || 'fallback' in opts ? null: result, result, code);
  });
  return child;
}