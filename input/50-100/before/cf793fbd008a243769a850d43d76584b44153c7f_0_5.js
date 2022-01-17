function(ctx){
    var ctx;
    ctx || (ctx = {});
    (ctx.labels || (ctx.labels = [])).push(this.label);
    return this.it.getJump((ctx['break'] = true, ctx));
  }