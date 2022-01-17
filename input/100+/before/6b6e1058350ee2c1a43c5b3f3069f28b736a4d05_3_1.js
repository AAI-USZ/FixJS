function (val) {
      var target = this._target;
      var sx = Math.sqrt(val.d * val.d + val.c * val.c);
      var sy = Math.sqrt(val.a * val.a + val.b * val.b);
      target.scaleX = val.a > 0 ? sx : -sx;
      target.rotation = Math.atan(val.a / val.b) * 180 / Math.PI;
      target.scaleY = val.d > 0 ? sy : -sy;
      target.x = val.tx;
      target.y = val.ty;
    }