function(ctx){
    var c, that, __i, __ref, __len;
    ctx || (ctx = {});
    ctx['break'] = true;
    for (__i = 0, __len = (__ref = this.cases).length; __i < __len; ++__i) {
      c = __ref[__i];
      if (that = c.body.getJump(ctx)) {
        return that;
      }
    }
    return (__ref = this['default']) != null ? __ref.getJump(ctx) : void 8;
  }