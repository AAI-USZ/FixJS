function(it){
    if (it) {
      this.body.makeReturn(it);
    } else {
      this.getJump() || (this.returns = true);
    }
    return this;
  }