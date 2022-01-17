function(camera) {
  var context = camera.getContext();
  var dimensions = camera.getDimensions();
  var x = dimensions.x;
  var y = dimensions.y;
  var w = dimensions.width;
  var h = dimensions.height;

  var leftTile = Math.floor((x - w) / dotprod.layers.StarLayer.STAR_TILE_SIZE_);
  var rightTile = Math.floor((x + w) / dotprod.layers.StarLayer.STAR_TILE_SIZE_);
  var topTile = Math.floor((y - h) / dotprod.layers.StarLayer.STAR_TILE_SIZE_);
  var bottomTile = Math.floor((y + h) / dotprod.layers.StarLayer.STAR_TILE_SIZE_);

  context.save();

    context.fillStyle = dotprod.layers.StarLayer.STAR_L1_COLOR_;

    for (var yTile = topTile; yTile <= bottomTile; ++yTile) {
      for (var xTile = leftTile; xTile <= rightTile; ++xTile) {
        for (var i = 0; i < this.stars_.length; ++i) {
          var dx = Math.floor((xTile * dotprod.layers.StarLayer.STAR_TILE_SIZE_ + this.stars_[i].x - x + w) / 2);
          var dy = Math.floor((yTile * dotprod.layers.StarLayer.STAR_TILE_SIZE_ + this.stars_[i].y - y + h) / 2);
          context.fillRect(dx, dy, 1, 1);
        }
      }
    }

    leftTile = Math.floor((x - w * 1.5) / dotprod.layers.StarLayer.STAR_TILE_SIZE_);
    rightTile = Math.floor((x + w * 1.5) / dotprod.layers.StarLayer.STAR_TILE_SIZE_);
    topTile = Math.floor((y - h * 1.5) / dotprod.layers.StarLayer.STAR_TILE_SIZE_);
    bottomTile = Math.floor((y + h * 1.5) / dotprod.layers.StarLayer.STAR_TILE_SIZE_);

    context.fillStyle = dotprod.layers.StarLayer.STAR_L2_COLOR_;
    for (var yTile = topTile; yTile <= bottomTile; ++yTile) {
      for (var xTile = leftTile; xTile <= rightTile; ++xTile) {
        for (var i = 0; i < this.stars_.length; ++i) {
          var dx = Math.floor((xTile * dotprod.layers.StarLayer.STAR_TILE_SIZE_ + this.stars_[i].x - x) / 3 + w / 2);
          var dy = Math.floor((yTile * dotprod.layers.StarLayer.STAR_TILE_SIZE_ + this.stars_[i].y - y) / 3 + h / 2);
          context.fillRect(dx, dy, 1, 1);
        }
      }
    }

  context.restore();
}