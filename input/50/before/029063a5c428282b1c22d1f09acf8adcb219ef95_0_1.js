function() {
    if (this.urlqueue.length > 0) {
      obj = this.urlqueue.shift();
      //this._get(url);
      if (!this._go(obj))
        this.urlqueue.unshift(obj);
    }
  }