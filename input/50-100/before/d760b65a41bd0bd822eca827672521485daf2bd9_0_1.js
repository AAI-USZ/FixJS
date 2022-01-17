function use(layer) {
  if (typeof layer !== 'function') {
    this.logger.error('the supplied middleware isnt a valid function');
    return this;
  }

  // check if we this middleware is already configured
  if (!this.has(layer)) this.middleware.push(layer);
  return this;
}