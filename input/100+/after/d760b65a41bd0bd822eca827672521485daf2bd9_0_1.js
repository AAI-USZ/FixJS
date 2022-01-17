function plugin(layer, options) {
  // argument defaults
  options = options || {};

  var configuration = this.package.configuration
    , length = this.paths.length
    , i = 0
    , middleware
    , location;

  if (configuration && configuration.plugins) {
    _.extend(options, configuration.plugins[layer] || {});
  }

  for (; i < length; i++) {
    location = path.join(this.paths[i], '/' + layer);

    try { middleware = require(location); break; }
    catch (e) {
      this.logger.debug('Failed to load plugin %s', location);
    }
  }

  // we didn't find anything, fail, hard, as the user probably really needed
  // this plugin, or he or she wouldn't require it
  if (!middleware) {
    this.critical('Unable to load the plugin ' + layer + ', it doesnt exist in any of our paths: ' + this.paths.join(', '));
    return false;
  }

  this.use(middleware.call(this, options));
  return true;
}