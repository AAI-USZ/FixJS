function(options) {
    var connectAssets, _base;
    if (options == null) options = {};
    if (connectAssets) return connectAssets;
    if (options.src == null) options.src = 'assets';
    if (options.helperContext == null) options.helperContext = global;
    if (process.env.NODE_ENV === 'production') {
      if (options.build == null) options.build = true;
      if ((_base = cssCompilers.styl).compress == null) _base.compress = true;
      if (options.servePath == null) options.servePath = '';
    } else {
      options.servePath = '';
    }
    if (options.buildDir == null) options.buildDir = 'builtAssets';
    if (options.buildFilenamer == null) options.buildFilenamer = md5Filenamer;
    if (options.buildsExpire == null) options.buildsExpire = false;
    if (options.detectChanges == null) options.detectChanges = true;
    if (options.minifyBuilds == null) options.minifyBuilds = true;
    if (options.pathsOnly == null) options.pathsOnly = false;
    jsCompilers = _.extend(jsCompilers, options.jsCompilers || {});
    connectAssets = module.exports.instance = new ConnectAssets(options);
    connectAssets.createHelpers(options);
    return connectAssets.cache.middleware;
  }