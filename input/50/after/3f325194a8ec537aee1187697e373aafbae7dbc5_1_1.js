function(page, node) {
    if (this.siblingNav) {
      this.siblingNav.set('node', node);
    }

    this._setupAdTag();
  }