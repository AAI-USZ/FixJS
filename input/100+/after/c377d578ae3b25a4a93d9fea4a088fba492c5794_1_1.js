function(shooter, projectile, energy) {
  this.energy_ = Math.max(this.energy_ - energy, this.isFriend(shooter) ? 1 : 0);
  if (this.energy_ <= 0) {
    var bountyGained = this.bounty_;
    this.onDeath();
    shooter.onKill(this, bountyGained);

    this.game_.getProtocol().sendDeath(this.position_, shooter.getName());

    // TODO(sharvil): we shouldn't reach into game's private member...
    this.game_.notifications_.addMessage('You were killed by ' + shooter.getName() + '!');
  }
}