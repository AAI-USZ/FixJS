function(type, data) {

    switch (type) {
      case 'load':
        this._attributes._naturalWidth = data.width;
        this._attributes._naturalHeight = data.height;
        this._mutatedAttributes.naturalWidth = true;
        this._mutatedAttributes.naturalHeight = true;
        this.emit('load', this);
        this.markUpdate();
        break;
      case 'error':
        this.emit('error', Error(data.error), this);
        break;
    }

    return this;
  }