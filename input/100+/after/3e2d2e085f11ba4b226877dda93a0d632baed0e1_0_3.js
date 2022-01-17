function () {
    var now = Date.now();
    if (now - this.last_shot < $FIRE_RATE) {
      return;
    }
    this.last_shot = now;
    var bullet = zap.make_particle($use("#bullet"), this,
        $BULLET_RANGE / $BULLET_V, ur_sprite);
    bullet.is_bullet = true;
    bullet.r = bullet.r_collide =
      parseFloat(document.getElementById("bullet").getAttribute("r"));
    var th = zap.deg2rad(this.a);
    bullet.x = this.x + this.r * Math.cos(th);
    bullet.y = this.y + this.r * Math.sin(th);
    bullet.vx = $BULLET_V * Math.cos(th);
    bullet.vy = $BULLET_V * Math.sin(th);
    zap.play_sound("bullet_sound", $VOLUME);
  }