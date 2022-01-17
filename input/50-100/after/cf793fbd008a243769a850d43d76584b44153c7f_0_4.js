function(ctx){
    var that;
    ctx || (ctx = {});
    if (!ctx[this.verb]) {
      return this;
    }
    if (that = this.label) {
      return !__in(that, ctx.labels || []) && this;
    }
  }