function(req, res, next){
    res.locals.myCustomData = this.attributes.javascripts;
    this.render(req, res, next);
  }