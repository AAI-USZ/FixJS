function() {
  return gf.CLIENT ? (this.clientState_ || this.state_) : this.state_;
}