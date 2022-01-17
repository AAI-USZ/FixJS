function (elem, parent, proto) {
    var sprite = Object.create(proto || zap.sprite);
    sprite.elem = elem;
    sprite.sprites = [];
    sprite.x = 0;
    sprite.y = 0;
    sprite.a = 0;
    sprite.vx = 0;
    sprite.vy = 0;
    sprite.va = 0;

    var angular_velocity;
    Object.defineProperty(sprite, "angular_velocity", { enumerable: true,
      get: function () {
        return angular_velocity;
      }, set: function (v) {
        if (!isNaN(v)) {
          angular_velocity =
            zap.clamp(v, 0, this.max_angular_velocity || Infinity);
        }
      } });

    var velocity;
    Object.defineProperty(sprite, "velocity", { enumerable: true,
      get: function () {
        return velocity;
      }, set: function (v) {
        if (!isNaN(v)) {
          velocity = zap.clamp(v, 0, this.max_velocity || Infinity);
          var th = this.a / 180 * Math.PI;
          this.vx = velocity * Math.cos(th);
          this.vy = velocity * Math.sin(th);
        }
      } });

    if (!parent.sprites) {
      parent.sprites = [];
    }
    parent.sprites.push(sprite);
    sprite.parent = parent;
    sprite.cosmos = parent.cosmos;
    if (!sprite.elem.parentNode) {
      if (parent instanceof window.Node) {
        parent.appendChild(sprite.elem);
      } else {
        parent.elem.parentNode.appendChild(sprite.elem);
      }
    }
    return sprite;
  }