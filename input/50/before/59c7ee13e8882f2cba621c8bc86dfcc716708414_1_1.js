function() {
      this.model.on('destroy', this.close, this);
    }