function(type, data) {

    switch (type) {
      case 'load':
        this._attributes._naturalWidth = data.width;
        this._attributes._naturalHeight = data.height;
        this._mutatedAttributes.naturalWidth = true;
        this._mutatedAttributes.naturalHeight = true;
        // We trigger the event asynchronously so as to ensure that any events
        // bound after instantiation are still triggered:
        this.asyncEmit('load', this);
        this.markUpdate();
        break;
      case 'error':
        // We trigger the event asynchronously so as to ensure that any events
        // bound after instantiation are still triggered:
        this.asyncEmit('error', Error(data.error), this);
        break;
    }

    return this;
  }