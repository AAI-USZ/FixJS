function plugin(layer, options) {
  // argument defaults
  options = options || {};

  var configuration = this.package.configuration
    , length = this.paths.length
    , i = 0
    , middleware
    , path;

  if (configuration && configuration.plugins) {
    _.extend(options, configuration.plugins[layer] || {});
  }

  for (; i < length; i++) {
    path = path.join(this.paths[i], '/' + layer);

    try { middleware = require(path); break; }
    catch (e) {
      this.logger.debug('Failed to load plugin %s', path);
    }
  }

  // we didn't find anything, fail, hard, as the user probably really needed
  // this plugin, or he or she wouldn't require it
  if (!middleware) {
    return this.critical('Unable to load the plugin ' + layer + ', it doesnt exist in any of our paths: ' + this.paths.join(', '));
  }

  this.use(middleware(options));
  return true;
}