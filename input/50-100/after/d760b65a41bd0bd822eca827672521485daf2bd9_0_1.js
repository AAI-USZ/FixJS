function use(layer) {
  if (typeof layer !== 'function') {
    this.logger.error('the supplied middleware isnt a valid function');
    return false;
  }

  // check if we this middleware is already configured
  if (this.has(layer)) return false;

  this.middleware.push(layer);
  return true;
}