function(pairKey) {
    var model = this.get({id: pairKey});
    if (model) {
      this.remove([model]);
    }
  }