function(req, res, next){
    res.locals.myCustomData = this.attributes.code;
    this.render(req, res, next);
  }