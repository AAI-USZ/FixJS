function pull(fn) {
  var operation = retry.operation({
          retries: this.retries
        , factor: 3
        , minTimeout: 1 * 1000
        , maxTimeout: 60 * 1000
        , randomize: true
      })
    , self = this;

  /**
   * Small wrapper around pulling a connection
   *
   * @param {Error} err
   * @api private
   */

  function allocate(err) {
    if (operation.retry(err)) return;

    fn.apply(fn, arguments);
  }

  operation.attempt(function attempt() {
    self.allocate(allocate);
  });
}