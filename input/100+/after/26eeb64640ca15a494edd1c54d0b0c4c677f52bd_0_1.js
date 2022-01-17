function(name, options, fn){
  var self = this
    , opts = {}
    , cache = this.cache
    , engines = this.engines
    , view;

  // support callback function as second arg
  if ('function' == typeof options) {
    fn = options, options = {};
  }

  // merge app.locals
  utils.merge(opts, this.locals);

  // merge options.locals
  if (options.locals) utils.merge(opts, options.locals);

  // merge options
  utils.merge(opts, options);

  // set .cache unless explicitly provided
  opts.cache = null == opts.cache
    ? this.enabled('view cache')
    : opts.cache;

  // primed cache
  if (opts.cache) view = cache[name];

  // view
  if (!view) {
    view = new View(name, {
        defaultEngine: this.get('view engine')
      , root: this.get('views') || process.cwd() + '/views'
      , engines: engines
    });

    if (!view.path) {
      var err = new Error('Failed to lookup view "' + name + '"');
      err.view = view;
      return fn(err);
    }

    // prime the cache
    if (opts.cache) cache[name] = view;
  }

  // render
  try {
    view.render(opts, fn);
  } catch (err) {
    fn(err);
  }
}