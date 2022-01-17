function( x, y, w, h, name, color, active, image) {
    if(active !== false) {
      active = true;
    }
    var obstacle = world.createEntity({
      name: name || 'terrain-' + Math.random(),
      type: 'static',
      shape: 'square',
      restitution: 0,
      density: 0.5,
      x: x,
      y: y,
      width: w,
      height: h,
      color: color || 'black',
      borderWidth: 0,
      image: image || false,
      active: active
    });
  }