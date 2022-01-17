function() {
  ++this.frames_;

  var now = goog.now();
  if (now - this.lastTime_ < 1000) {
    return;
  }

  this.view_.innerText = this.game_.getProtocol().getRoundTripTime() + 'ms, ' +
                         this.frames_ + 'fps, ' +
                         this.game_.getPlayerIndex().getPlayers().length + ' // ' +
                         this.game_.getProjectileIndex().getProjectiles().length;

  this.frames_ = 0;
  this.lastTime_ = now;
}