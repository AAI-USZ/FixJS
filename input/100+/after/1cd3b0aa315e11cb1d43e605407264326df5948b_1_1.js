function() {
  var ensemble = this.game_.getResourceManager().getVideoEnsemble('explode1');
  this.effectIndex_.addEffect(new dotprod.entities.Effect(ensemble.getAnimation(0), this.position_, this.velocity_));

  ensemble = this.game_.getResourceManager().getVideoEnsemble('ship' + this.ship_ + '_junk');
  for (var i = 0; i < ensemble.getNumAnimations(); ++i) {
    var animation = ensemble.getAnimation(i);
    var deltaVelocity = dotprod.Vector.fromPolar(Math.random() * 2, Math.random() * 2 * Math.PI);
    var piece = new dotprod.entities.Effect(animation, this.position_, this.velocity_.add(deltaVelocity));
    this.effectIndex_.addEffect(piece);
  }

  ++this.losses_;
  this.bounty_ = 0;
  this.energy_ = 0;
}