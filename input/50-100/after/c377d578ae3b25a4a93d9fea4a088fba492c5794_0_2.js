function() {
  if (this.bounceCount_ == 0) {
    this.explode_(false);
  } else if (this.bounceCount_ > 0) {
    --this.bounceCount_;
  }
}