function(level, bounceCount, position, velocity) {
  this.level_ = level;

  var lifetime = this.getLifetime_();
  var damage = this.getDamage_();
  var blastRadius = this.getBlastRadius_();

  var projectile = new dotprod.entities.Bomb(this.game_, this.owner_, this.level_, position, velocity, lifetime, damage, bounceCount, blastRadius);
  this.game_.getProjectileIndex().addProjectile(this.owner_, projectile);
  return projectile;
}