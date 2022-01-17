function() {
  /**
   * Pattern for L1 stars (stars closer in distance).
   *
   * @type {!Array.<Object>}
   * @private
   */
  this.stars_ = [];

  /**
   * Pattern for L2 stars (stars further away in distance).
   *
   * @type {!Array.<Object>}
   * @private
   */
  this.stars2_ = [];

  for (var i = 0; i < dotprod.layers.StarLayer.STAR_DENSITY_; ++i) {
    var x1 = Math.round(Math.random() * dotprod.layers.StarLayer.STAR_TILE_SIZE_);
    var y1 = Math.round(Math.random() * dotprod.layers.StarLayer.STAR_TILE_SIZE_);
    this.stars_.push({x: x1, y: y1});

    var x2 = Math.round(Math.random() * dotprod.layers.StarLayer.STAR_TILE_SIZE_);
    var y2 = Math.round(Math.random() * dotprod.layers.StarLayer.STAR_TILE_SIZE_);
    this.stars2_.push({x: x2, y: y2});
  }
}