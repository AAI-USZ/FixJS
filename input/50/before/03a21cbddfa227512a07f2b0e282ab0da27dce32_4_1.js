function() {
    this.attr({
      y: 150,
      x: 10,
      scale: 0.5,
      filters: filter.grayscale(1)
    });
    stage.addChild(this);
  }