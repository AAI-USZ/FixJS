function publish(evt/*, ...*/) {
    if (!(this.subscribers.hasOwnProperty(evt))) {
      return;
    }
    var args;
    if (arguments.length > 1 || !this.hasDraft(evt)) {
      args = Array.prototype.slice.call(arguments, 1);
    } else {
      args = this.drafts[evt];
      delete this.drafts[evt];
    }

    this.subscribers[evt].forEach(function (cbWrapped) {
      cbWrapped(args);
    });
  }