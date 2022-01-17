function(type, data) {

    switch (type) {
      case 'load':
        // TODO: videoWidth vs attr.width
        // TODO: send onload some infos about the target
        this.attr({width: data.width, height: data.height});
        // We trigger the event asynchronously so as to ensure that any events
        // bound after instantiation are still triggered:
        this.asyncEmit('load', this);
        break;
      case 'error':
        // We trigger the event asynchronously so as to ensure that any events
        // bound after instantiation are still triggered:
        this.asyncEmit('error', Error(data.error));
    }

    return this;
  }