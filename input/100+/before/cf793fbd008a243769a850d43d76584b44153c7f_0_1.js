function(it){
    var it, that, __ref;
    it = it.unparen();
    switch (false) {
    case !(that = this.back):
      that.add(it);
      break;
    case !(that = it.lines):
      (__ref = this.lines).push.apply(__ref, that);
      break;
    default:
      this.lines.push(it);
      if (that = it.back, delete it.back, that) {
        this.back = that;
      }
    }
    return this;
  }