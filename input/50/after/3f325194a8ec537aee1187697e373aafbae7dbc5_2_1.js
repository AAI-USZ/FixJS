function() {
    var func = this.isOpen ? 'close' : 'open';
    this[func]();
    this.isOpen = !this.isOpen;
  }