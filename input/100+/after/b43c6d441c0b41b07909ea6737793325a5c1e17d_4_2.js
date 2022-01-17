function publish(evt/*, ...*/) {
    if (!(evt in this.subscribers)) return;

    if (arguments.length > 1 || !this.hasDraft(evt)) {
      var args = Array.prototype.slice.call(arguments, 1);
    } else {
      var args = this.drafts[evt];
      delete this.drafts[evt];
    }

    this.subscribers[evt].forEach(function (cbWrapped) {
      cbWrapped(args);
    });
  }