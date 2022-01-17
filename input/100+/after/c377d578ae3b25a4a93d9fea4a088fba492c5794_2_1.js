function(angle, position, velocity, commitFireFn) {
  var fireEnergy = this.getFireEnergy_();
  var fireDelay = this.getFireDelay_();

  if (!commitFireFn(fireEnergy, fireDelay)) {
    return null;
  }

  var lifetime = this.getLifetime_();
  var damage = this.getDamage_();
  var blastRadius = this.getBlastRadius_();
  var newVelocity = velocity.add(dotprod.Vector.fromPolar(this.getBombSpeed_(), angle));
  var projectile = new dotprod.entities.Bomb(this.game_, this.owner_, this.level_, position, newVelocity, lifetime, damage, 0, blastRadius);

  // TODO(sharvil): this should probably happen in the projectile base class' constructor.
  this.game_.getProjectileIndex().addProjectile(this.owner_, projectile);
  this.game_.getResourceManager().playSound('bomb');

  return projectile;
}