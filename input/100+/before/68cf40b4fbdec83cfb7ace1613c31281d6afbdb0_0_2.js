function() {
  var dimensions = this.camera_.getDimensions();
  this.position_.innerText = dimensions.x + ', ' + dimensions.y + ' (' + Math.floor(dimensions.x / 16) + ', ' + Math.floor(dimensions.y / 16) + ')';

  ++this.frames_;

  var now = goog.now();
  if (now - this.lastTime_ < 1000) {
    return;
  }

  this.latency_.innerText = this.game_.getProtocol().getRoundTripTime() + 'ms latency';
  this.framerate_.innerText = this.frames_ + ' fps';
  this.players_.innerText = this.game_.getPlayerIndex().getPlayers().length + ' players';
  this.projectiles_.innerText = this.game_.getProjectileIndex().getProjectiles().length + ' projectiles';

  this.frames_ = 0;
  this.lastTime_ = now;
}