function(req, res, next){
    res.locals.myCustomData = this.attributes.code;
    var start = new Date();
    res.locals.time = function(){
      return (new Date()).getTime()-start.getTime();
    };
    Page.prototype.render.call(this, req, res, next);
  }