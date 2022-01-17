function(type, data) {

    switch (type) {
      case 'load':
        this.emit('load', this);
        break;
      case 'error':
        this.emit('error', Error(data.error), this);
        break;
    }

    return this;
  }