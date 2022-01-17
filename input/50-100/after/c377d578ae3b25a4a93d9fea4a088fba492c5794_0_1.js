function(game, owner, level, position, velocity, lifetime, damage, bounceCount, blastRadius) {
  dotprod.entities.Projectile.call(this, game, owner, level, lifetime, damage, bounceCount);

  this.position_ = position;
  this.velocity_ = velocity;

  /**
   * @type {!dotprod.Animation}
   * @private
   */
  this.animation_ = game.getResourceManager().getVideoEnsemble('bombs').getAnimation(level);
  this.animation_.setRepeatCount(-1);

  /**
   * @type {number}
   * @private
   */
  this.blastRadius_ = blastRadius;
}