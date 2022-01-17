function(path, options, fn){
  var key = path + ':string';

  if ('function' == typeof options) {
    fn = options, options = {};
  }

  options.filename = path;

  try {
    var str = options.cache
      ? cache[key] || (cache[key] = fs.readFileSync(path, 'utf8'))
      : fs.readFileSync(path, 'utf8');

    fn(null, exports.render(str, options));
  } catch (err) {
    fn(err);
  }
}