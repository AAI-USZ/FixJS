function publish(evt/*, ...*/) {
    if (!(evt in this.subscribers)) return;
    /* Get the arguments after evt. */
    var args = Array.prototype.slice.call(arguments, 1);
    this.subscribers[evt].forEach(function (cbWrapped) {
      cbWrapped(args);
    });
  }