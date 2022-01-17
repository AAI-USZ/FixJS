function(req, res) {
    req.helpers = {};
    for(var helper in this.dynamicHelpers) {
      req.helpers[helper] = this.dynamicHelpers[helper](req, res, this);
    }
  }