function(page, node) {
    if (this.siblingNav) {
      this.set('siblingNavVisible', true);
      this.siblingNav.set('node', node);
    }

    this._setupAdTag();
  }