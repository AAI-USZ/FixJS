function() {
  /**
   * @type {!Array.<Object>}
   * @private
   */
  this.stars_ = [];
  for (var i = 0; i < dotprod.layers.StarLayer.STAR_DENSITY_; ++i) {
    var x = Math.round(Math.random() * dotprod.layers.StarLayer.STAR_TILE_SIZE_);
    var y = Math.round(Math.random() * dotprod.layers.StarLayer.STAR_TILE_SIZE_);
    this.stars_.push({x: x, y: y});
  }
}