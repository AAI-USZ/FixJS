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
   * @param {Socket} connection
   * @api private
   */

  function allocate(err, connection) {
    if (operation.retry(err)) return;

    fn(operation.mainError(), connection);
  }

  operation.attempt(function attempt() {
    self.allocate(allocate);
  });
}