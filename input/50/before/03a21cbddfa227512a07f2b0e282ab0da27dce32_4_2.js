function() {
    this.attr({
      y: 150,
      x: 150,
      scale: 0.5,
      filters: filter.hueRotate(90)
    });
    stage.addChild(this);
  }