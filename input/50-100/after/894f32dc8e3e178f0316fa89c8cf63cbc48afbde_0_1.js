function(it){
    var __ref;
    if (it) {
      this.body.makeReturn(it);
      if ((__ref = this['else']) != null) {
        __ref.makeReturn(it);
      }
    } else {
      this.getJump() || (this.returns = true);
    }
    return this;
  }