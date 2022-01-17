function() {
  if (this.bounceCount_ == 0) {
    this.velocity_ = new dotprod.Vector(0, 0);
    this.lifetime_ = 0;
    this.explode_();
  } else if (this.bounceCount_ > 0) {
    --this.bounceCount_;
  }
}