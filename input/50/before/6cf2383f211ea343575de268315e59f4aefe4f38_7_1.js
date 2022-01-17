function(req, res) {
    this.helpers = {};
    for(var helper in this.dynamicHelpers) {
      this.helpers[helper] = this.dynamicHelpers[helper](req, res, this);
    }
  }