function fix(event) {
    if (!('defaultPrevented' in event)) {
      event.defaultPrevented = false;
      var prevent = event.preventDefault;
      event.preventDefault = function() {
        this.defaultPrevented = true;
        prevent.call(this);
      }
    }
  }