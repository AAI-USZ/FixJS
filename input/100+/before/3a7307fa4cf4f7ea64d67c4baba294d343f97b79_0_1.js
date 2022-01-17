function(wall) {
  var x = {'max': Math.floor((this.position.x + this.radius) / wall.tileSize), 'min': Math.floor((this.position.x - this.radius) / wall.tileSize)},
      y = {'max': Math.floor((this.position.y + this.radius) / wall.tileSize), 'min': Math.floor((this.position.y - this.radius) / wall.tileSize)};
  if(wall.map[y['max']][x['max']] == 1 || wall.map[y['max']][x['min']] == 1 || wall.map[y['min']][x['max']] == 1 || wall.map[y['min']][x['min']] == 1) {
    this.collision = true;
  } else {
    this.collision = false;
  }
}