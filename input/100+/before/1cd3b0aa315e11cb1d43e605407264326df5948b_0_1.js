function(directHit) {
  // Reset bomb state.
  this.velocity_ = new dotprod.Vector(0, 0);
  this.lifetime_ = 0;

  // Add an explosion animation.
  var animation = this.game_.getResourceManager().getVideoEnsemble('explode1').getAnimation(0);
  var explosion = new dotprod.entities.Effect(animation, this.position_, new dotprod.Vector(0, 0));
  this.game_.getEffectIndex().addEffect(explosion);

  // Figure out how much damage the local player is going to take from this bomb explosion.
  var damageRatio;
  var player = this.game_.getPlayerIndex().getLocalPlayer();
  if (directHit) {
    damageRatio = 1;
  } else {
    var delta = this.position_.subtract(player.getPosition());
    var distance = Math.sqrt(delta.getX() * delta.getX() + delta.getY() * delta.getY()) / this.blastRadius_;
    damageRatio = Math.max(1 - distance, 0);
  }

  player.takeDamage(this.owner_, this, this.damage_ * damageRatio);
}