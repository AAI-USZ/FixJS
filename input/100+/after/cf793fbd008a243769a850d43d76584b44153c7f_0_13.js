function(ctx){
    var node, __i, __ref, __ref1, __len;
    ctx || (ctx = {});
    ctx['continue'] = true;
    ctx['break'] = true;
    for (__i = 0, __len = (__ref = ((__ref1 = this.body) != null ? __ref1.lines : void 8) || []).length; __i < __len; ++__i) {
      node = __ref[__i];
      if (node.getJump(ctx)) {
        return node;
      }
    }
  }