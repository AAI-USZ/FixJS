function(type, data) {

    switch (type) {
      case 'load':
        // We trigger the event asynchronously so as to ensure that any events
        // bound after instantiation are still triggered:
        this.asyncEmit('load', this);
        break;
      case 'error':
        // We trigger the event asynchronously so as to ensure that any events
        // bound after instantiation are still triggered:
        this.asyncEmit('error', Error(data.error), this);
        break;
    }

    return this;
  }