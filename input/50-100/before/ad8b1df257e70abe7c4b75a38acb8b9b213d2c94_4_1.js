function(type, data) {

    switch (type) {
      case 'load':
        // TODO: videoWidth vs attr.width
        // TODO: send onload some infos about the target
        this.attr({width: data.width, height: data.height});
        this.emit('load');
        break;
      case 'error':
        this.emit('error', new Error(data.error));
    }

    return this;
  }