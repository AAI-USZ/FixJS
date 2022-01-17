function(fn){
  var self = this
    , ms = this.timeout()
    , start = new Date
    , ctx = this.ctx
    , finished
    , emitted;

  if (ctx) ctx.runnable(this);

  // timeout: set the timer even if this.async isn't true, since we don't know
  // ahead of time for the promisey case
  this.timer = setTimeout(function(){
    if (!finished) {
      done(new Error('timeout of ' + ms + 'ms exceeded'));
      self.timedOut = true;
    }
  }, ms);

  // called multiple times
  function multiple(err) {
    if (emitted) return;
    emitted = true;
    self.emit('error', err || new Error('done() called multiple times'));
  }

  // finished
  function done(err) {
    if (self.timedOut) return;
    if (finished) return multiple(err);
    self.clearTimeout();
    self.duration = new Date - start;
    finished = true;
    fn(err);
  }

  // for .resetTimeout()
  this.callback = done;

  // async
  if (this.async) {
    try {
      this.fn.call(ctx, function(err){
        if (err instanceof Error) return done(err);
        if (null != err) return done(new Error('done() invoked with non-Error: ' + err));
        done();
      });
    } catch (err) {
      done(err);
    }
    return;
  }
  
  // sync, or promise-returning
  try {
    if (!this.pending) {
      var result = this.fn.call(ctx);

      if (result && typeof result.then === "function") {
        result.then(
          function(){
            done(); // don't pass through any non-error fulfillment values
          },
          done // pass through any errors
        );
      } else {
        done();
      }
    } else {
      done();
    }
  } catch (err) {
    done(err);
  }
}