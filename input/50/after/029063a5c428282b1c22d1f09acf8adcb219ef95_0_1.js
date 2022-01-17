function() {
    if (this.urlqueue.length > 0) {
      ajaxlibobj = this.urlqueue.shift(); // FIXME - global scope leakage; upfront apprently relies on this but should be fixed
      //this._get(url);
      if (!this._go(ajaxlibobj))
        this.urlqueue.unshift(ajaxlibobj);
    }
  }