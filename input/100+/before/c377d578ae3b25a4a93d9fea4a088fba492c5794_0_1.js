function(player) {
  if (!player.isAlive() || this.owner_ == player) {
    return false;
  }

  var dimensions = player.getDimensions();
  var x = this.position_.getX();
  var y = this.position_.getY();
  if (x >= dimensions.left && x <= dimensions.right && y >= dimensions.top && y <= dimensions.bottom) {
    player.takeDamage(this.owner_, this, this.damage_);
    this.lifetime_ = 0;
    this.explode_();
    return true;
  }
  return false;
}