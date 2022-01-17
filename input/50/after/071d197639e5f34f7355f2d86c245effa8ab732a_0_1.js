function(resolution) {
    return this.tileSize.w * Math.pow(2, this.num_resolutions - resolution - 1);
  }