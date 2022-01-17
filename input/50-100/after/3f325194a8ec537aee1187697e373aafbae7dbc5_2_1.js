function(node) {
    if (!node || !node.siblings || !node.siblings.length) {
      this.hide();
      this.close();
      this.siblings = false;
      return;
    }

    this.show();

    this._processSiblings(node.siblings, node);
  }