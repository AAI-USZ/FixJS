function plugin(layer, options) {
  var middleware;

  options = options || !this.package.configuration
    ? options
    : this.package.configuration.plugins[layer];

  try { middleware = require('../plugins/' + layer); }
  catch (e) {
    this.logger.error('Failed to plugin', layer, e);
  }

  if (middleware) this.use(middleware(options));

  return this;
}